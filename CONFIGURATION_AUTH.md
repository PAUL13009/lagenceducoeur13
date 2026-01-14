# Configuration de l'authentification admin Firebase

## ✅ Vérification rapide

L'authentification admin est maintenant configurée pour fonctionner avec Firebase Authentication.

### 1. Vérifier que Firebase Authentication est activé

1. Allez dans [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet : `lagenceducoeur-c683f`
3. Allez dans **Authentication** (dans le menu de gauche)
4. Vérifiez que l'onglet **Sign-in method** est actif
5. Assurez-vous que **Email/Password** est activé :
   - Cliquez sur **Email/Password**
   - Si ce n'est pas déjà fait, activez-le et cliquez sur **Enregistrer**

### 2. Vérifier que vous avez créé un utilisateur

1. Dans Firebase Console → **Authentication** → **Users**
2. Vous devriez voir votre utilisateur dans la liste
3. Vérifiez que l'email est correct et que l'utilisateur est actif

### 3. Tester la connexion

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur la page de connexion admin :
   ```
   http://localhost:3000/admin
   ```

3. Connectez-vous avec vos identifiants Firebase :
   - **Email** : l'email de votre utilisateur Firebase
   - **Mot de passe** : le mot de passe de votre utilisateur Firebase

4. Après la connexion, vous devriez être redirigé vers `/admin/dashboard`

## 🔐 Messages d'erreur possibles

### "Aucun utilisateur trouvé avec cet email"
- Vérifiez que l'email est correct (sans espaces avant/après)
- Vérifiez que l'utilisateur existe bien dans Firebase Authentication

### "Mot de passe incorrect"
- Vérifiez que le mot de passe est correct
- Si vous avez oublié le mot de passe, vous pouvez le réinitialiser dans Firebase Console

### "Adresse email invalide"
- Vérifiez le format de l'email (ex: `admin@example.com`)

### "Erreur réseau. Vérifiez votre connexion internet"
- Vérifiez votre connexion internet
- Vérifiez que Firebase est accessible

### "Les variables d'environnement Firebase ne sont pas définies"
- Vérifiez que le fichier `.env.local` existe à la racine du projet
- Vérifiez que toutes les variables commencent par `NEXT_PUBLIC_`
- Redémarrez le serveur de développement après avoir modifié `.env.local`

## 🛠️ Créer un nouvel utilisateur admin

Si vous avez besoin de créer un nouvel utilisateur :

1. Dans Firebase Console → **Authentication** → **Users**
2. Cliquez sur **Ajouter un utilisateur**
3. Entrez l'email et le mot de passe
4. Cliquez sur **Ajouter un utilisateur**
5. L'utilisateur pourra maintenant se connecter via `/admin`

## 📝 Note importante

⚠️ **Sécurité** : Tous les utilisateurs créés dans Firebase Authentication peuvent accéder au dashboard admin. Si vous souhaitez restreindre l'accès à certains utilisateurs uniquement, vous devrez ajouter une vérification supplémentaire dans le code (par exemple, une liste d'emails autorisés ou des rôles personnalisés).

## 🔍 Dépannage

Si la connexion ne fonctionne pas :

1. **Vérifiez la console du navigateur** (F12) pour voir les erreurs
2. **Vérifiez les logs Firebase** dans la console Firebase
3. **Vérifiez que Email/Password est activé** dans Firebase Authentication
4. **Redémarrez le serveur de développement** après avoir modifié `.env.local`
5. **Vérifiez que le fichier `.env.local` contient bien toutes les variables** nécessaires
