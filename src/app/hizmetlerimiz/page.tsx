'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';

// Expanded services data with more details and icons
const services = [
  {
    id: 'promosyon',
    title: 'Promosyon Ürünleri',
    description: 'Marka bilinirliğinizi artıracak, akılda kalıcı ve kaliteli kurumsal hediyeler.',
    icon: 'ri-gift-line',
    details: {
      description: 'Firmanızın kimliğini yansıtan, logonuzla özelleştirilmiş geniş ürün yelpazemizle tanışın. Fuar, seminer veya özel günler için müşterilerinize ve çalışanlarınıza sunabileceğiniz en iyi hediye çözümlerini sunuyoruz.',
      features: [
        'Kalem, ajanda, kupa, anahtarlık',
        'Tekstil ürünleri (tişört, şapka)',
        'Teknolojik ürünler (USB bellek, powerbank)',
        'Ücretsiz tasarım ve numune desteği'
      ],
    }
  },
  {
    id: 'dijital-baski',
    title: 'Dijital Baskı Çözümleri',
    description: 'İç ve dış mekanlar için yüksek çözünürlüklü, canlı ve dayanıklı baskılar.',
    icon: 'ri-printer-line',
    details: {
      description: 'Son teknoloji dijital baskı makinelerimizle, küçük adetli işlerden büyük projelere kadar tüm ihtiyaçlarınıza hızlı ve kaliteli çözümler üretiyoruz. Renk doğruluğu ve malzeme kalitesi önceliğimizdir.',
      features: [
        'Afiş, poster, broşür, kartvizit',
        'Vinil, folyo, branda baskıları',
        'Kanvas tablo ve duvar kağıdı',
        'Hızlı teslimat seçenekleri'
      ],
    }
  },
  {
    id: 'tabela',
    title: 'Tabela ve Reklamcılık',
    description: 'İşletmenizi fark edilir kılacak, estetik ve dikkat çekici tabela sistemleri.',
    icon: 'ri-sign-line',
    details: {
      description: 'Keşif, tasarım, üretim ve montaj dahil olmak üzere anahtar teslim tabela hizmetleri sunuyoruz. İşletmenizin cephesine ve kimliğine en uygun modern ve klasik tabela çözümleri için buradayız.',
      features: [
        'Işıklı ve ışıksız kutu harf',
        'Pleksi, kompozit ve alüminyum tabelalar',
        'Yönlendirme levhaları ve iç mekan tabelaları',
        'Profesyonel montaj ekibi'
      ],
    }
  },
  {
    id: 'web-tasarim',
    title: 'Web Tasarım ve Geliştirme',
    description: 'Modern, mobil uyumlu ve kullanıcı dostu web siteleriyle dijital dünyada yerinizi alın.',
    icon: 'ri-computer-line',
    details: {
      description: 'Kurumsal kimliğinizi dijitalde en iyi şekilde yansıtan, SEO uyumlu ve yönetimi kolay web siteleri tasarlıyoruz. E-ticaret altyapılarından kurumsal tanıtım sitelerine kadar geniş bir yelpazede hizmet veriyoruz.',
      features: [
        'Mobil uyumlu (Responsive) tasarım',
        'Arama motoru optimizasyonu (SEO)',
        'Kolay kullanılır yönetim paneli',
        'E-ticaret entegrasyonları'
      ],
    }
  },
];

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: {
    description: string;
    features: string[];
  };
}

export default function HizmetlerimizPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="font-['Pacifico'] text-2xl text-black cursor-pointer">
                  Sarıkare Ajans
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Ana Sayfa</Link>
                  <Link href="/hizmetlerimiz" className="text-black font-semibold cursor-pointer">Hizmetlerimiz</Link>
                  <Link href="/promosyon-urunleri" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Promosyon Ürünleri</Link>
                  <Link href="/e-ticaret" className="text-gray-700 hover:text-black transition-colors cursor-pointer">E-Ticaret</Link>
                  <Link href="/iletisim" className="text-gray-700 hover:text-black transition-colors cursor-pointer">İletişim</Link>
                  <Link href="/admin" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Admin</Link>
                </div>
              </div>
            </nav>
        </header>

        <section className="bg-gradient-to-r from-yellow-50 to-orange-50 text-black py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hizmetlerimiz</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Profesyonel baskı, tasarım ve promosyon çözümleri ile işletmenizi bir adım öne taşıyın.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  onClick={() => openModal(service)}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
                >
                  <div className="bg-yellow-500 text-black rounded-full p-4 mb-6">
                    <i className={`${service.icon} text-4xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Service Detail Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl">&times;</button>
            <div className="flex items-center mb-6">
                <div className="bg-yellow-500 text-black rounded-full p-3 mr-4">
                    <i className={`${selectedService.icon} text-3xl`}></i>
                </div>
                <h2 className="text-3xl font-bold">{selectedService.title}</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">{selectedService.details.description}</p>
            <ul className="space-y-2 mb-8">
              {selectedService.details.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-green-500 mr-2 mt-1"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/iletisim">
              <div className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors">
                Bu Hizmet İçin Teklif Alın
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
