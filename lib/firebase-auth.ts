import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Connecter un utilisateur avec email et mot de passe
 */
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    // Gérer les erreurs Firebase de manière plus explicite
    let errorMessage = 'Une erreur est survenue lors de la connexion';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Aucun utilisateur trouvé avec cet email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mot de passe incorrect';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Adresse email invalide';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Ce compte utilisateur a été désactivé';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Trop de tentatives de connexion. Veuillez réessayer plus tard';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Erreur réseau. Vérifiez votre connexion internet';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { user: null, error: { ...error, message: errorMessage } };
  }
}

/**
 * Déconnecter l'utilisateur actuel
 */
export async function signOutUser() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error };
  }
}

/**
 * Obtenir l'utilisateur actuel
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Écouter les changements d'état d'authentification
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Obtenir la session actuelle
 */
export async function getSession() {
  return new Promise<{ user: User | null }>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve({ user });
    });
  });
}
