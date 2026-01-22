import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Configuration Firebase depuis les variables d'environnement
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Fonction pour initialiser Firebase (côté client et serveur)
function getFirebaseApp(): FirebaseApp | null {
  // Vérifier que toutes les variables d'environnement requises sont présentes
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    if (typeof window !== 'undefined') {
      // Côté client, on peut logger une erreur
      console.error('Les variables d\'environnement Firebase ne sont pas définies. Vérifiez votre fichier .env.local');
    }
    return null;
  }

  try {
    if (getApps().length === 0) {
      return initializeApp(firebaseConfig);
    } else {
      return getApps()[0];
    }
  } catch (error) {
    console.error('Error initializing Firebase app:', error);
    return null;
  }
}

// Initialiser Firebase (côté client et serveur pour le sitemap)
let app: FirebaseApp | null = null;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;
let storageInstance: FirebaseStorage | undefined;

try {
  app = getFirebaseApp();
  if (app) {
    dbInstance = getFirestore(app);
    
    // Auth et Storage uniquement côté client
    if (typeof window !== 'undefined') {
      authInstance = getAuth(app);
      storageInstance = getStorage(app);
    }
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// Exports avec vérification pour éviter les erreurs si Firebase n'est pas initialisé
export const auth = authInstance as Auth;
export const db = dbInstance as Firestore;
export const storage = storageInstance as FirebaseStorage;

export default app;
