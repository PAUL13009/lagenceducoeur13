'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';
import AnimatedContent from '@/components/AnimatedContent';

export default function ConfirmationGestionPage() {
  const router = useRouter();

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

  useEffect(() => {
    // Nettoyer le localStorage après la soumission
    localStorage.removeItem('gestion_etape1');
  }, []);

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
        <section className="py-16 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-normal mb-4 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Merci pour votre demande de gestion locative
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-semibold">
                Votre demande a bien été transmise
              </p>
            </div>
          </div>
        </section>

        {/* Message d'introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Nous avons bien reçu les informations concernant votre bien et votre projet de gestion locative à Marseille.
                </p>
                <p>
                  Elles vont nous permettre d'analyser votre situation avec sérieux et précision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section : Ce qui va se passer maintenant */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Ce qui va se passer maintenant
              </h2>
              <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
                Chaque demande de gestion locative est étudiée manuellement par l'agence.
              </p>
              <p className="text-lg text-gray-700 mb-10 text-center font-semibold">
                Nous analysons :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <AnimatedContent
                  distance={50}
                  duration={0.6}
                  delay={0}
                  threshold={0.2}
                >
                  <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                    <p className="text-gray-800 text-center">Les caractéristiques du bien</p>
                  </div>
                </AnimatedContent>
                
                <AnimatedContent
                  distance={50}
                  duration={0.6}
                  delay={0.1}
                  threshold={0.2}
                >
                  <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                    <p className="text-gray-800 text-center">Votre situation actuelle</p>
                  </div>
                </AnimatedContent>
                
                <AnimatedContent
                  distance={50}
                  duration={0.6}
                  delay={0.2}
                  threshold={0.2}
                >
                  <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                    <p className="text-gray-800 text-center">Vos attentes et objectifs</p>
                  </div>
                </AnimatedContent>
                
                <AnimatedContent
                  distance={50}
                  duration={0.6}
                  delay={0.3}
                  threshold={0.2}
                >
                  <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                    <p className="text-gray-800 text-center">La cohérence globale de votre projet de gestion</p>
                  </div>
                </AnimatedContent>
              </div>
              
              <p className="text-lg text-gray-700 text-center leading-relaxed">
                Cette première analyse nous permet de déterminer si une gestion locative professionnelle est pertinente et adaptée à votre projet.
              </p>
            </div>
          </div>
        </section>

        {/* Section : Un point important à connaître */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Un point important à connaître
              </h2>
              <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                Notre approche repose sur un principe simple :<br />
                une gestion locative rigoureuse, transparente et durable protège votre investissement sur le long terme.
              </p>
              <p className="text-lg text-gray-700 mb-10 text-center font-semibold">
                C'est pourquoi nous revenons uniquement vers les projets :
              </p>
              
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-4" style={{ borderColor: '#1a2332' }}>
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-gray-800">Sérieux</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-4" style={{ borderColor: '#1a2332' }}>
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-gray-800">Réfléchis</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-4" style={{ borderColor: '#1a2332' }}>
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-gray-800">Ouverts à une gestion professionnelle et structurée</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section : Délai de réponse */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Délai de réponse
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-center">
                  Si votre projet correspond à notre méthode de travail,<br />
                  nous vous recontacterons dans les <strong>24 à 48h</strong> afin d'échanger plus en détail sur votre bien et vos objectifs de gestion.
                </p>
                <p className="text-center">
                  Si ce n'est pas le cas, aucune suite ne sera donnée.<br />
                  Ce fonctionnement nous permet de garantir un accompagnement de qualité à chaque propriétaire que nous suivons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section : En attendant */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                En attendant
              </h2>
              <p className="text-lg text-gray-700 mb-10 text-center">
                Vous pouvez :
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center flex-wrap">
                <Link
                  href="/approche"
                  className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0"
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span className="whitespace-nowrap">Consulter notre approche</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link
                  href="/a-propos"
                  className="cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0"
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span className="whitespace-nowrap">En apprendre davantage sur l'agence</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out flex-shrink-0" 
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

        {/* Message de clôture */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                Merci pour votre confiance,<br />
                <span className="font-semibold" style={{ color: '#1a2332' }}>L'Agence du Cœur</span>
              </p>
              <div className="flex justify-center">
                <Image
                  src="/logo.png"
                  alt="Logo L'Agence du Cœur"
                  width={200}
                  height={200}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
