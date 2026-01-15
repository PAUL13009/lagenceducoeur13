import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp,
  QueryConstraint,
  Firestore,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// Types pour les collections
export type EstimationRequest = {
  id?: string;
  created_at?: Date | Timestamp;
  updated_at?: Date | Timestamp;
  status?: 'pending' | 'contacted' | 'completed';
  
  // Informations personnelles
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  type_bien: string;
  adresse: string;
  
  // Caractéristiques générales
  statut_bien?: string;
  annee_construction?: number | null;
  surface_habitable?: number | null;
  nombre_pieces?: string;
  nombre_chambres?: number | null;
  etage?: string;
  ascenseur?: string;
  
  // Configuration et prestations
  type_bien_detail?: string;
  etat_general?: string;
  annee_derniere_renovation?: number | null;
  montant_derniere_renovation?: number | null;
  prestations?: string[];
  autres_prestations?: string;
  
  // Environnement et contexte
  exposition_principale?: string;
  vis_a_vis?: string;
  nuisances?: string;
  autres_nuisances?: string;
  
  // Situation juridique et financière
  bien_occupe?: string;
  loyer_actuel?: number | null;
  fin_bail?: string | null;
  charges_annuelles?: number | null;
  taxe_fonciere?: number | null;
  
  // Projet de vente
  motif_vente?: string;
  delai_vente?: string;
  idee_prix?: string;
  prix_estime?: number | null;
  prix_marche?: string;
  
  // Message libre
  message_libre?: string;
  
  // Confirmation
  confirmation?: boolean;
};

export type ContactRequest = {
  id?: string;
  created_at?: Date | Timestamp;
  updated_at?: Date | Timestamp;
  status?: 'pending' | 'contacted' | 'completed';
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
};

export type VenteRequest = {
  id?: string;
  created_at?: Date | Timestamp;
  updated_at?: Date | Timestamp;
  status?: 'pending' | 'contacted' | 'completed';
  [key: string]: any;
};

export type LocationRequest = {
  id?: string;
  created_at?: Date | Timestamp;
  updated_at?: Date | Timestamp;
  status?: 'pending' | 'contacted' | 'completed';
  [key: string]: any;
};

export type GestionRequest = {
  id?: string;
  created_at?: Date | Timestamp;
  updated_at?: Date | Timestamp;
  status?: 'pending' | 'contacted' | 'completed';
  [key: string]: any;
};

// Fonction utilitaire pour convertir Firestore Timestamp en Date
const convertTimestamps = (data: any): any => {
  if (!data) return data;
  
  const converted = { ...data };
  
  // Convertir les timestamps Firestore en dates JavaScript
  if (converted.created_at) {
    if (converted.created_at.toDate && typeof converted.created_at.toDate === 'function') {
      converted.created_at = converted.created_at.toDate();
    } else if (converted.created_at.seconds) {
      // Cas où c'est un Timestamp mais pas encore converti
      converted.created_at = new Date(converted.created_at.seconds * 1000);
    }
  }
  
  if (converted.updated_at) {
    if (converted.updated_at.toDate && typeof converted.updated_at.toDate === 'function') {
      converted.updated_at = converted.updated_at.toDate();
    } else if (converted.updated_at.seconds) {
      converted.updated_at = new Date(converted.updated_at.seconds * 1000);
    }
  }
  
  if (converted.fin_bail) {
    if (converted.fin_bail.toDate && typeof converted.fin_bail.toDate === 'function') {
      converted.fin_bail = converted.fin_bail.toDate();
    } else if (converted.fin_bail.seconds) {
      converted.fin_bail = new Date(converted.fin_bail.seconds * 1000);
    }
  }
  
  return converted;
};

// Fonction utilitaire pour préparer les données avant l'insertion
const prepareDataForInsert = (data: any): any => {
  const prepared: any = {};
  
  // Copier uniquement les champs qui ne sont pas undefined ou null (pour les strings optionnels)
  Object.keys(data).forEach(key => {
    const value = data[key];
    // Ignorer undefined, mais garder null pour les nombres
    if (value !== undefined) {
      // Si c'est un objet (mais pas un tableau, Date, ou Timestamp), nettoyer récursivement
      if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date) && !(value instanceof Timestamp)) {
        const cleaned = prepareDataForInsert(value);
        // Ne pas ajouter si l'objet nettoyé est vide
        if (Object.keys(cleaned).length > 0) {
          prepared[key] = cleaned;
        }
      } else {
        prepared[key] = value;
      }
    }
  });
  
  // Ajouter les timestamps
  prepared.created_at = Timestamp.now();
  prepared.updated_at = Timestamp.now();
  
  // Convertir les dates en Timestamp si nécessaire
  if (prepared.fin_bail && typeof prepared.fin_bail === 'string') {
    prepared.fin_bail = Timestamp.fromDate(new Date(prepared.fin_bail));
  }
  
  // S'assurer que les tableaux sont bien des tableaux
  if (prepared.prestations && !Array.isArray(prepared.prestations)) {
    prepared.prestations = [];
  }
  
  // S'assurer que les tableaux sont bien des tableaux pour equipements aussi
  if (prepared.equipements && !Array.isArray(prepared.equipements)) {
    prepared.equipements = [];
  }
  
  return prepared;
};

