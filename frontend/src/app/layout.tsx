// layout.tsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import { publicLinks, personalLinks } from "@/components/Navbar/NavLinks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define las rutas permitidas
  const allowedRoutes = [...publicLinks, ...personalLinks].map(
    link => link.href
  );

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}>
        <div className="flex flex-col min-h-screen">
          {/* Renderiza Navbar solo si estamos en una ruta permitida */}
          {allowedRoutes.includes(pathname) && <Navbar />}
          <main className="flex-grow">{children}</main>
          {/* Renderiza Footer solo si estamos en una ruta permitida */}
          {allowedRoutes.includes(pathname) && <Footer />}
        </div>
      </body>
    </html>
  );
}
