import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Lato, IM_Fell_English } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const imFell = IM_Fell_English({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-imfell",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tinkubar — Carta Digital",
  description: "Carta completa del restaurante Tinkubar.cl — Desayunos, platos, postres y bebidas.",
  keywords: ["Tinkubar", "restaurante", "menú", "carta", "Santiago", "Chile"],
  openGraph: {
    title: "Tinkubar — Carta Digital",
    description: "Carta completa del restaurante Tinkubar.cl",
    type: "website",
    locale: "es_CL",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2a2015",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${cormorant.variable} ${lato.variable} ${imFell.variable}`}>
      <body className="bg-[#2a2015] antialiased">{children}</body>
    </html>
  );
}
