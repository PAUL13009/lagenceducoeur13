# Configuration Firebase pour la publication d'annonces immobilières

## 📋 Vue d'ensemble

Le système de publication d'annonces est déjà configuré dans le code. Voici ce que vous devez faire côté Firebase pour le rendre fonctionnel.

## ✅ Ce qui est déjà en place dans le code

1. **Formulaire d'ajout d'annonce** : Dans le dashboard admin (`/admin/dashboard`)
2. **Upload de photos** : Les photos sont uploadées dans Firebase Storage
3. **Enregistrement dans Firestore** : Les annonces sont enregistrées dans la collection `properties`
4. **Affichage dans le catalogue** : La page `/catalogue` récupère et affiche les annonces
5. **Affichage sur la page d'accueil** : Les 6 dernières annonces non vendues sont affichées

## 🔧 Configuration Firebase requise

### Étape 1 : Configurer Firestore Database

1. Allez dans [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet : `lagenceducoeur-c683f`
3. Allez dans **Firestore Database** (dans le menu de gauche)
4. Si vous n'avez pas encore créé la base de données :
   - Cliquez sur **Créer une base de données**
   - Choisissez le mode **Production** (ou **Test** pour le développement)
   - Sélectionnez une région (ex: `europe-west1` pour la France)
   - Cliquez sur **Activer**

### Étape 2 : Configurer les règles de sécurité Firestore

1. Dans **Firestore Database**, allez dans l'onglet **Règles**
2. Remplacez les règles par défaut par ceci :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Collection properties : Lecture publique, écriture authentifiée
    match /properties/{propertyId} {
      // Tout le monde peut lire les propriétés (pour le catalogue public)
      allow read: if true;
      
      // Seuls les utilisateurs authentifiés peuvent créer/modifier/supprimer
      allow create, update, delete: if request.auth != null;
    }
    
    // Autres collections (demandes de formulaire)
    match /estimation_requests/{requestId} {
      allow create: if true; // Permettre la création pour tous (formulaires publics)
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
  }
}
```

3. Cliquez sur **Publier** pour sauvegarder les règles

### Étape 3 : Configurer Firebase Storage

1. Allez dans **Storage** (dans le menu de gauche)
2. Si vous n'avez pas encore créé de bucket :
   - Cliquez sur **Commencer**
   - Acceptez les règles de sécurité par défaut
   - Sélectionnez une région (ex: `europe-west1`)
   - Cliquez sur **Terminé**

### Étape 4 : Configurer les règles de sécurité Storage

1. Dans **Storage**, allez dans l'onglet **Règles**
2. Remplacez les règles par défaut par ceci :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Dossier properties : Lecture publique, écriture authentifiée
    match /properties/{allPaths=**} {
      // Tout le monde peut lire les photos (pour l'affichage public)
      allow read: if true;
      
      // Seuls les utilisateurs authentifiés peuvent uploader/supprimer
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

3. Cliquez sur **Publier** pour sauvegarder les règles

### Étape 5 : Créer un index Firestore (optionnel mais recommandé)

Pour optimiser les requêtes de récupération des propriétés :

1. Dans **Firestore Database**, allez dans l'onglet **Index**
2. Cliquez sur **Créer un index**
3. Collection ID : `properties`
4. Champs à indexer :
   - `created_at` : Ordre décroissant (Descending)
5. Cliquez sur **Créer**

**Note** : Si vous voyez une erreur lors de la récupération des biens qui mentionne un index manquant, Firebase vous proposera automatiquement de créer l'index. Cliquez sur le lien dans l'erreur pour le créer.

## 🧪 Tester la publication d'une annonce

### Test 1 : Publier une annonce

1. Connectez-vous au dashboard admin : `/admin`
2. Allez dans la section **"Vendre un bien"**
3. Cliquez sur **"Ajouter un bien"**
4. Remplissez le formulaire :
   - Titre de l'annonce
   - Type de bien (appartement, maison, etc.)
   - Prix
   - Surface
   - Nombre de pièces
   - Nombre de chambres
   - Ville
   - Arrondissement
   - Description
   - Caractéristiques (cochez celles qui s'appliquent)
   - Charges (si appartement)
   - Taxe foncière
   - DPE Énergie et Climat
   - **Photos** (au moins une photo est requise)
5. Cliquez sur **"Enregistrer"**

### Test 2 : Vérifier dans Firestore

1. Dans Firebase Console → **Firestore Database**
2. Vous devriez voir une nouvelle collection `properties`
3. Cliquez dessus pour voir votre annonce
4. Vérifiez que tous les champs sont bien enregistrés

### Test 3 : Vérifier dans Storage

1. Dans Firebase Console → **Storage**
2. Vous devriez voir un dossier `properties`
3. Cliquez dessus pour voir les photos uploadées

### Test 4 : Vérifier l'affichage public

1. Allez sur la page **Catalogue** : `/catalogue`
2. Votre annonce devrait apparaître dans la liste
3. Allez sur la **page d'accueil** : `/`
4. Votre annonce devrait apparaître dans la section "Nos biens à vendre" (si elle fait partie des 6 dernières non vendues)

## 📝 Structure des données dans Firestore

Chaque annonce est enregistrée avec la structure suivante :

```javascript
{
  title: "Titre de l'annonce",
  property_type: "appartement" | "maison" | "loft" | "studio" | "villa" | "autre",
  price: 350000, // nombre
  area: 75, // nombre (m²)
  rooms: 4, // nombre
  bedrooms: 2, // nombre
  city: "Marseille",
  district: "13001",
  description: "Description du bien...",
  characteristics: ["Balcon", "Parking", ...], // tableau de strings
  charges: 150, // nombre (si appartement)
  taxe_fonciere: 1200, // nombre
  dpe_energie: "C",
  dpe_climat: "B",
  main_photo: "https://...", // URL de la première photo
  photos: ["https://...", "https://..."], // tableau d'URLs
  type: "acheter", // toujours "acheter" pour les annonces à vendre
  sold: false, // true si le bien est vendu
  created_at: Timestamp,
  updated_at: Timestamp
}
```

## 🔍 Filtrage des annonces

Les annonces sont automatiquement filtrées :

- **Catalogue** : Affiche toutes les annonces avec `sold: false` et `type: 'acheter'`
- **Page d'accueil** : Affiche les 6 dernières annonces avec `sold: false` et `type: 'acheter'`

## ⚠️ Problèmes courants et solutions

### Problème 1 : "Permission denied" lors de l'enregistrement

**Cause** : Les règles Firestore ne permettent pas l'écriture.

**Solution** :
1. Vérifiez que vous êtes bien connecté en tant qu'admin
2. Vérifiez les règles Firestore (Étape 2)
3. Assurez-vous que la règle `allow create: if request.auth != null;` est présente pour `properties`

### Problème 2 : "Permission denied" lors de l'upload de photos

**Cause** : Les règles Storage ne permettent pas l'écriture.

**Solution** :
1. Vérifiez que vous êtes bien connecté en tant qu'admin
2. Vérifiez les règles Storage (Étape 4)
3. Assurez-vous que la règle `allow write: if request.auth != null;` est présente pour `properties`

### Problème 3 : Les annonces ne s'affichent pas dans le catalogue

**Cause** : Les règles Firestore ne permettent pas la lecture publique.

**Solution** :
1. Vérifiez les règles Firestore (Étape 2)
2. Assurez-vous que la règle `allow read: if true;` est présente pour `properties`

### Problème 4 : Erreur "Index required"

**Cause** : Firestore nécessite un index pour la requête.

**Solution** :
1. Cliquez sur le lien dans l'erreur pour créer l'index automatiquement
2. Ou créez l'index manuellement (Étape 5)

### Problème 5 : Les photos ne s'affichent pas

**Cause** : Les règles Storage ne permettent pas la lecture publique.

**Solution** :
1. Vérifiez les règles Storage (Étape 4)
2. Assurez-vous que la règle `allow read: if true;` est présente pour `properties`

## 🎯 Résumé des actions à faire

1. ✅ Créer Firestore Database (si pas déjà fait)
2. ✅ Configurer les règles Firestore (Étape 2)
3. ✅ Créer Firebase Storage (si pas déjà fait)
4. ✅ Configurer les règles Storage (Étape 4)
5. ✅ Créer l'index Firestore (optionnel mais recommandé)
6. ✅ Tester la publication d'une annonce

Une fois ces étapes terminées, vous pourrez publier des annonces depuis le dashboard admin et elles apparaîtront automatiquement dans le catalogue et sur la page d'accueil !
