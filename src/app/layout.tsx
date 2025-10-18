import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sarikare.com.tr'), // Buraya kendi alan adınızı yazın
  title: {
    default: 'Sarıkare Ajans | Promosyon, Baskı ve Tabela Çözümleri',
    template: '%s | Sarıkare Ajans',
  },
  description: "Sarıkare Ajans; promosyon ürünleri, UV baskı, lazer kesim, kartvizit, tabela ve daha birçok alanda profesyonel çözümler sunar.",
  openGraph: {
    title: 'Sarıkare Ajans | Promosyon, Baskı ve Tabela Çözümleri',
    description: 'Kurumsal kimliğinizi güçlendirecek promosyon, baskı ve tabela çözümleri.',
    url: 'https://www.sarikare.com.tr', // Buraya kendi alan adınızı yazın
    siteName: 'Sarıkare Ajans',
    images: [
      { url: '/og-image.png', width: 1200, height: 630 }, // Sitenizin ana dizinine (public) bir og-image.png ekleyin
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}