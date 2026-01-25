'use client';

import { useEffect } from 'react';
import Footer from "@/components/Footer";
import Link from "next/link";

export default function EstimationPerierPage() {
  // Injection des metadata SEO pour les composants client
  useEffect(() => {
    // Title
    document.title = 'Estimation Appartement Marseille Périer (8e) | Prix m2 2026';
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Propriétaire à Périer ? Évitez les erreurs des outils en ligne. Obtenez une estimation immobilière chirurgicale sous 24h par un expert du 8ème arrondissement.');
    
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
                Estimation immobilière à Marseille Périer (8e) : Ne laissez pas un algorithme brader votre patrimoine.
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
                  Estimer un appartement dans le 8ème arrondissement de Marseille ne se résume pas à une moyenne au mètre carré. Entre le dynamisme du Boulevard Périer et la sérénité du Carré d'Or, les écarts de prix peuvent atteindre 25 % pour une même surface. Un outil automatique ignore si votre bien est situé dans une résidence de standing avec gardien ou s'il bénéficie d'une vue dégagée sur Notre-Dame de la Garde.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ici, nous ne faisons pas de l'approximation. Nous réalisons des analyses de terrain chirurgicales sous 24h pour les propriétaires exigeants de Périer.
                </p>

                {/* CTA #1 */}
                <div className="text-center mb-6">
                  <Link
                    href="/estimation/formulaire"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Demander mon expertise locale (Réponse sous 24h)</span>
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

              {/* Le marché immobilier à Périer en 2026 */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Le marché immobilier à Périer en 2026 : Analyse du Carré d'Or
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Le quartier Périer reste l'un des secteurs les plus résilients de Marseille. En 2026, malgré une stabilisation globale du marché dans le 13008, la demande pour les appartements familiaux de standing reste supérieure à l'offre.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <strong>Prix moyen observé :</strong> Entre 4 500 € et 5 800 € / m² pour les biens d'exception.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <strong>Micro-secteurs clés :</strong> Les biens situés à proximité immédiate des écoles renommées (Mermoz, Provence) ou du Tunnel Prado-Carénage conservent une surcote structurelle.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  <strong>L'effet "Extérieur" :</strong> À Périer, l'absence de balcon ou de terrasse est aujourd'hui un facteur de décote majeur (jusqu'à -15 %).
                </p>
              </div>

              {/* Pourquoi une "Estimation Terrain" est indispensable */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Pourquoi une "Estimation Terrain" est indispensable dans le 8ème ?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Contrairement aux plateformes nationales qui traitent Périer comme une simple donnée statistique, notre méthode intègre les réalités de quartier que seuls les Marseillais connaissent :
                </p>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span><strong>L'adresse exacte :</strong> Un appartement rue Lord Duveen n'aura pas la même valeur qu'un bien situé sur un axe bruyant, même à 50 mètres de distance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span><strong>La santé de la copropriété :</strong> Nous analysons les procès-verbaux d'assemblée générale. À Périer, un ravalement de façade voté ou une toiture à refaire impacte immédiatement votre net vendeur de plusieurs dizaines de milliers d'euros.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span><strong>L'exposition et l'étage :</strong> Dans le 8e, la luminosité est une monnaie d'échange. Un 4ème étage sans vis-à-vis se vend 15% plus cher qu'un 1er étage sombre.</span>
                  </li>
                </ul>
              </div>

              {/* Notre protocole d'évaluation sous 24h */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Notre protocole d'évaluation sous 24h
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Nous avons banni les rapports générés par IA. Pour chaque demande d'estimation à Périer, nous suivons un processus rigoureux :
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#1a2332' }}>
                      Étape 1 : Analyse Comparative de Marché
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Nous croisons les données réelles des ventes notariées (base DVF) des 6 derniers mois dans votre rue spécifique.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#1a2332' }}>
                      Étape 2 : Pondération "Périer"
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Ajustement du prix en fonction des prestations (Climatisation, cuisine équipée, stationnement privatif, proximité métro Périer).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#1a2332' }}>
                      Étape 3 : Rendu du Dossier d'Expertise
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Sous 24 heures, vous recevez un rapport détaillé justifiant le prix de mise en vente optimal pour attirer des acquéreurs qualifiés, et non des curieux.
                    </p>
                  </div>
                </div>

                {/* CTA #2 */}
                <div className="text-center mb-6">
                  <Link
                    href="/estimation/formulaire"
                    className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Obtenir mon dossier d'expertise sous 24h (Gratuit)</span>
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
