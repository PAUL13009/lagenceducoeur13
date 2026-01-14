'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';

export default function FormulaireGestionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    pourquoiGestion: '',
    gestionActuelle: '',
    objectifPrincipal: '',
    niveauImplication: '',
    cadreClair: '',
    engagement: false,
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

  const pourquoiGestionOptions = [
    { value: 'manque-temps', label: 'Manque de temps' },
    { value: 'serenite', label: 'Recherche de sérénité' },
    { value: 'eloignement', label: 'Éloignement géographique' },
    { value: 'autre', label: 'Autre' },
  ];

  const gestionActuelleOptions = [
    { value: 'personnelle', label: 'Gestion personnelle' },
    { value: 'agence', label: 'Déjà en agence' },
    { value: 'bientot-location', label: 'Bien bientôt mis en location' },
    { value: 'vacant', label: 'Bien actuellement vacant' },
  ];

  const objectifPrincipalOptions = [
    { value: 'securiser', label: 'Sécuriser mon investissement sur le long terme' },
    { value: 'deleguer', label: 'Déléguer en toute confiance' },
    { value: 'simplifier', label: 'Simplifier mon quotidien' },
    { value: 'reduire-frais', label: 'Réduire au maximum les frais' },
  ];

  const niveauImplicationOptions = [
    { value: 'informer', label: 'Être informé régulièrement, sans intervenir' },
    { value: 'echanger', label: 'Échanger uniquement sur les décisions importantes' },
    { value: 'valider', label: 'Valider chaque action' },
  ];

  const cadreClairOptions = [
    { value: 'oui', label: 'Oui' },
    { value: 'oui-apres-echange', label: 'Oui, après échange' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
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

    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le numéro de téléphone est requis';
    } else if (!/^[0-9+\s\-()]+$/.test(formData.telephone)) {
      newErrors.telephone = 'Le numéro de téléphone n\'est pas valide';
    }
    if (!formData.pourquoiGestion) newErrors.pourquoiGestion = 'Cette information est requise';
    if (!formData.gestionActuelle) newErrors.gestionActuelle = 'Cette information est requise';
    if (!formData.objectifPrincipal) newErrors.objectifPrincipal = 'Votre objectif principal est requis';
    if (!formData.niveauImplication) newErrors.niveauImplication = 'Votre niveau d\'implication est requis';
    if (!formData.cadreClair) newErrors.cadreClair = 'Cette information est requise';
    if (!formData.engagement) newErrors.engagement = 'Vous devez confirmer votre engagement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Sauvegarder les données dans le localStorage pour les passer à l'étape suivante
      localStorage.setItem('gestion_etape1', JSON.stringify(formData));
      // Rediriger vers l'étape 2
      router.push('/services/gestion/formulaire/etape-2');
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
                Demande de gestion locative
              </h1>
              <p className="text-lg text-gray-600">
                Étape 1 : Votre projet de gestion
              </p>
            </div>
          </div>
        </section>

        {/* Formulaire */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Informations personnelles */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    Vos informations
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Prénom */}
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                          errors.prenom ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ borderColor: errors.prenom ? '#dc2626' : '#1a2332' }}
                        placeholder="Votre prénom"
                      />
                      {errors.prenom && <p className="mt-1 text-sm text-red-500">{errors.prenom}</p>}
                    </div>

                    {/* Nom */}
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                          errors.nom ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ borderColor: errors.nom ? '#dc2626' : '#1a2332' }}
                        placeholder="Votre nom"
                      />
                      {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ borderColor: errors.email ? '#dc2626' : '#1a2332' }}
                        placeholder="votre@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                          errors.telephone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ borderColor: errors.telephone ? '#dc2626' : '#1a2332' }}
                        placeholder="+33 6 12 34 56 78"
                      />
                      {errors.telephone && <p className="mt-1 text-sm text-red-500">{errors.telephone}</p>}
                    </div>
                  </div>
                </div>

                {/* 1. Pourquoi souhaitez-vous confier la gestion de votre bien ? */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    1. Pourquoi souhaitez-vous confier la gestion de votre bien ?
                  </h2>
                  <div className="space-y-4">
                    {pourquoiGestionOptions.map((option) => (
                      <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.pourquoiGestion === option.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="pourquoiGestion"
                          value={option.value}
                          checked={formData.pourquoiGestion === option.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.pourquoiGestion && <p className="mt-2 text-sm text-red-500">{errors.pourquoiGestion}</p>}
                </div>

                {/* 2. Comment votre bien est-il géré aujourd'hui ? */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    2. Comment votre bien est-il géré aujourd'hui ?
                  </h2>
                  <div className="space-y-4">
                    {gestionActuelleOptions.map((option) => (
                      <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.gestionActuelle === option.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="gestionActuelle"
                          value={option.value}
                          checked={formData.gestionActuelle === option.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gestionActuelle && <p className="mt-2 text-sm text-red-500">{errors.gestionActuelle}</p>}
                </div>

                {/* 3. Quel est votre objectif principal en confiant la gestion ? */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    3. Quel est votre objectif principal en confiant la gestion ?
                  </h2>
                  <div className="space-y-4">
                    {objectifPrincipalOptions.map((option) => (
                      <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.objectifPrincipal === option.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="objectifPrincipal"
                          value={option.value}
                          checked={formData.objectifPrincipal === option.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.objectifPrincipal && <p className="mt-2 text-sm text-red-500">{errors.objectifPrincipal}</p>}
                </div>

                {/* 4. Quel niveau d'implication souhaitez-vous conserver ? */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    4. Quel niveau d'implication souhaitez-vous conserver ?
                  </h2>
                  <div className="space-y-4">
                    {niveauImplicationOptions.map((option) => (
                      <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.niveauImplication === option.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="niveauImplication"
                          value={option.value}
                          checked={formData.niveauImplication === option.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.niveauImplication && <p className="mt-2 text-sm text-red-500">{errors.niveauImplication}</p>}
                </div>

                {/* 5. Êtes-vous prêt à confier la gestion de votre bien dans un cadre clair, structuré et conforme à la réglementation ? */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    5. Êtes-vous prêt à confier la gestion de votre bien dans un cadre clair, structuré et conforme à la réglementation ?
                  </h2>
                  <div className="space-y-4">
                    {cadreClairOptions.map((option) => (
                      <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.cadreClair === option.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="cadreClair"
                          value={option.value}
                          checked={formData.cadreClair === option.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.cadreClair && <p className="mt-2 text-sm text-red-500">{errors.cadreClair}</p>}
                </div>

                {/* 6. Engagement */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    6. Votre engagement
                  </h2>
                  <div>
                    <label 
                      onClick={() => setFormData(prev => ({ ...prev, engagement: !prev.engagement }))}
                      className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors select-none" 
                      style={{ borderColor: formData.engagement ? '#1a2332' : '#e5e7eb' }}
                    >
                      <input
                        type="checkbox"
                        name="engagement"
                        checked={formData.engagement}
                        onChange={handleChange}
                        className="mt-1 mr-4 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-gray-700 cursor-pointer">
                        Je confirme rechercher une gestion locative professionnelle, basée sur la confiance, la transparence et la durée. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.engagement && <p className="mt-2 text-sm text-red-500">{errors.engagement}</p>}
                  </div>
                </div>

                {/* Bouton de validation */}
                <div className="text-center space-y-4">
                  <button
                    type="submit"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Continuer ma demande de gestion</span>
                    <svg 
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <p className="text-sm text-gray-500">
                    Étape suivante réservée aux projets compatibles avec notre méthode.
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
