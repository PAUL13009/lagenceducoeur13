'use client';

import Image from "next/image";
import { useRef } from "react";
import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";

export default function ServicesPage() {
  const servicesSectionRef = useRef<HTMLElement>(null);
  
  // Hooks pour détecter la visibilité des boutons CTA sur mobile
  const [heroCtaRef, isHeroCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [estimationCtaRef, isEstimationCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [venteCtaRef, isVenteCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [locationCtaRef, isLocationCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [gestionCtaRef, isGestionCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();

  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (servicesSectionRef.current) {
      servicesSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
    { label: 'Actualités', link: '/actualites', ariaLabel: 'Voir les actualités' },
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
              <h1 className="text-5xl md:text-6xl font-normal mb-6 md:mb-8 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                Nos Services
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  ref={heroCtaRef}
                  href="#services"
                  onClick={handleScrollToServices}
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCtaVisible ? 'cta-visible' : ''}`}
                >
                  <span>Découvrir nos services</span>
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

        {/* Section Services */}
        <section id="services" ref={servicesSectionRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-12 uppercase tracking-wider text-center whitespace-normal md:whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une expertise complète pour tous vos besoins
              </h2>

              {/* Service 1: Estimation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-24">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                  <Image
                    src="/estimation.jpg"
                    alt="Service Estimation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                      Estimation
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xl md:text-2xl font-normal mb-3 text-center md:text-left" style={{ color: '#D4AF37' }}>
                    Valorisons votre propriété
                  </p>
                  <h3 className="text-2xl md:text-3xl font-normal mb-4 text-center md:text-left" style={{ fontFamily: "'Playfair Display', serif", color: '#1a2332' }}>
                    Estimation immobilière précise et argumentée à Marseille
                  </h3>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                      Avant toute vente, une estimation fiable est essentielle.
                      Nous réalisons des estimations immobilières fondées sur la réalité du marché marseillais, en prenant en compte les caractéristiques de votre bien, son environnement, la demande actuelle et les ventes comparables récentes.
                    </p>
                    <p>
                      Notre approche repose sur une analyse rigoureuse, loin des estimations approximatives ou des promesses irréalistes.
                      L'objectif est clair : positionner votre bien au juste prix, pour vendre dans de bonnes conditions et dans des délais cohérents avec le marché.
                    </p>
                    <p>
                      Chaque estimation est expliquée, argumentée et replacée dans son contexte, afin de vous permettre de prendre une décision éclairée.
                    </p>
                  </div>
                  <a
                    ref={estimationCtaRef}
                    href="/estimation"
                    className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 mt-6 mx-auto ${isEstimationCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Demander une estimation</span>
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

              {/* Service 2: Vente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-24">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden md:order-1">
                  <Image
                    src="/vente.jpg"
                    alt="Service Vente"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                      Vente
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col justify-center md:order-2">
                  <p className="text-xl md:text-2xl font-normal mb-3 text-center md:text-left" style={{ color: '#D4AF37' }}>
                    Une vente engagée, encadrée jusqu'au bout
                  </p>
                  <h3 className="text-2xl md:text-3xl font-normal mb-4 text-center md:text-left" style={{ fontFamily: "'Playfair Display', serif", color: '#1a2332' }}>
                    Un accompagnement personnalisé de la mise en vente à la signature
                  </h3>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                      Vendre un bien immobilier nécessite méthode, rigueur et disponibilité.
                      Nous vous accompagnons à chaque étape de la vente, depuis la préparation du bien jusqu'à la signature de l'acte authentique.
                    </p>
                    <p>Cela inclut notamment :</p>
                    <ul className="space-y-2 ml-0 md:ml-4 md:list-disc md:list-inside">
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>la définition d'une stratégie de commercialisation adaptée,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>la mise en valeur du bien,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>la diffusion ciblée,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>la sélection des acquéreurs,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>et le suivi administratif et juridique du dossier.</span>
                      </li>
                    </ul>
                    <p>
                      Notre engagement est de mener chaque vente avec sérieux, transparence et efficacité, tout en respectant votre projet et vos attentes.
                    </p>
                  </div>
                  <a
                    ref={venteCtaRef}
                    href="/services/vente"
                    className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 mt-6 mx-auto ${isVenteCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Découvrir notre service de vente</span>
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

              {/* Service 3: Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-24">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                  <Image
                    src="/location.jpg"
                    alt="Service Location"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                      Location
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xl md:text-2xl font-normal mb-3 text-center md:text-left" style={{ color: '#D4AF37' }}>
                    Une mise en location sécurisée
                  </p>
                  <h3 className="text-2xl md:text-3xl font-normal mb-4 text-center md:text-left" style={{ fontFamily: "'Playfair Display', serif", color: '#1a2332' }}>
                    Trouver le bon locataire, dans les bonnes conditions
                  </h3>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                      Mettre un bien en location demande une attention particulière, tant sur le plan juridique que financier.
                      Nous vous accompagnons dans la mise en location de votre bien en assurant une recherche rigoureuse de locataires, fondée sur des critères de solvabilité et de sérieux.
                    </p>
                    <p>Nous prenons en charge :</p>
                    <ul className="space-y-2 ml-0 md:ml-4 md:list-disc md:list-inside">
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>la commercialisation du bien,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>l'étude des dossiers,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>la sélection des candidats,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>la rédaction du bail,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>et la mise en place de la location.</span>
                      </li>
                    </ul>
                    <p>
                      Notre objectif est de vous permettre de louer votre bien en toute sérénité, dans le respect de la réglementation en vigueur.
                    </p>
                  </div>
                  <a
                    ref={locationCtaRef}
                    href="/services/location"
                    className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 mt-6 mx-auto ${isLocationCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Découvrir notre service de location</span>
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

              {/* Service 4: Gestion locative */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-24">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden md:order-1">
                  <Image
                    src="/gestion.jpg"
                    alt="Service Gestion locative"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                      Gestion locative
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col justify-center md:order-2">
                  <p className="text-xl md:text-2xl font-normal mb-3 text-center md:text-left" style={{ color: '#D4AF37' }}>
                    Déléguez la gestion de votre patrimoine
                  </p>
                  <h3 className="text-2xl md:text-3xl font-normal mb-4 text-center md:text-left" style={{ fontFamily: "'Playfair Display', serif", color: '#1a2332' }}>
                    Une gestion locative complète et sereine
                  </h3>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                      La gestion d'un bien locatif demande du temps, de la disponibilité et une bonne connaissance des obligations légales.
                      En nous confiant la gestion de votre patrimoine, vous choisissez une solution simple, claire et sécurisée.
                    </p>
                    <p>Nous assurons :</p>
                    <ul className="space-y-2 ml-0 md:ml-4 md:list-disc md:list-inside">
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>le suivi des loyers,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>la gestion des relations avec les locataires,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>le suivi de l'entretien courant,</span>
                      </li>
                      <li className="flex items-start gap-2 md:flex-none">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>et la coordination des interventions nécessaires.</span>
                      </li>
                    </ul>
                    <p>
                      Vous bénéficiez d'un interlocuteur unique et d'un suivi régulier, pour une gestion fluide et sans contrainte.
                    </p>
                  </div>
                  <a
                    ref={gestionCtaRef}
                    href="/services/gestion"
                    className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 mt-6 mx-auto ${isGestionCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Découvrir notre service de gestion</span>
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