// Fonction utilitaire pour préparer les données avant la mise à jour
const prepareDataForUpdate = (data: any): any => {
  const prepared = { ...data };
  
  // Mettre à jour le timestamp
  prepared.updated_at = Timestamp.now();
  
  // Ne pas inclure les champs système dans la mise à jour
  delete prepared.id;
  delete prepared.created_at;
  
  return prepared;
};

// ============================================
// ESTIMATION REQUESTS
// ============================================

export const estimationRequestsCollection = 'estimation_requests';

export async function createEstimationRequest(data: Omit<EstimationRequest, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  try {
    const preparedData = prepareDataForInsert(data);
    const docRef = await addDoc(collection(db, estimationRequestsCollection), preparedData);
    return docRef.id;
  } catch (error: any) {
    console.error('Erreur lors de la création de la demande d\'estimation:', error);
    throw error;
  }
}

export async function getEstimationRequest(id: string): Promise<EstimationRequest | null> {
  try {
    const docRef = doc(db, estimationRequestsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return convertTimestamps({ id: docSnap.id, ...docSnap.data() });
    }
    return null;
  } catch (error: any) {
    console.error('Erreur lors de la récupération de la demande d\'estimation:', error);
    throw error;
  }
}

export async function getAllEstimationRequests(): Promise<EstimationRequest[]> {
  try {
    const q = query(
      collection(db, estimationRequestsCollection),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => 
      convertTimestamps({ id: doc.id, ...doc.data() })
    ) as EstimationRequest[];
  } catch (error: any) {
    console.error('Erreur lors de la récupération des demandes d\'estimation:', error);
    throw error;
  }
}

export async function updateEstimationRequest(id: string, data: Partial<EstimationRequest>): Promise<void> {
  try {
    const preparedData = prepareDataForUpdate(data);
    const docRef = doc(db, estimationRequestsCollection, id);
    await updateDoc(docRef, preparedData);
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de la demande d\'estimation:', error);
    throw error;
  }
}

