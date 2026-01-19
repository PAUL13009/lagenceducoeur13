'use client';

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import AnimatedContent from "@/components/AnimatedContent";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";

export default function EstimationPage() {
  // Hooks pour détecter la visibilité des boutons CTA sur mobile
  const [heroCtaRef, isHeroCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [visionCtaRef, isVisionCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [etapeCtaRef, isEtapeCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
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
                Estimation
              </h1>
              <div className="flex justify-center items-center">
                <a
                  ref={heroCtaRef}
                  href="/estimation/formulaire"
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCtaVisible ? 'cta-visible' : ''}`}
                >
                  <span>Demander une estimation réaliste de votre bien</span>
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

        {/* Section Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une estimation utile commence par un projet réel
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  L'estimation d'un bien immobilier n'est pas un simple chiffre.
                  C'est la première décision stratégique d'une vente réussie.
                </p>
                <p>
                  Chez L'Agence du Cœur, nous réalisons des estimations uniquement pour des projets de vente sérieux, portés par des propriétaires prêts à s'engager dans une démarche professionnelle.
                </p>
                <p>
                  Si vous souhaitez "tester le marché" ou obtenir un prix sans réelle intention de vendre, cette démarche ne sera probablement pas adaptée.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Notre vision de l'estimation */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Notre vision de l'estimation
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Une estimation basée sur la réalité du marché, pas sur des promesses
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="font-semibold text-center">Une estimation fiable repose sur :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Les caractéristiques réelles de votre bien</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Son environnement</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Le contexte du marché marseillais</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.3}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Les ventes comparables récentes</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.4}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">La demande actuelle des acquéreurs</p>
                    </div>
                  </AnimatedContent>
                </div>
                <p className="text-center">
                  Nous ne pratiquons ni surévaluation pour séduire,
                  ni estimation approximative.
                </p>
                <p className="font-semibold text-center">
                  Notre objectif est simple :
                  vous permettre de vendre dans les meilleures conditions, au bon prix.
                </p>
              </div>
              <div className="text-center">
                <a
                  ref={visionCtaRef}
                  href="#vision"
                  className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 mx-auto ${isVisionCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Voir si votre projet correspond à notre vision</span>
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

        {/* Section Notre règle */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Notre règle est simple et assumée
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Un bien positionné au prix du marché se vend, en moyenne, dans les deux mois suivant sa mise en vente.
                </p>
                <div>
                  <p className="font-semibold text-center mb-6">Un bien surévalué :</p>
                  <div className="space-y-4 max-w-2xl mx-auto">
                    <AnimatedContent
                      distance={50}
                      duration={0.6}
                      delay={0}
                      threshold={0.2}
                    >
                      <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                        <p className="text-gray-800 text-center">Attire moins d'acheteurs</p>
                      </div>
                    </AnimatedContent>
                    <AnimatedContent
                      distance={50}
                      duration={0.6}
                      delay={0.1}
                      threshold={0.2}
                    >
                      <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                        <p className="text-gray-800 text-center">Reste plus longtemps en ligne</p>
                      </div>
                    </AnimatedContent>
                    <AnimatedContent
                      distance={50}
                      duration={0.6}
                      delay={0.2}
                      threshold={0.2}
                    >
                      <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                        <p className="text-gray-800 text-center">Finit souvent par se vendre… moins bien</p>
                      </div>
                    </AnimatedContent>
                  </div>
                </div>
                <p className="text-center">
                  C'est pourquoi nous travaillons uniquement avec des vendeurs prêts à entendre un avis professionnel, même lorsqu'il diffère d'une estimation personnelle ou émotionnelle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section À qui s'adresse cette estimation */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-12 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                À qui s'adresse cette estimation ?
              </h2>
              
              <div className="space-y-8 mb-8 max-w-4xl mx-auto">
                {/* Première carte */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl md:text-2xl font-normal mb-6 flex items-center justify-center gap-3" style={{ fontFamily: "'Playfair Display', serif", color: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Cette estimation est faite pour vous si :</span>
                  </h3>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <div className="max-w-2xl mx-auto">
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
                          <p className="text-gray-800">Vous avez un projet réel de vente</p>
                        </div>
                      </AnimatedContent>
                    </div>
                    <div className="max-w-2xl mx-auto">
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
                          <p className="text-gray-800">Vous souhaitez un avis professionnel et argumenté</p>
                        </div>
                      </AnimatedContent>
                    </div>
                    <div className="space-y-4">
                      <p className="text-center font-semibold">Vous êtes prêt à :</p>
                      <div className="space-y-4 max-w-2xl mx-auto">
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
                            <p className="text-gray-800">Échanger</p>
                          </div>
                        </AnimatedContent>
                        <AnimatedContent
                          distance={50}
                          duration={0.6}
                          delay={0.3}
                          threshold={0.2}
                        >
                          <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="text-gray-800">Poser des questions</p>
                          </div>
                        </AnimatedContent>
                        <AnimatedContent
                          distance={50}
                          duration={0.6}
                          delay={0.4}
                          threshold={0.2}
                        >
                          <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="text-gray-800">Comprendre le marché</p>
                          </div>
                        </AnimatedContent>
                      </div>
                    </div>
                    <div className="max-w-2xl mx-auto">
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.5}
                        threshold={0.2}
                      >
                        <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                          <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="text-gray-800">Vous acceptez que le prix soit basé sur la réalité du marché, et non sur un objectif idéal</p>
                        </div>
                      </AnimatedContent>
                    </div>
                  </div>
                </div>

                {/* Deuxième carte */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl md:text-2xl font-normal mb-6 flex items-center justify-center gap-3" style={{ fontFamily: "'Playfair Display', serif", color: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                      <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Cette estimation n'est pas adaptée si :</span>
                  </h3>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <div className="space-y-4 max-w-2xl mx-auto">
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0}
                        threshold={0.2}
                      >
                        <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#dc2626' }}>
                          <p className="text-gray-800 text-center">Vous cherchez un prix "pour voir"</p>
                        </div>
                      </AnimatedContent>
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.1}
                        threshold={0.2}
                      >
                        <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#dc2626' }}>
                          <p className="text-gray-800 text-center">Vous refusez toute discussion autour du prix</p>
                        </div>
                      </AnimatedContent>
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.2}
                        threshold={0.2}
                      >
                        <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#dc2626' }}>
                          <p className="text-gray-800 text-center">Vous souhaitez uniquement une estimation rapide, sans analyse</p>
                        </div>
                      </AnimatedContent>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conclusion */}
              <p className="text-center text-lg text-gray-600 leading-relaxed">
                Ce positionnement nous permet de travailler efficacement et sereinement, pour vous comme pour nous.
              </p>
            </div>
          </div>
        </section>

        {/* Section Comment se déroule une estimation */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-12 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Comment se déroule une estimation avec L'Agence du Cœur ?
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-4" style={{ borderColor: '#1a2332' }}>
                      <span className="text-2xl font-normal flex-shrink-0" style={{ color: '#1a2332', fontFamily: "'Playfair Display', serif" }}>1</span>
                      <p className="text-gray-800">Analyse de votre projet et de votre situation</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-4" style={{ borderColor: '#1a2332' }}>
                      <span className="text-2xl font-normal flex-shrink-0" style={{ color: '#1a2332', fontFamily: "'Playfair Display', serif" }}>2</span>
                      <p className="text-gray-800">Étude approfondie de votre bien</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-4" style={{ borderColor: '#1a2332' }}>
                      <span className="text-2xl font-normal flex-shrink-0" style={{ color: '#1a2332', fontFamily: "'Playfair Display', serif" }}>3</span>
                      <p className="text-gray-800">Analyse du marché local à Marseille</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.3}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-4" style={{ borderColor: '#1a2332' }}>
                      <span className="text-2xl font-normal flex-shrink-0" style={{ color: '#1a2332', fontFamily: "'Playfair Display', serif" }}>4</span>
                      <p className="text-gray-800">Présentation d'une estimation argumentée</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.4}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-4" style={{ borderColor: '#1a2332' }}>
                      <span className="text-2xl font-normal flex-shrink-0" style={{ color: '#1a2332', fontFamily: "'Playfair Display', serif" }}>5</span>
                      <p className="text-gray-800">Échange ouvert et transparent</p>
                    </div>
                  </AnimatedContent>
                </div>
                <p className="text-center">
                  Chaque estimation est réalisée avec rigueur, écoute et honnêteté.
                </p>
                <div className="text-center mt-8">
                  <a
                    ref={etapeCtaRef}
                    href="/estimation/formulaire"
                    className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 mx-auto ${isEtapeCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Commencez par la première étape</span>
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

        {/* Section Un engagement mutuel */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-12 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Un engagement mutuel
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Nous nous engageons à vous fournir une estimation sérieuse et cohérente, vous conseiller avec transparence, respecter votre projet et vos objectifs.
                </p>
                <p className="text-center">
                  En retour, nous attendons une réelle intention de vendre, une ouverture à l'échange et une relation de confiance.
                </p>
                <p className="text-center">
                  C'est sur cette base que naissent les ventes réussies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA finale */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Vous avez un projet de vente sérieux à Marseille ?
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="font-semibold">Si vous êtes prêt à :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Travailler avec un professionnel</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Recevoir une estimation réaliste</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Vendre dans de bonnes conditions</p>
                    </div>
                  </AnimatedContent>
                </div>
              </div>
              <div className="text-center">
                <a
                  ref={finalCtaRef}
                  href="/estimation/formulaire"
                  className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 mx-auto ${isFinalCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Vous pouvez effectuer votre demande d'estimation</span>
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
      </main>

      <Footer />
    </div>
  );
}
