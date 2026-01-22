'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProperty } from '@/lib/firestore';
import { extractIdFromSlug, buildPropertyUrl } from '@/lib/slug';
import StaggeredMenu from '@/components/StaggeredMenu';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>('description');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const slugId = Array.isArray(params.id) ? params.id[0] : params.id;
        
        if (!slugId) {
          router.push('/catalogue');
          return;
        }

        const propertyId = extractIdFromSlug(slugId);
        
        if (!propertyId) {
          router.push('/catalogue');
          return;
        }

        const data = await getProperty(propertyId);

        if (!data) {
          console.error('Bien non trouvé');
          router.push('/catalogue');
          return;
        }

        setProperty(data);
      } catch (err) {
        console.error('Erreur:', err);
        router.push('/catalogue');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id, router]);

  useEffect(() => {
    if (property?.slug && property?.id) {
      const canonicalUrl = `${window.location.origin}${buildPropertyUrl(property.slug, property.id)}`;
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    }
  }, [property]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Bien introuvable</p>
          <Link href="/catalogue" className="text-blue-600 hover:underline">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const images = property.photos && property.photos.length > 0 ? property.photos : 
                 property.main_photo ? [property.main_photo] : ['/property1.jpg'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const displayPrice = property.price_on_demand || property.price === null 
    ? "Sur demande" 
    : formatPrice(property.price);

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
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'Instagram', link: 'https://instagram.com' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .property-detail-page .sm-logo {
          display: none !important;
        }
      `}} />
      <div className="min-h-screen flex flex-col bg-white property-detail-page">
        <div className="hidden md:block">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
          />
        </div>

      <main className="flex-grow pt-2">
        <div className="container mx-auto px-4 py-4">
          {/* Bouton de retour */}
          <div className="mb-4">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1a2332] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Retour au catalogue</span>
            </Link>
          </div>

          {/* Layout: Carrousel à gauche, Description à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Carrousel de photos - Colonne gauche */}
            <div className="space-y-4">
              {/* Version Mobile - Carrousel avec indicateurs */}
              <div className="relative w-full md:hidden">
                <div className="relative w-full h-[400px] overflow-hidden">
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${property.title} - Photo ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  
                  {/* Flèches de navigation - Mobile uniquement */}
                  {images.length > 1 && (
                    <>
                      {/* Flèche gauche */}
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                        aria-label="Photo précédente"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      {/* Flèche droite */}
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                        aria-label="Photo suivante"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-white/50'
                        }`}
                        aria-label={`Photo ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Version Desktop - Grande photo avec miniatures */}
              <div className="hidden md:block space-y-4">
                <div className="relative w-full h-[600px] overflow-hidden">
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${property.title} - Photo ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                
                {images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-full aspect-square overflow-hidden transition-all ${
                          index === currentImageIndex 
                            ? 'border-2 border-[#1a2332]' 
                            : 'border-2 border-transparent opacity-70 hover:opacity-100 hover:border-gray-300'
                        }`}
                        aria-label={`Voir la photo ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt={`${property.title} - Miniature ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Section Contact - Desktop uniquement */}
              <div className="hidden md:block mt-8 p-6 border-2 text-center" style={{ borderColor: '#1a2332', backgroundColor: '#1a2332' }}>
                <h3 className="text-xl font-normal mb-4 uppercase tracking-wider text-white" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
                  Intéressé par ce bien ?
                </h3>
                <p className="text-white mb-6">
                  Contactez <span style={{ color: '#D4AF37' }}>l'Agence du Cœur</span> et programmez une visite !
                </p>
                <div className="space-y-4 flex flex-col items-center">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+33663706051" className="text-white hover:opacity-80 transition-colors">
                      +33 6 63 70 60 51
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:immo@lagenceducoeur.com" className="text-white hover:opacity-80 transition-colors">
                      immo@lagenceducoeur.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Description et onglets - Colonne droite */}
            <div>
              {/* Header - Titre, localisation, prix */}
              <div className="mb-6">
                <div className="mb-3">
                  <span className="px-4 py-2 text-sm font-semibold rounded inline-block" style={{ backgroundColor: '#1a2332', color: 'white' }}>
                    {property.type === 'acheter' ? 'À vendre' : 'À louer'}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-normal mb-2 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  {property.title}
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  {property.city} {property.district}
                </p>
                <div className="flex items-center">
                  <p className="text-3xl md:text-4xl font-semibold" style={{ color: '#1a2332' }}>
                    {displayPrice}
                    {property.type === 'louer' && !property.price_on_demand && property.price !== null && <span className="text-lg font-normal">/mois</span>}
                  </p>
                </div>
              </div>

              {/* Onglets */}
              <div className="border-b-2 mb-6" style={{ borderColor: '#1a2332' }}>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-3 px-2 font-semibold transition-colors ${
                      activeTab === 'description' 
                        ? 'border-b-2' 
                        : 'text-gray-600 hover:text-[#1a2332]'
                    }`}
                    style={activeTab === 'description' ? { borderColor: '#1a2332', color: '#1a2332' } : {}}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('caracteristiques')}
                    className={`pb-3 px-2 font-semibold transition-colors ${
                      activeTab === 'caracteristiques' 
                        ? 'border-b-2' 
                        : 'text-gray-600 hover:text-[#1a2332]'
                    }`}
                    style={activeTab === 'caracteristiques' ? { borderColor: '#1a2332', color: '#1a2332' } : {}}
                  >
                    Caractéristiques
                  </button>
                  {property.characteristics && property.characteristics.length > 0 && (
                    <button
                      onClick={() => setActiveTab('prestations')}
                      className={`pb-3 px-2 font-semibold transition-colors ${
                        activeTab === 'prestations' 
                          ? 'border-b-2' 
                          : 'text-gray-600 hover:text-[#1a2332]'
                      }`}
                      style={activeTab === 'prestations' ? { borderColor: '#1a2332', color: '#1a2332' } : {}}
                    >
                      Prestations
                    </button>
                  )}
                  {(property.dpe_energie || property.dpe_climat) && (
                    <button
                      onClick={() => setActiveTab('dpe')}
                      className={`pb-3 px-2 font-semibold transition-colors ${
                        activeTab === 'dpe' 
                          ? 'border-b-2' 
                          : 'text-gray-600 hover:text-[#1a2332]'
                      }`}
                      style={activeTab === 'dpe' ? { borderColor: '#1a2332', color: '#1a2332' } : {}}
                    >
                      DPE
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('infos')}
                    className={`pb-3 px-2 font-semibold transition-colors ${
                      activeTab === 'infos' 
                        ? 'border-b-2' 
                        : 'text-gray-600 hover:text-[#1a2332]'
                    }`}
                    style={activeTab === 'infos' ? { borderColor: '#1a2332', color: '#1a2332' } : {}}
                  >
                    Informations
                  </button>
                </div>
              </div>

              {/* Contenu des onglets */}
              <div className="min-h-[400px]">
                {activeTab === 'description' && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {property.description}
                  </div>
                )}

                {activeTab === 'caracteristiques' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-2 p-4" style={{ borderColor: '#1a2332' }}>
                      <p className="text-sm text-gray-600 mb-1">Chambres</p>
                      <p className="text-2xl font-semibold" style={{ color: '#1a2332' }}>
                        {property.bedrooms}
                      </p>
                    </div>
                    <div className="border-2 p-4" style={{ borderColor: '#1a2332' }}>
                      <p className="text-sm text-gray-600 mb-1">Surface habitable</p>
                      <p className="text-2xl font-semibold" style={{ color: '#1a2332' }}>
                        {property.area} m²
                      </p>
                    </div>
                    <div className="border-2 p-4" style={{ borderColor: '#1a2332' }}>
                      <p className="text-sm text-gray-600 mb-1">Nombre de pièces</p>
                      <p className="text-2xl font-semibold" style={{ color: '#1a2332' }}>
                        {property.rooms}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'prestations' && property.characteristics && property.characteristics.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.characteristics.map((char: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{char}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'dpe' && (property.dpe_energie || property.dpe_climat) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.dpe_energie && (
                      <div className="border-2 p-4" style={{ borderColor: '#1a2332' }}>
                        <p className="text-sm text-gray-600 mb-2">Consommation énergétique</p>
                        <p className="text-3xl font-semibold" style={{ color: '#1a2332' }}>
                          {property.dpe_energie}
                        </p>
                      </div>
                    )}
                    {property.dpe_climat && (
                      <div className="border-2 p-4" style={{ borderColor: '#1a2332' }}>
                        <p className="text-sm text-gray-600 mb-2">Émissions de GES</p>
                        <p className="text-3xl font-semibold" style={{ color: '#1a2332' }}>
                          {property.dpe_climat}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'infos' && (
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-medium">Type de bien:</span>
                      <span className="capitalize">{property.property_type}</span>
                    </div>
                    {property.charges && (
                      <div className="flex justify-between">
                        <span className="font-medium">Charges:</span>
                        <span>{property.charges} €/mois</span>
                      </div>
                    )}
                    {property.taxe_fonciere && (
                      <div className="flex justify-between">
                        <span className="font-medium">Taxe foncière:</span>
                        <span>{property.taxe_fonciere} €/an</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section Contact Mobile - En bas de la page */}
          <div className="md:hidden mt-8 mb-8 p-6 border-2 text-center" style={{ borderColor: '#1a2332', backgroundColor: '#1a2332' }}>
            <h3 className="text-xl font-normal mb-4 uppercase tracking-wider text-white" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}>
              Intéressé par ce bien ?
            </h3>
            <p className="text-white mb-6">
              Contactez <span style={{ color: '#D4AF37' }}>l'Agence du Cœur</span> et programmez une visite !
            </p>
            <div className="space-y-4 flex flex-col items-center">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+33663706051" className="text-white hover:opacity-80 transition-colors">
                  +33 6 63 70 60 51
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:immo@lagenceducoeur.com" className="text-white hover:opacity-80 transition-colors">
                  immo@lagenceducoeur.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </>
  );
}
