'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  getAllEstimationRequests, 
  updateEstimationRequest, 
  deleteEstimationRequest,
  getAllContactRequests,
  updateContactRequest,
  deleteContactRequest,
  getAllVenteRequests,
  updateVenteRequest,
  deleteVenteRequest,
  getAllLocationRequests,
  updateLocationRequest,
  deleteLocationRequest,
  getAllGestionRequests,
  updateGestionRequest,
  deleteGestionRequest,
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty
} from '@/lib/firestore';
import { uploadMultipleFiles } from '@/lib/firebase-storage';
import { getSession, signOutUser, onAuthStateChange } from '@/lib/firebase-auth';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('vente');
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [locationProperties, setLocationProperties] = useState<any[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [estimationRequests, setEstimationRequests] = useState<any[]>([]);
  const [loadingEstimationRequests, setLoadingEstimationRequests] = useState(false);
  const [venteRequests, setVenteRequests] = useState<any[]>([]);
  const [loadingVenteRequests, setLoadingVenteRequests] = useState(false);
  const [locationRequests, setLocationRequests] = useState<any[]>([]);
  const [loadingLocationRequests, setLoadingLocationRequests] = useState(false);
  const [gestionRequests, setGestionRequests] = useState<any[]>([]);
  const [loadingGestionRequests, setLoadingGestionRequests] = useState(false);
  const [contactRequests, setContactRequests] = useState<any[]>([]);
  const [loadingContactRequests, setLoadingContactRequests] = useState(false);
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const router = useRouter();

  // État du formulaire d'ajout de bien
  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'appartement',
    price: '',
    priceOnDemand: false,
    area: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    city: '',
    district: '',
    description: '',
    characteristics: [] as string[],
    charges: '',
    taxeFonciere: '',
    dpeEnergie: '',
    dpeClimat: '',
    photos: [] as File[],
    status: 'à_vendre' as 'à_vendre' | 'sous_compromis' | 'vendu',
  });

  // Fonction pour récupérer les propriétés à vendre
  const fetchProperties = async () => {
    setLoadingProperties(true);
    try {
      const allData = await getAllProperties();
      const filteredData = allData.filter((p: any) => p.type === 'acheter');
      setProperties(filteredData || []);
    } catch (err) {
      console.error('Erreur:', err);
      setProperties([]);
    } finally {
      setLoadingProperties(false);
    }
  };

  // Fonction pour récupérer les propriétés à louer
  const fetchLocationProperties = async () => {
    setLoadingProperties(true);
    try {
      const allData = await getAllProperties();
      const filteredData = allData.filter((p: any) => p.type === 'louer');
      setLocationProperties(filteredData || []);
    } catch (err) {
      console.error('Erreur:', err);
      setLocationProperties([]);
    } finally {
      setLoadingProperties(false);
    }
  };

  useEffect(() => {
    // Vérifier l'authentification
    const checkAuth = async () => {
      const { user } = await getSession();
      
      if (!user) {
        router.push('/admin');
        return;
      }
      
      setUser(user);
      setLoading(false);
    };

    checkAuth();

    // Écouter les changements d'authentification
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        router.push('/admin');
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Fonction pour récupérer les demandes d'estimation
  const fetchEstimationRequests = async () => {
    setLoadingEstimationRequests(true);
    try {
      const data = await getAllEstimationRequests();
      setEstimationRequests(data || []);
    } catch (err) {
      console.error('Erreur:', err);
      setEstimationRequests([]);
    } finally {
      setLoadingEstimationRequests(false);
    }
  };

  // Fonction pour récupérer les demandes de vente
  const fetchVenteRequests = async () => {
    setLoadingVenteRequests(true);
    try {
      const data = await getAllVenteRequests();
      setVenteRequests(data || []);
    } catch (err) {
      console.error('Erreur:', err);
      setVenteRequests([]);
    } finally {
      setLoadingVenteRequests(false);
    }
  };

  // Fonction pour récupérer les demandes de location
  const fetchLocationRequests = async () => {
    setLoadingLocationRequests(true);
    try {
      const data = await getAllLocationRequests();
      setLocationRequests(data || []);
    } catch (err) {
      console.error('Erreur:', err);
      setLocationRequests([]);
    } finally {
      setLoadingLocationRequests(false);
    }
  };

  // Fonction pour récupérer les demandes de gestion locative
  const fetchGestionRequests = async () => {
    setLoadingGestionRequests(true);
    try {
      const data = await getAllGestionRequests();
      setGestionRequests(data || []);
    } catch (err) {
      console.error('Erreur:', err);
      setGestionRequests([]);
    } finally {
      setLoadingGestionRequests(false);
    }
  };

  // Fonction pour récupérer les demandes de contact
  const fetchContactRequests = async () => {
    setLoadingContactRequests(true);
    try {
      const data = await getAllContactRequests();
      setContactRequests(data || []);
    } catch (err) {
      console.error('Erreur:', err);
      setContactRequests([]);
    } finally {
      setLoadingContactRequests(false);
    }
  };

  // Recharger les données quand on change de section
  useEffect(() => {
    if (activeSection === 'vente' && user) {
      fetchProperties();
    } else if (activeSection === 'estimation' && user) {
      fetchEstimationRequests();
    } else if (activeSection === 'demande-vente' && user) {
      fetchVenteRequests();
    } else if (activeSection === 'demande-location' && user) {
      fetchLocationRequests();
    } else if (activeSection === 'demande-gestion' && user) {
      fetchGestionRequests();
    } else if (activeSection === 'contact' && user) {
      fetchContactRequests();
    }
  }, [activeSection, user]);

  const handleLogout = async () => {
    await signOutUser();
    router.push('/admin');
  };

  // Fonction pour formater les valeurs du formulaire
  const formatValue = (value: any, type: string = 'text') => {
    if (value === null || value === undefined || value === '') return 'Non renseigné';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
      case 'date':
        return new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      case 'datetime':
        return new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      default:
        return String(value);
    }
  };

  const formatStatutBien = (statut: string) => {
    const statuts: { [key: string]: string } = {
      'residence-principale': 'Résidence principale',
      'residence-secondaire': 'Résidence secondaire',
      'bien-locatif': 'Bien locatif',
      'autre': 'Autre'
    };
    return statuts[statut] || statut;
  };

  const formatEtatGeneral = (etat: string) => {
    const etats: { [key: string]: string } = {
      'a-renover': 'À rénover',
      'a-rafraichir': 'À rafraîchir',
      'bon-etat': 'Bon état',
      'tres-bon-etat': 'Très bon état / récent'
    };
    return etats[etat] || etat;
  };

  const formatMotifVente = (motif: string) => {
    const motifs: { [key: string]: string } = {
      'projet-personnel': 'Projet personnel',
      'changement-situation': 'Changement de situation',
      'investissement': 'Investissement',
      'autre': 'Autre'
    };
    return motifs[motif] || motif;
  };

  const formatDelaiVente = (delai: string) => {
    const delais: { [key: string]: string } = {
      'moins-3-mois': 'Moins de 3 mois',
      '3-6-mois': '3 à 6 mois',
      'plus-6-mois': 'Plus de 6 mois',
      'reflexion': 'Simple réflexion'
    };
    return delais[delai] || delai;
  };

  const formatBienOccupe = (occupe: string) => {
    const options: { [key: string]: string } = {
      'oui-proprietaire': 'Oui (par le propriétaire)',
      'oui-loue': 'Oui (loué)',
      'non': 'Non'
    };
    return options[occupe] || occupe;
  };

  const formatPrixMarche = (prix: string) => {
    const options: { [key: string]: string } = {
      'oui': 'Oui',
      'non': 'Non',
      'discuter': 'Je souhaite en discuter'
    };
    return options[prix] || prix;
  };

  const formatIntentionVente = (intention: string) => {
    const intentions: { [key: string]: string } = {
      'vendre': 'Je souhaite vendre mon bien',
      'reflechir': 'Je réfléchis sérieusement à la vente',
      'renseigner': 'Je me renseigne'
    };
    return intentions[intention] || intention;
  };

  const formatPositionnementPrix = (positionnement: string) => {
    const positionnements: { [key: string]: string } = {
      'oui': 'Oui',
      'oui-apres-echange': 'Oui, après échange',
      'non': 'Non'
    };
    return positionnements[positionnement] || positionnement;
  };

  const formatRelationProfessionnel = (relation: string) => {
    const relations: { [key: string]: string } = {
      'complet': 'Un accompagnement complet, avec conseils et stratégie',
      'collaboratif': 'Un accompagnement encadré mais collaboratif',
      'simple': 'Une simple mise en relation'
    };
    return relations[relation] || relation;
  };

  const formatExperiencePassee = (experience: string) => {
    const experiences: { [key: string]: string } = {
      'non': 'Non',
      'oui-succes': 'Oui, avec succès',
      'oui-sans-resultat': 'Oui, sans résultat'
    };
    return experiences[experience] || experience;
  };

  const formatProjetLocation = (projet: string) => {
    const projets: { [key: string]: string } = {
      'mettre-location': 'Je souhaite mettre mon bien en location',
      'disponible-prochainement': 'Mon bien sera disponible à la location prochainement',
      'renseigner': 'Je me renseigne'
    };
    return projets[projet] || projet;
  };

  const formatDelaiLocation = (delai: string) => {
    const delais: { [key: string]: string } = {
      'immediatement': 'Immédiatement',
      'moins-2-mois': 'Dans moins de 2 mois',
      'plus-2-mois': 'Dans plus de 2 mois'
    };
    return delais[delai] || delai;
  };

  const formatLoyerMarche = (loyer: string) => {
    const loyers: { [key: string]: string } = {
      'oui': 'Oui',
      'oui-apres-echange': 'Oui, après échange',
      'non': 'Non'
    };
    return loyers[loyer] || loyer;
  };

  const formatNiveauAccompagnement = (niveau: string) => {
    const niveaux: { [key: string]: string } = {
      'complet': 'Mise en location complète',
      'location-gestion': 'Mise en location + gestion',
      'mise-relation': 'Mise en relation uniquement'
    };
    return niveaux[niveau] || niveau;
  };

  const formatTypeLocation = (type: string) => {
    const types: { [key: string]: string } = {
      'vide': 'Vide',
      'meublee': 'Meublée',
      'indifferent': 'Indifférent'
    };
    return types[type] || type;
  };

  const formatProfilLocataire = (profil: string) => {
    const profils: { [key: string]: string } = {
      'indifferent': 'Indifférent',
      'etudiant': 'Étudiant',
      'actif': 'Actif',
      'famille': 'Famille'
    };
    return profils[profil] || profil;
  };

  const formatEtage = (etage: string) => {
    if (!etage) return 'Non renseigné';
    if (etage === '0') return 'RDC (0)';
    return `Étage ${etage}`;
  };

  const formatAscenseur = (ascenseur: string) => {
    const ascenseurs: { [key: string]: string } = {
      'oui': 'Oui',
      'non': 'Non',
      'non-concerne': 'Non concerné'
    };
    return ascenseurs[ascenseur] || ascenseur;
  };

  const formatPourquoiGestion = (pourquoi: string) => {
    const raisons: { [key: string]: string } = {
      'manque-temps': 'Manque de temps',
      'serenite': 'Recherche de sérénité',
      'eloignement': 'Éloignement géographique',
      'autre': 'Autre'
    };
    return raisons[pourquoi] || pourquoi;
  };

  const formatGestionActuelle = (gestion: string) => {
    const gestions: { [key: string]: string } = {
      'personnelle': 'Gestion personnelle',
      'agence': 'Déjà en agence',
      'bientot-location': 'Bien bientôt mis en location',
      'vacant': 'Bien actuellement vacant'
    };
    return gestions[gestion] || gestion;
  };

  const formatObjectifPrincipal = (objectif: string) => {
    const objectifs: { [key: string]: string } = {
      'securiser': 'Sécuriser mon investissement sur le long terme',
      'deleguer': 'Déléguer en toute confiance',
      'simplifier': 'Simplifier mon quotidien',
      'reduire-frais': 'Réduire au maximum les frais'
    };
    return objectifs[objectif] || objectif;
  };

  const formatNiveauImplication = (niveau: string) => {
    const niveaux: { [key: string]: string } = {
      'informer': 'Être informé régulièrement, sans intervenir',
      'echanger': 'Échanger uniquement sur les décisions importantes',
      'valider': 'Valider chaque action'
    };
    return niveaux[niveau] || niveau;
  };

  const formatCadreClair = (cadre: string) => {
    const cadres: { [key: string]: string } = {
      'oui': 'Oui',
      'oui-apres-echange': 'Oui, après échange'
    };
    return cadres[cadre] || cadre;
  };

  const formatBienLoue = (loue: string) => {
    const loues: { [key: string]: string } = {
      'oui': 'Oui',
      'non': 'Non'
    };
    return loues[loue] || loue;
  };

  const formatTypeBail = (type: string) => {
    const types: { [key: string]: string } = {
      'vide': 'Vide',
      'meuble': 'Meublé'
    };
    return types[type] || type;
  };

  const formatLoyersImpayes = (impayes: string) => {
    const impayesOptions: { [key: string]: string } = {
      'oui': 'Oui',
      'non': 'Non'
    };
    return impayesOptions[impayes] || impayes;
  };

  // Caractéristiques complètes d'un bien immobilier
  const allCharacteristics = [
    'Balcon',
    'Terrasse',
    'Jardin',
    'Parking',
    'Cave',
    'Garage',
    'Ascenseur',
    'Interphone',
    'Digicode',
    'Gardien',
    'Piscine',
    'Climatisation',
    'Chauffage individuel',
    'Chauffage collectif',
    'Chauffage électrique',
    'Chauffage gaz',
    'Double vitrage',
    'Parquet',
    'Carrelage',
    'Meublé',
    'Non meublé',
    'Cuisine équipée',
    'Cuisine aménagée',
    'Salle de bain',
    'Salle d\'eau',
    'WC séparés',
    'Dressing',
    'Buanderie',
    'Cellier',
    'Véranda',
    'Cheminée',
    'Alarme',
    'Vidéosurveillance',
    'Fibre optique',
    'Rénové',
    'À rénover',
    'Récent',
    'Ancien',
    'Vue mer',
    'Vue montagne',
    'Vue dégagée',
    'Calme',
    'Proche commerces',
    'Proche transports',
    'Proche écoles',
  ];

  const handleCharacteristicChange = (char: string) => {
    setFormData(prev => ({
      ...prev,
      characteristics: prev.characteristics.includes(char)
        ? prev.characteristics.filter(c => c !== char)
        : [...prev.characteristics, char]
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 15);
      setFormData(prev => ({
        ...prev,
        photos: files
      }));
    }
  };

  const handleEditClick = (property: any) => {
    setEditingProperty(property);
    const status = property.status || (property.sold ? 'vendu' : 'à_vendre');
    const priceOnDemand = property.price_on_demand || (!property.price || property.price === null);
    setFormData({
      title: property.title || '',
      propertyType: property.property_type || 'appartement',
      price: property.price?.toString() || '',
      priceOnDemand: priceOnDemand,
      area: property.area?.toString() || '',
      rooms: property.rooms?.toString() || '',
      bedrooms: property.bedrooms?.toString() || '',
      bathrooms: property.bathrooms?.toString() || '',
      city: property.city || '',
      district: property.district || '',
      description: property.description || '',
      characteristics: property.characteristics || [],
      charges: property.charges?.toString() || '',
      taxeFonciere: property.taxe_fonciere?.toString() || '',
      dpeEnergie: property.dpe_energie || '',
      dpeClimat: property.dpe_climat || '',
      photos: [],
      status: status as 'à_vendre' | 'sous_compromis' | 'vendu',
    });
    setShowAddPropertyForm(true);
    // Changer la section active si nécessaire pour le type de bien
    if (property.type === 'louer') {
      setActiveSection('location');
    } else {
      setActiveSection('vente');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProperty && formData.photos.length === 0) {
      alert('Veuillez sélectionner au moins une photo pour le bien.');
      return;
    }

    try {
      const photoUrls: string[] = [];
      
      // Si on édite, garder les photos existantes si aucune nouvelle photo n'est ajoutée
      if (editingProperty) {
        photoUrls.push(...(editingProperty.photos || []));
      }
      
      // Uploader les nouvelles photos si elles existent
      if (formData.photos.length > 0) {
        const uploadedUrls = await uploadMultipleFiles(formData.photos, 'properties');
        if (editingProperty) {
          // Remplacer les photos existantes lors de l'édition
          photoUrls.length = 0;
          photoUrls.push(...uploadedUrls);
        } else {
          photoUrls.push(...uploadedUrls);
        }
      }

      // Préparer les données pour la base de données
      const propertyData = {
        title: formData.title,
        property_type: formData.propertyType,
        price: formData.priceOnDemand ? null : parseInt(formData.price),
        price_on_demand: formData.priceOnDemand,
        area: parseInt(formData.area),
        rooms: parseInt(formData.rooms),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        city: formData.city,
        district: formData.district,
        description: formData.description,
        characteristics: formData.characteristics,
        charges: formData.propertyType === 'appartement' && formData.charges ? parseInt(formData.charges) : null,
        taxe_fonciere: formData.taxeFonciere ? parseInt(formData.taxeFonciere) : null,
        dpe_energie: formData.dpeEnergie || null,
        dpe_climat: formData.dpeClimat || null,
        main_photo: photoUrls[0] || null,
        photos: photoUrls,
        type: activeSection === 'location' ? 'louer' : 'acheter',
        status: activeSection === 'location' ? undefined : formData.status,
        sold: activeSection === 'location' ? undefined : formData.status === 'vendu',
      };

      // Mettre à jour ou créer le bien
      if (editingProperty) {
        await updateProperty(editingProperty.id, propertyData);
        alert('Bien modifié avec succès !');
      } else {
        await createProperty(propertyData);
        alert('Bien enregistré avec succès !');
      }

      setShowAddPropertyForm(false);
      setEditingProperty(null);
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        propertyType: 'appartement',
        price: '',
        area: '',
        rooms: '',
        bedrooms: '',
        city: '',
        district: '',
        description: '',
        characteristics: [],
        charges: '',
        taxeFonciere: '',
        dpeEnergie: '',
        dpeClimat: '',
        photos: [],
        bathrooms: '',
        priceOnDemand: false,
        status: 'à_vendre' as 'à_vendre' | 'sous_compromis' | 'vendu',
      });

      // Recharger la liste des propriétés selon la section active
      if (activeSection === 'location') {
        await fetchLocationProperties();
      } else {
        await fetchProperties();
      }
    } catch (err: any) {
      alert(`Erreur: ${err.message}`);
      console.error('Erreur:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'vente', label: 'Vendre un bien', icon: '🏠' },
    { id: 'location', label: 'Louer un bien', icon: '🔑' },
    { id: 'contact', label: 'Demande de contact', icon: '📧' },
    { id: 'estimation', label: 'Demande d\'estimation', icon: '💰' },
    { id: 'demande-vente', label: 'Demande de vente', icon: '📋' },
    { id: 'demande-location', label: 'Demande de location', icon: '🏘️' },
    { id: 'demande-gestion', label: 'Demande de gestion locative', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="cta-button group bg-transparent border-2 px-4 py-2 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                style={{ borderColor: '#1a2332', color: '#1a2332' }}
              >
                <span>Retour au site</span>
                <svg 
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Dashboard Administrateur
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors border-2 rounded-lg"
                style={{ borderColor: '#1a2332', color: '#1a2332' }}
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation des sections */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 border-b border-gray-200">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                  activeSection === section.id
                    ? 'border-[#1a2332] text-[#1a2332]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des sections */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeSection === 'vente' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Vendre un bien
                </h2>
                <button
                  onClick={() => setShowAddPropertyForm(true)}
                  className="cta-button group bg-transparent border-2 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Ajouter un bien</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Gérez les biens à vendre. Ajoutez, modifiez ou supprimez des propriétés.
              </p>
              
              {loadingProperties ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Chargement des biens...</p>
                </div>
              ) : properties.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">
                    Aucun bien à vendre pour le moment. Cliquez sur "Ajouter un bien" pour en ajouter un.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">
                      {properties.length} bien{properties.length > 1 ? 's' : ''} à vendre
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                      <div key={property.id} className="border-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow" style={{ borderColor: '#1a2332' }}>
                        {property.main_photo && (
                          <div className="relative w-full h-48">
                            <Image
                              src={property.main_photo}
                              alt={property.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2" style={{ color: '#1a2332' }}>
                            {property.title}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <p>{property.city} {property.district}</p>
                            <p className="font-semibold text-lg" style={{ color: '#1a2332' }}>
                              {typeof property.price === 'number' ? property.price.toLocaleString('fr-FR') : property.price} €
                            </p>
                            <p>{property.area} m² • {property.rooms} pièces • {property.bedrooms} ch.</p>
                            <p className="capitalize">{property.property_type}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                if (confirm('Voulez-vous vraiment supprimer ce bien ?')) {
                                  try {
                                    await deleteProperty(property.id);
                                    fetchProperties();
                                  } catch (error: any) {
                                    alert('Erreur lors de la suppression: ' + error.message);
                                  }
                                }
                              }}
                              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              Supprimer
                            </button>
                            <button
                              onClick={() => handleEditClick(property)}
                              className="px-4 py-2 text-sm border-2 rounded-lg hover:bg-gray-50 transition-colors"
                              style={{ borderColor: '#1a2332', color: '#1a2332' }}
                            >
                              Modifier
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'location' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Louer un bien
                </h2>
                <button
                  onClick={() => setShowAddPropertyForm(true)}
                  className="cta-button group bg-transparent border-2 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Ajouter un bien</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Gérez les biens à louer. Ajoutez, modifiez ou supprimez des propriétés en location.
              </p>
              
              {loadingProperties ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Chargement des biens...</p>
                </div>
              ) : locationProperties.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">
                    Aucun bien à louer pour le moment. Cliquez sur "Ajouter un bien" pour en ajouter un.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">
                      {locationProperties.length} bien{locationProperties.length > 1 ? 's' : ''} à louer
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locationProperties.map((property) => (
                      <div key={property.id} className="border-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow" style={{ borderColor: '#1a2332' }}>
                        {property.main_photo && (
                          <div className="relative w-full h-48">
                            <Image
                              src={property.main_photo}
                              alt={property.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2" style={{ color: '#1a2332' }}>
                            {property.title}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <p>{property.city} {property.district}</p>
                            <p className="font-semibold text-lg" style={{ color: '#1a2332' }}>
                              {property.price_on_demand || property.price === null 
                                ? 'Sur demande' 
                                : `${typeof property.price === 'number' ? property.price.toLocaleString('fr-FR') : property.price} €/mois`}
                            </p>
                            <p>{property.area} m² • {property.rooms} pièces • {property.bedrooms} ch.</p>
                            <p className="capitalize">{property.property_type}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                if (confirm('Voulez-vous vraiment supprimer ce bien ?')) {
                                  try {
                                    await deleteProperty(property.id);
                                    fetchLocationProperties();
                                  } catch (error: any) {
                                    alert('Erreur lors de la suppression: ' + error.message);
                                  }
                                }
                              }}
                              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              Supprimer
                            </button>
                            <button
                              onClick={() => handleEditClick(property)}
                              className="px-4 py-2 text-sm border-2 rounded-lg hover:bg-gray-50 transition-colors"
                              style={{ borderColor: '#1a2332', color: '#1a2332' }}
                            >
                              Modifier
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'contact' && (
            <div>
              <h2 className="text-2xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Demandes de contact
              </h2>
              <p className="text-gray-600 mb-4">
                Consultez et gérez les demandes de contact reçues.
              </p>

              {loadingContactRequests ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Chargement des demandes...</p>
                </div>
              ) : contactRequests.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-gray-600">Aucune demande de contact pour le moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contactRequests.map((request) => (
                    <div key={request.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  {request.prenom} {request.nom}
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p><strong>Email :</strong> <a href={`mailto:${request.email}`} className="text-blue-600 hover:underline">{request.email}</a></p>
                                  <p><strong>Téléphone :</strong> <a href={`tel:${request.telephone}`} className="text-blue-600 hover:underline">{request.telephone}</a></p>
                                  <p><strong>Sujet :</strong> {request.sujet}</p>
                                  <p><strong>Date :</strong> {formatValue(request.created_at, 'datetime')}</p>
                                </div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                request.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {request.status === 'pending' ? 'En attente' :
                                 request.status === 'contacted' ? 'Contacté' :
                                 'Terminé'}
                              </span>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Message :</h4>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 whitespace-pre-wrap">{request.message}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                const newStatus = request.status === 'pending' ? 'contacted' : 
                                                 request.status === 'contacted' ? 'completed' : 'pending';
                                updateContactRequest(request.id, { status: newStatus })
                                  .then(() => fetchContactRequests());
                              }}
                              className="px-4 py-2 text-sm font-semibold text-[#1a2332] border border-[#1a2332] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
                            >
                              {request.status === 'pending' ? 'Marquer comme contacté' :
                               request.status === 'contacted' ? 'Marquer comme terminé' :
                               'Réinitialiser'}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
                                  deleteContactRequest(request.id)
                                    .then(() => fetchContactRequests());
                                }
                              }}
                              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'estimation' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Demandes d'estimation ({estimationRequests.length})
                </h2>
              </div>
              
              {loadingEstimationRequests ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Chargement des demandes...</p>
                </div>
              ) : estimationRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Aucune demande d'estimation pour le moment.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {estimationRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      {/* En-tête résumé */}
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                  {request.prenom} {request.nom}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {request.email} • {request.telephone}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {new Date(request.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                request.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                request.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {request.status === 'pending' ? 'En attente' :
                                 request.status === 'contacted' ? 'Contacté' :
                                 request.status === 'completed' ? 'Terminé' :
                                 'Annulé'}
                              </span>
                            </div>
                            
                            {/* Résumé rapide */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
                              <div>
                                <p><strong>Adresse :</strong> {request.adresse}</p>
                                <p><strong>Type :</strong> {request.type_bien}</p>
                              </div>
                              <div>
                                {request.surface_habitable && (
                                  <p><strong>Surface :</strong> {request.surface_habitable} m²</p>
                                )}
                                {request.nombre_pieces && (
                                  <p><strong>Pièces :</strong> {request.nombre_pieces}</p>
                                )}
                                {request.nombre_chambres && (
                                  <p><strong>Chambres :</strong> {request.nombre_chambres}</p>
                                )}
                              </div>
                              <div>
                                {request.prix_estime && (
                                  <p><strong>Prix estimé :</strong> {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(request.prix_estime)}</p>
                                )}
                                {request.delai_vente && (
                                  <p><strong>Délai :</strong> {request.delai_vente}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setExpandedRequestId(expandedRequestId === request.id ? null : request.id)}
                              className="px-4 py-2 text-sm font-semibold text-[#1a2332] border border-[#1a2332] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
                            >
                              {expandedRequestId === request.id ? 'Masquer les détails' : 'Voir tous les détails'}
                            </button>
                            <button
                              onClick={() => {
                                const newStatus = request.status === 'pending' ? 'contacted' : 
                                                 request.status === 'contacted' ? 'completed' : 'pending';
                                updateEstimationRequest(request.id, { status: newStatus })
                                  .then(() => fetchEstimationRequests());
                              }}
                              className="px-4 py-2 text-sm font-semibold text-[#1a2332] border border-[#1a2332] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
                            >
                              {request.status === 'pending' ? 'Marquer comme contacté' :
                               request.status === 'contacted' ? 'Marquer comme terminé' :
                               'Réinitialiser'}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
                                  deleteEstimationRequest(request.id)
                                    .then(() => fetchEstimationRequests());
                                }
                              }}
                              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Détails complets (expandable) */}
                      {expandedRequestId === request.id && (
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                          <div className="space-y-6">
                            {/* 1. Informations personnelles */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                1. Informations personnelles
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Prénom :</strong> {request.prenom}</p>
                                <p><strong>Nom :</strong> {request.nom}</p>
                                <p><strong>Email :</strong> {request.email}</p>
                                <p><strong>Téléphone :</strong> {request.telephone}</p>
                                <p><strong>Type de bien :</strong> {request.type_bien}</p>
                                <p><strong>Adresse :</strong> {request.adresse}</p>
                              </div>
                            </div>

                            {/* 2. Caractéristiques générales */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                2. Caractéristiques générales du bien
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Statut du bien :</strong> {request.statut_bien ? formatStatutBien(request.statut_bien) : 'Non renseigné'}</p>
                                <p><strong>Année de construction :</strong> {request.annee_construction || 'Non renseigné'}</p>
                                <p><strong>Surface habitable :</strong> {request.surface_habitable ? `${request.surface_habitable} m²` : 'Non renseigné'}</p>
                                <p><strong>Nombre de pièces :</strong> {request.nombre_pieces || 'Non renseigné'}</p>
                                <p><strong>Nombre de chambres :</strong> {request.nombre_chambres || 'Non renseigné'}</p>
                                <p><strong>Étage :</strong> {request.etage || 'Non renseigné'}</p>
                                <p><strong>Ascenseur :</strong> {request.ascenseur || 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 3. Configuration et prestations */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                3. Configuration et prestations
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Type de bien :</strong> {request.type_bien_detail || 'Non renseigné'}</p>
                                <p><strong>État général :</strong> {request.etat_general ? formatEtatGeneral(request.etat_general) : 'Non renseigné'}</p>
                                <p><strong>Année dernière rénovation :</strong> {request.annee_derniere_renovation || 'Non renseigné'}</p>
                                <p><strong>Montant dernière rénovation :</strong> {request.montant_derniere_renovation ? formatValue(request.montant_derniere_renovation, 'currency') : 'Non renseigné'}</p>
                                {request.prestations && request.prestations.length > 0 && (
                                  <div className="md:col-span-2">
                                    <p><strong>Prestations :</strong></p>
                                    <ul className="list-disc list-inside ml-4 mt-1">
                                      {request.prestations.map((presta: string, idx: number) => (
                                        <li key={idx}>{presta}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {request.autres_prestations && <p className="md:col-span-2"><strong>Autres prestations :</strong> {request.autres_prestations}</p>}
                              </div>
                            </div>

                            {/* 4. Environnement et contexte */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                4. Environnement et contexte
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                {request.exposition_principale && <p><strong>Exposition principale :</strong> {request.exposition_principale}</p>}
                                {request.vis_a_vis && <p><strong>Vis-à-vis :</strong> {request.vis_a_vis}</p>}
                                {request.nuisances && <p><strong>Nuisances :</strong> {request.nuisances}</p>}
                                {request.autres_nuisances && <p className="md:col-span-2"><strong>Autres nuisances :</strong> {request.autres_nuisances}</p>}
                              </div>
                            </div>

                            {/* 5. Situation juridique et financière */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                5. Situation juridique et financière
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Bien occupé :</strong> {request.bien_occupe ? formatBienOccupe(request.bien_occupe) : 'Non renseigné'}</p>
                                <p><strong>Loyer actuel :</strong> {request.loyer_actuel ? `${formatValue(request.loyer_actuel, 'currency')}/mois` : 'Non renseigné'}</p>
                                <p><strong>Fin de bail :</strong> {request.fin_bail ? formatValue(request.fin_bail, 'date') : 'Non renseigné'}</p>
                                <p><strong>Charges annuelles :</strong> {request.charges_annuelles ? formatValue(request.charges_annuelles, 'currency') : 'Non renseigné'}</p>
                                <p><strong>Taxe foncière :</strong> {request.taxe_fonciere ? `${formatValue(request.taxe_fonciere, 'currency')}/an` : 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 6. Projet de vente */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                6. Projet de vente
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Motif de vente :</strong> {request.motif_vente ? formatMotifVente(request.motif_vente) : 'Non renseigné'}</p>
                                <p><strong>Délai envisagé :</strong> {request.delai_vente ? formatDelaiVente(request.delai_vente) : 'Non renseigné'}</p>
                                <p><strong>Idée de prix :</strong> {request.idee_prix || 'Non renseigné'}</p>
                                <p><strong>Prix estimé :</strong> {request.prix_estime ? formatValue(request.prix_estime, 'currency') : 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 7. Positionnement */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                7. Positionnement
                              </h4>
                              <div className="bg-white p-4 rounded-lg text-sm text-gray-700">
                                <p><strong>Prêt à vendre au prix du marché :</strong> {request.prix_marche ? formatPrixMarche(request.prix_marche) : 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 8. Message libre */}
                            {request.message_libre && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                  8. Message libre
                                </h4>
                                <div className="bg-white p-4 rounded-lg text-sm text-gray-700">
                                  <p className="whitespace-pre-wrap">{request.message_libre}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'demande-vente' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Demandes de vente ({venteRequests.length})
                </h2>
              </div>
              
              {loadingVenteRequests ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Chargement des demandes...</p>
                </div>
              ) : venteRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Aucune demande de vente pour le moment.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {venteRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      {/* En-tête résumé */}
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                  {request.prenom} {request.nom}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {request.email} • {request.telephone}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {new Date(request.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                request.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                request.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {request.status === 'pending' ? 'En attente' :
                                 request.status === 'contacted' ? 'Contacté' :
                                 request.status === 'completed' ? 'Terminé' :
                                 'Annulé'}
                              </span>
                            </div>
                            
                            {/* Résumé rapide */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
                              <div>
                                {request.intention_vente && (
                                  <p><strong>Intention :</strong> {formatIntentionVente(request.intention_vente)}</p>
                                )}
                                {request.delai_vente_etape1 && (
                                  <p><strong>Délai envisagé :</strong> {formatDelaiVente(request.delai_vente_etape1)}</p>
                                )}
                              </div>
                              <div>
                                {request.surface_habitable && (
                                  <p><strong>Surface :</strong> {request.surface_habitable} m²</p>
                                )}
                                {request.nombre_pieces && (
                                  <p><strong>Pièces :</strong> {request.nombre_pieces}</p>
                                )}
                                {request.nombre_chambres && (
                                  <p><strong>Chambres :</strong> {request.nombre_chambres}</p>
                                )}
                              </div>
                              <div>
                                {request.prix_estime && (
                                  <p><strong>Prix estimé :</strong> {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(request.prix_estime)}</p>
                                )}
                                {request.positionnement_prix && (
                                  <p><strong>Positionnement prix :</strong> {formatPositionnementPrix(request.positionnement_prix)}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setExpandedRequestId(expandedRequestId === request.id ? null : request.id)}
                              className="px-4 py-2 text-sm font-semibold text-[#1a2332] border border-[#1a2332] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
                            >
                              {expandedRequestId === request.id ? 'Masquer les détails' : 'Voir tous les détails'}
                            </button>
                            <button
                              onClick={() => {
                                const newStatus = request.status === 'pending' ? 'contacted' : 
                                                 request.status === 'contacted' ? 'completed' : 'pending';
                                updateVenteRequest(request.id, { status: newStatus })
                                  .then(() => fetchVenteRequests());
                              }}
                              className="px-4 py-2 text-sm font-semibold text-[#1a2332] border border-[#1a2332] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
                            >
                              {request.status === 'pending' ? 'Marquer comme contacté' :
                               request.status === 'contacted' ? 'Marquer comme terminé' :
                               'Réinitialiser'}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
                                  deleteVenteRequest(request.id)
                                    .then(() => fetchVenteRequests());
                                }
                              }}
                              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Détails complets (expandable) */}
                      {expandedRequestId === request.id && (
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                          <div className="space-y-6">
                            {/* 1. Informations personnelles */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                1. Informations personnelles
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Prénom :</strong> {request.prenom}</p>
                                <p><strong>Nom :</strong> {request.nom}</p>
                                <p><strong>Email :</strong> {request.email}</p>
                                <p><strong>Téléphone :</strong> {request.telephone}</p>
                              </div>
                            </div>

                            {/* 2. Projet de vente (Étape 1) */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                2. Projet de vente (Étape 1)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Intention de vente :</strong> {request.intention_vente ? formatIntentionVente(request.intention_vente) : 'Non renseigné'}</p>
                                <p><strong>Délai de vente envisagé :</strong> {request.delai_vente_etape1 ? formatDelaiVente(request.delai_vente_etape1) : 'Non renseigné'}</p>
                                <p><strong>Positionnement par rapport au prix :</strong> {request.positionnement_prix ? formatPositionnementPrix(request.positionnement_prix) : 'Non renseigné'}</p>
                                <p><strong>Relation au professionnel :</strong> {request.relation_professionnel ? formatRelationProfessionnel(request.relation_professionnel) : 'Non renseigné'}</p>
                                <p><strong>Expérience passée :</strong> {request.experience_passee ? formatExperiencePassee(request.experience_passee) : 'Non renseigné'}</p>
                                {request.raison_echec && (
                                  <p className="md:col-span-2"><strong>Raison d'échec :</strong> {request.raison_echec}</p>
                                )}
                                <p className="md:col-span-2"><strong>Engagement :</strong> {request.engagement ? 'Oui' : 'Non'}</p>
                              </div>
                            </div>

                            {/* 3. Caractéristiques générales du bien */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                3. Caractéristiques générales du bien
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Statut du bien :</strong> {request.statut_bien ? formatStatutBien(request.statut_bien) : 'Non renseigné'}</p>
                                <p><strong>Année de construction :</strong> {request.annee_construction || 'Non renseigné'}</p>
                                <p><strong>Surface habitable :</strong> {request.surface_habitable ? `${request.surface_habitable} m²` : 'Non renseigné'}</p>
                                <p><strong>Nombre de pièces :</strong> {request.nombre_pieces || 'Non renseigné'}</p>
                                <p><strong>Nombre de chambres :</strong> {request.nombre_chambres || 'Non renseigné'}</p>
                                <p><strong>Étage :</strong> {request.etage || 'Non renseigné'}</p>
                                <p><strong>Ascenseur :</strong> {request.ascenseur || 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 4. Configuration et prestations */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                4. Configuration et prestations
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Type de bien :</strong> {request.type_bien_detail || 'Non renseigné'}</p>
                                <p><strong>État général :</strong> {request.etat_general ? formatEtatGeneral(request.etat_general) : 'Non renseigné'}</p>
                                <p><strong>Année dernière rénovation :</strong> {request.annee_derniere_renovation || 'Non renseigné'}</p>
                                <p><strong>Montant dernière rénovation :</strong> {request.montant_derniere_renovation ? formatValue(request.montant_derniere_renovation, 'currency') : 'Non renseigné'}</p>
                                {request.prestations && request.prestations.length > 0 && (
                                  <div className="md:col-span-2">
                                    <p><strong>Prestations :</strong></p>
                                    <ul className="list-disc list-inside ml-4 mt-1">
                                      {request.prestations.map((presta: string, idx: number) => (
                                        <li key={idx}>{presta}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {request.autres_prestations && <p className="md:col-span-2"><strong>Autres prestations :</strong> {request.autres_prestations}</p>}
                              </div>
                            </div>

                            {/* 5. Environnement et contexte */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                5. Environnement et contexte
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                {request.exposition_principale && <p><strong>Exposition principale :</strong> {request.exposition_principale}</p>}
                                {request.vis_a_vis && <p><strong>Vis-à-vis :</strong> {request.vis_a_vis}</p>}
                                {request.nuisances && <p><strong>Nuisances :</strong> {request.nuisances}</p>}
                                {request.autres_nuisances && <p className="md:col-span-2"><strong>Autres nuisances :</strong> {request.autres_nuisances}</p>}
                              </div>
                            </div>

                            {/* 6. Situation juridique et financière */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                6. Situation juridique et financière
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Bien occupé :</strong> {request.bien_occupe ? formatBienOccupe(request.bien_occupe) : 'Non renseigné'}</p>
                                <p><strong>Loyer actuel :</strong> {request.loyer_actuel ? `${formatValue(request.loyer_actuel, 'currency')}/mois` : 'Non renseigné'}</p>
                                <p><strong>Fin de bail :</strong> {request.fin_bail ? formatValue(request.fin_bail, 'date') : 'Non renseigné'}</p>
                                <p><strong>Charges annuelles :</strong> {request.charges_annuelles ? formatValue(request.charges_annuelles, 'currency') : 'Non renseigné'}</p>
                                <p><strong>Taxe foncière :</strong> {request.taxe_fonciere ? `${formatValue(request.taxe_fonciere, 'currency')}/an` : 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 7. Projet de vente (Étape 2) */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                7. Projet de vente (Étape 2)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Motif de vente :</strong> {request.motif_vente ? formatMotifVente(request.motif_vente) : 'Non renseigné'}</p>
                                <p><strong>Délai envisagé :</strong> {request.delai_vente ? formatDelaiVente(request.delai_vente) : 'Non renseigné'}</p>
                                <p><strong>Idée de prix :</strong> {request.idee_prix || 'Non renseigné'}</p>
                                <p><strong>Prix estimé :</strong> {request.prix_estime ? formatValue(request.prix_estime, 'currency') : 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 8. Positionnement */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                8. Positionnement
                              </h4>
                              <div className="bg-white p-4 rounded-lg text-sm text-gray-700">
                                <p><strong>Prêt à vendre au prix du marché :</strong> {request.prix_marche ? formatPrixMarche(request.prix_marche) : 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 9. Message libre */}
                            {request.message_libre && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                  9. Message libre
                                </h4>
                                <div className="bg-white p-4 rounded-lg text-sm text-gray-700">
                                  <p className="whitespace-pre-wrap">{request.message_libre}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeSection === 'demande-location' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Demandes de location ({locationRequests.length})
                </h2>
              </div>
              
              {loadingLocationRequests ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Chargement des demandes...</p>
                </div>
              ) : locationRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Aucune demande de location pour le moment.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {locationRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      {/* En-tête résumé */}
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                  {request.prenom} {request.nom}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {request.email} • {request.telephone}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {new Date(request.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                request.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                request.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {request.status === 'pending' ? 'En attente' :
                                 request.status === 'contacted' ? 'Contacté' :
                                 request.status === 'completed' ? 'Terminé' :
                                 'Annulé'}
                              </span>
                            </div>
                            
                            {/* Résumé rapide */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
                              <div>
                                <p><strong>Adresse :</strong> {request.adresse}</p>
                                <p><strong>Type :</strong> {request.type_bien}</p>
                              </div>
                              <div>
                                {request.surface_habitable && (
                                  <p><strong>Surface :</strong> {request.surface_habitable} m²</p>
                                )}
                                {request.nombre_pieces && (
                                  <p><strong>Pièces :</strong> {request.nombre_pieces}</p>
                                )}
                                {request.nombre_chambres && (
                                  <p><strong>Chambres :</strong> {request.nombre_chambres}</p>
                                )}
                              </div>
                              <div>
                                {request.type_location && (
                                  <p><strong>Type location :</strong> {formatTypeLocation(request.type_location)}</p>
                                )}
                                {request.loyer_envisage && (
                                  <p><strong>Loyer envisagé :</strong> {formatValue(request.loyer_envisage, 'currency')}/mois</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setExpandedRequestId(expandedRequestId === request.id ? null : request.id)}
                              className="px-4 py-2 text-sm font-semibold text-[#1a2332] border border-[#1a2332] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
                            >
                              {expandedRequestId === request.id ? 'Masquer les détails' : 'Voir tous les détails'}
                            </button>
                            <button
                              onClick={() => {
                                const newStatus = request.status === 'pending' ? 'contacted' : 
                                                 request.status === 'contacted' ? 'completed' : 'pending';
                                updateLocationRequest(request.id, { status: newStatus })
                                  .then(() => fetchLocationRequests());
                              }}
                              className="px-4 py-2 text-sm font-semibold text-[#1a2332] border border-[#1a2332] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
                            >
                              {request.status === 'pending' ? 'Marquer comme contacté' :
                               request.status === 'contacted' ? 'Marquer comme terminé' :
                               'Réinitialiser'}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
                                  deleteLocationRequest(request.id)
                                    .then(() => fetchLocationRequests());
                                }
                              }}
                              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Détails complets (expandable) */}
                      {expandedRequestId === request.id && (
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                          <div className="space-y-6">
                            {/* 1. Informations personnelles */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                1. Informations personnelles
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Prénom :</strong> {request.prenom}</p>
                                <p><strong>Nom :</strong> {request.nom}</p>
                                <p><strong>Email :</strong> {request.email}</p>
                                <p><strong>Téléphone :</strong> {request.telephone}</p>
                              </div>
                            </div>

                            {/* 2. Projet de location (Étape 1) */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                2. Projet de location (Étape 1)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Projet :</strong> {request.projet_location ? formatProjetLocation(request.projet_location) : 'Non renseigné'}</p>
                                <p><strong>Délai :</strong> {request.delai_location ? formatDelaiLocation(request.delai_location) : 'Non renseigné'}</p>
                                <p><strong>Loyer marché :</strong> {request.loyer_marche ? formatLoyerMarche(request.loyer_marche) : 'Non renseigné'}</p>
                                <p><strong>Niveau accompagnement :</strong> {request.niveau_accompagnement ? formatNiveauAccompagnement(request.niveau_accompagnement) : 'Non renseigné'}</p>
                                <p className="md:col-span-2"><strong>Engagement :</strong> {request.engagement_etape1 ? 'Oui' : 'Non'}</p>
                              </div>
                            </div>

                            {/* 3. Informations générales sur le bien */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                3. Informations générales sur le bien
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Type de bien :</strong> {request.type_bien || 'Non renseigné'}</p>
                                <p><strong>Adresse :</strong> {request.adresse || 'Non renseigné'}</p>
                                <p><strong>Surface habitable :</strong> {request.surface_habitable ? `${request.surface_habitable} m²` : 'Non renseigné'}</p>
                                <p><strong>Nombre de pièces :</strong> {request.nombre_pieces || 'Non renseigné'}</p>
                                <p><strong>Nombre de chambres :</strong> {request.nombre_chambres || 'Non renseigné'}</p>
                                <p><strong>Étage :</strong> {request.etage ? formatEtage(request.etage) : 'Non renseigné'}</p>
                                {request.nombre_etages && (
                                  <p><strong>Nombre d'étages :</strong> {request.nombre_etages}</p>
                                )}
                                <p><strong>Ascenseur :</strong> {request.ascenseur ? formatAscenseur(request.ascenseur) : 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 4. État et équipements */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                4. État et équipements
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>État général :</strong> {request.etat_general ? formatEtatGeneral(request.etat_general) : 'Non renseigné'}</p>
                                {request.equipements && request.equipements.length > 0 && (
                                  <div className="md:col-span-2">
                                    <p><strong>Équipements :</strong></p>
                                    <ul className="list-disc list-inside ml-4 mt-1">
                                      {request.equipements.map((equipement: string, idx: number) => (
                                        <li key={idx}>{equipement}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {request.autres_equipements && (
                                  <p className="md:col-span-2"><strong>Autres équipements :</strong> {request.autres_equipements}</p>
                                )}
                              </div>
                            </div>

                            {/* 5. Situation actuelle */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                5. Situation actuelle
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Bien occupé :</strong> {request.bien_occupe ? formatBienOccupe(request.bien_occupe) : 'Non renseigné'}</p>
                                {request.loyer_actuel && (
                                  <p><strong>Loyer actuel :</strong> {formatValue(request.loyer_actuel, 'currency')}/mois</p>
                                )}
                                {request.fin_bail && (
                                  <p><strong>Fin de bail :</strong> {formatValue(request.fin_bail, 'date')}</p>
                                )}
                              </div>
                            </div>

                            {/* 6. Contexte actuel du bien */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                6. Contexte actuel du bien
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                {request.loyer_envisage && (
                                  <p><strong>Loyer envisagé :</strong> {formatValue(request.loyer_envisage, 'currency')}/mois</p>
                                )}
                                <p><strong>Type de location :</strong> {request.type_location ? formatTypeLocation(request.type_location) : 'Non renseigné'}</p>
                                <p><strong>Profil locataire :</strong> {request.profil_locataire ? formatProfilLocataire(request.profil_locataire) : 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 7. Message libre */}
                            {request.message_libre && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                  7. Message libre
                                </h4>
                                <div className="bg-white p-4 rounded-lg text-sm text-gray-700">
                                  <p className="whitespace-pre-wrap">{request.message_libre}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'demande-gestion' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Demandes de gestion locative ({gestionRequests.length})
                </h2>
              </div>
              
              {loadingGestionRequests ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Chargement des demandes...</p>
                </div>
              ) : gestionRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Aucune demande de gestion locative pour le moment.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {gestionRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      {/* En-tête résumé */}
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                  {request.prenom} {request.nom}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {request.email} • {request.telephone}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {new Date(request.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                request.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                request.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {request.status === 'pending' ? 'En attente' :
                                 request.status === 'contacted' ? 'Contacté' :
                                 request.status === 'completed' ? 'Terminé' :
                                 'Annulé'}
                              </span>
                            </div>
                            
                            {/* Résumé rapide */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
                              <div>
                                <p><strong>Adresse :</strong> {request.adresse || 'Non renseigné'}</p>
                                <p><strong>Type :</strong> {request.type_bien || 'Non renseigné'}</p>
                              </div>
                              <div>
                                {request.surface_habitable && (
                                  <p><strong>Surface :</strong> {request.surface_habitable} m²</p>
                                )}
                                {request.nombre_pieces && (
                                  <p><strong>Pièces :</strong> {request.nombre_pieces}</p>
                                )}
                                {request.nombre_chambres && (
                                  <p><strong>Chambres :</strong> {request.nombre_chambres}</p>
                                )}
                              </div>
                              <div>
                                {request.objectif_principal && (
                                  <p><strong>Objectif :</strong> {formatObjectifPrincipal(request.objectif_principal)}</p>
                                )}
                                {request.bien_loue && (
                                  <p><strong>Bien loué :</strong> {formatBienLoue(request.bien_loue)}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setExpandedRequestId(expandedRequestId === request.id ? null : request.id)}
                              className="px-4 py-2 text-sm font-semibold text-[#1a2332] border border-[#1a2332] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
                            >
                              {expandedRequestId === request.id ? 'Masquer les détails' : 'Voir tous les détails'}
                            </button>
                            <button
                              onClick={() => {
                                const newStatus = request.status === 'pending' ? 'contacted' : 
                                                 request.status === 'contacted' ? 'completed' : 'pending';
                                updateGestionRequest(request.id, { status: newStatus })
                                  .then(() => fetchGestionRequests());
                              }}
                              className="px-4 py-2 text-sm font-semibold text-[#1a2332] border border-[#1a2332] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
                            >
                              {request.status === 'pending' ? 'Marquer comme contacté' :
                               request.status === 'contacted' ? 'Marquer comme terminé' :
                               'Réinitialiser'}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
                                  deleteGestionRequest(request.id)
                                    .then(() => fetchGestionRequests());
                                }
                              }}
                              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Détails complets (expandable) */}
                      {expandedRequestId === request.id && (
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                          <div className="space-y-6">
                            {/* 1. Informations personnelles */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                1. Informations personnelles
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Prénom :</strong> {request.prenom}</p>
                                <p><strong>Nom :</strong> {request.nom}</p>
                                <p><strong>Email :</strong> {request.email}</p>
                                <p><strong>Téléphone :</strong> {request.telephone}</p>
                              </div>
                            </div>

                            {/* 2. Projet de gestion (Étape 1) */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                2. Projet de gestion (Étape 1)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Pourquoi confier la gestion :</strong> {request.pourquoi_gestion ? formatPourquoiGestion(request.pourquoi_gestion) : 'Non renseigné'}</p>
                                <p><strong>Gestion actuelle :</strong> {request.gestion_actuelle ? formatGestionActuelle(request.gestion_actuelle) : 'Non renseigné'}</p>
                                <p><strong>Objectif principal :</strong> {request.objectif_principal ? formatObjectifPrincipal(request.objectif_principal) : 'Non renseigné'}</p>
                                <p><strong>Niveau d'implication :</strong> {request.niveau_implication ? formatNiveauImplication(request.niveau_implication) : 'Non renseigné'}</p>
                                <p><strong>Cadre clair et structuré :</strong> {request.cadre_clair ? formatCadreClair(request.cadre_clair) : 'Non renseigné'}</p>
                                <p className="md:col-span-2"><strong>Engagement :</strong> {request.engagement_etape1 ? 'Oui' : 'Non'}</p>
                              </div>
                            </div>

                            {/* 3. Informations générales sur le bien */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                3. Informations générales sur le bien
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Type de bien :</strong> {request.type_bien || 'Non renseigné'}</p>
                                <p><strong>Adresse :</strong> {request.adresse || 'Non renseigné'}</p>
                                <p><strong>Surface habitable :</strong> {request.surface_habitable ? `${request.surface_habitable} m²` : 'Non renseigné'}</p>
                                <p><strong>Nombre de pièces :</strong> {request.nombre_pieces || 'Non renseigné'}</p>
                                <p><strong>Nombre de chambres :</strong> {request.nombre_chambres || 'Non renseigné'}</p>
                                <p><strong>Étage :</strong> {request.etage ? formatEtage(request.etage) : 'Non renseigné'}</p>
                                {request.nombre_etages && (
                                  <p><strong>Nombre d'étages :</strong> {request.nombre_etages}</p>
                                )}
                                <p><strong>Ascenseur :</strong> {request.ascenseur ? formatAscenseur(request.ascenseur) : 'Non renseigné'}</p>
                              </div>
                            </div>

                            {/* 4. État et équipements */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                4. État et équipements
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>État général :</strong> {request.etat_general ? formatEtatGeneral(request.etat_general) : 'Non renseigné'}</p>
                                {request.equipements && request.equipements.length > 0 && (
                                  <div className="md:col-span-2">
                                    <p><strong>Équipements :</strong></p>
                                    <ul className="list-disc list-inside ml-4 mt-1">
                                      {request.equipements.map((equipement: string, idx: number) => (
                                        <li key={idx}>{equipement}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {request.autres_equipements && (
                                  <p className="md:col-span-2"><strong>Autres équipements :</strong> {request.autres_equipements}</p>
                                )}
                              </div>
                            </div>

                            {/* 5. Le bien est-il actuellement loué ? */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                5. Le bien est-il actuellement loué ?
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                <p><strong>Bien loué :</strong> {request.bien_loue ? formatBienLoue(request.bien_loue) : 'Non renseigné'}</p>
                                {request.bien_loue === 'oui' && (
                                  <>
                                    {request.loyer_actuel && (
                                      <p><strong>Loyer actuel :</strong> {formatValue(request.loyer_actuel, 'currency')}/mois</p>
                                    )}
                                    {request.type_bail && (
                                      <p><strong>Type de bail :</strong> {formatTypeBail(request.type_bail)}</p>
                                    )}
                                    {request.fin_bail && (
                                      <p><strong>Date de fin de bail :</strong> {formatValue(request.fin_bail, 'date')}</p>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>

                            {/* 6. Montant approximatif des charges */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                6. Montant approximatif des charges
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg">
                                {request.charges && (
                                  <p><strong>Charges :</strong> {formatValue(request.charges, 'currency')}/an</p>
                                )}
                                {request.taxe_fonciere && (
                                  <p><strong>Taxe foncière annuelle :</strong> {formatValue(request.taxe_fonciere, 'currency')}</p>
                                )}
                                {request.loyers_impayes && (
                                  <p><strong>Loyers impayés en cours :</strong> {formatLoyersImpayes(request.loyers_impayes)}</p>
                                )}
                              </div>
                            </div>

                            {/* 7. Attentes spécifiques */}
                            {request.attentes_specifiques && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-3" style={{ color: '#1a2332' }}>
                                  7. Attentes spécifiques
                                </h4>
                                <div className="bg-white p-4 rounded-lg text-sm text-gray-700">
                                  <p className="whitespace-pre-wrap">{request.attentes_specifiques}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Modal Formulaire d'ajout de bien */}
      {showAddPropertyForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-normal uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                {editingProperty ? 'Modifier un bien' : 'Ajouter un bien à vendre'}
              </h3>
              <button
                onClick={() => {
                  setShowAddPropertyForm(false);
                  setEditingProperty(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'annonce *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ borderColor: '#1a2332' }}
                  placeholder="Ex: Appartement moderne avec terrasse"
                />
              </div>

              {/* Type de bien */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de bien *
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ borderColor: '#1a2332' }}
                >
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="loft">Loft</option>
                </select>
              </div>

              {/* Prix */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {activeSection === 'location' ? 'Prix par mois (€)' : 'Prix (€)'} *
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.priceOnDemand}
                      onChange={(e) => {
                        setFormData(prev => ({ 
                          ...prev, 
                          priceOnDemand: e.target.checked,
                          price: e.target.checked ? '' : prev.price
                        }));
                      }}
                      className="w-4 h-4 rounded border-gray-300"
                      style={{ accentColor: '#1a2332' }}
                    />
                    <span className="text-sm text-gray-700">Sur demande</span>
                  </label>
                </div>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required={!formData.priceOnDemand}
                  disabled={formData.priceOnDemand}
                  min="0"
                  step="1"
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{ borderColor: '#1a2332' }}
                  placeholder={formData.priceOnDemand ? "Prix sur demande" : "Ex: 350000"}
                />
                {formData.price && !formData.priceOnDemand && (
                  <p className="text-sm text-gray-500 mt-1">
                    Prix formaté : {parseInt(formData.price || '0').toLocaleString('fr-FR')} €
                  </p>
                )}
                {formData.priceOnDemand && (
                  <p className="text-sm text-gray-500 mt-1">
                    Le prix ne sera pas affiché publiquement
                  </p>
                )}
              </div>

              {/* Surface et pièces */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surface (m²) *
                  </label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                    required
                    min="0"
                    step="1"
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: '#1a2332' }}
                    placeholder="Ex: 75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de pièces *
                  </label>
                  <input
                    type="number"
                    value={formData.rooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, rooms: e.target.value }))}
                    required
                    min="1"
                    step="1"
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: '#1a2332' }}
                    placeholder="Ex: 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de chambres *
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                    required
                    min="0"
                    step="1"
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: '#1a2332' }}
                    placeholder="Ex: 2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de salles de bain
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                    min="0"
                    step="1"
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: '#1a2332' }}
                    placeholder="Ex: 1"
                  />
                </div>
              </div>

              {/* Localisation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: '#1a2332' }}
                    placeholder="Ex: Marseille"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arrondissement *
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: '#1a2332' }}
                    placeholder="Ex: 8ème"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description complète du bien *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ borderColor: '#1a2332' }}
                  placeholder="Décrivez le bien en détail..."
                />
              </div>

              {/* Caractéristiques */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Caractéristiques du bien
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-4 border-2 rounded-lg" style={{ borderColor: '#1a2332' }}>
                  {allCharacteristics.map((char) => (
                    <label key={char} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.characteristics.includes(char)}
                        onChange={() => handleCharacteristicChange(char)}
                        className="w-4 h-4 rounded border-gray-300"
                        style={{ accentColor: '#1a2332' }}
                      />
                      <span className="text-sm text-gray-700">{char}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Charges et Taxe foncière */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.propertyType === 'appartement' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Charges (€/mois)
                    </label>
                    <input
                      type="number"
                      value={formData.charges}
                      onChange={(e) => setFormData(prev => ({ ...prev, charges: e.target.value }))}
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ borderColor: '#1a2332' }}
                      placeholder="Ex: 150"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taxe foncière (€/an)
                  </label>
                  <input
                    type="number"
                    value={formData.taxeFonciere}
                    onChange={(e) => setFormData(prev => ({ ...prev, taxeFonciere: e.target.value }))}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: '#1a2332' }}
                    placeholder="Ex: 1200"
                  />
                </div>
              </div>

              {/* DPE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DPE Energie
                  </label>
                  <select
                    value={formData.dpeEnergie}
                    onChange={(e) => setFormData(prev => ({ ...prev, dpeEnergie: e.target.value }))}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: '#1a2332' }}
                  >
                    <option value="">Sélectionner</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DPE Climat
                  </label>
                  <select
                    value={formData.dpeClimat}
                    onChange={(e) => setFormData(prev => ({ ...prev, dpeClimat: e.target.value }))}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ borderColor: '#1a2332' }}
                  >
                    <option value="">Sélectionner</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </select>
                </div>
              </div>

              {/* Statut du bien - uniquement pour les biens à vendre */}
              {activeSection === 'vente' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Statut du bien *
                </label>
                <div className="flex gap-4 border-2 rounded-lg p-2" style={{ borderColor: '#1a2332' }}>
                  <label className="flex items-center space-x-2 cursor-pointer flex-1">
                    <input
                      type="radio"
                      name="status"
                      value="à_vendre"
                      checked={formData.status === 'à_vendre'}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'à_vendre' | 'sous_compromis' | 'vendu' }))}
                      className="w-4 h-4"
                      style={{ accentColor: '#1a2332' }}
                    />
                    <span className="text-sm text-gray-700">À vendre</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer flex-1">
                    <input
                      type="radio"
                      name="status"
                      value="sous_compromis"
                      checked={formData.status === 'sous_compromis'}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'à_vendre' | 'sous_compromis' | 'vendu' }))}
                      className="w-4 h-4"
                      style={{ accentColor: '#1a2332' }}
                    />
                    <span className="text-sm text-gray-700">Sous compromis</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer flex-1">
                    <input
                      type="radio"
                      name="status"
                      value="vendu"
                      checked={formData.status === 'vendu'}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'à_vendre' | 'sous_compromis' | 'vendu' }))}
                      className="w-4 h-4"
                      style={{ accentColor: '#1a2332' }}
                    />
                    <span className="text-sm text-gray-700">Vendu</span>
                  </label>
                </div>
              </div>
              )}

              {/* Photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos du bien (maximum 15, la première sera la photo principale) {!editingProperty && '*'}
                </label>
                {editingProperty && (
                  <p className="text-sm text-gray-500 mb-2">
                    Les nouvelles photos remplaceront les photos existantes. Laissez vide pour garder les photos actuelles.
                  </p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ borderColor: '#1a2332' }}
                />
                {editingProperty && editingProperty.photos && editingProperty.photos.length > 0 && !formData.photos.length && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Photos actuelles ({editingProperty.photos.length}) :
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {editingProperty.photos.map((photoUrl: string, index: number) => (
                        <div key={index} className="relative">
                          <div className="aspect-square relative rounded-lg overflow-hidden border-2" style={{ borderColor: '#1a2332' }}>
                            <Image
                              src={photoUrl}
                              alt={`Photo ${index + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-[#1a2332] text-white text-xs px-2 py-1 rounded">
                              Principale
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {formData.photos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Nouvelles photo(s) sélectionnée(s) ({formData.photos.length}) {editingProperty && '(remplaceront les photos actuelles)'} :
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square relative rounded-lg overflow-hidden border-2" style={{ borderColor: '#1a2332' }}>
                            <Image
                              src={URL.createObjectURL(photo)}
                              alt={`Photo ${index + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-[#1a2332] text-white text-xs px-2 py-1 rounded">
                              Principale
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Boutons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddPropertyForm(false);
                    setEditingProperty(null);
                  }}
                  className="px-6 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors border-2 rounded-lg"
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="cta-button group bg-transparent border-2 px-6 py-2 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Enregistrer le bien</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
