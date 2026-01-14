# Agence du Cœur - Site Immobilier

Site immobilier moderne développé avec Next.js 14, React 18, TypeScript et Tailwind CSS.

## Technologies

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

## Installation

1. Installez les dépendances :
```bash
npm install
```

2. Lancez le serveur de développement :
```bash
npm run dev
```

3. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
agenceducoeur/
├── app/                 # App Router de Next.js
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Page d'accueil
│   └── globals.css     # Styles globaux
├── components/         # Composants React
│   ├── Header.tsx      # En-tête du site
│   ├── Footer.tsx      # Pied de page
│   ├── SearchBar.tsx   # Barre de recherche
│   └── PropertyCard.tsx # Carte de bien immobilier
└── public/             # Fichiers statiques
```

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm start` - Lance le serveur de production
- `npm run lint` - Vérifie les erreurs de linting