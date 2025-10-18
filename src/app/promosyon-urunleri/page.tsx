'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PromosyonUrunleri() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleProductDetails = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const products = [
    {
      id: 'kupalar',
      name: 'Kupalar',
      description: 'Özel tasarım baskılı kupalar ile markanızı her gün hatırlatın',
      image: 'Custom printed mugs corporate gifts branded coffee cups promotional products high quality ceramic materials clean white background professional photography golden accents elegant presentation',
      printMethod: 'Süblimasyon, UV Baskı',
      deliveryTime: '3-5 iş günü',
      details: {
        branding: ['Süblimasyon baskı', 'UV dijital baskı', 'Lazer gravür', 'Çıkartma etiket'],
        materials: ['Seramik (beyaz, renkli)', 'Cam', 'Paslanmaz çelik', 'Plastik'],
        minQuantity: '25 adet',
        delivery: '3-5 iş günü (acil 1-2 gün)',
        fileRequirement: 'Vektörel logo (AI, EPS, PDF) veya yüksek çözünürlük (300 DPI)',
        sample: 'Ücretsiz dijital prova, fiziksel numune +50₺',
        packaging: 'Tek tek ambalajlı, toplu kutularda'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-2xl text-black">
              Sarıkare Ajans
            </Link>
          </div>
        </nav>
      </header>

      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Promosyon Ürünleri
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kurumsal hediye, fuar tanıtımı ve marka görünürlüğü için özel tasarım promosyon ürünleri.
          </p>
        </div>
      </section>
    </div>
  );
}