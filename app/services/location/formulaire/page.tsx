'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';

export default function FormulaireLocationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    projetLocation: '',
    delaiLocation: '',
    loyerMarche: '',
    niveauAccompagnement: '',
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

  const projetsLocation = [
    { value: 'mettre-location', label: 'Je souhaite mettre mon bien en location' },
    { value: 'disponible-prochainement', label: 'Mon bien sera disponible à la location prochainement' },
    { value: 'renseigner', label: 'Je me renseigne' },
  ];

  const delaisLocation = [
    { value: 'immediatement', label: 'Immédiatement' },
    { value: 'moins-2-mois', label: 'Dans moins de 2 mois' },
    { value: 'plus-2-mois', label: 'Dans plus de 2 mois' },
  ];

  const loyersMarche = [
    { value: 'oui', label: 'Oui' },
    { value: 'oui-apres-echange', label: 'Oui, après échange' },
    { value: 'non', label: 'Non' },
  ];

  const niveauxAccompagnement = [
    { value: 'complet', label: 'Mise en location complète' },
    { value: 'location-gestion', label: 'Mise en location + gestion' },
    { value: 'mise-relation', label: 'Mise en relation uniquement' },
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
    if (!formData.projetLocation) newErrors.projetLocation = 'Votre situation est requise';
    if (!formData.delaiLocation) newErrors.delaiLocation = 'Le délai est requis';
    if (!formData.loyerMarche) newErrors.loyerMarche = 'Votre positionnement par rapport au loyer est requis';
    if (!formData.niveauAccompagnement) newErrors.niveauAccompagnement = 'Le niveau d\'accompagnement recherché est requis';
    if (!formData.engagement) newErrors.engagement = 'Vous devez confirmer votre engagement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Sauvegarder les données dans le localStorage pour les passer à l'étape suivante
      localStorage.setItem('location_etape1', JSON.stringify(formData));
      // Rediriger vers l'étape 2
      router.push('/services/location/formulaire/etape-2');
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
                Étape 1 : Votre projet de location
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

                {/* 1. Où en êtes-vous dans votre projet ? */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    1. Où en êtes-vous dans votre projet ?
                  </h2>
                  <div className="space-y-4">
                    {projetsLocation.map((projet) => (
                      <label key={projet.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.projetLocation === projet.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="projetLocation"
                          value={projet.value}
                          checked={formData.projetLocation === projet.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{projet.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.projetLocation && <p className="mt-2 text-sm text-red-500">{errors.projetLocation}</p>}
                </div>

                {/* 2. Quand souhaitez-vous mettre le bien en location ? */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    2. Quand souhaitez-vous mettre le bien en location ?
                  </h2>
                  <div className="space-y-4">
                    {delaisLocation.map((delai) => (
                      <label key={delai.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.delaiLocation === delai.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="delaiLocation"
                          value={delai.value}
                          checked={formData.delaiLocation === delai.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{delai.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.delaiLocation && <p className="mt-2 text-sm text-red-500">{errors.delaiLocation}</p>}
                </div>

                {/* 3. Seriez-vous prêt à fixer un loyer cohérent avec le marché local ? */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    3. Seriez-vous prêt à fixer un loyer cohérent avec le marché local, s'il est justifié et argumenté ?
                  </h2>
                  <div className="space-y-4">
                    {loyersMarche.map((loyer) => (
                      <label key={loyer.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.loyerMarche === loyer.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="loyerMarche"
                          value={loyer.value}
                          checked={formData.loyerMarche === loyer.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{loyer.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.loyerMarche && <p className="mt-2 text-sm text-red-500">{errors.loyerMarche}</p>}
                </div>

                {/* 4. Quel niveau d'accompagnement recherchez-vous ? */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    4. Quel niveau d'accompagnement recherchez-vous ?
                  </h2>
                  <div className="space-y-4">
                    {niveauxAccompagnement.map((niveau) => (
                      <label key={niveau.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.niveauAccompagnement === niveau.value ? '#1a2332' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="niveauAccompagnement"
                          value={niveau.value}
                          checked={formData.niveauAccompagnement === niveau.value}
                          onChange={handleChange}
                          className="mr-4"
                        />
                        <span>{niveau.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.niveauAccompagnement && <p className="mt-2 text-sm text-red-500">{errors.niveauAccompagnement}</p>}
                </div>

                {/* 5. Engagement */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    5. Votre engagement
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
                        Je confirme souhaiter une mise en location encadrée, sérieuse et conforme au marché. <span className="text-red-500">*</span>
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
                    <span>Continuer ma demande de location</span>
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
                    Étape suivante réservée aux projets cohérents.
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
