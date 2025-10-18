'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-2xl text-black cursor-pointer">
              Sarıkare Ajans
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-black font-semibold cursor-pointer">Ana Sayfa</Link>
              <Link href="/hizmetlerimiz" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Hizmetlerimiz</Link>
              <Link href="/promosyon-urunleri" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Promosyon Ürünleri</Link>
              <Link href="/e-ticaret" className="text-gray-700 hover:text-black transition-colors cursor-pointer">E-Ticaret</Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-black transition-colors cursor-pointer">İletişim</Link>
              <Link href="/admin" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Admin</Link>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="w-6 h-6 flex items-center justify-center z-50 relative">
                <i className={`ri-${isOpen ? 'close' : 'menu'}-line text-2xl`}></i>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl text-black font-semibold cursor-pointer">Ana Sayfa</Link>
            <Link href="/hizmetlerimiz" onClick={() => setIsOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">Hizmetlerimiz</Link>
            <Link href="/promosyon-urunleri" onClick={() => setIsOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">Promosyon Ürünleri</Link>
            <Link href="/e-ticaret" onClick={() => setIsOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">E-Ticaret</Link>
            <Link href="/iletisim" onClick={() => setIsOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">İletişim</Link>
            <Link href="/admin" onClick={() => setIsOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">Admin</Link>
        </div>
      )}

      {/* Hero Section */}
      <section 
        className={`relative min-h-screen flex items-center transition-transform duration-500 ${isOpen ? '-translate-x-full' : ''}`}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Promosyon, Baskı ve Tabela Çözümleriniz Tek Çatı Altında
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Sarıkare Ajans; promosyon ürünleri, UV baskı, lazer kesim, kartvizit & davetiye, kişiye özel kaşe, pleksi ve standart tabelalar, kullanım kılavuzu üretimi ile yanınızda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/hizmetlerimiz"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-semibold transition-colors cursor-pointer whitespace-nowrap text-center"
                >
                  Hizmetlerimizi Gör
                </Link>
                <Link 
                  href="/iletisim"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold transition-colors cursor-pointer whitespace-nowrap text-center"
                >
                  Teklif İste
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
