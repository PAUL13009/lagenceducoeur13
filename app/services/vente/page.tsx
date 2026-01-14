'use client';

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import AnimatedContent from "@/components/AnimatedContent";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";

export default function VentePage() {
  // Hooks pour détecter la visibilité des boutons CTA sur mobile
  const [heroCtaRef, isHeroCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [pointCtaRef, isPointCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [estimationCtaRef, isEstimationCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
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
                Vente
              </h1>
              <div className="flex justify-center items-center">
                <a
                  ref={heroCtaRef}
                  href="/services/vente/formulaire"
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCtaVisible ? 'cta-visible' : ''}`}
                >
                  <span>Vendre mon bien</span>
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

        {/* Section 1 : Vendre au bon prix */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Vendre au bon prix, avec une stratégie claire et un accompagnement engagé
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Vendre un bien immobilier ne consiste pas à afficher un prix et attendre.
                  C'est un projet structuré, qui demande une analyse fine du marché, une stratégie de commercialisation cohérente et un accompagnement professionnel à chaque étape.
                </p>
                <p className="text-center">
                  À Marseille, un bien positionné au prix du marché se vend généralement dans les deux mois suivant sa mise en ligne.
                  Notre mission est simple : vous permettre d'atteindre cet objectif, dans les meilleures conditions.
                </p>
                <p className="text-center text-sm text-gray-500 italic mt-8">
                  Cette approche s'adresse aux vendeurs ayant un réel projet de vente.
                </p>
                <div className="flex justify-center mt-8">
                  <a
                    ref={pointCtaRef}
                    href="/estimation"
                    className={`cta-button group bg-transparent border-2 px-6 py-3 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isPointCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Faire le point sur votre projet de vente</span>
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

        {/* Section 2 : Notre vision de la vente immobilière */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Notre vision de la vente immobilière
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Une vente réussie commence par une stratégie réaliste
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="text-center">
                  Chez L'Agence du Cœur, nous considérons que la réussite d'une vente repose sur un principe fondamental :
                  le prix doit être en adéquation avec le marché réel, pas avec une attente idéalisée.
                </p>
                <p className="text-center">
                  Nous ne signons pas de mandats dans le seul but d'en afficher le nombre.
                  Nous signons des mandats pour vendre, avec une méthode éprouvée et des objectifs clairs :
                </p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Déclencher des visites qualifiées</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Créer une vraie dynamique de commercialisation</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Sécuriser la transaction</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.3}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Aboutir à une vente concrète</p>
                    </div>
                  </AnimatedContent>
                </div>
                <p className="text-center text-sm text-gray-500 italic mt-8">
                  Cette exigence est un engagement autant pour vous que pour nous.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 : Un accompagnement professionnel */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Un accompagnement professionnel, de bout en bout
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Bien plus qu'une mise en ligne d'annonce
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Vendre avec notre agence, c'est bénéficier d'un accompagnement structuré et continu, incluant notamment :
                </p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Une analyse approfondie de votre bien et de son environnement</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Une estimation argumentée, fondée sur des données de marché fiables</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Une stratégie de mise en valeur adaptée</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Une diffusion ciblée</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">La sélection rigoureuse des acquéreurs</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#1a2332' }}>
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-800">Un suivi complet jusqu'à la signature définitive</p>
                  </div>
                </div>
                <p className="text-center mt-8">
                  Chaque étape est pensée pour maximiser vos chances de vendre efficacement, sans précipitation ni improvisation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 : Ce que nous acceptons... et ce que nous refusons */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Ce que nous acceptons… et ce que nous refusons
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Un filtre assumé, pour des ventes efficaces
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="text-center">
                  Nous faisons un choix clair : nous ne travaillons pas avec tous les vendeurs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  {/* Carte Acceptation */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h3 className="text-xl font-semibold" style={{ color: '#1a2332' }}>Nous accompagnons des propriétaires qui :</h3>
                    </div>
                    <div className="space-y-4">
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0}
                        threshold={0.2}
                      >
                        <div className="animated-card bg-white p-5 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                          <p className="text-gray-800">Ont un projet de vente sérieux et réfléchi</p>
                        </div>
                      </AnimatedContent>
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.1}
                        threshold={0.2}
                      >
                        <div className="animated-card bg-white p-5 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                          <p className="text-gray-800">Acceptent d'être conseillés par un professionnel</p>
                        </div>
                      </AnimatedContent>
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.2}
                        threshold={0.2}
                      >
                        <div className="animated-card bg-white p-5 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                          <p className="text-gray-800">Comprennent l'importance d'un prix cohérent avec le marché</p>
                        </div>
                      </AnimatedContent>
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.3}
                        threshold={0.2}
                      >
                        <div className="animated-card bg-white p-5 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                          <p className="text-gray-800">Souhaitent une vente efficace plutôt qu'une illusion de prix</p>
                        </div>
                      </AnimatedContent>
                    </div>
                  </div>

                  {/* Carte Refus */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                        <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h3 className="text-xl font-semibold" style={{ color: '#1a2332' }}>En revanche, nous ne nous engageons pas sur :</h3>
                    </div>
                    <div className="space-y-4">
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0}
                        threshold={0.2}
                      >
                        <div className="animated-card-red bg-white p-5 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#dc2626' }}>
                          <p className="text-gray-800">Des projets de simple curiosité</p>
                        </div>
                      </AnimatedContent>
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.1}
                        threshold={0.2}
                      >
                        <div className="animated-card-red bg-white p-5 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#dc2626' }}>
                          <p className="text-gray-800">Des comparaisons systématiques entre agences</p>
                        </div>
                      </AnimatedContent>
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.2}
                        threshold={0.2}
                      >
                        <div className="animated-card-red bg-white p-5 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#dc2626' }}>
                          <p className="text-gray-800">Des mandats signés uniquement sur la base du prix le plus élevé</p>
                        </div>
                      </AnimatedContent>
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.3}
                        threshold={0.2}
                      >
                        <div className="animated-card-red bg-white p-5 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#dc2626' }}>
                          <p className="text-gray-800">Des biens volontairement surévalués</p>
                        </div>
                      </AnimatedContent>
                      <AnimatedContent
                        distance={50}
                        duration={0.6}
                        delay={0.4}
                        threshold={0.2}
                      >
                        <div className="animated-card-red bg-white p-5 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#dc2626' }}>
                          <p className="text-gray-800">Des vendeurs refusant toute remise en question du prix</p>
                        </div>
                      </AnimatedContent>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 italic mt-8">
                  Ce positionnement est la condition indispensable pour obtenir des résultats concrets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 : Le prix juste */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Le prix juste : clé d'une vente rapide
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Pourquoi nous privilégions la réalité du marché ?
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="font-semibold text-center">Un bien correctement estimé attire :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Plus de visites</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Des acquéreurs réellement qualifiés</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Génère une dynamique favorable dès les premières semaines</p>
                    </div>
                  </AnimatedContent>
                </div>
                <p className="font-semibold text-center mt-10">À l'inverse, un bien surévalué :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#dc2626' }}>
                      <p className="text-gray-800">Reste en ligne</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#dc2626' }}>
                      <p className="text-gray-800">Se dévalorise avec le temps</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#dc2626' }}>
                      <p className="text-gray-800">Finit souvent par se vendre en dessous de son prix initial</p>
                    </div>
                  </AnimatedContent>
                </div>
                <p className="text-center mt-8">
                  Notre rôle est de vous éviter ce scénario, en vous proposant une stratégie de prix cohérente, expliquée et assumée.
                </p>
                <p className="text-center text-sm text-gray-500 italic mt-8">
                  Si cette approche vous correspond, la première étape est une estimation sérieuse !
                </p>
                <div className="flex justify-center mt-8">
                  <a
                    ref={estimationCtaRef}
                    href="/estimation"
                    className={`cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isEstimationCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Demandez une estimation professionnelle</span>
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

        {/* Section 6 : Une vente qui a du sens */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une vente qui a du sens
              </h2>
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Un impact positif, sans compromis sur l'efficacité
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Dans le cadre de chaque vente réalisée par l'agence,
                  13 % de notre commission nette sont reversés à une association choisie par le vendeur.
                </p>
                <p className="text-center">
                  Cette dimension solidaire est un engagement complémentaire, jamais une contrainte.
                  Elle permet de donner du sens à votre projet immobilier, sans jamais altérer la qualité du travail réalisé.
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
              <p className="text-xl md:text-2xl font-normal mb-8 text-center" style={{ color: '#1a2332' }}>
                Cette page est une première étape de sélection
              </p>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p className="text-center">
                  Si vous êtes arrivé jusqu'ici, c'est probablement que :
                </p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Votre projet est réel</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Vous recherchez un accompagnement sérieux</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800">Vous êtes prêt à travailler avec un professionnel engagé</p>
                    </div>
                  </AnimatedContent>
                </div>
                <p className="text-center mt-8">
                  La suite du parcours est volontairement sélective.
                  L'estimation que nous proposons est réservée aux projets de vente mûrs, pour lesquels un travail approfondi est pertinent.
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
                Prêt à vendre dans de bonnes conditions ?
              </h2>
              <div className="flex flex-col items-center gap-3">
                <a
                  ref={finalCtaRef}
                  href="/estimation"
                  className={`cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isFinalCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Demander une estimation précise de votre bien à Marseille</span>
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
                  Première étape réservée aux vendeurs engagés dans un projet de vente sérieux
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
