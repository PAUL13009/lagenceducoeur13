# Guide de configuration Firebase

## 📋 Informations nécessaires

Pour connecter votre projet à Firebase, vous aurez besoin des informations suivantes :

### 1. Configuration Firebase (Client)

Ces informations se trouvent dans la console Firebase :
- **API Key** : Clé API de votre projet Firebase
- **Auth Domain** : Domaine d'authentification (ex: `votre-projet.firebaseapp.com`)
- **Project ID** : ID de votre projet Firebase
- **Storage Bucket** : Nom du bucket de stockage (ex: `votre-projet.appspot.com`)
- **Messaging Sender ID** : ID de l'expéditeur de messages
- **App ID** : ID de l'application

### 2. Où trouver ces informations ?

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet (ou créez-en un nouveau)
3. Cliquez sur l'icône ⚙️ (Paramètres du projet)
4. Allez dans "Paramètres généraux"
5. Faites défiler jusqu'à "Vos applications"
6. Si vous n'avez pas encore d'application web, cliquez sur "Ajouter une application" et sélectionnez l'icône Web (</>)
7. Vous verrez la configuration Firebase qui ressemble à ceci :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## 🔧 Configuration du projet

### Étape 1 : Créer le fichier .env.local

À la racine de votre projet, créez un fichier `.env.local` avec le contenu suivant :

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre-projet
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
```

**⚠️ Important** : Remplacez les valeurs par vos propres informations Firebase.

### Étape 2 : Installer les dépendances

Exécutez la commande suivante pour installer Firebase :

```bash
npm install firebase
```

### Étape 3 : Configurer Firestore

1. Dans la console Firebase, allez dans **Firestore Database**
2. Cliquez sur **Créer une base de données**
3. Choisissez le mode de production (ou test pour le développement)
4. Sélectionnez une région (ex: `europe-west1` pour la France)
5. Cliquez sur **Activer**

### Étape 4 : Configurer les règles de sécurité Firestore

Dans **Firestore Database** > **Règles**, configurez les règles suivantes :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre la lecture/écriture pour les utilisateurs authentifiés
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Permettre l'écriture anonyme pour les formulaires publics
    match /estimation_requests/{requestId} {
      allow create: if true; // Permettre la création pour tous
      allow read, update, delete: if request.auth != null; // Seulement pour les admins
    }
    
    match /contact_requests/{requestId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    match /vente_requests/{requestId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    match /location_requests/{requestId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    match /gestion_requests/{requestId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Les propriétés sont publiques en lecture
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**⚠️ Note** : Ces règles permettent à n'importe qui de créer des demandes (formulaires publics), mais seuls les utilisateurs authentifiés peuvent les lire/modifier/supprimer.

### Étape 5 : Configurer Firebase Authentication

1. Dans la console Firebase, allez dans **Authentication**
2. Cliquez sur **Commencer**
3. Activez la méthode de connexion **Email/Password**
4. (Optionnel) Configurez d'autres méthodes d'authentification si nécessaire

### Étape 6 : Configurer Firebase Storage

1. Dans la console Firebase, allez dans **Storage**
2. Cliquez sur **Commencer**
3. Acceptez les règles de sécurité par défaut
4. Sélectionnez une région (ex: `europe-west1`)

### Étape 7 : Configurer les règles de sécurité Storage

Dans **Storage** > **Règles**, configurez les règles suivantes :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Permettre la lecture publique des images
    match /properties/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Autres fichiers nécessitent une authentification
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 🧪 Tester la connexion

### Test 1 : Vérifier que Firebase est bien configuré

1. Démarrez votre serveur de développement : `npm run dev`
2. Ouvrez la console du navigateur (F12)
3. Vous ne devriez voir aucune erreur liée à Firebase

### Test 2 : Tester l'envoi d'une demande d'estimation

1. Allez sur `/estimation/formulaire`
2. Remplissez le formulaire
3. Soumettez-le
4. Vérifiez dans la console Firebase > Firestore Database que la demande apparaît

### Test 3 : Tester l'authentification admin

1. Créez un utilisateur dans Firebase Authentication
2. Allez sur `/admin`
3. Connectez-vous avec cet utilisateur
4. Vous devriez pouvoir accéder au dashboard

## 📝 Structure des collections Firestore

Les collections suivantes seront créées automatiquement lors de la première utilisation :

- **estimation_requests** : Demandes d'estimation
- **contact_requests** : Demandes de contact
- **vente_requests** : Demandes de vente
- **location_requests** : Demandes de location
- **gestion_requests** : Demandes de gestion locative
- **properties** : Biens immobiliers

## 🔐 Sécurité

### Pour la production

1. **Règles Firestore** : Ajustez les règles pour limiter l'accès selon vos besoins
2. **Règles Storage** : Configurez des règles strictes pour protéger les fichiers
3. **Authentification** : Utilisez Firebase Authentication pour protéger les routes admin
4. **Variables d'environnement** : Ne commitez jamais le fichier `.env.local` dans Git

### Bonnes pratiques

- ✅ Utilisez des règles de sécurité strictes
- ✅ Validez les données côté client ET serveur
- ✅ Limitez les permissions au strict nécessaire
- ✅ Surveillez l'utilisation dans la console Firebase
- ✅ Configurez des quotas et des alertes

## 🆘 Problèmes courants

### Problème 1 : "Firebase: Error (auth/configuration-not-found)"

**Cause** : Les variables d'environnement ne sont pas correctement configurées.

**Solution** : 
1. Vérifiez que le fichier `.env.local` existe à la racine du projet
2. Vérifiez que toutes les variables commencent par `NEXT_PUBLIC_`
3. Redémarrez le serveur de développement après avoir modifié `.env.local`

### Problème 2 : "Firebase: Error (permission-denied)"

**Cause** : Les règles de sécurité Firestore ne permettent pas l'opération.

**Solution** :
1. Vérifiez les règles Firestore dans la console Firebase
2. Assurez-vous que les règles correspondent à vos besoins
3. Pour le développement, vous pouvez temporairement assouplir les règles (mais pas en production !)

### Problème 3 : Les données ne s'affichent pas

**Cause** : Les règles Firestore bloquent la lecture.

**Solution** :
1. Vérifiez que vous êtes authentifié si nécessaire
2. Vérifiez les règles Firestore
3. Vérifiez la console du navigateur pour les erreurs

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans la console du navigateur (F12)
2. Vérifiez les logs dans la console Firebase
3. Consultez la [documentation Firebase](https://firebase.google.com/docs)
4. Vérifiez que toutes les étapes de configuration ont été suivies
