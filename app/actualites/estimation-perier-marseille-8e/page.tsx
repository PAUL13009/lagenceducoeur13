'use client';

import { useEffect } from 'react';
import Footer from "@/components/Footer";
import Link from "next/link";

export default function EstimationPerierPage() {
  // Injection des metadata SEO pour les composants client
  useEffect(() => {
    // Title
    document.title = 'Estimation appartement Périer Marseille 8 - Prix m² 2026';
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Estimation immobilière personnalisée à Périer (Marseille 8). Fourchette de prix réaliste basée sur les ventes récentes et les caractéristiques de votre bien. Gratuite et sans engagement.');
    
    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.lagenceducoeur.fr/actualites/estimation-perier-marseille-8e');
  }, []);
  // SVG pour la coche verte
  const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Section Hero */}
        <section 
          className="relative text-white h-[60vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/imagehero.png')`,
          }}
        >
          {/* Overlay pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Bouton de retour en haut à gauche */}
          <div className="absolute top-4 left-4 z-20">
            <Link
              href="/actualites"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-white font-semibold">Retour</span>
            </Link>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                Estimation appartement Périer (Marseille 8) : obtenir votre évaluation immobilière
              </h1>
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Vous souhaitez connaître la valeur de votre appartement à Périer, dans le 8e arrondissement de Marseille ? Cette page vous explique comment obtenir une estimation immobilière fiable et personnalisée pour votre bien dans ce quartier résidentiel prisé. Situé à proximité des plages du Prado et des commodités urbaines, Périer offre un cadre de vie apprécié pour ses immeubles de standing et ses rues calmes, tout en restant bien desservi par les transports.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Une estimation précise de votre appartement à Périer vous permet de fixer un prix de vente réaliste, adapté aux conditions du marché actuel. Contrairement aux estimations automatiques qui se basent uniquement sur des moyennes statistiques, notre approche prend en compte les spécificités de votre bien : étage, exposition, présence d'un ascenseur, extérieur, état général, et contexte de la copropriété.
                </p>

                {/* CTA #1 */}
                <div className="text-center mb-6">
                  <Link
                    href="/estimation/formulaire"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Demandez votre estimation gratuite</span>
                    <svg 
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Contexte des prix immobiliers à Périer */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Contexte des prix immobiliers à Périer : situation du marché en 2026
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Le quartier Périer se caractérise par un marché immobilier dynamique, avec des prix au mètre carré qui se situent actuellement autour de 4 400 à 4 600 € pour les appartements anciens. Comme détaillé dans <Link href="/actualites/prix-m2-perier-marseille-8e" className="text-[#1a2332] underline hover:text-[#D4AF37] transition-colors">notre étude sur le prix du m² à Périer</Link>, cette moyenne cache en réalité une grande variabilité selon les caractéristiques de chaque bien. Les transactions récentes montrent une fourchette allant d'environ 3 400 €/m² pour les appartements nécessitant des travaux à plus de 5 400 €/m² pour les biens rénovés avec extérieur et emplacement premium.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Après plusieurs années de hausse soutenue, le marché marseillais, et celui de Périer en particulier, connaît depuis fin 2024 une période de stabilisation. Les prix se sont légèrement ajustés (-1,5 % environ sur un an pour le 8e arrondissement), reflétant l'impact de la hausse des taux d'intérêt et d'une demande plus sélective. Cette correction modérée n'a cependant pas remis en cause l'attractivité du quartier : la demande reste solide pour les appartements de qualité, notamment les biens familiaux avec balcon et stationnement.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Dans ce contexte, avoir une estimation juste de votre appartement à Périer est essentiel pour éviter deux écueils : surestimer votre bien (qui le fait rester en vente trop longtemps) ou le sous-estimer (qui vous fait perdre de la valeur). C'est pourquoi il est recommandé de s'appuyer sur une analyse personnalisée, qui croise les données de marché avec les spécificités réelles de votre logement.
                </p>

                {/* CTA #2 */}
                <div className="text-center mb-6">
                  <Link
                    href="/estimation/formulaire"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Demandez votre estimation gratuite</span>
                    <svg 
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Méthode d'estimation */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Méthode d'estimation : comment nous évaluons votre appartement à Périer
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  L'estimation de votre appartement à Périer repose sur une méthode en deux étapes, qui combine données de marché et analyse terrain. Cette approche vous garantit une fourchette de prix réaliste, ajustée aux particularités de votre bien, plutôt qu'une simple moyenne statistique.
                </p>

                <div className="space-y-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#1a2332' }}>
                      Étape 1 : Analyse comparative et repères de marché
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Dans un premier temps, nous recueillons les informations clés concernant votre appartement : type de bien, surface habitable, nombre de pièces, étage, présence d'un ascenseur, extérieur (balcon ou terrasse), état général, et contexte de la copropriété. Ces données sont ensuite croisées avec plusieurs sources :
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 ml-4 mb-4">
                      <li>Les ventes récentes dans le quartier Périer (base DVF – Demande de valeurs foncières)</li>
                      <li>Les références notariales locales, lorsque pertinentes</li>
                      <li>Les prix de marché observés pour des biens similaires dans le 8e arrondissement</li>
                    </ul>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Cette première étape donne une base chiffrée, mais elle ne suffit pas. En effet, deux appartements identiques sur le papier peuvent voir leur valeur varier de 10 à 20 % selon qu'ils disposent d'un ascenseur, d'un extérieur, ou selon leur état de présentation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#1a2332' }}>
                      Étape 2 : Ajustement terrain et critères spécifiques à Périer
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      C'est dans cette seconde phase que se joue la précision de l'estimation. Nous affinons l'évaluation en tenant compte de ce que les chiffres bruts ne révèlent pas :
                    </p>
                    <ul className="space-y-3 text-gray-700 mb-4">
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>Qualité de l'immeuble</strong> : standing, entretien des parties communes, gestion de copropriété</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>Micro-emplacement</strong> : rue calme vs axe passant, proximité des commodités, environnement immédiat</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>Points de valeur ajoutée</strong> : luminosité, exposition, vue dégagée, stationnement privatif</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>Points d'attention</strong> : travaux à prévoir, copropriété fragile, vis-à-vis, nuisances potentielles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>Stratégie de vente</strong> : positionnement optimal sur le marché, saisonnalité, délai de mise en vente</span>
                      </li>
                    </ul>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Ces éléments permettent d'affiner la fourchette de prix initiale et de vous proposer une valeur marchande réaliste, celle qui correspond réellement au prix de vente envisageable pour votre appartement à Périer dans les conditions du marché actuel.
                    </p>
                  </div>
                </div>
              </div>

              {/* Facteurs locaux spécifiques */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Facteurs locaux spécifiques à Périer qui influencent la valeur immobilière
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Périer présente des caractéristiques qui impactent directement la valeur des appartements. Connaître ces critères vous aide à comprendre pourquoi votre bien peut se situer au-dessus ou en dessous de la moyenne du quartier.
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ color: '#1a2332' }}>
                      Emplacement et micro-localisation dans le quartier
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Périer n'est pas un quartier homogène. L'écart de valorisation peut être significatif entre un appartement situé dans une rue calme et résidentielle (comme certaines rues proches du parc Bonneveine ou des axes résidentiels) et un bien donnant sur le boulevard Périer ou l'avenue du Prado, plus passants. De même, la proximité du métro Périer, des commerces de proximité et des écoles est un atout qui se reflète dans le prix au m². L'environnement immédiat – présence d'espaces verts, standing perçu de la rue – joue également un rôle non négligeable.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ color: '#1a2332' }}>
                      Standing des immeubles et qualité de copropriété
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      À Périer, on trouve des immeubles de périodes et de standing variés. Un appartement dans une résidence bien entretenue, avec des charges maîtrisées et sans travaux importants à l'horizon, aura une valeur mieux préservée qu'un bien dans une copropriété présentant des fragilités (charges élevées, ravalement à prévoir, problèmes de toiture, etc.). La santé financière de la copropriété est scrutée par les acheteurs et influence directement le prix de vente.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ color: '#1a2332' }}>
                      Critères de valorisation très marqués dans le 8e arrondissement
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Certains éléments ont un poids particulièrement fort sur la valeur à Périer :
                    </p>
                    <ul className="space-y-3 text-gray-700 mb-6">
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>L'étage et l'ascenseur</strong> : un appartement au dernier étage avec ascenseur se valorise nettement plus qu'un rez-de-chaussée, surtout s'il bénéficie d'une belle vue</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>L'extérieur privatif</strong> : balcon, loggia ou terrasse sont très recherchés à Marseille. Cette plus-value peut représenter +12 à +15 % sur la valeur</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>Le stationnement</strong> : pour deux biens équivalents dans le même immeuble, disposer d'un box ou d'une place privée reste un atout valorisant</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>L'état et la prestation</strong> : un appartement rénové, avec une cuisine et une salle de bain récentes, se vendra mieux qu'un bien à refaire</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong>L'exposition et la luminosité</strong> : un appartement bien exposé (sud ou est/ouest), lumineux, avec une vue dégagée, se valorise de 5 à 20 % de plus qu'un logement sombre</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ces facteurs expliquent pourquoi deux appartements à Périer, de surface identique et dans le même secteur, peuvent présenter un écart de valorisation de plusieurs centaines d'euros par mètre carré. C'est précisément pour tenir compte de ces nuances que l'estimation personnalisée est essentielle : elle vous donne le prix réel de votre bien, pas une moyenne théorique.
                </p>
              </div>

              {/* CTA principal */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Obtenir votre estimation gratuite à Périer
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Pour connaître la valeur marchande de votre appartement à Périer, vous pouvez faire une demande d'estimation personnalisée. Le formulaire se complète en quelques minutes, en deux étapes. Plus vous êtes précis dans les informations fournies (caractéristiques du bien, état, équipements), plus l'estimation sera fiable.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Après réception de votre demande, vous recevrez sous 24 à 48h une fourchette de prix réaliste et argumentée, adaptée aux spécificités de votre appartement à Périer. Cette estimation vous aidera à définir votre stratégie de vente et à fixer un prix d'annonce cohérent avec le marché local.
                </p>

                <div className="text-center mb-4">
                  <Link
                    href="/estimation/formulaire"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Demandez votre estimation gratuite</span>
                    <svg 
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <p className="text-center text-sm text-gray-500">
                  2 étapes - Quelques minutes - Gratuit et sans engagement
                </p>
              </div>

              {/* Ce que vous recevez */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Ce que vous recevez après votre demande d'estimation
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Une fois votre demande d'estimation complétée pour votre appartement à Périer, vous recevrez une réponse détaillée qui comprend :
                </p>
                <ul className="space-y-3 text-lg text-gray-700 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span><strong>Une fourchette de prix réaliste</strong>, basée sur l'analyse comparative et les repères de marché actuels à Périer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span><strong>Les points forts de votre bien</strong> qui valorisent l'appartement (emplacement, prestations, état, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span><strong>Les éventuels points d'attention</strong> qui peuvent impacter la valeur ou la vente (travaux à prévoir, copropriété, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span><strong>Une recommandation stratégique</strong> pour optimiser votre mise en vente et votre positionnement prix</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Cette estimation personnalisée vous donne une vision claire et objective de la valeur de votre appartement à Périer. Elle vous permet d'aborder votre projet de vente en toute connaissance de cause, avec un prix réaliste qui favorisera les visites et les offres sérieuses, tout en préservant la valeur de votre bien.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Données structurées Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Estimation appartement Périer",
            "areaServed": {
              "@type": "Place",
              "name": "Marseille 8e - Quartier Périer"
            },
            "serviceType": "Estimation immobilière",
            "provider": {
              "@type": "RealEstateAgent",
              "name": "L'Agence du Cœur"
            }
          })
        }}
      />
    </div>
  );
}
