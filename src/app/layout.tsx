import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";

// Por qué: DESIGN.md fija Archivo (voz de cartel, eje wdth) y Martian Mono
// (catálogo, precios, labels) como tipografía de Urbanshop. El repo venía con
// Geist y Arial, que es buena parte de lo que la ficha se veía genérica.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-commerce urbano",
  description: "Ropa y accesorios urbanos con envío gratis en Colombia",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${martianMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
