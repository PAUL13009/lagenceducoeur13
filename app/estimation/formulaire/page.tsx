'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';

export default function FormulaireEstimationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    typeBien: '',
    adresse: '',
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
    { value: 'loft', label: 'Loft' },
    { value: 'studio', label: 'Studio' },
    { value: 'villa', label: 'Villa' },
    { value: 'autre', label: 'Autre' },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

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

    if (!formData.typeBien) {
      newErrors.typeBien = 'Le type de bien est requis';
    }

    if (!formData.adresse.trim()) {
      newErrors.adresse = 'L\'adresse est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Sauvegarder les données dans le localStorage pour les passer à l'étape suivante
      localStorage.setItem('estimation_etape1', JSON.stringify(formData));
      // Rediriger vers l'étape 2
      router.push('/estimation/formulaire/etape-2');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur pour ce champ s'il y en a une
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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
                Demande d'estimation
              </h1>
              <p className="text-lg text-gray-600">
                Première étape : Vos informations et les détails de votre bien
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
                      {errors.prenom && (
                        <p className="mt-1 text-sm text-red-500">{errors.prenom}</p>
                      )}
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
                      {errors.nom && (
                        <p className="mt-1 text-sm text-red-500">{errors.nom}</p>
                      )}
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
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
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
                      {errors.telephone && (
                        <p className="mt-1 text-sm text-red-500">{errors.telephone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informations sur le bien */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    Informations sur votre bien
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
                      {errors.typeBien && (
                        <p className="mt-1 text-sm text-red-500">{errors.typeBien}</p>
                      )}
                    </div>

                    {/* Adresse */}
                    <div>
                      <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse exacte du bien <span className="text-red-500">*</span>
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
                      {errors.adresse && (
                        <p className="mt-1 text-sm text-red-500">{errors.adresse}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <Link
                    href="/estimation"
                    className="text-gray-600 hover:text-[#1a2332] transition-colors underline"
                  >
                    Retour à la page Estimation
                  </Link>
                  <button
                    type="submit"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Continuer</span>
                    <svg 
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
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