export async function deleteEstimationRequest(id: string): Promise<void> {
  try {
    const docRef = doc(db, estimationRequestsCollection, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.error('Erreur lors de la suppression de la demande d\'estimation:', error);
    throw error;
  }
}

// ============================================
// CONTACT REQUESTS
// ============================================

export const contactRequestsCollection = 'contact_requests';

export async function createContactRequest(data: Omit<ContactRequest, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  try {
    const preparedData = prepareDataForInsert(data);
    const docRef = await addDoc(collection(db, contactRequestsCollection), preparedData);
    return docRef.id;
  } catch (error: any) {
    console.error('Erreur lors de la création de la demande de contact:', error);
    throw error;
  }
}

export async function getAllContactRequests(): Promise<ContactRequest[]> {
  try {
    const q = query(
      collection(db, contactRequestsCollection),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => 
      convertTimestamps({ id: doc.id, ...doc.data() })
    ) as ContactRequest[];
  } catch (error: any) {
    console.error('Erreur lors de la récupération des demandes de contact:', error);
    throw error;
  }
}

export async function updateContactRequest(id: string, data: Partial<ContactRequest>): Promise<void> {
  try {
    const preparedData = prepareDataForUpdate(data);
    const docRef = doc(db, contactRequestsCollection, id);
    await updateDoc(docRef, preparedData);
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de la demande de contact:', error);
    throw error;
  }
}

export async function deleteContactRequest(id: string): Promise<void> {
  try {
    const docRef = doc(db, contactRequestsCollection, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.error('Erreur lors de la suppression de la demande de contact:', error);
    throw error;
  }
}

// ============================================
// VENTE REQUESTS
// ============================================

export const venteRequestsCollection = 'vente_requests';

export async function createVenteRequest(data: Omit<VenteRequest, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  try {
    const preparedData = prepareDataForInsert(data);
    const docRef = await addDoc(collection(db, venteRequestsCollection), preparedData);
    return docRef.id;
  } catch (error: any) {
    console.error('Erreur lors de la création de la demande de vente:', error);
    throw error;
  }
}

export async function getAllVenteRequests(): Promise<VenteRequest[]> {
  try {
    const q = query(
      collection(db, venteRequestsCollection),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => 
      convertTimestamps({ id: doc.id, ...doc.data() })
    ) as VenteRequest[];
  } catch (error: any) {
    console.error('Erreur lors de la récupération des demandes de vente:', error);
    throw error;
  }
}

export async function updateVenteRequest(id: string, data: Partial<VenteRequest>): Promise<void> {
  try {
    const preparedData = prepareDataForUpdate(data);
    const docRef = doc(db, venteRequestsCollection, id);
    await updateDoc(docRef, preparedData);
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de la demande de vente:', error);
    throw error;
  }
}

export async function deleteVenteRequest(id: string): Promise<void> {
  try {
    const docRef = doc(db, venteRequestsCollection, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.error('Erreur lors de la suppression de la demande de vente:', error);
    throw error;
  }
}

// ============================================
// LOCATION REQUESTS
// ============================================

export const locationRequestsCollection = 'location_requests';

export async function createLocationRequest(data: Omit<LocationRequest, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  try {
    const preparedData = prepareDataForInsert(data);
    const docRef = await addDoc(collection(db, locationRequestsCollection), preparedData);
    return docRef.id;
  } catch (error: any) {
    console.error('Erreur lors de la création de la demande de location:', error);
    throw error;
  }
}

export async function getAllLocationRequests(): Promise<LocationRequest[]> {
  try {
    const q = query(
      collection(db, locationRequestsCollection),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => 
      convertTimestamps({ id: doc.id, ...doc.data() })
    ) as LocationRequest[];
  } catch (error: any) {
    console.error('Erreur lors de la récupération des demandes de location:', error);
    throw error;
  }
}

export async function updateLocationRequest(id: string, data: Partial<LocationRequest>): Promise<void> {
  try {
    const preparedData = prepareDataForUpdate(data);
    const docRef = doc(db, locationRequestsCollection, id);
    await updateDoc(docRef, preparedData);
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de la demande de location:', error);
    throw error;
  }
}

export async function deleteLocationRequest(id: string): Promise<void> {
  try {
    const docRef = doc(db, locationRequestsCollection, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.error('Erreur lors de la suppression de la demande de location:', error);
    throw error;
  }
}

// ============================================
// GESTION REQUESTS
// ============================================

export const gestionRequestsCollection = 'gestion_requests';

export async function createGestionRequest(data: Omit<GestionRequest, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  try {
    const preparedData = prepareDataForInsert(data);
    const docRef = await addDoc(collection(db, gestionRequestsCollection), preparedData);
    return docRef.id;
  } catch (error: any) {
    console.error('Erreur lors de la création de la demande de gestion:', error);
    throw error;
  }
}

export async function getAllGestionRequests(): Promise<GestionRequest[]> {
  try {
    const q = query(
      collection(db, gestionRequestsCollection),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => 
      convertTimestamps({ id: doc.id, ...doc.data() })
    ) as GestionRequest[];
  } catch (error: any) {
    console.error('Erreur lors de la récupération des demandes de gestion:', error);
    throw error;
  }
}

export async function updateGestionRequest(id: string, data: Partial<GestionRequest>): Promise<void> {
  try {
    const preparedData = prepareDataForUpdate(data);
    const docRef = doc(db, gestionRequestsCollection, id);
    await updateDoc(docRef, preparedData);
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de la demande de gestion:', error);
    throw error;
  }
}

export async function deleteGestionRequest(id: string): Promise<void> {
  try {
    const docRef = doc(db, gestionRequestsCollection, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.error('Erreur lors de la suppression de la demande de gestion:', error);
    throw error;
  }
}

// ============================================
// PROPERTIES
// ============================================

export const propertiesCollection = 'properties';

export async function getProperty(id: string): Promise<any | null> {
  try {
    const docRef = doc(db, propertiesCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return convertTimestamps({ id: docSnap.id, ...docSnap.data() });
    }
    return null;
  } catch (error: any) {
    console.error('Erreur lors de la récupération du bien:', error);
    throw error;
  }
}

export async function getAllProperties(filters?: { type?: string }): Promise<any[]> {
  try {
    const constraints: QueryConstraint[] = [];
    
    if (filters?.type) {
      constraints.push(where('type', '==', filters.type));
    }
    
    constraints.push(orderBy('created_at', 'desc'));
    
    const q = query(collection(db, propertiesCollection), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => 
      convertTimestamps({ id: doc.id, ...doc.data() })
    );
  } catch (error: any) {
    console.error('Erreur lors de la récupération des biens:', error);
    throw error;
  }
}

export async function createProperty(data: any): Promise<string> {
  try {
    const preparedData = prepareDataForInsert(data);
    const docRef = await addDoc(collection(db, propertiesCollection), preparedData);
    return docRef.id;
  } catch (error: any) {
    console.error('Erreur lors de la création du bien:', error);
    throw error;
  }
}

export async function updateProperty(id: string, data: Partial<any>): Promise<void> {
  try {
    const preparedData = prepareDataForUpdate(data);
    const docRef = doc(db, propertiesCollection, id);
    await updateDoc(docRef, preparedData);
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du bien:', error);
    throw error;
  }
}

export async function deleteProperty(id: string): Promise<void> {
  try {
    const docRef = doc(db, propertiesCollection, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.error('Erreur lors de la suppression du bien:', error);
    throw error;
  }
}
