'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';
import { createVenteRequest } from '@/lib/firestore';

export default function FormulaireVenteEtape2Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [etape1Data, setEtape1Data] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    // 1. Caractéristiques générales
    statutBien: '',
    anneeConstruction: '',
    surfaceHabitable: '',
    nombrePieces: '',
    nombreChambres: '',
    etage: '',
    ascenseur: '',
    
    // 2. Configuration et prestations
    typeBien: '',
    etatGeneral: '',
    anneeDerniereRenovation: '',
    montantDerniereRenovation: '',
    prestations: [] as string[],
    autresPrestations: '',
    
    // 3. Environnement et contexte
    expositionPrincipale: '',
    visAVis: '',
    nuisances: '',
    autresNuisances: '',
    
    // 4. Situation juridique et financière
    bienOccupe: '',
    loyerActuel: '',
    finBail: '',
    chargesAnnuelles: '',
    taxeFonciere: '',
    
    // 5. Projet de vente
    motifVente: '',
    delaiVente: '',
    ideePrix: '',
    prixEstime: '',
    
    // 6. Positionnement
    prixMarche: '',
    
    // 7. Message libre
    messageLibre: '',
    
    // 8. Validation
    confirmation: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const menuItems = [
    { label: 'Accueil', link: '/', ariaLabel: 'Aller à la page d\'accueil' },
    { label: 'Estimation', link: '/estimation', ariaLabel: 'Demander une estimation' },
    { label: 'Vente', link: '/services/vente', ariaLabel: 'Vendre mon bien' },
    { label: 'Location', link: '/services/location', ariaLabel: 'Mettre en location' },
    { label: 'Gestion Locative', link: '/services/gestion', ariaLabel: 'Gestion locative' },
    { label: 'Notre Approche', link: '/approche', ariaLabel: 'Découvrir notre approche' },
    { label: 'Nos Services', link: '/services', ariaLabel: 'Voir nos services' },
    { label: 'Notre Catalogue', link: '/catalogue', ariaLabel: 'Voir notre catalogue de biens' },
    { label: 'À Propos', link: '/a-propos', ariaLabel: 'En savoir plus sur l\'agence' },
    { label: 'Contact', link: '/contact', ariaLabel: 'Nous contacter' },
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'Instagram', link: 'https://instagram.com' },
  ];

  const statutsBien = [
    { value: 'residence-principale', label: 'Résidence principale' },
    { value: 'residence-secondaire', label: 'Résidence secondaire' },
    { value: 'bien-locatif', label: 'Bien locatif' },
    { value: 'autre', label: 'Autre' },
  ];

  const anneesConstruction = Array.from({ length: 100 }, (_, i) => 2024 - i);

  const nombrePiecesOptions = [
    { value: 'studio', label: 'Studio' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5+', label: '5 et +' },
  ];

  const etageOptions = [
    { value: 'rez-de-chaussee', label: 'Rez-de-chaussée' },
    { value: 'etage-intermediaire', label: 'Étage intermédiaire' },
    { value: 'dernier-etage', label: 'Dernier étage' },
  ];

  const ascenseurOptions = [
    { value: 'oui', label: 'Oui' },
    { value: 'non', label: 'Non' },
    { value: 'non-concerne', label: 'Non concerné' },
  ];

  const typesBien = [
    { value: 'appartement', label: 'Appartement' },
    { value: 'maison', label: 'Maison' },
    { value: 'loft', label: 'Loft' },
    { value: 'autre', label: 'Autre' },
  ];

  const etatsGeneraux = [
    { value: 'a-renover', label: 'À rénover' },
    { value: 'a-rafraichir', label: 'À rafraîchir' },
    { value: 'bon-etat', label: 'Bon état' },
    { value: 'tres-bon-etat', label: 'Très bon état / récent' },
  ];

  const prestationsOptions = [
    'Balcon / Terrasse',
    'Jardin',
    'Piscine',
    'Vue dégagée / vue mer',
    'Stationnement',
    'Cave / box',
    'Climatisation',
    'Cuisine équipée',
  ];

  const expositions = [
    { value: 'nord', label: 'Nord' },
    { value: 'sud', label: 'Sud' },
    { value: 'est', label: 'Est' },
    { value: 'ouest', label: 'Ouest' },
    { value: 'traversant', label: 'Traversant' },
  ];

  const visAVisOptions = [
    { value: 'important', label: 'Important' },
    { value: 'modere', label: 'Modéré' },
    { value: 'faible', label: 'Faible / inexistant' },
  ];

  const nuisancesOptions = [
    { value: 'aucune', label: 'Aucune' },
    { value: 'bruit', label: 'Bruit' },
    { value: 'circulation', label: 'Circulation' },
  ];

  const bienOccupeOptions = [
    { value: 'oui-proprietaire', label: 'Oui (par le propriétaire)' },
    { value: 'oui-loue', label: 'Oui (loué)' },
    { value: 'non', label: 'Non' },
  ];

  const motifsVente = [
    { value: 'projet-personnel', label: 'Projet personnel' },
    { value: 'changement-situation', label: 'Changement de situation' },
    { value: 'investissement', label: 'Investissement' },
    { value: 'autre', label: 'Autre' },
  ];

  const delaisVente = [
    { value: 'moins-3-mois', label: 'Moins de 3 mois' },
    { value: '3-6-mois', label: '3 à 6 mois' },
    { value: 'plus-6-mois', label: 'Plus de 6 mois' },
    { value: 'reflexion', label: 'Simple réflexion' },
  ];

  const prixMarcheOptions = [
    { value: 'oui', label: 'Oui' },
    { value: 'non', label: 'Non' },
    { value: 'discuter', label: 'Je souhaite en discuter' },
  ];

  // Récupérer les données de l'étape 1 au chargement
  useEffect(() => {
    const etape1 = localStorage.getItem('vente_etape1');
    if (etape1) {
      try {
        setEtape1Data(JSON.parse(etape1));
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'étape 1:', error);
        // Rediriger vers l'étape 1 si les données sont invalides
        router.push('/services/vente/formulaire');
      }
    } else {
      // Rediriger vers l'étape 1 si aucune donnée n'est trouvée
      router.push('/services/vente/formulaire');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'confirmation') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        // Pour les prestations
        setFormData(prev => ({
          ...prev,
          prestations: checked
            ? [...prev.prestations, value]
            : prev.prestations.filter(p => p !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Champs obligatoires
    if (!formData.statutBien) newErrors.statutBien = 'Le statut du bien est requis';
    if (!formData.surfaceHabitable) newErrors.surfaceHabitable = 'La surface habitable est requise';
    if (!formData.nombrePieces) newErrors.nombrePieces = 'Le nombre de pièces est requis';
    if (!formData.nombreChambres) newErrors.nombreChambres = 'Le nombre de chambres est requis';
    if (!formData.typeBien) newErrors.typeBien = 'Le type de bien est requis';
    if (!formData.etatGeneral) newErrors.etatGeneral = 'L\'état général est requis';
    if (!formData.expositionPrincipale) newErrors.expositionPrincipale = 'L\'exposition principale est requise';
    if (!formData.bienOccupe) newErrors.bienOccupe = 'Cette information est requise';
    if (!formData.motifVente) newErrors.motifVente = 'Le motif de vente est requis';
    if (!formData.delaiVente) newErrors.delaiVente = 'Le délai envisagé est requis';
    if (!formData.prixMarche) newErrors.prixMarche = 'Cette information est requise';
    if (!formData.confirmation) newErrors.confirmation = 'Vous devez confirmer votre projet de vente';

    // Si bien loué, loyer requis
    if (formData.bienOccupe === 'oui-loue') {
      if (!formData.loyerActuel) newErrors.loyerActuel = 'Le loyer actuel est requis';
    }

    // Si idée de prix = oui, prix estimé requis
    if (formData.ideePrix === 'oui' && !formData.prixEstime) {
      newErrors.prixEstime = 'Veuillez indiquer votre estimation de prix';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !etape1Data) {
      return;
    }

    setLoading(true);

    try {
      // Préparer les données complètes (étape 1 + étape 2)
      const completeData = {
        // Données de l'étape 1
        prenom: etape1Data.prenom,
        nom: etape1Data.nom,
        email: etape1Data.email,
        telephone: etape1Data.telephone,
        intention_vente: etape1Data.intentionVente,
        delai_vente_etape1: etape1Data.delaiVente,
        positionnement_prix: etape1Data.positionnementPrix,
        relation_professionnel: etape1Data.relationProfessionnel,
        experience_passee: etape1Data.experiencePassee,
        raison_echec: etape1Data.raisonEchec || null,
        engagement: etape1Data.engagement,
        
        // Données de l'étape 2
        statut_bien: formData.statutBien,
        annee_construction: formData.anneeConstruction ? parseInt(formData.anneeConstruction) : null,
        surface_habitable: formData.surfaceHabitable ? parseInt(formData.surfaceHabitable) : null,
        nombre_pieces: formData.nombrePieces,
        nombre_chambres: formData.nombreChambres ? parseInt(formData.nombreChambres) : null,
        etage: formData.etage,
        ascenseur: formData.ascenseur,
        
        type_bien_detail: formData.typeBien,
        etat_general: formData.etatGeneral,
        annee_derniere_renovation: formData.anneeDerniereRenovation ? parseInt(formData.anneeDerniereRenovation) : null,
        montant_derniere_renovation: formData.montantDerniereRenovation ? parseInt(formData.montantDerniereRenovation) : null,
        prestations: formData.prestations,
        autres_prestations: formData.autresPrestations || null,
        
        exposition_principale: formData.expositionPrincipale,
        vis_a_vis: formData.visAVis || null,
        nuisances: formData.nuisances || null,
        autres_nuisances: formData.autresNuisances || null,
        
        bien_occupe: formData.bienOccupe,
        loyer_actuel: formData.loyerActuel ? parseInt(formData.loyerActuel) : null,
        fin_bail: formData.finBail || null,
        charges_annuelles: formData.chargesAnnuelles ? parseInt(formData.chargesAnnuelles) : null,
        taxe_fonciere: formData.taxeFonciere ? parseInt(formData.taxeFonciere) : null,
        
        motif_vente: formData.motifVente,
        delai_vente: formData.delaiVente,
        idee_prix: formData.ideePrix || null,
        prix_estime: formData.prixEstime ? parseInt(formData.prixEstime) : null,
        
        prix_marche: formData.prixMarche,
        
        message_libre: formData.messageLibre || null,
        
        confirmation: formData.confirmation,
        status: 'pending',
      };

      // Envoyer les données à Firebase
      console.log('Données à envoyer:', completeData);
      
      const requestId = await createVenteRequest(completeData);
      console.log('Demande de vente créée avec succès, ID:', requestId);

      // Nettoyer le localStorage
      localStorage.removeItem('vente_etape1');
      
      // Rediriger vers la page de confirmation
      router.push('/services/vente/confirmation');
    } catch (error: any) {
      console.error('Erreur inattendue:', error);
      alert('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <StaggeredMenu
        position="right"
        colors={['#1e1e22', '#dc2626']}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        logoUrl="/logo.png"
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        accentColor="#dc2626"
        changeMenuColorOnOpen={true}
        isFixed={true}
        closeOnClickAway={true}
      />
      
      <main className="flex-grow pt-20">
        {/* Section Hero */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-normal mb-4 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Demande de vente
              </h1>
              <p className="text-lg text-gray-600">
                Deuxième étape : Caractéristiques détaillées de votre bien
              </p>
            </div>
          </div>
        </section>

        {/* Formulaire */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* 1. Caractéristiques générales */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    1. Caractéristiques générales du bien
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Statut du bien */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Statut du bien <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {statutsBien.map((statut) => (
                          <label key={statut.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.statutBien === statut.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="statutBien"
                              value={statut.value}
                              checked={formData.statutBien === statut.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{statut.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.statutBien && <p className="mt-1 text-sm text-red-500">{errors.statutBien}</p>}
                    </div>

                    {/* Année de construction */}
                    <div>
                      <label htmlFor="anneeConstruction" className="block text-sm font-medium text-gray-700 mb-2">
                        Année de construction
                      </label>
                      <select
                        id="anneeConstruction"
                        name="anneeConstruction"
                        value={formData.anneeConstruction}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                        style={{ borderColor: '#1a2332' }}
                      >
                        <option value="">Sélectionner une année</option>
                        {anneesConstruction.map((annee) => (
                          <option key={annee} value={annee}>{annee}</option>
                        ))}
                      </select>
                    </div>

                    {/* Surface habitable */}
                    <div>
                      <label htmlFor="surfaceHabitable" className="block text-sm font-medium text-gray-700 mb-2">
                        Surface habitable (m²) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="surfaceHabitable"
                        name="surfaceHabitable"
                        value={formData.surfaceHabitable}
                        onChange={handleChange}
                        required
                        min="1"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                          errors.surfaceHabitable ? 'border-red-500' : ''
                        }`}
                        style={{ borderColor: errors.surfaceHabitable ? '#dc2626' : '#1a2332' }}
                        placeholder="Ex: 75"
                      />
                      {errors.surfaceHabitable && <p className="mt-1 text-sm text-red-500">{errors.surfaceHabitable}</p>}
                    </div>

                    {/* Nombre de pièces */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de pièces principales <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        {nombrePiecesOptions.map((option) => (
                          <label key={option.value} className="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.nombrePieces === option.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="nombrePieces"
                              value={option.value}
                              checked={formData.nombrePieces === option.value}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.nombrePieces && <p className="mt-1 text-sm text-red-500">{errors.nombrePieces}</p>}
                    </div>

                    {/* Nombre de chambres */}
                    <div>
                      <label htmlFor="nombreChambres" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de chambres <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="nombreChambres"
                        name="nombreChambres"
                        value={formData.nombreChambres}
                        onChange={handleChange}
                        required
                        min="0"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                          errors.nombreChambres ? 'border-red-500' : ''
                        }`}
                        style={{ borderColor: errors.nombreChambres ? '#dc2626' : '#1a2332' }}
                        placeholder="Ex: 2"
                      />
                      {errors.nombreChambres && <p className="mt-1 text-sm text-red-500">{errors.nombreChambres}</p>}
                    </div>

                    {/* Étage */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Étage
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {etageOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.etage === option.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="etage"
                              value={option.value}
                              checked={formData.etage === option.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Ascenseur */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Présence d'un ascenseur
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {ascenseurOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.ascenseur === option.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="ascenseur"
                              value={option.value}
                              checked={formData.ascenseur === option.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Configuration et prestations */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    2. Configuration et prestations
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Type de bien */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de bien <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {typesBien.map((type) => (
                          <label key={type.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.typeBien === type.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="typeBien"
                              value={type.value}
                              checked={formData.typeBien === type.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{type.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.typeBien && <p className="mt-1 text-sm text-red-500">{errors.typeBien}</p>}
                    </div>

                    {/* État général */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        État général du bien <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {etatsGeneraux.map((etat) => (
                          <label key={etat.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.etatGeneral === etat.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="etatGeneral"
                              value={etat.value}
                              checked={formData.etatGeneral === etat.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{etat.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.etatGeneral && <p className="mt-1 text-sm text-red-500">{errors.etatGeneral}</p>}
                    </div>

                    {/* Année dernière rénovation */}
                    <div>
                      <label htmlFor="anneeDerniereRenovation" className="block text-sm font-medium text-gray-700 mb-2">
                        Année de la dernière rénovation (si applicable)
                      </label>
                      <select
                        id="anneeDerniereRenovation"
                        name="anneeDerniereRenovation"
                        value={formData.anneeDerniereRenovation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                        style={{ borderColor: '#1a2332' }}
                      >
                        <option value="">Sélectionner une année</option>
                        {anneesConstruction.map((annee) => (
                          <option key={annee} value={annee}>{annee}</option>
                        ))}
                      </select>
                    </div>

                    {/* Montant dernière rénovation */}
                    <div>
                      <label htmlFor="montantDerniereRenovation" className="block text-sm font-medium text-gray-700 mb-2">
                        Montant de la dernière rénovation (€)
                      </label>
                      <input
                        type="number"
                        id="montantDerniereRenovation"
                        name="montantDerniereRenovation"
                        value={formData.montantDerniereRenovation}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                        style={{ borderColor: '#1a2332' }}
                        placeholder="Ex: 15000"
                      />
                    </div>

                    {/* Prestations principales */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prestations principales
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {prestationsOptions.map((prestation) => (
                          <label key={prestation} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.prestations.includes(prestation) ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="checkbox"
                              name="prestations"
                              value={prestation}
                              checked={formData.prestations.includes(prestation)}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{prestation}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Autres prestations */}
                    <div>
                      <label htmlFor="autresPrestations" className="block text-sm font-medium text-gray-700 mb-2">
                        Autres (champ libre)
                      </label>
                      <input
                        type="text"
                        id="autresPrestations"
                        name="autresPrestations"
                        value={formData.autresPrestations}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                        style={{ borderColor: '#1a2332' }}
                        placeholder="Autres prestations..."
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Environnement et contexte */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    3. Environnement et contexte
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Exposition principale */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exposition principale <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        {expositions.map((expo) => (
                          <label key={expo.value} className="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.expositionPrincipale === expo.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="expositionPrincipale"
                              value={expo.value}
                              checked={formData.expositionPrincipale === expo.value}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <span>{expo.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.expositionPrincipale && <p className="mt-1 text-sm text-red-500">{errors.expositionPrincipale}</p>}
                    </div>

                    {/* Vis-à-vis */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vis-à-vis
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {visAVisOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.visAVis === option.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="visAVis"
                              value={option.value}
                              checked={formData.visAVis === option.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Nuisances */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nuisances connues
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {nuisancesOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.nuisances === option.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="nuisances"
                              value={option.value}
                              checked={formData.nuisances === option.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Autres nuisances */}
                    {formData.nuisances === 'circulation' && (
                      <div>
                        <label htmlFor="autresNuisances" className="block text-sm font-medium text-gray-700 mb-2">
                          Autres points négatifs (champ libre)
                        </label>
                        <textarea
                          id="autresNuisances"
                          name="autresNuisances"
                          value={formData.autresNuisances}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all resize-none"
                          style={{ borderColor: '#1a2332' }}
                          placeholder="Décrivez d'autres nuisances..."
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Situation juridique et financière */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    4. Situation juridique et financière
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Bien occupé */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bien occupé actuellement ? <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {bienOccupeOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.bienOccupe === option.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="bienOccupe"
                              value={option.value}
                              checked={formData.bienOccupe === option.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.bienOccupe && <p className="mt-1 text-sm text-red-500">{errors.bienOccupe}</p>}
                    </div>

                    {/* Si loué */}
                    {formData.bienOccupe === 'oui-loue' && (
                      <>
                        <div>
                          <label htmlFor="loyerActuel" className="block text-sm font-medium text-gray-700 mb-2">
                            Loyer actuel (€/mois) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            id="loyerActuel"
                            name="loyerActuel"
                            value={formData.loyerActuel}
                            onChange={handleChange}
                            min="0"
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                              errors.loyerActuel ? 'border-red-500' : ''
                            }`}
                            style={{ borderColor: errors.loyerActuel ? '#dc2626' : '#1a2332' }}
                            placeholder="Ex: 800"
                          />
                          {errors.loyerActuel && <p className="mt-1 text-sm text-red-500">{errors.loyerActuel}</p>}
                        </div>

                        <div>
                          <label htmlFor="finBail" className="block text-sm font-medium text-gray-700 mb-2">
                            Fin de bail (si connue)
                          </label>
                          <input
                            type="date"
                            id="finBail"
                            name="finBail"
                            value={formData.finBail}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                            style={{ borderColor: '#1a2332' }}
                          />
                        </div>
                      </>
                    )}

                    {/* Charges annuelles */}
                    <div>
                      <label htmlFor="chargesAnnuelles" className="block text-sm font-medium text-gray-700 mb-2">
                        Charges annuelles approximatives (€)
                      </label>
                      <input
                        type="number"
                        id="chargesAnnuelles"
                        name="chargesAnnuelles"
                        value={formData.chargesAnnuelles}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                        style={{ borderColor: '#1a2332' }}
                        placeholder="Ex: 1800"
                      />
                    </div>

                    {/* Taxe foncière */}
                    <div>
                      <label htmlFor="taxeFonciere" className="block text-sm font-medium text-gray-700 mb-2">
                        Taxe foncière annuelle (€)
                      </label>
                      <input
                        type="number"
                        id="taxeFonciere"
                        name="taxeFonciere"
                        value={formData.taxeFonciere}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                        style={{ borderColor: '#1a2332' }}
                        placeholder="Ex: 1200"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Projet de vente */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    5. Votre projet de vente
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Motif de vente */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Motif de la vente <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {motifsVente.map((motif) => (
                          <label key={motif.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.motifVente === motif.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="motifVente"
                              value={motif.value}
                              checked={formData.motifVente === motif.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{motif.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.motifVente && <p className="mt-1 text-sm text-red-500">{errors.motifVente}</p>}
                    </div>

                    {/* Délai envisagé */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Délai envisagé pour la vente <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {delaisVente.map((delai) => (
                          <label key={delai.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.delaiVente === delai.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="delaiVente"
                              value={delai.value}
                              checked={formData.delaiVente === delai.value}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span>{delai.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.delaiVente && <p className="mt-1 text-sm text-red-500">{errors.delaiVente}</p>}
                    </div>

                    {/* Idée de prix */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Avez-vous déjà une idée de prix ?
                      </label>
                      <div className="flex gap-4 mb-4">
                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.ideePrix === 'oui' ? '#1a2332' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="ideePrix"
                            value="oui"
                            checked={formData.ideePrix === 'oui'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.ideePrix === 'non' ? '#1a2332' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="ideePrix"
                            value="non"
                            checked={formData.ideePrix === 'non'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <span>Non</span>
                        </label>
                      </div>

                      {formData.ideePrix === 'oui' && (
                        <div>
                          <label htmlFor="prixEstime" className="block text-sm font-medium text-gray-700 mb-2">
                            À quel prix estimez-vous votre bien ? (€) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            id="prixEstime"
                            name="prixEstime"
                            value={formData.prixEstime}
                            onChange={handleChange}
                            min="0"
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                              errors.prixEstime ? 'border-red-500' : ''
                            }`}
                            style={{ borderColor: errors.prixEstime ? '#dc2626' : '#1a2332' }}
                            placeholder="Ex: 350000"
                          />
                          {errors.prixEstime && <p className="mt-1 text-sm text-red-500">{errors.prixEstime}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 6. Positionnement */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    6. Votre positionnement
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seriez-vous prêt à vendre votre bien au prix du marché, si celui-ci est argumenté et cohérent ? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {prixMarcheOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.prixMarche === option.value ? '#1a2332' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="prixMarche"
                            value={option.value}
                            checked={formData.prixMarche === option.value}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.prixMarche && <p className="mt-1 text-sm text-red-500">{errors.prixMarche}</p>}
                  </div>
                </div>

                {/* 7. Message libre */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    7. Message libre
                  </h2>
                  
                  <div>
                    <label htmlFor="messageLibre" className="block text-sm font-medium text-gray-700 mb-2">
                      Souhaitez-vous nous préciser des éléments importants concernant votre bien ou votre projet ?
                    </label>
                    <textarea
                      id="messageLibre"
                      name="messageLibre"
                      value={formData.messageLibre}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all resize-none"
                      style={{ borderColor: '#1a2332' }}
                      placeholder="Votre message..."
                    />
                  </div>
                </div>

                {/* 8. Message de pré-validation */}
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      Les ventes accompagnées par L'Agence du Cœur sont fondées sur une analyse précise du bien et du marché marseillais.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Nous revenons uniquement vers les projets de vente sérieux et cohérents.
                    </p>
                  </div>
                  
                  <div>
                    <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-white transition-colors" style={{ borderColor: formData.confirmation ? '#1a2332' : '#e5e7eb' }}>
                      <input
                        type="checkbox"
                        name="confirmation"
                        checked={formData.confirmation}
                        onChange={handleChange}
                        className="mt-1 mr-3"
                      />
                      <span className="text-gray-700">
                        Je confirme que mon projet de vente est réel et que je souhaite un accompagnement professionnel, basé sur la réalité du marché. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.confirmation && <p className="mt-2 text-sm text-red-500">{errors.confirmation}</p>}
                  </div>
                </div>

                {/* 9. Bouton de validation */}
                <div className="text-center space-y-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>{loading ? 'Envoi en cours...' : 'Demander un accompagnement professionnel'}</span>
                    {!loading && (
                      <svg 
                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                  <p className="text-sm text-gray-500">
                    Réponse uniquement pour les projets correspondant à notre méthode d'accompagnement
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
