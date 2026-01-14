'use client';

import { useState } from 'react';
import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";
import { createContactRequest } from "@/lib/firestore";

export default function ContactPage() {
  // Hooks pour détecter la visibilité des boutons CTA sur mobile
  const [heroCtaRef, isHeroCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [submitCtaRef, isSubmitCtaVisible] = useVisibleOnScreen<HTMLButtonElement>();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est obligatoire';
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est obligatoire';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est obligatoire';
    }
    if (!formData.sujet.trim()) {
      newErrors.sujet = 'Le sujet est obligatoire';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Envoyer les données à Firebase
      await createContactRequest({
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        email: formData.email.trim(),
        telephone: formData.telephone.trim(),
        sujet: formData.sujet.trim(),
        message: formData.message.trim(),
        status: 'pending'
      });
      
      setSubmitSuccess(true);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: '',
      });
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      alert('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col">
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
      <main className="flex-grow">
        {/* Section Hero */}
        <section 
          className="relative text-white h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/imagehero.png')`,
          }}
        >
          {/* Overlay pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-normal mb-8 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                Contact
              </h1>
              <div className="flex justify-center items-center">
                <a
                  ref={heroCtaRef}
                  href="#contact-form"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('contact-form');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCtaVisible ? 'cta-visible' : ''}`}
                >
                  <span>Nous contacter</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section Informations de contact */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-12 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Nos coordonnées
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Téléphone */}
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1a2332' }}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#1a2332' }}>Téléphone</h3>
                  <a href="tel:+33663706051" className="text-gray-600 hover:underline">
                    +33 6 63 70 60 51
                  </a>
                </div>

                {/* Email */}
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1a2332' }}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#1a2332' }}>Email</h3>
                  <a href="mailto:immo@lagenceducoeur.com" className="text-gray-600 hover:underline">
                    immo@lagenceducoeur.com
                  </a>
                </div>

                {/* Adresse */}
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1a2332' }}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#1a2332' }}>Adresse</h3>
                  <p className="text-gray-600">
                    96 Rue Paradis<br />
                    13008 Marseille
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Formulaire de contact */}
        <section id="contact-form" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Envoyez-nous un message
              </h2>
              
              {submitSuccess && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-green-800 text-center">
                    Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <div className="space-y-6">
                  {/* Nom et Prénom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          errors.nom ? 'border-red-500' : ''
                        }`}
                        style={{ borderColor: errors.nom ? '#dc2626' : '#1a2332' }}
                      />
                      {errors.nom && (
                        <p className="mt-1 text-sm text-red-500">{errors.nom}</p>
                      )}
                    </div>

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
                          errors.prenom ? 'border-red-500' : ''
                        }`}
                        style={{ borderColor: errors.prenom ? '#dc2626' : '#1a2332' }}
                      />
                      {errors.prenom && (
                        <p className="mt-1 text-sm text-red-500">{errors.prenom}</p>
                      )}
                    </div>
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          errors.email ? 'border-red-500' : ''
                        }`}
                        style={{ borderColor: errors.email ? '#dc2626' : '#1a2332' }}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                          errors.telephone ? 'border-red-500' : ''
                        }`}
                        style={{ borderColor: errors.telephone ? '#dc2626' : '#1a2332' }}
                        placeholder="+33 6 12 34 56 78"
                      />
                      {errors.telephone && (
                        <p className="mt-1 text-sm text-red-500">{errors.telephone}</p>
                      )}
                    </div>
                  </div>

                  {/* Sujet */}
                  <div>
                    <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="sujet"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                        errors.sujet ? 'border-red-500' : ''
                      }`}
                      style={{ borderColor: errors.sujet ? '#dc2626' : '#1a2332' }}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="estimation">Demande d'estimation</option>
                      <option value="vente">Vente de bien</option>
                      <option value="location">Mise en location</option>
                      <option value="gestion">Gestion locative</option>
                      <option value="autre">Autre</option>
                    </select>
                    {errors.sujet && (
                      <p className="mt-1 text-sm text-red-500">{errors.sujet}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all resize-none ${
                        errors.message ? 'border-red-500' : ''
                      }`}
                      style={{ borderColor: errors.message ? '#dc2626' : '#1a2332' }}
                      placeholder="Votre message..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Bouton de soumission */}
                  <div className="flex justify-center pt-4">
                    <button
                      ref={submitCtaRef}
                      type="submit"
                      disabled={isSubmitting}
                      className={`cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 ${isSubmitCtaVisible ? 'cta-visible' : ''} ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      style={{ borderColor: '#1a2332', color: '#1a2332' }}
                    >
                      <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                      {!isSubmitting && (
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
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Section Nos réseaux sociaux */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-12 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Nos réseaux sociaux
              </h2>
              <div className="flex justify-center items-center gap-8">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-110"
                  aria-label="Suivez-nous sur LinkedIn"
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-110"
                  aria-label="Suivez-nous sur Facebook"
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-110"
                  aria-label="Suivez-nous sur Instagram"
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E4405F"/>
                  </svg>
                </a>
              </div>
              <p className="text-center text-gray-600 mt-8">
                Suivez-nous pour rester informé de nos actualités et de nos nouveaux biens
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
