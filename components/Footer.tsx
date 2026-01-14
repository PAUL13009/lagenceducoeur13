import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a2332] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Ligne de séparation */}
        <div className="border-t border-gray-500 mb-8"></div>
        
        {/* Contenu du footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2026 Agence du Cœur. Tous droits réservés.
            </p>
          </div>

          {/* Liens légaux */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link
              href="/mentions-legales"
              className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
            >
              Mentions Légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/admin"
              className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Crédit StudioPN */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              Site créé par <span className="text-gray-300">StudioPN</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
