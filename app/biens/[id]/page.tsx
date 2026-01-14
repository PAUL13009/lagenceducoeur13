'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProperty } from '@/lib/firestore';
import StaggeredMenu from '@/components/StaggeredMenu';
import Footer from '@/components/Footer';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getProperty(params.id);

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
        <StaggeredMenu
          position="right"
          menuItems={menuItems}
          socialItems={socialItems}
        />

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

          {/* Image Carousel */}
          <div className="mb-8 relative">
            <div className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={images[currentImageIndex]}
                alt={property.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            
            {images.length > 1 && (
              <>
                {/* Navigation buttons */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  aria-label="Image précédente"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  aria-label="Image suivante"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
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
                    {formatPrice(property.price)}
                    {property.type === 'louer' && <span className="text-lg font-normal">/mois</span>}
                  </p>
                </div>
              </div>

              {/* Description */}
              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a2332' }}>
                  Description
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </div>
              </section>

              {/* Caractéristiques principales */}
              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a2332' }}>
                  Caractéristiques principales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 rounded-lg p-4" style={{ borderColor: '#1a2332' }}>
                    <p className="text-sm text-gray-600 mb-1">Chambres</p>
                    <p className="text-2xl font-semibold" style={{ color: '#1a2332' }}>
                      {property.bedrooms}
                    </p>
                  </div>
                  <div className="border-2 rounded-lg p-4" style={{ borderColor: '#1a2332' }}>
                    <p className="text-sm text-gray-600 mb-1">Surface habitable</p>
                    <p className="text-2xl font-semibold" style={{ color: '#1a2332' }}>
                      {property.area} m²
                    </p>
                  </div>
                  <div className="border-2 rounded-lg p-4" style={{ borderColor: '#1a2332' }}>
                    <p className="text-sm text-gray-600 mb-1">Nombre de pièces</p>
                    <p className="text-2xl font-semibold" style={{ color: '#1a2332' }}>
                      {property.rooms}
                    </p>
                  </div>
                </div>
              </section>

              {/* Prestations */}
              {property.characteristics && property.characteristics.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a2332' }}>
                    Prestations
                  </h2>
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
                </section>
              )}

              {/* DPE */}
              {(property.dpe_energie || property.dpe_climat) && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a2332' }}>
                    Diagnostic de Performance Énergétique (DPE)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.dpe_energie && (
                      <div className="border-2 rounded-lg p-4" style={{ borderColor: '#1a2332' }}>
                        <p className="text-sm text-gray-600 mb-2">Consommation énergétique</p>
                        <p className="text-3xl font-semibold" style={{ color: '#1a2332' }}>
                          {property.dpe_energie}
                        </p>
                      </div>
                    )}
                    {property.dpe_climat && (
                      <div className="border-2 rounded-lg p-4" style={{ borderColor: '#1a2332' }}>
                        <p className="text-sm text-gray-600 mb-2">Émissions de GES</p>
                        <p className="text-3xl font-semibold" style={{ color: '#1a2332' }}>
                          {property.dpe_climat}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Informations complémentaires */}
              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1a2332' }}>
                  Informations complémentaires
                </h2>
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
              </section>
            </div>

            {/* Right Column - Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg p-6" style={{ backgroundColor: '#1a2332' }}>
                <h2 className="text-2xl font-normal mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: 'white' }}>
                  Contact
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" style={{ color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+33663706051" className="text-white hover:underline">
                      +33 6 63 70 60 51
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" style={{ color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:immo@lagenceducoeur.com" className="text-white hover:underline">
                      immo@lagenceducoeur.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1" style={{ color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-white">
                      Marseille, France
                    </p>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 px-6 rounded-lg font-semibold transition-all hover:opacity-90" style={{ backgroundColor: '#D4AF37', color: '#1a2332' }}>
                  Demander une visite
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}
