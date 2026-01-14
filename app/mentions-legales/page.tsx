'use client';

import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';

export default function MentionsLegalesPage() {
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
    <div className="min-h-screen flex flex-col bg-white">
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
      
      <main className="flex-grow pt-20">
        {/* Section Hero */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-normal mb-4 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Mentions Légales
              </h1>
              <p className="text-lg text-gray-600">
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique
              </p>
            </div>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* 1. Éditeur du site */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  1. Éditeur du site
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3 text-gray-700">
                  <p><strong>Raison sociale :</strong> L'Agence du Cœur</p>
                  <p><strong>Forme juridique :</strong> SARL</p>
                  <p><strong>Siège social :</strong> 96 Rue Paradis, 13008 Marseille</p>
                  <p><strong>SIRET :</strong> 897 514 907 00020</p>
                  <p><strong>RCS :</strong> 897 514 907 R.C.S. Marseille</p>
                  <p><strong>Capital social :</strong> 1 000 €</p>
                  <p><strong>TVA Intracommunautaire :</strong> FR12897514907</p>
                  <p><strong>Téléphone :</strong> <a href="tel:+33663706051" className="text-[#1a2332] hover:underline">+33 6 63 70 60 51</a></p>
                  <p><strong>Email :</strong> <a href="mailto:immo@lagenceducoeur.com" className="text-[#1a2332] hover:underline">immo@lagenceducoeur.com</a></p>
                  <p><strong>Directeur de publication :</strong> David Tordjmann</p>
                </div>
              </div>

              {/* 2. Hébergement */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  2. Hébergement
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3 text-gray-700">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> Avenue Huart Hamoir 71, 1030 Bruxelles, Belgique</p>
                  <p><strong>Email :</strong> <a href="mailto:privacy@vercel.com" className="text-[#1a2332] hover:underline">privacy@vercel.com</a></p>
                </div>
              </div>

              {/* 3. Propriété intellectuelle */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  3. Propriété intellectuelle
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                    Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                  </p>
                  <p>
                    La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de publication.
                  </p>
                  <p>
                    La reproduction des textes de ce site sur un support papier est autorisée, notamment dans un cadre pédagogique, sous réserve du respect des trois conditions suivantes :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>gratuité de la diffusion</li>
                    <li>respect de l'intégrité des documents reproduits (aucune modification ni altération)</li>
                    <li>citation claire et lisible de la source sous la forme : "Document issu du site internet lagenceducoeur.com - Droits de reproduction réservés et limités"</li>
                  </ul>
                </div>
              </div>

              {/* 4. Protection des données personnelles */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  4. Protection des données personnelles
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
                    vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                  </p>
                  <p>
                    Les données personnelles collectées sur ce site sont destinées à L'Agence du Cœur pour :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>le traitement de vos demandes d'estimation</li>
                    <li>le traitement de vos demandes de vente</li>
                    <li>le traitement de vos demandes de location</li>
                    <li>le traitement de vos demandes de gestion locative</li>
                    <li>l'amélioration de nos services</li>
                    <li>la communication d'informations relatives à nos services (avec votre consentement)</li>
                  </ul>
                  <p>
                    Ces données sont conservées pour une durée maximale de 3 ans à compter de votre dernier contact avec notre agence, 
                    sauf obligation légale ou réglementaire nécessitant une conservation plus longue.
                  </p>
                  <p>
                    Pour exercer vos droits, vous pouvez nous contacter :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>par email à : <a href="mailto:immo@lagenceducoeur.com" className="text-[#1a2332] hover:underline">immo@lagenceducoeur.com</a></li>
                    <li>par courrier à : 96 Rue Paradis, 13008 Marseille</li>
                  </ul>
                  <p>
                    Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) 
                    si vous estimez que le traitement de vos données personnelles constitue une violation du règlement applicable.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>CNIL :</strong> 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07 - Téléphone : 01 53 73 22 22
                  </p>
                </div>
              </div>

              {/* 5. Cookies */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  5. Cookies
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic du site. 
                    Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web.
                  </p>
                  <p>
                    Les cookies utilisés sur ce site sont :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Cookies techniques :</strong> nécessaires au fonctionnement du site</li>
                    <li><strong>Cookies de session :</strong> pour mémoriser vos préférences pendant votre visite</li>
                    <li><strong>Cookies analytiques :</strong> pour analyser l'utilisation du site (si vous utilisez Google Analytics ou un outil similaire)</li>
                  </ul>
                  <p>
                    Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient ne plus être accessibles.
                  </p>
                </div>
              </div>

              {/* 6. Responsabilité */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  6. Responsabilité
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    L'Agence du Cœur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, 
                    dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu.
                  </p>
                  <p>
                    Toutefois, L'Agence du Cœur ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
                  </p>
                  <p>
                    En conséquence, L'Agence du Cœur décline toute responsabilité :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site</li>
                    <li>pour tout dommage résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site</li>
                    <li>pour tout dommage, direct ou indirect, quelle qu'en soit la cause, l'origine, la nature ou les conséquences, 
                        provoqué à raison de l'accès de quiconque au site ou de l'impossibilité d'y accéder</li>
                    <li>pour l'utilisation du site et/ou du crédit accordé à une quelconque information provenant directement ou indirectement de ce dernier</li>
                  </ul>
                </div>
              </div>

              {/* 7. Liens hypertextes */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  7. Liens hypertextes
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    La mise en place d'un lien hypertexte vers le site lagenceducoeur.com nécessite une autorisation préalable écrite de L'Agence du Cœur.
                  </p>
                  <p>
                    L'Agence du Cœur ne saurait être tenue responsable du contenu des sites vers lesquels elle établit des liens.
                  </p>
                </div>
              </div>

              {/* 8. Droit applicable et juridiction */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  8. Droit applicable et juridiction
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Les présentes mentions légales sont régies par le droit français.
                  </p>
                  <p>
                    En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
                  </p>
                </div>
              </div>

              {/* 9. Médiation */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  9. Médiation
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Conformément aux articles L.611-1 et R.612-1 et suivants du Code de la consommation concernant le règlement amiable des litiges, 
                    L'Agence du Cœur adhère au service du médiateur suivant :
                  </p>
                  <p className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <strong>Médiateur de la consommation</strong><br />
                    Conformément aux articles L.611-1 et R.612-1 et suivants du Code de la consommation, 
                    vous pouvez contacter le médiateur de la consommation compétent pour votre secteur d'activité.
                  </p>
                  <p className="text-sm text-gray-600">
                    Pour plus d'informations, vous pouvez consulter le site du médiateur de la consommation :{' '}
                    <a href="https://www.economie.gouv.fr/mediation-conso" target="_blank" rel="noopener noreferrer" className="text-[#1a2332] hover:underline">www.economie.gouv.fr/mediation-conso</a>
                  </p>
                </div>
              </div>

              {/* 10. Assurance professionnelle */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  10. Assurance professionnelle
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    L'Agence du Cœur est couverte par une assurance responsabilité civile professionnelle 
                    conformément aux obligations légales applicables aux agences immobilières.
                  </p>
                  <p className="text-sm text-gray-600">
                    Pour obtenir les informations relatives à notre assurance professionnelle, 
                    vous pouvez nous contacter à <a href="mailto:immo@lagenceducoeur.com" className="text-[#1a2332] hover:underline">immo@lagenceducoeur.com</a>.
                  </p>
                </div>
              </div>

              {/* Bouton retour */}
              <div className="pt-8 border-t border-gray-200">
                <Link
                  href="/"
                  className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all inline-flex items-center justify-center gap-2"
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Retour à l'accueil</span>
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
