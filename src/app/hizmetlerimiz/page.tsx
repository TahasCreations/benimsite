'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
  {
    id: 'promosyon',
    title: 'Promosyon İşleri',
    description: 'Kurumsal hediyeler, fuar ürünleri ve tanıtım malzemeleri',
    image: 'https://readdy.ai/api/search-image?query=Corporate promotional products...',
    details: {
      description: 'Markanızı öne çıkaracak, kaliteli promosyon ürünleri...',
      products: [
        'Kupalar (seramik, cam, termal)',
        'Plaketler (kristal, ahşap, metal)',
        'Kalemler (tükenmez, kurşun, roller)'
      ],
      advantages: [
        'Ücretsiz tasarım desteği',
        'Hızlı üretim süreci',
        'Kaliteli malzeme garantisi'
      ],
      delivery: '3-7 iş günü'
    }
  }
];

export default function HizmetlerimizPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hizmetlerimiz
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Profesyonel baskı, tasarım ve tabela çözümleri ile işletmenizi bir adım öne taşıyın
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}