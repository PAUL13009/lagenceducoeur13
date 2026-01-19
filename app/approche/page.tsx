'use client';

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import AnimatedContent from "@/components/AnimatedContent";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";

export default function ApprochePage() {
  // Hooks pour détecter la visibilité des boutons CTA sur mobile
  const [heroCtaRef, isHeroCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
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
                Notre Approche
              </h1>
              <div className="flex justify-center items-center">
                <a
                  ref={heroCtaRef}
                  href="#formulaire"
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCtaVisible ? 'cta-visible' : ''}`}
                >
                  <span>Découvrir notre approche</span>
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

        {/* Section 1 : Une autre façon de vendre */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une autre façon de vendre un bien immobilier à Marseille
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Chez L'Agence du Cœur, nous avons fait le choix d'exercer notre métier avec exigence, transparence et responsabilité.
                  Vendre un bien immobilier est souvent une étape importante, parfois chargée d'enjeux personnels, financiers ou familiaux. Notre rôle est de vous accompagner dans cette démarche avec sérieux, méthode et clarté.
                </p>
                <p className="text-center">
                  Notre approche repose sur une conviction simple :
                  il est possible de faire bien son métier d'agent immobilier, tout en donnant du sens à chaque vente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 : Une approche fondée sur la réalité du marché */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une approche fondée sur la réalité du marché
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Avant toute chose, nous sommes une agence immobilière professionnelle, ancrée dans la réalité du marché marseillais.
                  Chaque projet que nous accompagnons fait l'objet d'une analyse rigoureuse, basée sur les caractéristiques réelles du bien, son environnement, la demande actuelle et les ventes comparables récentes.
                </p>
                <p className="text-center">
                  Nous ne travaillons ni sur des estimations approximatives, ni sur des promesses irréalistes.
                  Un prix juste est la condition essentielle d'une vente réussie.
                </p>
                <p className="text-center">
                  Notre expérience nous a appris une règle simple et constante :
                  un bien positionné au prix du marché se vend, dans la majorité des cas, dans les deux mois suivant sa mise en vente.
                </p>
                <p className="text-center">
                  C'est sur cette base que nous conseillons nos clients, avec honnêteté et responsabilité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 : L'humain au cœur de chaque projet */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                L'humain au cœur de chaque projet
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  L'immobilier est un métier de chiffres, mais aussi — et surtout — un métier de relations humaines.
                  Nous avons créé L'Agence du Cœur avec la volonté d'apporter une dimension plus humaine à l'accompagnement immobilier, sans jamais renoncer aux exigences du métier.
                </p>
                <p className="text-center">
                  Ici, pas de discours démagogique ou idéalisé.
                  Nous croyons simplement que chaque action, même à petite échelle, peut avoir un impact positif lorsqu'elle est menée avec sincérité et cohérence.
                </p>
                <p className="text-center">
                  Notre rôle est de vous écouter, de vous conseiller et de vous accompagner avec justesse, à chaque étape de votre projet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 : Le Bien par le Bien */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                « Le Bien par le Bien » : un engagement concret
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Notre engagement solidaire est clair, mesurable et transparent.
                  Lors de chaque vente réalisée par l'agence, 13 % de notre commission nette sont reversés à une association, choisie librement par le vendeur.
                </p>
                <p className="text-center">
                  Ce don est effectué sans aucun surcoût, et dans le respect du cadre légal.
                  Le vendeur reçoit un CERFA à son nom, ouvrant droit à une réduction d'impôt.
                </p>
                <p className="text-center">
                  Ainsi, la vente d'un bien immobilier devient à la fois :
                </p>
                <ul className="list-disc list-inside space-y-2 max-w-2xl mx-auto">
                  <li>un projet personnel abouti,</li>
                  <li>une transaction menée dans de bonnes conditions,</li>
                  <li>et une action solidaire concrète.</li>
                </ul>
              </div>

              {/* Exemple de calcul */}
              <div className="mt-12 max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-normal mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Exemple pour un bien vendu à 400 000€ FAI
                </h3>
                
                <div className="space-y-4">
                  {/* Section 1 : Commission agence */}
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="bg-white border-2 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer" style={{ borderColor: '#1a2332' }}>
                      <div className="flex justify-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white" style={{ backgroundColor: '#1a2332' }}>
                          1
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: '#1a2332' }}>
                        Commission agence
                      </h4>
                      <p className="text-3xl font-semibold mb-2" style={{ color: '#1a2332' }}>
                        20 000€
                      </p>
                      <p className="text-sm text-gray-600 mb-2">(5% du prix FAI)</p>
                      <p className="text-sm text-gray-700">Prix net vendeur : <span className="font-semibold">380 000€</span></p>
                    </div>
                  </AnimatedContent>

                  {/* Section 2 : Déduction TVA */}
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="bg-white border-2 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer" style={{ borderColor: '#1a2332' }}>
                      <div className="flex justify-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white" style={{ backgroundColor: '#1a2332' }}>
                          2
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: '#1a2332' }}>
                        Déduction TVA
                      </h4>
                      <p className="text-3xl font-semibold mb-2" style={{ color: '#1a2332' }}>
                        - 4 000€
                      </p>
                      <p className="text-sm text-gray-600 mb-2">(20% de TVA)</p>
                      <p className="text-sm text-gray-700">Reste : <span className="font-semibold">16 000€</span></p>
                    </div>
                  </AnimatedContent>

                  {/* Section 3 : Frais forfaitaires */}
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="bg-white border-2 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer" style={{ borderColor: '#1a2332' }}>
                      <div className="flex justify-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white" style={{ backgroundColor: '#1a2332' }}>
                          3
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: '#1a2332' }}>
                        Frais forfaitaires
                      </h4>
                      <p className="text-3xl font-semibold mb-2" style={{ color: '#1a2332' }}>
                        - 1 600€
                      </p>
                      <p className="text-sm text-gray-600 mb-2">(10% de frais)</p>
                      <p className="text-sm text-gray-600">Photos, publicités, déplacements...</p>
                    </div>
                  </AnimatedContent>

                  {/* Section 4 : Commission nette */}
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.3}
                    threshold={0.2}
                  >
                    <div className="bg-white border-2 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer" style={{ borderColor: '#1a2332' }}>
                      <div className="flex justify-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white" style={{ backgroundColor: '#1a2332' }}>
                          4
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: '#1a2332' }}>
                        Commission nette
                      </h4>
                      <p className="text-3xl font-semibold mb-2" style={{ color: '#1a2332' }}>
                        14 400€
                      </p>
                      <p className="text-sm text-gray-600">Avant impôts</p>
                    </div>
                  </AnimatedContent>

                  {/* Section 5 : Don à l'association (mise en évidence) */}
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.4}
                    threshold={0.2}
                  >
                    <div className="bg-white border-4 rounded-lg p-6 shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer" style={{ borderColor: '#D4AF37', backgroundColor: '#fef9e7' }}>
                      <div className="flex justify-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white" style={{ backgroundColor: '#D4AF37' }}>
                          5
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: '#1a2332' }}>
                        Don à l'association
                      </h4>
                      <p className="text-3xl font-semibold mb-2" style={{ color: '#1a2332' }}>
                        1 872€
                      </p>
                      <p className="text-sm text-gray-600">13% de la commission nette</p>
                    </div>
                  </AnimatedContent>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 : Une méthode simple, claire et assumée */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une méthode simple, claire et assumée
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Notre accompagnement repose sur une méthode structurée et transparente.
                  Chaque projet débute par une estimation sérieuse, suivie d'une stratégie de commercialisation adaptée au bien et à son contexte.
                </p>
                <p className="text-center">
                  La vente est menée avec rigueur, jusqu'à sa conclusion.
                  Une fois la transaction finalisée, le don est reversé à l'association sélectionnée, et l'ensemble de la démarche est formalisé.
                </p>
                <p className="text-center">
                  Nous croyons qu'un cadre clair est essentiel pour instaurer une relation de confiance durable.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl md:text-2xl font-normal text-gray-900 mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif", color: '#1a2332' }}>
                    Une agence responsable et engagée dans son métier
                  </h3>
                  <p className="text-center">
                    L'Agence du Cœur respecte strictement les règles et les obligations de la profession immobilière.
                    Notre équipe est formée, certifiée et se forme en continu, conformément à la réglementation en vigueur.
                  </p>
                  <p className="text-center mt-4">
                    Nous privilégions la qualité des projets à la quantité des mandats.
                    Cette exigence est un choix assumé : elle garantit un accompagnement sérieux, une meilleure efficacité et des ventes menées dans de bonnes conditions, pour toutes les parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 : Une sélection volontaire des projets */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une sélection volontaire des projets
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Nous ne cherchons pas à travailler avec tous les vendeurs.
                  Nous accompagnons uniquement des projets réels, portés par des propriétaires prêts à s'engager dans une démarche professionnelle et à considérer une estimation fondée sur la réalité du marché.
                </p>
                <p className="text-center">
                  Cette sélection est une garantie de sérieux, autant pour nos clients que pour les acquéreurs que nous accompagnons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 : Choisir L'Agence du Cœur */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Choisir L'Agence du Cœur, c'est faire le choix :
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">D'un accompagnement immobilier rigoureux</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">D'une estimation honnête et argumentée</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">D'une vente efficace</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.3}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Et d'un impact positif sans compromis sur le professionnalisme</p>
                    </div>
                  </AnimatedContent>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA finale */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-col items-center gap-3">
                <a
                  ref={finalCtaRef}
                  href="/estimation"
                  className={`cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isFinalCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Découvrir notre méthode d'estimation</span>
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
                  Estimation gratuite réservée aux projets sérieux et cohérents avec le marché
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
