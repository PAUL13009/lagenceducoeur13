import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Agence du Cœur
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              Accueil
            </Link>
            <Link href="/acheter" className="text-gray-700 hover:text-primary-600 transition">
              Acheter
            </Link>
            <Link href="/louer" className="text-gray-700 hover:text-primary-600 transition">
              Louer
            </Link>
            <Link href="/vendre" className="text-gray-700 hover:text-primary-600 transition">
              Vendre
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition">
              Contact
            </Link>
            <Link 
              href="/contact" 
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Estimation gratuite
            </Link>
          </div>
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}