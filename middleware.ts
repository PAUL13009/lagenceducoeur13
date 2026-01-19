import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des URLs obsolètes à renvoyer en 410 Gone
const OBSOLETE_URLS = new Set([
  '/index.html',
  '/un-jardin-en-ville.html',
  '/vendu-MSV.html',
  '/Mimet.html',
  '/vendu-rabateau.html',
  '/villa-exception.html',
  '/T5.html',
  '/Appartement-de-standing.html',
  '/villa-contemporaine.html',
  '/villa-architecte-louer.html',
  '/nos-services.html',
  '/villa-1.html',
  '/villa-7.html',
  '/villa-6.html',
  '/gestion-locative.html',
  '/politique-rgpd.html',
  '/mentions-legales.html',
  '/politique-confidentialite.html',
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si l'URL est dans la liste des URLs obsolètes
  if (OBSOLETE_URLS.has(pathname)) {
    return NextResponse.json(null, { status: 410 });
  }

  // Continuer normalement pour toutes les autres URLs
  return NextResponse.next();
}

// Configuration : appliquer le middleware sur toutes les routes
export const config = {
  matcher: '/:path*',
};
