'use client';

import { useEffect } from 'react';
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrixM2PerierPage() {
  // Injection des metadata SEO pour les composants client
  useEffect(() => {
    // Title
    document.title = 'Prix m² Périer (Marseille 8e) en 2026 - Analyse des tendances immobilières';
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Découvrez le prix moyen du m² à Périer (Marseille 8e) en 2026. Données fiables, analyse du marché local, repères réalistes pour vendre ou acheter en toute sérénité.');
    
    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.lagenceducoeur.fr/actualites/prix-m2-perier-marseille-8e');
  }, []);

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
                Quel est le prix du m2 à Périer (Marseille 8e) en 2026 ?
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
                  Connaître le prix moyen au mètre carré dans son quartier est essentiel pour vendre ou acheter un bien immobilier en toute sérénité. Cet article présente les derniers chiffres du marché immobilier à Périer, quartier résidentiel du 8e arrondissement de Marseille, ainsi que les tendances observées ces dernières années. Les données présentées proviennent de sources fiables (base DVF des ventes réelles, observatoires immobiliers) et donnent un aperçu réaliste de la valeur de l'immobilier dans ce secteur. Comprendre ces repères permet de mieux appréhender son projet, qu'il s'agisse de vendre au juste prix ou d'acheter en connaissance de cause.
                </p>
              </div>

              {/* Prix moyen actuel */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Le prix moyen actuel à Périer
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Le quartier Périer affiche actuellement des prix au mètre carré avoisinant les 4 500 € pour les appartements anciens. D'après les données récentes compilées en 2025-2026, le prix moyen se situe autour de 4 400 à 4 600 € du m² dans ce secteur. Par exemple, le portail Efficity estime en janvier 2026 un prix moyen d'environ 4 390 €/m² sur Périer, tandis que des médias spécialisés comme Figaro Immobilier indiquent un prix médian proche de 4 585 €/m² pour le quartier.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  En pratique, les transactions effectuées montrent une grande fourchette de valeurs. La majorité des ventes d'appartements à Périer se situent entre environ 3 400 € et 5 400 € par m² selon les caractéristiques du bien. Un petit appartement à rafraîchir peut ainsi se vendre autour de 3 500 €/m², tandis qu'un bien rénové avec terrasse et emplacement premium peut dépasser les 5 000 €/m².
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Comparé à la moyenne de Marseille, Périer se positionne dans la moyenne haute de l'offre immobilière marseillaise. Le 8e arrondissement compte parmi les secteurs les plus recherchés de la ville, en particulier pour les appartements familiaux. Cette position s'explique par la qualité du cadre de vie (proximité des plages du Prado, commodités urbaines, rues calmes) et par un bon niveau de prestations des immeubles résidentiels.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4" style={{ color: '#1a2332' }}>
                    Fourchette de prix au m² à Périer (indicateurs 2026)
                  </h3>
                  <ul className="space-y-2 text-lg text-gray-700">
                    <li><strong>Prix bas :</strong> environ 3 400 €/m² (biens nécessitant des travaux, rez-de-chaussée sans extérieur)</li>
                    <li><strong>Prix moyen :</strong> environ 4 400 à 4 600 €/m² (biens standards en bon état)</li>
                    <li><strong>Prix haut :</strong> au-delà de 5 000 €/m² (biens rénovés avec extérieur, dernier étage, standing élevé)</li>
                  </ul>
                </div>
              </div>

              {/* Variations et tendances */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Variations et tendances du marché à Périer
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Après plusieurs années de hausse continue, le marché immobilier marseillais a connu une stabilisation depuis fin 2024. Sur le secteur de Périer et plus généralement dans le 8e arrondissement, les 12 derniers mois ont vu un léger fléchissement des prix. Les données officielles indiquent environ -1,5 % sur un an fin 2025 pour les appartements du 8e arrondissement. Les notaires observent qu'au premier semestre 2024, le prix médian des appartements anciens dans le 8e était quasi stable (-0,4 % en un an).
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Cette correction modérée n'enlève rien à l'attractivité du quartier. La demande reste présente pour les biens de qualité, notamment les appartements familiaux avec balcon et parking. Le quartier Périer, composé majoritairement d'appartements en immeubles résidentiels, a plutôt bien résisté avec des valeurs qui se maintiennent autour de leur plateau haut atteint en 2022-2023. Certains professionnels parlent d'un marché qui "se tasse" : les vendeurs ont dû intégrer la hausse des taux d'intérêt et la moindre solvabilité des acheteurs, ce qui a freiné la hausse des prix et allongé les délais de vente.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Cette stabilisation s'explique par plusieurs facteurs. La hausse des taux d'intérêt a réduit la capacité d'emprunt des acquéreurs, créant une pression à la baisse sur les prix. Parallèlement, les acheteurs sont devenus plus sélectifs et n'hésitent plus à négocier. En 2024, plus de 70 % des transactions marseillaises se concluaient après négociation, avec un rabais moyen d'environ 5 % par rapport au prix affiché. En fin d'année 2024, les professionnels locaux notaient qu'il était courant d'obtenir -3 à -4 % lors de la vente.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Malgré ce contexte ajusté, Périer conserve ses atouts fondamentaux : quartier résidentiel prisé, bien desservi par les transports (métro Périer), proche des commodités et des espaces verts. Le marché reste dynamique pour les biens correctement positionnés, avec des délais de vente qui s'allongent légèrement pour les biens surestimés. Cette période de stabilisation est finalement saine : elle garantit des prix plus réalistes, ni surévalués ni bradés.
                </p>
              </div>

              {/* Comment interpréter le prix au m² */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Comment interpréter le prix au m² : une moyenne indicative
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Il est important de comprendre que le prix au m² est un indicateur statistique, pas une vérité absolue. Chaque bien immobilier est unique, et de nombreux facteurs peuvent faire varier significativement la valeur d'un appartement par rapport à la moyenne du quartier. Le prix moyen de 4 500 €/m² évoqué précédemment ne constitue qu'un point de repère : le prix réel de votre appartement dépendra de sa propre configuration et de ses caractéristiques spécifiques.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Plusieurs critères influencent directement la valeur au m² d'un appartement à Périer. L'étage et la présence d'un ascenseur ont un impact notable : un dernier étage lumineux avec ascenseur sera mieux valorisé qu'un rez-de-chaussée sombre, avec des écarts pouvant atteindre 10 à 15 %. La présence d'un extérieur privatif (balcon, loggia, terrasse) est également un facteur déterminant. Selon une étude de 2025, un appartement avec balcon ou terrasse en PACA se vend en moyenne +12 % plus cher qu'un bien similaire sans extérieur, et cette plus-value dépasse +15 % pour les grandes terrasses de plus de 10 m².
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  L'état général du bien et celui de la copropriété jouent un rôle majeur. Un logement entièrement rénové se vendra nettement plus cher qu'un appartement nécessitant des travaux. Si des réparations importantes sont à prévoir (électricité, plomberie, ravalement de façade, étanchéité), le prix de vente s'en ressentira à la baisse, l'acheteur intégrant ces coûts futurs dans son calcul. De même, une copropriété bien entretenue, avec des charges maîtrisées et aucune grosse réparation à l'horizon, inspirera confiance et permettra de mieux maintenir la valeur du bien.
                </p>
                <div className="text-center mb-6">
                  <Link
                    href="/actualites/estimation-perier-marseille-8e"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Pour une évaluation précise, faites estimer gratuitement votre appartement à Périer</span>
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
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  L'exposition et la luminosité sont également des critères valorisants. Un appartement bien exposé (sud ou est/ouest), lumineux, avec une vue dégagée, peut voir sa valeur augmenter de 5 % à 20 % par rapport à un logement sombre donnant sur une cour étroite. La micro-localisation dans le quartier compte également : un appartement situé dans une rue calme et recherchée, proche des commodités, se valorisera mieux qu'un équivalent donnant sur un boulevard passant. Deux adresses à 300 m de distance peuvent afficher plusieurs centaines d'euros d'écart par mètre carré si l'une est plus prisée que l'autre.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  D'autres éléments peuvent également modifier la valeur : la surface totale (les petits appartements ont parfois un m² plus cher), la distribution des pièces, l'année de construction, la présence d'un stationnement privatif, ou encore l'environnement immédiat (présence d'espaces verts, commerces de proximité, standing perçu de la rue). En combinant tous ces facteurs, on comprend pourquoi le prix moyen ne suffit pas à décrire la réalité du marché à Périer.
                </p>
              </div>

              {/* Conclusion */}
              <div className="mb-12">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  En résumé, Périer reste un quartier attractif avec des prix solides autour de 4 500 €/m² en moyenne, mais la valeur de chaque bien dépend des critères particuliers que nous avons détaillés. Les chiffres présentés donnent un repère crédible et actuel du marché immobilier dans le quartier. Pour traduire ces données en valeur réelle pour votre appartement, il convient de les croiser avec les spécificités de votre logement et, idéalement, de solliciter une analyse personnalisée qui comparera votre bien aux ventes récentes équivalentes dans le quartier.
                </p>
                <div className="text-center mb-6">
                  <Link
                    href="/actualites/estimation-perier-marseille-8e"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Demandez votre estimation gratuite à Périer</span>
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
            "@type": "Article",
            "headline": "Prix m² Périer (Marseille 8e)",
            "author": {
              "@type": "Organization",
              "name": "L'Agence du Cœur"
            },
            "datePublished": "2026-01-18",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.lagenceducoeur.fr/actualites/prix-m2-perier-marseille-8e"
            }
          })
        }}
      />
    </div>
  );
}
