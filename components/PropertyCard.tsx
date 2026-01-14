import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  image: string;
  type: "acheter" | "louer";
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  area,
  rooms,
  image,
  type,
}: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Images temporaires d'illustration (variées selon l'ID)
  const placeholderImages: { [key: string]: string } = {
    '1': 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=800&fit=crop&q=80',
    '2': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=800&fit=crop&q=80',
    '3': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=800&fit=crop&q=80',
  };
  
  const defaultImages = [
    'https://images.unsplash.com/photo-1568605117035-4c1d0c0b6c8e?w=800&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560448075-cbc16c4d1b0e?w=800&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560448204-61dc36dc0bcb?w=800&h=800&fit=crop&q=80',
  ];
  
  const imageUrl = image && image !== '/property1.jpg' && image !== '/property2.jpg' && image !== '/property3.jpg' && image !== '/property4.jpg' && image !== '/property5.jpg' && image !== '/property6.jpg'
    ? image
    : placeholderImages[id] || defaultImages[parseInt(id) % defaultImages.length];

  return (
    <Link href={`/biens/${id}`} className="group">
      <div className="bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 aspect-square relative transform hover:scale-105">
        {/* Image d'illustration temporaire */}
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            unoptimized
          />
        
        {/* Overlay gradient en bas pour la lisibilité des informations */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Étiquette À vendre / À louer */}
        <div className="absolute top-4 left-4 z-20">
          <span className="text-white px-3 py-3 text-sm font-semibold inline-block" style={{ backgroundColor: '#1a2332' }}>
            {type === "acheter" ? "À vendre" : "À louer"}
          </span>
        </div>
        
        {/* Informations en bas de l'image */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <div className="flex items-center justify-between text-white mb-3">
            <span className="text-2xl md:text-3xl font-normal">
              {formatPrice(price)}
              {type === "louer" && <span className="text-base font-normal">/mois</span>}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-white/90 text-sm md:text-base">
            <span>{area} m²</span>
            <span>•</span>
            <span>{rooms} {rooms > 1 ? "ch." : "ch."}</span>
            <span>•</span>
            <span>1 SDB</span>
          </div>
        </div>
      </div>
    </Link>
  );
}