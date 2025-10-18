'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    id: 'kupalar',
    name: 'Kupalar',
    description: 'Özel tasarım baskılı kupalar ile markanızı her gün hatırlatın.',
    image: 'https://placehold.co/600x400/F9D423/000000?text=Kupalar',
    details: {
      'Baskı Yöntemleri': ['Süblimasyon baskı', 'UV dijital baskı', 'Lazer gravür'],
      'Malzemeler': ['Seramik (beyaz, renkli)', 'Cam', 'Paslanmaz çelik', 'Porselen'],
      'Min. Sipariş Adedi': '25 adet',
    }
  },
  {
    id: 'kalemler',
    name: 'Kalemler',
    description: 'Şık ve kullanışlı kalemlerle logonuzu elden ele dolaştırın.',
    image: 'https://placehold.co/600x400/333333/FFFFFF?text=Kalemler',
    details: {
      'Baskı Yöntemleri': ['Tampon baskı', 'UV dijital baskı', 'Lazer gravür'],
      'Malzemeler': ['Plastik', 'Metal', 'Geri dönüştürülmüş materyal'],
      'Min. Sipariş Adedi': '100 adet',
    }
  },
  {
    id: 'ajandalar',
    name: 'Ajandalar ve Defterler',
    description: 'Yıl boyu kullanılacak, prestijli ve fonksiyonel ajandalar.',
    image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Ajandalar',
    details: {
      'Baskı Yöntemleri': ['Sıcak baskı (gofre)', 'Serigrafi', 'UV dijital baskı'],
      'Malzemeler': ['Suni deri', 'Termo deri', 'Sert kapak'],
      'Min. Sipariş Adedi': '50 adet',
    }
  },
  {
    id: 'tekstil',
    name: 'Tekstil Ürünleri',
    description: 'Tişört, şapka ve bez çantalarla markanızın giyilebilir reklamını yapın.',
    image: 'https://placehold.co/600x400/000080/FFFFFF?text=Tekstil',
    details: {
      'Baskı Yöntemleri': ['Serigrafi', 'DTF (Film Transfer)', 'Nakış'],
      'Malzemeler': ['Pamuk', 'Polyester', 'Kanvas kumaş'],
      'Min. Sipariş Adedi': '25 adet',
    }
  },
  {
    id: 'teknoloji',
    name: 'Teknolojik Ürünler',
    description: 'Powerbank, USB bellek gibi teknolojik ürünlerle fark yaratın.',
    image: 'https://placehold.co/600x400/FF6347/FFFFFF?text=Teknoloji',
    details: {
      'Baskı Yöntemleri': ['Lazer gravür', 'UV dijital baskı', 'Tampon baskı'],
      'Malzemeler': ['Alüminyum', 'Plastik', 'Ahşap'],
      'Min. Sipariş Adedi': '25 adet',
    }
  },
];

export default function PromosyonUrunleri() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleProductDetails = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-2xl text-black cursor-pointer">
              Sarıkare Ajans
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Ana Sayfa</Link>
              <Link href="/hizmetlerimiz" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Hizmetlerimiz</Link>
              <Link href="/promosyon-urunleri" className="text-black font-semibold cursor-pointer">Promosyon Ürünleri</Link>
              <Link href="/e-ticaret" className="text-gray-700 hover:text-black transition-colors cursor-pointer">E-Ticaret</Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-black transition-colors cursor-pointer">İletişim</Link>
              <Link href="/admin" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Admin</Link>
            </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-6 h-6 flex items-center justify-center z-50 relative">
                <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-30 flex flex-col items-center justify-center space-y-8">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">Ana Sayfa</Link>
            <Link href="/hizmetlerimiz" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">Hizmetlerimiz</Link>
            <Link href="/promosyon-urunleri" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-black font-semibold cursor-pointer">Promosyon Ürünleri</Link>
            <Link href="/e-ticaret" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">E-Ticaret</Link>
            <Link href="/iletisim" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">İletişim</Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-gray-700 hover:text-black transition-colors cursor-pointer">Admin</Link>
        </div>
      )}

      <main className={`transition-transform duration-500 ${mobileMenuOpen ? '-translate-x-full' : ''}`}>
        <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Promosyon Ürünleri
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Kurumsal kimliğinizi yansıtan, akılda kalıcı ve kaliteli promosyon çözümleriyle markanızın değerini artırın. Geniş ürün yelpazemizle her ihtiyaca uygun seçenekler sunuyoruz.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-black mb-3">{product.name}</h2>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <button 
                      onClick={() => toggleProductDetails(product.id)}
                      className="w-full md:w-auto self-start bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center"
                    >
                      {expandedProduct === product.id ? 'Detayları Gizle' : 'Detayları Gör'}
                      <i className={`ri-arrow-down-s-line ml-2 transition-transform ${expandedProduct === product.id ? 'rotate-180' : ''}`}></i>
                    </button>
                  </div>
                </div>
                {expandedProduct === product.id && (
                  <div className="bg-gray-50 p-8 border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-4">Ürün Detayları</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(product.details).map(([key, value]) => (
                        <div key={key}>
                          <h5 className="font-semibold text-gray-800">{key}</h5>
                          {Array.isArray(value) ? (
                            <ul className="list-disc list-inside text-gray-600 mt-1">
                              {value.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                          ) : (
                            <p className="text-gray-600 mt-1">{value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                        <Link href="/iletisim">
                            <div className="inline-block bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                                Bu Ürün İçin Teklif Al
                            </div>
                        </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
