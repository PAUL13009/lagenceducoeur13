'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';
import { createLocationRequest } from '@/lib/firestore';

export default function FormulaireLocationEtape2Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [etape1Data, setEtape1Data] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    // 1. Informations générales sur le bien
    typeBien: '',
    adresse: '',
    surfaceHabitable: '',
    nombrePieces: '',
    nombreChambres: '',
    etage: '',
    nombreEtages: '',
    ascenseur: '',
    
    // 2. État et équipements
    etatGeneral: '',
    equipements: [] as string[],
    autresEquipements: '',
    
    // 3. Situation actuelle
    bienOccupe: '',
    loyerActuel: '',
    finBail: '',
    
    // 4. Contexte actuel du bien
    loyerEnvisage: '',
    typeLocation: '',
    profilLocataire: '',
    
    // 5. Message libre
    messageLibre: '',
    
    // 6. Validation
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

  const typesBien = [
    { value: 'appartement', label: 'Appartement' },
    { value: 'maison', label: 'Maison' },
    { value: 'autre', label: 'Autre' },
  ];

  // Générer les options d'étage (0 = RDC, 1-20 pour les étages)
  const etageOptions = Array.from({ length: 21 }, (_, i) => {
    if (i === 0) {
      return { value: '0', label: 'RDC (0)' };
    }
    return { value: i.toString(), label: `Étage ${i}` };
  });
  
  // Générer les options pour le nombre d'étages (1-20)
  const nombreEtagesOptions = Array.from({ length: 20 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} ${i === 0 ? 'étage' : 'étages'}`,
  }));

  const ascenseurOptions = [
    { value: 'oui', label: 'Oui' },
    { value: 'non', label: 'Non' },
    { value: 'non-concerne', label: 'Non concerné' },
  ];

  const etatsGeneraux = [
    { value: 'a-renover', label: 'À rénover' },
    { value: 'a-rafraichir', label: 'À rafraîchir' },
    { value: 'bon-etat', label: 'Bon état' },
    { value: 'tres-bon-etat', label: 'Très bon état' },
  ];

  const equipementsOptions = [
    { value: 'balcon-terrasse', label: 'Balcon / terrasse' },
    { value: 'jardin', label: 'Jardin' },
    { value: 'stationnement', label: 'Stationnement' },
    { value: 'cave-box', label: 'Cave / box' },
    { value: 'climatisation', label: 'Climatisation' },
    { value: 'cuisine-equipee', label: 'Cuisine équipée' },
  ];

  const bienOccupeOptions = [
    { value: 'oui-proprietaire', label: 'Oui (par le propriétaire)' },
    { value: 'oui-loue', label: 'Oui (loué)' },
    { value: 'non', label: 'Non' },
  ];

  const typesLocation = [
    { value: 'vide', label: 'Vide' },
    { value: 'meublee', label: 'Meublée' },
    { value: 'indifferent', label: 'Indifférent' },
  ];

  const profilsLocataire = [
    { value: 'indifferent', label: 'Indifférent' },
    { value: 'etudiant', label: 'Étudiant' },
    { value: 'actif', label: 'Actif' },
    { value: 'famille', label: 'Famille' },
  ];

  useEffect(() => {
    // Récupérer les données de l'étape 1 depuis le localStorage
    const storedData = localStorage.getItem('location_etape1');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setEtape1Data(parsedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        router.push('/services/location/formulaire');
      }
    } else {
      // Si pas de données, rediriger vers l'étape 1
      router.push('/services/location/formulaire');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const checkboxValue = (e.target as HTMLInputElement).value;
      setFormData(prev => {
        const currentEquipements = prev.equipements || [];
        if (checked) {
          return { ...prev, equipements: [...currentEquipements, checkboxValue] };
        } else {
          return { ...prev, equipements: currentEquipements.filter(item => item !== checkboxValue) };
        }
      });
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

    if (!formData.typeBien) newErrors.typeBien = 'Le type de bien est requis';
    if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est requise';
    if (!formData.surfaceHabitable.trim()) {
      newErrors.surfaceHabitable = 'La surface habitable est requise';
    } else if (isNaN(Number(formData.surfaceHabitable)) || Number(formData.surfaceHabitable) <= 0) {
      newErrors.surfaceHabitable = 'La surface habitable doit être un nombre positif';
    }
    if (!formData.nombrePieces.trim()) newErrors.nombrePieces = 'Le nombre de pièces est requis';
    if (!formData.nombreChambres.trim()) {
      newErrors.nombreChambres = 'Le nombre de chambres est requis';
    } else if (isNaN(Number(formData.nombreChambres)) || Number(formData.nombreChambres) < 0) {
      newErrors.nombreChambres = 'Le nombre de chambres doit être un nombre positif';
    }
    if (!formData.etage) newErrors.etage = 'L\'étage est requis';
    if (!formData.ascenseur) newErrors.ascenseur = 'Cette information est requise';
    if (!formData.etatGeneral) newErrors.etatGeneral = 'L\'état général est requis';
    if (!formData.bienOccupe) newErrors.bienOccupe = 'Cette information est requise';
    
    // Si le bien est loué, le loyer actuel et la fin de bail sont requis
    if (formData.bienOccupe === 'oui-loue') {
      if (!formData.loyerActuel.trim()) {
        newErrors.loyerActuel = 'Le loyer actuel est requis si le bien est loué';
      } else if (isNaN(Number(formData.loyerActuel)) || Number(formData.loyerActuel) <= 0) {
        newErrors.loyerActuel = 'Le loyer actuel doit être un nombre positif';
      }
      if (!formData.finBail) newErrors.finBail = 'La date de fin de bail est requise si le bien est loué';
    }
    
    if (!formData.typeLocation) newErrors.typeLocation = 'Le type de location est requis';
    if (!formData.profilLocataire) newErrors.profilLocataire = 'Le profil de locataire est requis';
    if (!formData.confirmation) newErrors.confirmation = 'Vous devez confirmer votre engagement';

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
        projet_location: etape1Data.projetLocation,
        delai_location: etape1Data.delaiLocation,
        loyer_marche: etape1Data.loyerMarche,
        niveau_accompagnement: etape1Data.niveauAccompagnement,
        engagement_etape1: etape1Data.engagement,
        
        // Données de l'étape 2
        type_bien: formData.typeBien,
        adresse: formData.adresse,
        surface_habitable: parseInt(formData.surfaceHabitable),
        nombre_pieces: parseInt(formData.nombrePieces),
        nombre_chambres: parseInt(formData.nombreChambres),
        etage: formData.etage,
        nombre_etages: formData.nombreEtages ? parseInt(formData.nombreEtages) : null,
        ascenseur: formData.ascenseur,
        
        etat_general: formData.etatGeneral,
        equipements: formData.equipements,
        autres_equipements: formData.autresEquipements || null,
        
        bien_occupe: formData.bienOccupe,
        loyer_actuel: formData.loyerActuel ? parseInt(formData.loyerActuel) : null,
        fin_bail: formData.finBail || null,
        
        loyer_envisage: formData.loyerEnvisage ? parseInt(formData.loyerEnvisage) : null,
        type_location: formData.typeLocation,
        profil_locataire: formData.profilLocataire,
        
        message_libre: formData.messageLibre || null,
        
        confirmation: formData.confirmation,
        status: 'pending',
      };

      // Envoyer les données à Firebase
      console.log('Données à envoyer:', completeData);
      
      const requestId = await createLocationRequest(completeData);
      console.log('Demande de location créée avec succès, ID:', requestId);

      // Nettoyer le localStorage
      localStorage.removeItem('location_etape1');
      
      // Rediriger vers la page de confirmation
      router.push('/services/location/confirmation');
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
                Demande de location
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
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. Informations générales sur le bien */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    1. Informations générales sur le bien
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Type de bien */}
                    <div>
                      <label htmlFor="typeBien" className="block text-sm font-medium text-gray-700 mb-2">
                        Type de bien <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="typeBien"
                        name="typeBien"
                        value={formData.typeBien}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                          errors.typeBien ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ borderColor: errors.typeBien ? '#dc2626' : '#1a2332' }}
                      >
                        <option value="">Sélectionner un type de bien</option>
                        {typesBien.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.typeBien && <p className="mt-1 text-sm text-red-500">{errors.typeBien}</p>}
                    </div>

                    {/* Adresse */}
                    <div>
                      <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse du bien <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="adresse"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        required
                        rows={3}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all resize-none ${
                          errors.adresse ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ borderColor: errors.adresse ? '#dc2626' : '#1a2332' }}
                        placeholder="Ex: 123 Rue de la République, 13001 Marseille"
                      />
                      {errors.adresse && <p className="mt-1 text-sm text-red-500">{errors.adresse}</p>}
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
                          errors.surfaceHabitable ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ borderColor: errors.surfaceHabitable ? '#dc2626' : '#1a2332' }}
                        placeholder="Ex: 75"
                      />
                      {errors.surfaceHabitable && <p className="mt-1 text-sm text-red-500">{errors.surfaceHabitable}</p>}
                    </div>

                    {/* Nombre de pièces */}
                    <div>
                      <label htmlFor="nombrePieces" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de pièces <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="nombrePieces"
                        name="nombrePieces"
                        value={formData.nombrePieces}
                        onChange={handleChange}
                        required
                        min="1"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                          errors.nombrePieces ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ borderColor: errors.nombrePieces ? '#dc2626' : '#1a2332' }}
                        placeholder="Ex: 3"
                      />
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
                          errors.nombreChambres ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ borderColor: errors.nombreChambres ? '#dc2626' : '#1a2332' }}
                        placeholder="Ex: 2"
                      />
                      {errors.nombreChambres && <p className="mt-1 text-sm text-red-500">{errors.nombreChambres}</p>}
                    </div>

                    {/* Étage */}
                    <div>
                      <label htmlFor="etage" className="block text-sm font-medium text-gray-700 mb-2">
                        Étage <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="etage" className="block text-xs text-gray-500 mb-1">
                            Sélectionner l'étage
                          </label>
                          <select
                            id="etage"
                            name="etage"
                            value={formData.etage}
                            onChange={handleChange}
                            required
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                              errors.etage ? 'border-red-500' : 'border-gray-300'
                            }`}
                            style={{ borderColor: errors.etage ? '#dc2626' : '#1a2332' }}
                          >
                            <option value="">Sélectionner l'étage</option>
                            {etageOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="nombreEtages" className="block text-xs text-gray-500 mb-1">
                            Sur combien d'étages ?
                          </label>
                          <select
                            id="nombreEtages"
                            name="nombreEtages"
                            value={formData.nombreEtages}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all border-gray-300"
                            style={{ borderColor: '#1a2332' }}
                          >
                            <option value="">Sélectionner</option>
                            {nombreEtagesOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.etage && <p className="mt-1 text-sm text-red-500">{errors.etage}</p>}
                    </div>

                    {/* Ascenseur */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ascenseur <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-4">
                        {ascenseurOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.ascenseur === option.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="ascenseur"
                              value={option.value}
                              checked={formData.ascenseur === option.value}
                              onChange={handleChange}
                              className="mr-4"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.ascenseur && <p className="mt-2 text-sm text-red-500">{errors.ascenseur}</p>}
                    </div>
                  </div>
                </div>

                {/* 2. État et équipements */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    2. État et équipements
                  </h2>
                  
                  <div className="space-y-6">
                    {/* État général */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        État général <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-4">
                        {etatsGeneraux.map((etat) => (
                          <label key={etat.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.etatGeneral === etat.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="etatGeneral"
                              value={etat.value}
                              checked={formData.etatGeneral === etat.value}
                              onChange={handleChange}
                              className="mr-4"
                            />
                            <span>{etat.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.etatGeneral && <p className="mt-2 text-sm text-red-500">{errors.etatGeneral}</p>}
                    </div>

                    {/* Équipements */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Équipements
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {equipementsOptions.map((equipement) => (
                          <label key={equipement.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.equipements.includes(equipement.value) ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="checkbox"
                              name="equipements"
                              value={equipement.value}
                              checked={formData.equipements.includes(equipement.value)}
                              onChange={handleChange}
                              className="mr-4"
                            />
                            <span>{equipement.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Autres équipements */}
                    <div>
                      <label htmlFor="autresEquipements" className="block text-sm font-medium text-gray-700 mb-2">
                        Autres (champ libre)
                      </label>
                      <textarea
                        id="autresEquipements"
                        name="autresEquipements"
                        value={formData.autresEquipements}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all resize-none border-gray-300"
                        style={{ borderColor: '#1a2332' }}
                        placeholder="Précisez d'autres équipements si nécessaire"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Situation actuelle */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    3. Situation actuelle
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Bien actuellement occupé */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bien actuellement occupé ? <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-4">
                        {bienOccupeOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.bienOccupe === option.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="bienOccupe"
                              value={option.value}
                              checked={formData.bienOccupe === option.value}
                              onChange={handleChange}
                              className="mr-4"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.bienOccupe && <p className="mt-2 text-sm text-red-500">{errors.bienOccupe}</p>}
                    </div>

                    {/* Si loué */}
                    {formData.bienOccupe === 'oui-loue' && (
                      <div className="space-y-4 pl-4 border-l-4" style={{ borderColor: '#1a2332' }}>
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
                            required={formData.bienOccupe === 'oui-loue'}
                            min="1"
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                              errors.loyerActuel ? 'border-red-500' : 'border-gray-300'
                            }`}
                            style={{ borderColor: errors.loyerActuel ? '#dc2626' : '#1a2332' }}
                            placeholder="Ex: 800"
                          />
                          {errors.loyerActuel && <p className="mt-1 text-sm text-red-500">{errors.loyerActuel}</p>}
                        </div>

                        <div>
                          <label htmlFor="finBail" className="block text-sm font-medium text-gray-700 mb-2">
                            Date de fin de bail <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            id="finBail"
                            name="finBail"
                            value={formData.finBail}
                            onChange={handleChange}
                            required={formData.bienOccupe === 'oui-loue'}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                              errors.finBail ? 'border-red-500' : 'border-gray-300'
                            }`}
                            style={{ borderColor: errors.finBail ? '#dc2626' : '#1a2332' }}
                          />
                          {errors.finBail && <p className="mt-1 text-sm text-red-500">{errors.finBail}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Contexte actuel du bien */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    4. Contexte actuel du bien
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Loyer envisagé */}
                    <div>
                      <label htmlFor="loyerEnvisage" className="block text-sm font-medium text-gray-700 mb-2">
                        Loyer envisagé (si connu) (€/mois)
                      </label>
                      <input
                        type="number"
                        id="loyerEnvisage"
                        name="loyerEnvisage"
                        value={formData.loyerEnvisage}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all border-gray-300"
                        style={{ borderColor: '#1a2332' }}
                        placeholder="Ex: 900"
                      />
                    </div>

                    {/* Type de location souhaitée */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de location souhaitée <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-4">
                        {typesLocation.map((type) => (
                          <label key={type.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.typeLocation === type.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="typeLocation"
                              value={type.value}
                              checked={formData.typeLocation === type.value}
                              onChange={handleChange}
                              className="mr-4"
                            />
                            <span>{type.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.typeLocation && <p className="mt-2 text-sm text-red-500">{errors.typeLocation}</p>}
                    </div>

                    {/* Profil de locataire recherché */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profil de locataire recherché <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-4">
                        {profilsLocataire.map((profil) => (
                          <label key={profil.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.profilLocataire === profil.value ? '#1a2332' : '#e5e7eb' }}>
                            <input
                              type="radio"
                              name="profilLocataire"
                              value={profil.value}
                              checked={formData.profilLocataire === profil.value}
                              onChange={handleChange}
                              className="mr-4"
                            />
                            <span>{profil.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.profilLocataire && <p className="mt-2 text-sm text-red-500">{errors.profilLocataire}</p>}
                    </div>
                  </div>
                </div>

                {/* 5. Message libre */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    5. Message libre
                  </h2>
                  
                  <div>
                    <label htmlFor="messageLibre" className="block text-sm font-medium text-gray-700 mb-2">
                      Souhaitez-vous nous préciser des éléments importants concernant votre bien ou votre projet de location ?
                    </label>
                    <textarea
                      id="messageLibre"
                      name="messageLibre"
                      value={formData.messageLibre}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all resize-none border-gray-300"
                      style={{ borderColor: '#1a2332' }}
                      placeholder="Votre message..."
                    />
                  </div>
                </div>

                {/* 6. Engagement */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    6. Votre engagement
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Les demandes de mise en location sont étudiées manuellement.
                      Nous revenons uniquement vers les projets correspondant à notre méthode et au cadre réglementaire.
                    </p>
                    <label 
                      onClick={() => setFormData(prev => ({ ...prev, confirmation: !prev.confirmation }))}
                      className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors select-none" 
                      style={{ borderColor: formData.confirmation ? '#1a2332' : '#e5e7eb' }}
                    >
                      <input
                        type="checkbox"
                        name="confirmation"
                        checked={formData.confirmation}
                        onChange={handleChange}
                        className="mt-1 mr-4 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-gray-700 cursor-pointer">
                        Je confirme souhaiter une mise en location encadrée et professionnelle. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.confirmation && <p className="mt-2 text-sm text-red-500">{errors.confirmation}</p>}
                  </div>
                </div>

                {/* Bouton de validation */}
                <div className="text-center space-y-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>{loading ? 'Envoi en cours...' : 'Envoyer ma demande de mise en location'}</span>
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
                    Réponse réservée aux projets sérieux.
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
