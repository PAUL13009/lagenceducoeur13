'use client';

import Link from 'next/link';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';

export default function PolitiqueConfidentialitePage() {
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
                Politique de Confidentialité
              </h1>
              <p className="text-lg text-gray-600">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* Introduction */}
              <div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    L'Agence du Cœur (ci-après "nous", "notre", "nos") s'engage à protéger et respecter votre vie privée. 
                    Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles 
                    lorsque vous utilisez notre site web lagenceducoeur.com (ci-après "le Site").
                  </p>
                  <p>
                    En utilisant notre Site, vous acceptez les pratiques décrites dans cette politique de confidentialité. 
                    Si vous n'acceptez pas cette politique, veuillez ne pas utiliser notre Site.
                  </p>
                </div>
              </div>

              {/* 1. Responsable du traitement */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  1. Responsable du traitement
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3 text-gray-700">
                  <p><strong>Raison sociale :</strong> L'Agence du Cœur</p>
                  <p><strong>Forme juridique :</strong> SARL</p>
                  <p><strong>Siège social :</strong> 96 Rue Paradis, 13008 Marseille</p>
                  <p><strong>SIRET :</strong> 897 514 907 00020</p>
                  <p><strong>RCS :</strong> 897 514 907 R.C.S. Marseille</p>
                  <p><strong>Email :</strong> <a href="mailto:immo@lagenceducoeur.com" className="text-[#1a2332] hover:underline">immo@lagenceducoeur.com</a></p>
                  <p><strong>Téléphone :</strong> <a href="tel:+33663706051" className="text-[#1a2332] hover:underline">+33 6 63 70 60 51</a></p>
                </div>
              </div>

              {/* 2. Données collectées */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  2. Données personnelles collectées
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Nous collectons les données personnelles suivantes lorsque vous utilisez notre Site :
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">2.1. Données collectées via les formulaires</h3>
                      <p className="mb-2">Lorsque vous remplissez nos formulaires (demande d'estimation, demande de vente, demande de location, etc.), nous collectons :</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Nom et prénom</li>
                        <li>Adresse email</li>
                        <li>Numéro de téléphone</li>
                        <li>Adresse postale du bien concerné</li>
                        <li>Informations relatives à votre bien immobilier (surface, nombre de pièces, caractéristiques, etc.)</li>
                        <li>Informations relatives à votre projet (délai de vente, prix estimé, etc.)</li>
                        <li>Toute autre information que vous choisissez de nous communiquer</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">2.2. Données collectées automatiquement</h3>
                      <p className="mb-2">Lorsque vous visitez notre Site, nous collectons automatiquement :</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Adresse IP</li>
                        <li>Type de navigateur et version</li>
                        <li>Système d'exploitation</li>
                        <li>Pages visitées et durée de visite</li>
                        <li>Référent (site web d'origine)</li>
                        <li>Données de navigation (cookies, identifiants de session)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Finalités du traitement */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  3. Finalités du traitement des données
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Nous utilisons vos données personnelles aux fins suivantes :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Exécution des services demandés :</strong> traitement de vos demandes d'estimation, de vente, de location ou de gestion locative</li>
                    <li><strong>Communication :</strong> réponse à vos demandes et questions, prise de contact suite à votre demande</li>
                    <li><strong>Amélioration de nos services :</strong> analyse de l'utilisation du Site pour améliorer nos services et votre expérience utilisateur</li>
                    <li><strong>Obligations légales :</strong> respect de nos obligations légales et réglementaires en tant qu'agence immobilière</li>
                    <li><strong>Marketing (avec votre consentement) :</strong> envoi d'informations sur nos services, actualités immobilières, offres promotionnelles</li>
                    <li><strong>Sécurité :</strong> prévention de la fraude et sécurisation du Site</li>
                  </ul>
                </div>
              </div>

              {/* 4. Base légale du traitement */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  4. Base légale du traitement
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Le traitement de vos données personnelles est fondé sur les bases légales suivantes :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Exécution d'un contrat ou de mesures précontractuelles :</strong> traitement nécessaire pour répondre à votre demande de service</li>
                    <li><strong>Consentement :</strong> pour l'envoi de communications marketing (vous pouvez retirer votre consentement à tout moment)</li>
                    <li><strong>Obligation légale :</strong> pour respecter nos obligations en tant qu'agence immobilière (conservation des documents, etc.)</li>
                    <li><strong>Intérêt légitime :</strong> pour améliorer nos services et sécuriser notre Site</li>
                  </ul>
                </div>
              </div>

              {/* 5. Durée de conservation */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  5. Durée de conservation des données
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Données de contact et formulaires :</strong> 3 ans à compter de votre dernier contact avec notre agence</li>
                    <li><strong>Données de navigation (cookies) :</strong> 13 mois maximum</li>
                    <li><strong>Données liées à une transaction :</strong> durée légale de conservation (10 ans pour les documents comptables et fiscaux)</li>
                    <li><strong>Données de marketing :</strong> jusqu'à retrait de votre consentement ou 3 ans à compter de votre dernier contact</li>
                  </ul>
                  <p>
                    Passé ces délais, vos données sont supprimées ou anonymisées de manière sécurisée.
                  </p>
                </div>
              </div>

              {/* 6. Destinataires des données */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  6. Destinataires des données
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Vos données personnelles sont destinées à :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Personnel autorisé de L'Agence du Cœur :</strong> membres de l'équipe ayant besoin d'accéder à vos données pour traiter votre demande</li>
                    <li><strong>Prestataires techniques :</strong> hébergeur du Site, fournisseurs de services informatiques (sous contrat de confidentialité strict)</li>
                    <li><strong>Autorités compétentes :</strong> en cas d'obligation légale ou de réquisition judiciaire</li>
                  </ul>
                  <p>
                    Nous ne vendons jamais vos données personnelles à des tiers. Nous ne partageons vos données qu'avec des prestataires 
                    qui nous aident à exploiter notre Site et à fournir nos services, et uniquement dans le cadre d'accords de confidentialité stricts.
                  </p>
                </div>
              </div>

              {/* 7. Transfert de données hors UE */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  7. Transfert de données hors de l'Union Européenne
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Vos données personnelles sont stockées et traitées au sein de l'Union Européenne.
                  </p>
                  <p>
                    Si nous devions transférer vos données vers un pays situé en dehors de l'Union Européenne, 
                    nous nous assurerions que des garanties appropriées sont en place pour protéger vos données, 
                    conformément au RGPD (clauses contractuelles types, Privacy Shield, etc.).
                  </p>
                </div>
              </div>

              {/* 8. Vos droits */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  8. Vos droits concernant vos données personnelles
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">8.1. Droit d'accès</h3>
                      <p>Vous avez le droit d'obtenir une copie de vos données personnelles que nous détenons.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">8.2. Droit de rectification</h3>
                      <p>Vous avez le droit de corriger vos données personnelles inexactes ou incomplètes.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">8.3. Droit à l'effacement ("droit à l'oubli")</h3>
                      <p>Vous avez le droit de demander la suppression de vos données personnelles dans certains cas 
                        (données non nécessaires, retrait de consentement, etc.).</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">8.4. Droit à la limitation du traitement</h3>
                      <p>Vous avez le droit de demander la limitation du traitement de vos données dans certains cas.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">8.5. Droit à la portabilité</h3>
                      <p>Vous avez le droit de recevoir vos données dans un format structuré et de les transmettre à un autre responsable de traitement.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">8.6. Droit d'opposition</h3>
                      <p>Vous avez le droit de vous opposer au traitement de vos données pour des motifs légitimes, 
                        notamment pour les communications marketing.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">8.7. Droit de retirer votre consentement</h3>
                      <p>Lorsque le traitement est fondé sur votre consentement, vous pouvez le retirer à tout moment.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">8.8. Droit de définir des directives post-mortem</h3>
                      <p>Vous avez le droit de définir des directives concernant le sort de vos données après votre décès.</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <p className="text-gray-700">
                      <strong>Pour exercer vos droits :</strong> Vous pouvez nous contacter par email à{' '}
                      <a href="mailto:immo@lagenceducoeur.com" className="text-[#1a2332] hover:underline font-semibold">immo@lagenceducoeur.com</a>{' '}
                      ou par courrier à 96 Rue Paradis, 13008 Marseille. 
                      Nous répondrons à votre demande dans un délai d'un mois.
                    </p>
                    <p className="text-gray-700 mt-2">
                      Pour votre sécurité, nous pourrons vous demander une pièce d'identité pour vérifier votre identité avant de traiter votre demande.
                    </p>
                  </div>
                </div>
              </div>

              {/* 9. Réclamation auprès de la CNIL */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  9. Réclamation auprès de la CNIL
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD ou de la loi Informatique et Libertés, 
                    vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p><strong>CNIL</strong></p>
                    <p>3 Place de Fontenoy - TSA 80715</p>
                    <p>75334 PARIS CEDEX 07</p>
                    <p>Téléphone : 01 53 73 22 22</p>
                    <p>Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#1a2332] hover:underline">www.cnil.fr</a></p>
                  </div>
                </div>
              </div>

              {/* 10. Cookies */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  10. Cookies et technologies similaires
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Notre Site utilise des cookies et technologies similaires pour améliorer votre expérience de navigation et analyser l'utilisation du Site.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">10.1. Types de cookies utilisés</h3>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li><strong>Cookies strictement nécessaires :</strong> indispensables au fonctionnement du Site (cookies de session, authentification)</li>
                        <li><strong>Cookies de performance :</strong> pour analyser l'utilisation du Site et améliorer nos services</li>
                        <li><strong>Cookies de fonctionnalité :</strong> pour mémoriser vos préférences (langue, région, etc.)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">10.2. Gestion des cookies</h3>
                      <p>
                        Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du Site pourraient ne plus être accessibles.
                      </p>
                      <p className="mt-2">
                        Pour gérer vos préférences de cookies, vous pouvez modifier les paramètres de votre navigateur ou utiliser notre bandeau de consentement (si applicable).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 11. Sécurité des données */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  11. Sécurité des données
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>l'accès non autorisé</li>
                    <li>la perte ou la destruction accidentelle</li>
                    <li>la divulgation non autorisée</li>
                    <li>la modification non autorisée</li>
                  </ul>
                  <p>
                    Ces mesures incluent notamment le chiffrement des données sensibles, l'accès restreint aux données personnelles, 
                    la sauvegarde régulière des données, et la formation de notre personnel à la protection des données.
                  </p>
                </div>
              </div>

              {/* 12. Modifications de la politique */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  12. Modifications de la politique de confidentialité
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment pour refléter les changements 
                    dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires.
                  </p>
                  <p>
                    Toute modification sera publiée sur cette page avec une indication de la date de dernière mise à jour. 
                    Nous vous encourageons à consulter régulièrement cette page pour rester informé de la façon dont nous protégeons vos données.
                  </p>
                </div>
              </div>

              {/* 13. Contact */}
              <div>
                <h2 className="text-2xl md:text-3xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  13. Contact
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, 
                    vous pouvez nous contacter :
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
                    <p><strong>Email :</strong> <a href="mailto:immo@lagenceducoeur.com" className="text-[#1a2332] hover:underline">immo@lagenceducoeur.com</a></p>
                    <p><strong>Téléphone :</strong> <a href="tel:+33663706051" className="text-[#1a2332] hover:underline">+33 6 63 70 60 51</a></p>
                    <p><strong>Adresse postale :</strong> 96 Rue Paradis, 13008 Marseille</p>
                  </div>
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
