# Configuration des variables d'environnement

## Créer le fichier .env.local

Créez un fichier nommé `.env.local` à la racine du projet avec le contenu suivant :

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD0vefxXHRJA1nch4PIbtSgzz-wvC9jG-c
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=lagenceducoeur-c683f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=lagenceducoeur-c683f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=lagenceducoeur-c683f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=407975552020
NEXT_PUBLIC_FIREBASE_APP_ID=1:407975552020:web:c74f2d5abb9afc13087301
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-51CGY76FJ6
```

## Instructions

1. À la racine du projet, créez le fichier `.env.local`
2. Copiez-collez le contenu ci-dessus
3. Redémarrez le serveur de développement (`npm run dev`) pour que les variables soient prises en compte

## Note importante

⚠️ Ne commitez jamais le fichier `.env.local` dans Git ! Il contient des informations sensibles.
