'use client';

import { useEffect } from 'react';
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrixM2PerierPage() {
  // Injection des metadata SEO pour les composants client
  useEffect(() => {
    // Title
    document.title = 'Prix m2 Marseille Périer (8e) : Analyse Réelle 2026 par Rue';
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Découvrez le prix au m2 à Périer (13008) en 2026. Analyse des ventes réelles, quartiers prisés et impact du standing. Évitez les moyennes trompeuses.');
    
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
                Quel est le prix réel du m2 à Marseille Périer (8e) en 2026 ?
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
                  Le quartier Périer n'est pas une statistique, c'est un micromarché. Si les portails nationaux affichent une moyenne lissée autour de 4 550 €/m², cette donnée est souvent inutile pour un propriétaire. À Périer, entre un rez-de-chaussée sombre et un dernier étage avec terrasse avec une vue sur la colline de Notre Dame de la Garde, le prix peut varier du simple au double.
                </p>
              </div>

              {/* Pourquoi le prix moyen à Périer est souvent trompeur */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Pourquoi le prix moyen à Périer est souvent trompeur ?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Afficher un prix moyen est rassurant, mais la réalité du terrain dans le 8ème arrondissement est plus complexe. En 2026, nous observons trois strates de prix distinctes :
                </p>
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ color: '#1a2332' }}>
                      Le "Périer Prestige" (5 800 €/m² et +)
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Concerne les biens d'exception, souvent situés dans le Carré d'Or, rue Lord Duveen ou dans les résidences ultra-calmes de la rue du Commandant Rolland. Ici, la vue dégagée et le calme absolu se paient au prix fort.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ color: '#1a2332' }}>
                      Le "Périer Classique" (4 400 € - 5 200 €/m²)
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      C'est le cœur du marché. Des appartements familiaux dans des immeubles de standing des années 70 ou du Haussmannien bien entretenu sur la rue Paradis.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ color: '#1a2332' }}>
                      Le "Périer Urbain" (3 500 € - 4 200 €/m²)
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Biens situés sur des axes plus passants comme le Boulevard Périer ou à proximité immédiate du rond-point du Prado, subissant des nuisances sonores ou nécessitant une rénovation lourde.
                    </p>
                  </div>
                </div>
              </div>

              {/* Analyse par micro-secteurs */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Analyse par micro-secteurs : Où se situent les valeurs hautes ?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Pour comprendre le prix de votre appartement, il faut regarder ce que les acheteurs ciblent prioritairement en 2026 :
                </p>
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ color: '#1a2332' }}>
                      La proximité des écoles de renom
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Un appartement de type 4 ou 5 situé à moins de 10 minutes à pied de l'École Provence ou de Mermoz bénéficie d'une prime de rareté. Les familles sont prêtes à payer 10% de plus pour cette sectorisation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ color: '#1a2332' }}>
                      L'accessibilité stratégique
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Le secteur proche du Métro Périer reste une valeur refuge pour les actifs, garantissant une revente rapide.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ color: '#1a2332' }}>
                      Le facteur "Vue et Terrasse"
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      À Marseille, le soleil est une monnaie. Une terrasse de plus de 15m² avec une exposition Sud/Ouest peut ajouter jusqu'à 60 000 € à la valeur finale d'un bien par rapport à un balcon simple.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tendances 2026 */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Tendances 2026 : Faut-il vendre ou attendre à Périer ?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Après la correction de 2024-2025, le marché du 8ème arrondissement s'est stabilisé. Les acquéreurs sont désormais des "experts" : ils comparent tout.
                </p>
                <div className="space-y-4 mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>Les délais de vente :</strong> Ils sont passés de 45 à 75 jours pour les biens sans défaut.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>La marge de négociation :</strong> Elle se situe autour de 4% pour les biens affichés au prix de marché.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>Le conseil de l'expert :</strong> Si votre bien dispose d'un box ou d'un garage fermé, vous détenez un avantage concurrentiel majeur. Le stationnement à Périer est devenu le premier critère de refus des acheteurs qualifiés.
                  </p>
                </div>
              </div>

              {/* Comment transformer ces chiffres en prix de vente réel */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Comment transformer ces chiffres en prix de vente réel ?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Le prix au m² est une boussole, pas une destination. Pour fixer un prix qui génère des offres sans brader votre patrimoine, vous devez intégrer :
                </p>
                <ul className="space-y-2 text-lg text-gray-700 mb-6 ml-6 list-disc">
                  <li>Le montant exact des charges de copropriété (très scrutées en 2026).</li>
                  <li>La performance énergétique (DPE), devenue un levier de négociation agressif.</li>
                  <li>L'état des parties communes de votre immeuble.</li>
                </ul>
              </div>

              {/* Encart Conversion */}
              <div className="mb-12 bg-gray-50 p-8 rounded-lg border-2" style={{ borderColor: '#1a2332' }}>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                  Ne vous fiez pas à une estimation automatique. Pour obtenir une analyse basée sur les dernières ventes réelles de votre rue, consultez notre{' '}
                  <Link 
                    href="/actualites/estimation-perier-marseille-8e" 
                    className="text-[#1a2332] underline hover:text-[#D4AF37] transition-colors font-semibold"
                  >
                    Service d'Estimation Immobilière Périer
                  </Link>
                  . Rapport complet sous 24h.
                </p>
                <div className="text-center">
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
