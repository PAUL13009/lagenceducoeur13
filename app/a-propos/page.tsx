'use client';

import Image from "next/image";
import { useRef } from "react";
import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import AnimatedContent from "@/components/AnimatedContent";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";

export default function AProposPage() {
  const firstSectionRef = useRef<HTMLElement>(null);
  
  // Hooks pour détecter la visibilité des boutons CTA sur mobile
  const [heroCtaRef, isHeroCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [finalCtaRef, isFinalCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();

  const handleScrollToFirstSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (firstSectionRef.current) {
      firstSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
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
                À Propos
              </h1>
              <div className="flex justify-center items-center">
                <a
                  ref={heroCtaRef}
                  href="#premiere-section"
                  onClick={handleScrollToFirstSection}
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCtaVisible ? 'cta-visible' : ''}`}
                >
                  <span>Découvrir l'Agence du Cœur</span>
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

        {/* Section 1 : Une agence immobilière engagée */}
        <section id="premiere-section" ref={firstSectionRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Titre et texte à gauche */}
                <div className="order-1">
                  <h2 className="text-xl md:text-2xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center md:text-left whitespace-nowrap md:-ml-4" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    Une agence immobilière engagée
                  </h2>
                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                    <p className="text-center md:text-left">
                      L'Agence du Cœur est née d'une volonté simple :
                      exercer le métier d'agent immobilier avec exigence, transparence et responsabilité, tout en donnant du sens à chaque transaction.
                    </p>
                    <p className="text-center md:text-left">
                      Depuis deux ans, nous accompagnons des propriétaires à Marseille dans la vente, la location et la gestion de leurs biens, avec une approche à la fois rigoureuse et engagée.
                      Notre conviction est claire : l'immobilier peut être un levier d'impact positif, sans jamais renoncer au professionnalisme.
                    </p>
                  </div>
                </div>
                {/* Image à droite */}
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden order-2 md:ml-12">
                  <Image
                    src="/concept.PNG"
                    alt="Concept L'Agence du Cœur"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 : Une histoire guidée par le sens */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une histoire guidée par le sens
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  L'Agence du Cœur a été pensée dès sa création autour d'un modèle solidaire.
                  Le slogan « Le Bien par le Bien » s'est imposé naturellement, comme une évidence.
                </p>
                <p className="text-center">
                  Dans un contexte où les êtres humains comme l'environnement sont mis à rude épreuve, il nous a semblé essentiel de donner à notre métier une dimension plus utile, plus responsable.
                  Non pas par idéalisme, mais par conviction.
                </p>
                <p className="text-center">
                  Chaque vente est une opportunité :
                  celle de réussir un projet immobilier, tout en ayant un impact positif et concret.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 : Le fondateur */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Le fondateur
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                  <Image
                    src="/david.jpeg"
                    alt="David Tordjmann, fondateur de L'Agence du Cœur"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    David Tordjmann exerce dans l'immobilier depuis plus de dix ans.
                    Il a évolué en agence traditionnelle, en indépendant, et possède une expérience complète en transaction, location et gestion.
                  </p>
                  <p>
                    Son parcours lui a permis de développer une vision claire du métier :
                    un accompagnement efficace repose avant tout sur la rigueur, la transparence totale et une relation de confiance durable.
                  </p>
                  <p>
                    Présent mais discret, David a souhaité créer une agence à son image :
                    professionnelle, structurée, humaine, et tournée vers l'impact réel dans la vie des personnes accompagnées.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 : Une agence solidement ancrée dans son métier */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une agence solidement ancrée dans son métier
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  L'Agence du Cœur est avant tout une société immobilière, qui respecte strictement les règles et les codes de la profession.
                </p>
                <p className="text-center font-semibold">Nous disposons :</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">D'une Carte T (Transaction)</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.1}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">D'une Carte G (Gestion)</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Des garanties financières obligatoires</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.3}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">Des assurances professionnelles réglementaires</p>
                    </div>
                  </AnimatedContent>
                </div>
                <p className="text-center mt-6">
                  Notre équipe — et nos partenaires — se forment en continu, conformément aux obligations légales, afin de garantir un accompagnement fiable, à jour et sécurisé.
                </p>
                <p className="text-center">
                  Le cadre déontologique n'est pas une contrainte :
                  c'est une condition essentielle à un travail sérieux et durable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 : Marseille, un choix naturel */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Photo avec titre intégré sur mobile, à gauche sur desktop */}
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden order-1 md:order-1">
                  <div className="relative w-full h-full">
                    <Image
                      src="/vente.jpg"
                      alt="Marseille"
                      fill
                      className="object-cover"
                    />
                    {/* Overlay sombre pour mobile */}
                    <div className="absolute inset-0 bg-black/40 md:hidden"></div>
                    {/* Titre intégré dans l'image sur mobile uniquement */}
                    <div className="absolute inset-0 flex items-center justify-center md:hidden">
                      <h2 className="text-2xl md:text-2xl font-normal text-white uppercase tracking-wider px-4 text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                        Marseille, un choix naturel
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Titre et texte à droite sur desktop, texte seul en dessous sur mobile */}
                <div className="order-2 md:order-2">
                  {/* Titre visible uniquement sur desktop */}
                  <h2 className="hidden md:block text-xl md:text-2xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-left whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                    Marseille, un choix naturel
                  </h2>
                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                    <p className="text-center md:text-left">
                      Notre implantation à Marseille n'est pas un hasard.
                      Elle repose sur des racines personnelles fortes, une connaissance fine du terrain, et de nombreuses années de vie et d'expérience dans la ville.
                    </p>
                    <p className="text-center md:text-left">
                      Marseille est un marché riche, contrasté, exigeant.
                      C'est précisément cette diversité qui nécessite une approche rigoureuse, adaptée à chaque bien et à chaque projet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 : Une sélection assumée des projets */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une sélection assumée des projets
              </h2>
              <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Nous faisons un choix clair :
                  nous ne travaillons pas avec tout le monde.
                </p>
                <div>
                  <p className="text-center font-semibold mb-4">L'Agence du Cœur s'adresse à des vendeurs :</p>
                  <div className="space-y-4 max-w-2xl mx-auto">
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
                        <p className="text-gray-800">Ayant un projet réfléchi</p>
                      </div>
                    </AnimatedContent>
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
                        <p className="text-gray-800">Souhaitant un accompagnement personnalisé</p>
                      </div>
                    </AnimatedContent>
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
                        <p className="text-gray-800">Prêts à accepter une estimation fondée sur la réalité du marché</p>
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
                        <p className="text-gray-800">Désireux de donner un impact positif à la vente de leur bien</p>
                      </div>
                    </AnimatedContent>
                  </div>
                </div>
                <div>
                  <p className="text-center font-semibold mb-4">Nous ne nous adressons pas :</p>
                  <div className="space-y-4 max-w-2xl mx-auto">
                    <AnimatedContent
                      distance={50}
                      duration={0.6}
                      delay={0.4}
                      threshold={0.2}
                    >
                      <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#dc2626' }}>
                        <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                          <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-gray-800">Aux comparateurs compulsifs</p>
                      </div>
                    </AnimatedContent>
                    <AnimatedContent
                      distance={50}
                      duration={0.6}
                      delay={0.5}
                      threshold={0.2}
                    >
                      <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#dc2626' }}>
                        <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                          <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-gray-800">Aux projets flous</p>
                      </div>
                    </AnimatedContent>
                    <AnimatedContent
                      distance={50}
                      duration={0.6}
                      delay={0.6}
                      threshold={0.2}
                    >
                      <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#dc2626' }}>
                        <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                          <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-gray-800">Aux attentes irréalistes</p>
                      </div>
                    </AnimatedContent>
                    <AnimatedContent
                      distance={50}
                      duration={0.6}
                      delay={0.7}
                      threshold={0.2}
                    >
                      <div className="animated-card-red bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-3" style={{ borderColor: '#dc2626' }}>
                        <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                          <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-gray-800">Aux vendeurs qui refusent l'accompagnement d'un professionnel engagé</p>
                      </div>
                    </AnimatedContent>
                  </div>
                </div>
                <p className="text-center mt-6">
                  Cette sélection est une garantie de sérieux, autant pour nos clients que pour la qualité de notre travail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 : Donner du sens à chaque transaction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Donner du sens à chaque transaction
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-center">
                  Lors de chaque vente réalisée par l'agence, 13 % de notre commission nette sont reversés à une association, choisie librement par le vendeur.
                </p>
                <p className="text-center">
                  Ce modèle solidaire est intégré dès l'origine de l'agence.
                  Il permet de transformer une transaction immobilière en une action utile, sans compromis sur l'efficacité, ni sur les résultats.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8 : Choisir L'Agence du Cœur */}
        <section className="py-16 bg-gray-50">
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
                      <p className="text-gray-800 text-center">D'une transparence totale</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.2}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">D'une relation humaine et responsable</p>
                    </div>
                  </AnimatedContent>
                  <AnimatedContent
                    distance={50}
                    duration={0.6}
                    delay={0.3}
                    threshold={0.2}
                  >
                    <div className="animated-card bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ borderColor: '#1a2332' }}>
                      <p className="text-gray-800 text-center">D'une vente menée avec sens et exigence</p>
                    </div>
                  </AnimatedContent>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA finale */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-col items-center gap-3">
                <a
                  ref={finalCtaRef}
                  href="/estimation"
                  className={`cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isFinalCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Demander une estimation sérieuse de votre bien à Marseille</span>
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
                  Première étape réservée aux projets de vente réfléchis et engagés.
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
