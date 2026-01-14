'use client';

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import AnimatedContent from "@/components/AnimatedContent";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";

export default function LocationPage() {
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
                Location
              </h1>
              <div className="flex justify-center items-center">
                <a
                  ref={heroCtaRef}
                  href="/services/location/formulaire"
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCtaVisible ? 'cta-visible' : ''}`}
                >
                  <span>Mettre mon bien en location</span>
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

        {/* Section 1 : Une mise en location encadrée */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une mise en location encadrée, pas improvisée
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Louer un bien immobilier engage votre patrimoine.
                  Un mauvais choix de locataire ou un cadre mal maîtrisé peut avoir des conséquences durables.
                </p>
                <p className="text-center">
                  Notre rôle est simple :
                  vous permettre de louer votre bien à Marseille en toute sécurité, avec une méthode claire et un accompagnement professionnel.
                </p>
                <p className="text-center text-sm text-gray-500 italic mt-8">
                  Ce service s'adresse aux propriétaires souhaitant louer dans de bonnes conditions.
                </p>
                <div className="flex justify-center mt-8">
                  <a
                    ref={echangeCtaRef}
                    href="/services/location/formulaire"
                    className={`cta-button group bg-transparent border-2 px-6 py-3 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isEchangeCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Échanger sur votre projet de location</span>
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

        {/* Section 2 : Notre approche de la location */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Notre approche de la location
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Sécurité et cohérence avant tout
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="font-semibold text-center">Nous privilégions :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Un loyer aligné avec le marché</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Une sélection rigoureuse des locataires</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Un cadre juridique maîtrisé</p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 italic mt-8">
                  Nous ne cherchons pas à louer vite à tout prix, mais à louer correctement, pour protéger votre bien et votre tranquillité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 : Un accompagnement clair et structuré */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Un accompagnement clair et structuré
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                De l'analyse à la mise en place du bail
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="font-semibold text-center">Nous prenons en charge :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">L'analyse du bien et de son potentiel locatif</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">La définition d'un loyer cohérent</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">La mise en valeur et la diffusion ciblée</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">L'étude approfondie des dossiers</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">La sélection du locataire</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">La rédaction du bail</p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 italic mt-8">
                  Chaque étape est pensée pour sécuriser votre projet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 : Une sélection assumée */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une sélection assumée
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Tous les dossiers ne se valent pas
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  La sélection du locataire est une étape clé.
                  Nous étudions les dossiers avec rigueur afin de privilégier des profils sérieux et adaptés à votre bien.
                </p>
                <p className="text-center">
                  Cette exigence est volontaire.
                  Elle conditionne la réussite de la location sur le long terme.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 : Ce que nous acceptons… et ce que nous refusons */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Ce que nous acceptons… et ce que nous refusons
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="font-semibold text-center">Nous accompagnons les propriétaires qui :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-gray-800">Acceptent un loyer cohérent avec le marché</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-gray-800">Souhaitent une location encadrée et sécurisée</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-gray-800">Privilégient la qualité à la précipitation</p>
                    </div>
                  </AnimatedContent>
                </div>
                <p className="font-semibold text-center mt-10">Nous ne prenons pas en charge :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#dc2626' }}>
                      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                        <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-gray-800">Les loyers irréalistes</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#dc2626' }}>
                      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                        <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-gray-800">Les projets improvisés</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#dc2626' }}>
                      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                        <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-gray-800">Les refus de sélection des locataires</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.3}
                    threshold={0.2}
                  >
                    <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#dc2626' }}>
                      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                        <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-gray-800">Les cadres juridiques approximatifs</p>
                    </div>
                  </AnimatedContent>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 : Une location responsable */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une location responsable
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Comme pour nos autres services, une partie de notre commission nette est reversée à une association, choisie par le propriétaire.
                </p>
                <p className="text-center">
                  Un engagement discret, sans impact sur l'efficacité du service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 : Avant d'aller plus loin */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Avant d'aller plus loin
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Cette page est une première étape.
                  Si votre projet est réfléchi et cohérent, un premier échange permettra de vérifier s'il correspond à notre méthode.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8 : CTA finale */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Louer votre bien dans de bonnes conditions
              </h2>
              <div className="flex flex-col items-center gap-3">
                <a
                  ref={finalCtaRef}
                  href="/services/location/formulaire"
                  className={`cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isFinalCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Parler de votre projet de location à Marseille</span>
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
                  Premier échange réservé aux propriétaires souhaitant un accompagnement professionnel.
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
