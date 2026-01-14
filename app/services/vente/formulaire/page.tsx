'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';

export default function FormulaireVentePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    intentionVente: '',
    delaiVente: '',
    positionnementPrix: '',
    relationProfessionnel: '',
    experiencePassee: '',
    raisonEchec: '',
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

  const intentionsVente = [
    { value: 'vendre', label: 'Je souhaite vendre mon bien' },
    { value: 'reflechir', label: 'Je réfléchis sérieusement à la vente' },
    { value: 'renseigner', label: 'Je me renseigne' },
  ];

  const delaisVente = [
    { value: 'moins-3-mois', label: 'Moins de 3 mois' },
    { value: '3-6-mois', label: '3 à 6 mois' },
    { value: 'plus-6-mois', label: 'Plus de 6 mois' },
  ];

  const positionnementsPrix = [
    { value: 'oui', label: 'Oui' },
    { value: 'oui-apres-echange', label: 'Oui, après échange' },
    { value: 'non', label: 'Non' },
  ];

  const relationsProfessionnel = [
    { value: 'complet', label: 'Un accompagnement complet, avec conseils et stratégie' },
    { value: 'collaboratif', label: 'Un accompagnement encadré mais collaboratif' },
    { value: 'simple', label: 'Une simple mise en relation' },
  ];

  const experiencesPassees = [
    { value: 'non', label: 'Non' },
    { value: 'oui-succes', label: 'Oui, avec succès' },
    { value: 'oui-sans-resultat', label: 'Oui, sans résultat' },
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
    if (!formData.intentionVente) newErrors.intentionVente = 'Votre intention de vente est requise';
    if (!formData.delaiVente) newErrors.delaiVente = 'Le délai de vente est requis';
    if (!formData.positionnementPrix) newErrors.positionnementPrix = 'Votre positionnement par rapport au prix est requis';
    if (!formData.relationProfessionnel) newErrors.relationProfessionnel = 'Le type d\'accompagnement recherché est requis';
    if (!formData.experiencePassee) newErrors.experiencePassee = 'Cette information est requise';
    if (!formData.engagement) newErrors.engagement = 'Vous devez confirmer votre engagement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Sauvegarder les données dans le localStorage pour les passer à l'étape suivante
      localStorage.setItem('vente_etape1', JSON.stringify(formData));
      // Rediriger vers l'étape 2
      router.push('/services/vente/formulaire/etape-2');
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
                Étape 1 : Votre projet de vente
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

                {/* 1. Intention de vente */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    1. Votre intention de vente
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Où en êtes-vous dans votre projet de vente ?
                  </p>
                  <div className="space-y-4">
                    {intentionsVente.map((intention) => (
                      <label key={intention.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.intentionVente === intention.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="intentionVente"
                          value={intention.value}
                          checked={formData.intentionVente === intention.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{intention.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.intentionVente && <p className="mt-2 text-sm text-red-500">{errors.intentionVente}</p>}
                </div>

                {/* 2. Délai de vente */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    2. Délai de vente envisagé
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Dans quel délai souhaitez-vous vendre ?
                  </p>
                  <div className="space-y-4">
                    {delaisVente.map((delai) => (
                      <label key={delai.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.delaiVente === delai.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="delaiVente"
                          value={delai.value}
                          checked={formData.delaiVente === delai.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{delai.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.delaiVente && <p className="mt-2 text-sm text-red-500">{errors.delaiVente}</p>}
                </div>

                {/* 3. Positionnement par rapport au prix */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    3. Positionnement par rapport au prix
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Seriez-vous prêt à positionner votre bien au prix du marché, si celui-ci est argumenté et cohérent ?
                  </p>
                  <div className="space-y-4">
                    {positionnementsPrix.map((positionnement) => (
                      <label key={positionnement.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.positionnementPrix === positionnement.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="positionnementPrix"
                          value={positionnement.value}
                          checked={formData.positionnementPrix === positionnement.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{positionnement.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.positionnementPrix && <p className="mt-2 text-sm text-red-500">{errors.positionnementPrix}</p>}
                </div>

                {/* 4. Relation au professionnel */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    4. Relation au professionnel
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Quel type d'accompagnement recherchez-vous ?
                  </p>
                  <div className="space-y-4">
                    {relationsProfessionnel.map((relation) => (
                      <label key={relation.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.relationProfessionnel === relation.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="relationProfessionnel"
                          value={relation.value}
                          checked={formData.relationProfessionnel === relation.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{relation.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.relationProfessionnel && <p className="mt-2 text-sm text-red-500">{errors.relationProfessionnel}</p>}
                </div>

                {/* 5. Expérience passée */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    5. Expérience passée
                  </h2>
                  <p className="text-sm text-gray-500 mb-6 italic">
                    (optionnel mais puissant)
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    Avez-vous déjà mis ce bien en vente ?
                  </p>
                  <div className="space-y-4 mb-6">
                    {experiencesPassees.map((experience) => (
                      <label key={experience.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.experiencePassee === experience.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="experiencePassee"
                          value={experience.value}
                          checked={formData.experiencePassee === experience.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{experience.label}</span>
                      </label>
                    ))}
                  </div>
                  {formData.experiencePassee === 'oui-sans-resultat' && (
                    <div className="mt-4">
                      <label htmlFor="raisonEchec" className="block text-sm font-medium text-gray-700 mb-2">
                        Si vous n'avez pas obtenu de résultats, pour quelle raison selon vous ?
                      </label>
                      <textarea
                        id="raisonEchec"
                        name="raisonEchec"
                        value={formData.raisonEchec}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all resize-none"
                        style={{ borderColor: '#1a2332' }}
                        placeholder="Expliquez les raisons selon vous..."
                      />
                    </div>
                  )}
                  {errors.experiencePassee && <p className="mt-2 text-sm text-red-500">{errors.experiencePassee}</p>}
                </div>

                {/* 6. Engagement */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    6. Engagement
                  </h2>
                  <div>
                    <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.engagement ? '#1a2332' : '#e5e7eb' }}>
                      <input
                        type="checkbox"
                        name="engagement"
                        checked={formData.engagement}
                        onChange={handleChange}
                        className="mt-1 mr-4"
                      />
                      <span className="text-gray-700">
                        Je confirme avoir compris l'approche de l'agence et souhaiter être accompagné par un professionnel pour vendre mon bien dans des conditions cohérentes avec le marché. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.engagement && <p className="mt-2 text-sm text-red-500">{errors.engagement}</p>}
                  </div>
                </div>

                {/* 7. Message de transition */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-center">
                    Cette première étape nous permet de vérifier si votre projet correspond à notre méthode de travail.<br />
                    La suite du formulaire concerne les caractéristiques précises de votre bien.
                  </p>
                </div>

                {/* 8. Bouton de validation */}
                <div className="text-center space-y-4">
                  <button
                    type="submit"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Continuer ma demande de vente</span>
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
                    Étape suivante réservée aux projets de vente sérieux.
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
