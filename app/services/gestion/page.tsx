'use client';

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import AnimatedContent from "@/components/AnimatedContent";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";

export default function GestionPage() {
  // Hooks pour détecter la visibilité des boutons CTA sur mobile
  const [heroCtaRef, isHeroCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [echangeCtaRef, isEchangeCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [finalCtaRef, isFinalCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
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
              <h1 className="text-5xl md:text-6xl font-normal mb-8 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                Gestion Locative
              </h1>
              <div className="flex justify-center items-center">
                <a
                  ref={heroCtaRef}
                  href="/services/gestion/formulaire"
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCtaVisible ? 'cta-visible' : ''}`}
                >
                  <span>Confier la gestion de mon bien</span>
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

        {/* Section 1 : Une gestion locative sérieuse */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une gestion locative sérieuse, pensée sur le long terme
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  La gestion d'un bien locatif ne se limite pas à encaisser des loyers.
                  Elle demande de la disponibilité, de la rigueur et une parfaite maîtrise du cadre réglementaire.
                </p>
                <p className="text-center">
                  Notre mission est de gérer votre bien à Marseille de manière professionnelle et durable, tout en protégeant vos intérêts.
                </p>
                <p className="text-center text-sm text-gray-500 italic mt-8">
                  Ce service s'adresse aux propriétaires souhaitant une gestion encadrée et responsable.
                </p>
                <div className="flex justify-center mt-8">
                  <a
                    ref={echangeCtaRef}
                    href="/services/gestion/formulaire"
                    className={`cta-button group bg-transparent border-2 px-6 py-3 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isEchangeCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Échanger sur votre projet de gestion</span>
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

        {/* Section 2 : Notre vision de la gestion */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Notre vision de la gestion
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Stabilité, transparence et suivi régulier
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="text-center">
                  Nous considérons la gestion locative comme un engagement réciproque.
                  Notre priorité est de sécuriser votre investissement, en assurant un suivi rigoureux et une communication claire.
                </p>
                <p className="font-semibold text-center">Nous privilégions :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Des locataires sélectionnés avec soin</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Un suivi précis et sécurisé des loyers</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Une gestion réactive aux situations courantes</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Une transparence totale dans les échanges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 : Ce que comprend notre gestion */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Ce que comprend notre gestion
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Un accompagnement clair et structuré
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="font-semibold text-center">Nous assurons notamment :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Le suivi des loyers et des paiements</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">La gestion des relations avec les locataires</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">La coordination des interventions nécessaires</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.3}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Le respect des obligations réglementaires</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.4}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Un reporting régulier</p>
                    </div>
                  </AnimatedContent>
                </div>
                <p className="text-center mt-8">
                  Chaque action est pensée pour préserver la valeur de votre bien et votre tranquillité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 : Une gestion responsable */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une gestion responsable
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Comme pour nos autres services, une partie de notre commission nette est reversée à une association, choisie par le propriétaire.
                </p>
                <p className="text-center">
                  Un engagement discret, intégré naturellement à notre façon de travailler.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 : CTA finale */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Confier la gestion de votre bien en toute sérénité
              </h2>
              <div className="flex flex-col items-center gap-3">
                <a
                  ref={finalCtaRef}
                  href="/services/gestion/formulaire"
                  className={`cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isFinalCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Parlez-nous de votre projet de gestion locative à Marseille</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <p className="text-sm text-gray-600">
                  Premier échange réservé aux propriétaires sérieux souhaitant une gestion professionnelle et durable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
