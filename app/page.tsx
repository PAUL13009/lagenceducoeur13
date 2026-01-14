'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import StaggeredMenu from "@/components/StaggeredMenu";
import { getAllProperties } from "@/lib/firestore";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  
  // Hooks pour détecter la visibilité des boutons CTA sur mobile
  const [heroCta1Ref, isHeroCta1Visible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [heroCta2Ref, isHeroCta2Visible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [conceptCtaRef, isConceptCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [estimationCtaRef, isEstimationCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [venteCtaRef, isVenteCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [locationCtaRef, isLocationCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [gestionCtaRef, isGestionCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [catalogueCtaRef, isCatalogueCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [finalCtaRef, isFinalCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        // Filtrer uniquement les biens à vendre (type: 'acheter') non vendus
        const unsoldProperties = data.filter((p: any) => p.type === 'acheter' && !p.sold).slice(0, 6);

        if (!unsoldProperties || unsoldProperties.length === 0) {
          setFeaturedProperties([]);
        } else {
          const formattedProperties = unsoldProperties.map((property: any) => ({
            id: property.id.toString(),
            title: property.title,
            location: `${property.city} ${property.district}`,
            price: property.price,
            area: property.area || 0,
            rooms: property.rooms || 0,
            image: property.main_photo || property.photos?.[0] || '/property1.jpg',
            type: property.type || 'acheter',
            sold: property.sold || false,
          }));
          setFeaturedProperties(formattedProperties);
        }
      } catch (err) {
        console.error('Erreur:', err);
        setFeaturedProperties([]);
      } finally {
        setLoadingProperties(false);
      }
    };

    fetchProperties();
  }, []);

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
              <h1 className="text-5xl md:text-6xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                L'Agence du Cœur
              </h1>
              <p className="text-xl md:text-2xl text-amber-400 uppercase mb-4" style={{ color: '#D4AF37' }}>
                Le bien par le bien
              </p>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Donnez du sens à la vente de votre bien à Marseille
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  ref={heroCta1Ref}
                  href="/estimation"
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCta1Visible ? 'cta-visible' : ''}`}
                >
                  <span>Demander une estimation</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  ref={heroCta2Ref}
                  href="/approche"
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCta2Visible ? 'cta-visible' : ''}`}
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

        {/* Section Concept */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image à gauche */}
              <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <Image
                  src="/concept.PNG"
                  alt="Concept de l'Agence du Coeur"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Texte à droite */}
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Même accompagnement, même exigence, un impact positif en plus !
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed text-center">
                  13 % de la commission nette est reversé à une association que vous choisissez.
                  La vente se déroule exactement comme dans une agence immobilière classique.
                </p>
                <a
                  ref={conceptCtaRef}
                  href="/approche"
                  className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 mx-auto ${isConceptCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Comprendre notre approche</span>
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

        {/* Section Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-3xl font-normal text-gray-900 mb-4 uppercase tracking-wider whitespace-normal md:whitespace-nowrap px-4" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Une expertise complète pour tous vos besoins
              </h2>
            </div>

            <div className="space-y-16">
              {/* Service 1: Estimation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                  <Image
                    src="/estimation.jpg"
                    alt="Service Estimation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                      Estimation
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-xl md:text-2xl font-normal mb-3 text-center" style={{ color: '#D4AF37' }}>
                    Valorisons votre propriété
                  </p>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed text-center">
                    Obtenez une estimation précise de la valeur de votre bien immobilier. 
                    Notre expertise du marché marseillais vous garantit une évaluation juste et transparente.
                  </p>
                  <a
                    ref={estimationCtaRef}
                    href="/services/estimation"
                    className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 ${isEstimationCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Demander une estimation</span>
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

              {/* Service 2: Vente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden md:order-2">
                  <Image
                    src="/vente.jpg"
                    alt="Service Vente"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                      Vente
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center md:order-1">
                  <p className="text-xl md:text-2xl font-normal mb-3 text-center" style={{ color: '#D4AF37' }}>
                    Une vente engagée encadrée jusqu'au bout
                  </p>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed text-center">
                    Accompagnement personnalisé pour la vente de votre bien immobilier. 
                    De la mise en valeur à la signature, nous vous accompagnons à chaque étape.
                  </p>
                  <a
                    ref={venteCtaRef}
                    href="/services/vente"
                    className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 ${isVenteCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
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

              {/* Service 3: Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                  <Image
                    src="/location.jpg"
                    alt="Service Location"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                      Location
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-xl md:text-2xl font-normal mb-3 text-center" style={{ color: '#D4AF37' }}>
                    Une mise en location sécurisée
                  </p>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed text-center">
                    Trouvez le logement parfait ou mettez votre bien en location. 
                    Nous facilitons vos recherches et optimisons la rentabilité de votre investissement.
                  </p>
                  <a
                    ref={locationCtaRef}
                    href="/services/location"
                    className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 ${isLocationCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Voir nos locations</span>
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

              {/* Service 4: Gestion locative */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden md:order-2">
                  <Image
                    src="/gestion.jpg"
                    alt="Service Gestion locative"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                      Gestion locative
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center md:order-1">
                  <p className="text-xl md:text-2xl font-normal mb-3 text-center" style={{ color: '#D4AF37' }}>
                    Déléguez la gestion de votre patrimoine
                  </p>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed text-center">
                    Confiez-nous la gestion complète de votre bien locatif. 
                    De la sélection des locataires à la gestion administrative, nous prenons tout en charge.
                  </p>
                  <a
                    ref={gestionCtaRef}
                    href="/services/gestion-locative"
                    className={`cta-button group inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-semibold w-fit shadow-lg transition-all flex items-center justify-center gap-2 ${isGestionCtaVisible ? 'cta-visible' : ''}`}
                    style={{ borderColor: '#1a2332', color: '#1a2332' }}
                  >
                    <span>Découvrir la gestion locative</span>
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

        {/* Section Biens en vedette */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Découvrez notre sélection de propriétés
              </h2>
            </div>
            {loadingProperties ? (
              <div className="text-center py-16">
                <p className="text-gray-600">Chargement des biens...</p>
              </div>
            ) : featuredProperties.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600">Aucun bien disponible pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredProperties.slice(0, 3).map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <a
                ref={catalogueCtaRef}
                href="/catalogue"
                className={`cta-button group inline-block bg-transparent border-2 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 mx-auto ${isCatalogueCtaVisible ? 'cta-visible' : ''}`}
                style={{ borderColor: '#1a2332', color: '#1a2332', width: 'fit-content' }}
              >
                <span>Voir tous les biens</span>
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
        </section>

        {/* Section Message du fondateur */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              {/* Photo du fondateur à gauche */}
              <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden group founder-photo-container">
                <Image
                  src="/david.jpeg"
                  alt="David Tordjmann - Fondateur de L'Agence du Coeur"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center founder-overlay">
                  <a
                    href="/approche"
                    className="founder-link opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 text-white text-lg md:text-xl font-semibold"
                  >
                    Découvrir notre approche
                  </a>
                </div>
              </div>
              
              {/* Citation à droite */}
              <div className="flex flex-col justify-center text-center md:text-left">
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif", color: '#1a2332' }}>
                  <p className="mb-4">
                    "Vendre un bien immobilier est souvent une étape importante dans une vie.
                  </p>
                  <p>
                    Elle mérite à la fois rigueur, transparence… et sens"
                  </p>
                </blockquote>
                <p className="text-lg mt-6 font-medium" style={{ color: '#1a2332' }}>
                  — David Tordjmann
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Vision */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              {/* Image avec titre - en premier sur mobile */}
              <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden group vision-image-container order-1 md:order-2">
                <div className="relative w-full h-full">
                  <Image
                    src="/objectif.jpg"
                    alt="Notre Vision - L'Agence du Coeur"
                    fill
                    className="object-cover md:group-hover:brightness-50 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-white uppercase tracking-wider pointer-events-auto" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                    Notre Vision
                  </h2>
                  <div className="relative pointer-events-auto">
                    <a
                      href="/a-propos"
                      className="vision-link opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 text-white text-base md:text-lg lg:text-xl font-semibold"
                    >
                      Découvrir l'Agence du Coeur
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Texte - en second sur mobile */}
              <div className="flex flex-col justify-center order-2 md:order-1">
                <div className="space-y-4 text-base md:text-lg text-gray-600 leading-relaxed">
                  <p>
                    L'objectif de L'Agence du Cœur est simple :
                    proposer un accompagnement immobilier aussi rigoureux et performant qu'une agence traditionnelle, tout en permettant à chaque vendeur de donner une portée positive à sa transaction.
                  </p>
                  <p>
                    Nous croyons qu'il est possible de concilier :
                  </p>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-base md:text-lg text-gray-600">efficacité immobilière,</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-base md:text-lg text-gray-600">relation humaine,</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-base md:text-lg text-gray-600">et engagement concret.</p>
                    </div>
                  </div>
                  <p>
                    C'est pourquoi nous avons choisi de reverser 13 % de notre commission nette à une association choisie librement par le vendeur, sans jamais compromettre la qualité de l'accompagnement ni les résultats attendus.
                  </p>
                  <p>
                    Cette vision guide chacune de nos décisions, chaque estimation, chaque mise en vente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA Finale */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Et si votre vente immobilière avait plus d'impact ?
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Obtenez une estimation précise et confidentielle de votre bien à Marseille,
                réalisée par une agence immobilière engagée, sans compromis sur le professionnalisme.
              </p>
              <div className="flex flex-col items-center gap-3">
                <a
                  ref={finalCtaRef}
                  href="/estimation"
                  className={`cta-button group bg-transparent border-2 px-8 py-4 rounded-lg font-semibold inline-block shadow-lg transition-all flex items-center justify-center gap-2 ${isFinalCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332' }}
                >
                  <span>Demander une estimation précise</span>
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
                  Estimation gratuite et sans engagement
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