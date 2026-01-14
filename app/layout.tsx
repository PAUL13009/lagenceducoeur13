import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: "Agence du Cœur - Immobilier",
  description: "Votre partenaire de confiance pour trouver la propriété de vos rêves",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${playfairDisplay.variable}`}>{children}</body>
    </html>
  );
}