'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/lib/firestore";
import { useVisibleOnScreen } from "@/components/useVisibleOnScreen";

export default function CataloguePage() {
  // Hooks pour détecter la visibilité des boutons CTA sur mobile
  const [heroCtaRef, isHeroCtaVisible] = useVisibleOnScreen<HTMLAnchorElement>();
  const [resetCtaRef, isResetCtaVisible] = useVisibleOnScreen<HTMLButtonElement>();
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(true);
  const [filters, setFilters] = useState({
    transactionType: '',
    propertyType: '',
    city: '',
    district: '',
    surface: '',
    priceRange: '',
  });

  // Récupérer les biens depuis Firebase
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();

        if (!data || data.length === 0) {
          setAllProperties([]);
        } else {
          // Transformer les données Firebase au format attendu
          const formattedProperties = data.map((property: any) => ({
            id: property.id.toString(),
            title: property.title,
            location: `${property.city} ${property.district}`,
            city: property.city,
            district: property.district,
            price: property.price,
            area: property.area || 0,
            rooms: property.rooms || 0,
            bedrooms: property.bedrooms || 0,
            bathrooms: property.bathrooms || null,
            image: property.main_photo || property.photos?.[0] || '/property1.jpg',
            type: property.type || 'acheter',
            propertyType: property.property_type || 'appartement',
            status: property.status || (property.sold ? 'vendu' : 'à_vendre'),
            sold: property.sold || false,
            slug: property.slug || undefined,
            priceOnDemand: property.price_on_demand || false,
          }));
          setAllProperties(formattedProperties);
        }
      } catch (err) {
        console.error('Erreur:', err);
        setAllProperties([]);
      } finally {
        setLoadingProperties(false);
      }
    };

    fetchProperties();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Séparer les biens vendus des biens disponibles
  // Filtrer les biens à vendre (type: 'acheter') et les biens à louer (type: 'louer')
  const propertiesToSell = allProperties.filter(property => property.type === 'acheter');
  const propertiesToRent = allProperties.filter(property => property.type === 'louer');
  const availableProperties = propertiesToSell.filter(property => {
    const status = property.status || (property.sold ? 'vendu' : 'à_vendre');
    return status === 'à_vendre' || status === 'sous_compromis';
  });
  const allAvailableProperties = [...availableProperties, ...propertiesToRent];
  const soldProperties = propertiesToSell.filter(property => {
    const status = property.status || (property.sold ? 'vendu' : 'à_vendre');
    return status === 'vendu';
  });

  // Filtrer les biens disponibles selon les critères en temps réel
  const filteredProperties = allAvailableProperties.filter(property => {
    // Filtre par type de transaction
    if (filters.transactionType) {
      const expectedType = filters.transactionType === 'vente' ? 'acheter' : 'louer';
      if (property.type !== expectedType) {
        return false;
      }
    }

    // Filtre par type de bien
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }

    // Filtre par ville
    if (filters.city && filters.city.trim() !== '') {
      if (!property.city.toLowerCase().includes(filters.city.toLowerCase().trim())) {
        return false;
      }
    }

    // Filtre par arrondissement
    if (filters.district && filters.district.trim() !== '') {
      if (!property.district.toLowerCase().includes(filters.district.toLowerCase().trim())) {
        return false;
      }
    }

    // Filtre par surface (recherche dans la surface du bien)
    if (filters.surface && filters.surface.trim() !== '') {
      const surfaceValue = parseInt(filters.surface.trim());
      if (!isNaN(surfaceValue)) {
        // Recherche approximative : surface du bien doit être proche de la valeur recherchée (±10%)
        const tolerance = surfaceValue * 0.1;
        if (Math.abs(property.area - surfaceValue) > tolerance) {
          return false;
        }
      }
    }

    // Filtre par fourchette de prix (inscription libre)
    if (filters.priceRange && filters.priceRange.trim() !== '') {
      const priceRangeText = filters.priceRange.trim().toLowerCase();
      
      // Détection de formats comme "300000-500000", "300k-500k", "300 000 - 500 000", etc.
      const rangeMatch = priceRangeText.match(/(\d+)\s*k?\s*[-\sà]\s*(\d+)\s*k?/);
      if (rangeMatch) {
        let minPrice = parseInt(rangeMatch[1].replace(/\s/g, ''));
        let maxPrice = parseInt(rangeMatch[2].replace(/\s/g, ''));
        
        // Si "k" est présent, multiplier par 1000
        if (priceRangeText.includes('k')) {
          minPrice *= 1000;
          maxPrice *= 1000;
        }
        
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          if (property.price < minPrice || property.price > maxPrice) {
            return false;
          }
        }
      } else {
        // Recherche simple : contient le nombre mentionné
        const numbers = priceRangeText.match(/\d+/g);
        if (numbers) {
          const searchPrice = parseInt(numbers[0].replace(/\s/g, ''));
          if (!isNaN(searchPrice)) {
            const finalPrice = priceRangeText.includes('k') ? searchPrice * 1000 : searchPrice;
            // Recherche approximative : prix du bien doit être proche de la valeur recherchée (±20%)
            const tolerance = finalPrice * 0.2;
            if (Math.abs(property.price - finalPrice) > tolerance) {
              return false;
            }
          }
        }
      }
    }

    return true;
  });

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
                Notre Catalogue
              </h1>
              <div className="flex justify-center items-center">
                <a
                  ref={heroCtaRef}
                  href="#biens"
                  className={`hero-cta-button group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2 ${isHeroCtaVisible ? 'cta-visible' : ''}`}
                >
                  <span>Découvrir nos biens</span>
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

        {/* Barre de filtrage */}
        <section id="biens" className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Contenu de la barre de filtrage */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterBarOpen ? 'max-h-[500px] py-6' : 'max-h-0 py-0'} md:max-h-none md:py-6`}>
                <div className="flex flex-wrap items-end gap-4">
                  {/* Type de transaction */}
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction
                    </label>
                    <select
                      value={filters.transactionType}
                      onChange={(e) => handleFilterChange('transactionType', e.target.value)}
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                      style={{ borderColor: '#1a2332' }}
                    >
                      <option value="">Tous</option>
                      <option value="vente">À vendre</option>
                      <option value="location">À louer</option>
                    </select>
                  </div>

                  {/* Type de bien */}
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de bien
                    </label>
                    <select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                      style={{ borderColor: '#1a2332' }}
                    >
                      <option value="">Tous</option>
                      <option value="appartement">Appartement</option>
                      <option value="maison">Maison</option>
                      <option value="loft">Loft</option>
                    </select>
                  </div>

                  {/* Ville */}
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={filters.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                      placeholder="Ex: Marseille"
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                      style={{ borderColor: '#1a2332' }}
                    />
                  </div>

                  {/* Arrondissement */}
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arrondissement
                    </label>
                    <input
                      type="text"
                      value={filters.district}
                      onChange={(e) => handleFilterChange('district', e.target.value)}
                      placeholder="Ex: 8ème"
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                      style={{ borderColor: '#1a2332' }}
                    />
                  </div>

                  {/* Surface */}
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surface (m²)
                    </label>
                    <input
                      type="text"
                      value={filters.surface}
                      onChange={(e) => handleFilterChange('surface', e.target.value)}
                      placeholder="Ex: 75"
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                      style={{ borderColor: '#1a2332' }}
                    />
                  </div>

                  {/* Fourchette de Prix */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fourchette de Prix
                    </label>
                    <input
                      type="text"
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      placeholder="Ex: 300k-500k ou 300000-500000"
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                      style={{ borderColor: '#1a2332' }}
                    />
                  </div>

                  {/* Bouton Réinitialiser */}
                  <div className="flex items-end">
                    <button
                      onClick={() => setFilters({
                        transactionType: '',
                        propertyType: '',
                        city: '',
                        district: '',
                        surface: '',
                        priceRange: '',
                      })}
                      className="px-6 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors border-2 rounded-lg"
                      style={{ borderColor: '#1a2332', color: '#1a2332' }}
                    >
                      Réinitialiser
                    </button>
                  </div>
                </div>
              </div>

              {/* Bouton toggle pour mobile uniquement */}
              <button
                onClick={() => setIsFilterBarOpen(!isFilterBarOpen)}
                className="md:hidden w-full py-3 flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                style={{ color: '#1a2332' }}
                aria-label={isFilterBarOpen ? 'Fermer les filtres' : 'Ouvrir les filtres'}
              >
                <span className="text-sm font-medium">
                  {isFilterBarOpen ? 'Masquer les filtres' : 'Afficher les filtres'}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isFilterBarOpen ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Section Catalogue des biens */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                Découvrez notre sélection de propriétés
              </h2>
              {filteredProperties.length > 0 && (
                <p className="text-gray-600">
                  {filteredProperties.length} {filteredProperties.length > 1 ? 'biens trouvés' : 'bien trouvé'}
                </p>
              )}
            </div>
            {loadingProperties ? (
              <div className="text-center py-16">
                <p className="text-gray-600">Chargement des biens...</p>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">Aucun bien ne correspond à vos critères de recherche.</p>
                <button
                  ref={resetCtaRef}
                  onClick={() => setFilters({
                    transactionType: '',
                    propertyType: '',
                    city: '',
                    district: '',
                    surface: '',
                    priceRange: '',
                  })}
                  className={`cta-button group inline-block bg-transparent border-2 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 mx-auto ${isResetCtaVisible ? 'cta-visible' : ''}`}
                  style={{ borderColor: '#1a2332', color: '#1a2332', width: 'fit-content' }}
                >
                  <span>Réinitialiser les filtres</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ease-out" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Section Nos biens vendus */}
        {soldProperties.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em', color: '#1a2332' }}>
                  Nos biens vendus
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {soldProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
