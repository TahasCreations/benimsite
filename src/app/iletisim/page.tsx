'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Basic validation example
    if (formData.message.length > 500) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <section className="py-20 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">İletişim</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bornova/İzmir&apos;de hızlı çözüm ve müşteri hizmeti anlayışımızla size en iyi hizmeti sunmak için buradayız.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              {/* You can add contact info or a map here */}
              <h2 className="text-3xl font-bold text-black mb-4">Bize Ulaşın</h2>
              <p className="text-gray-600 mb-4">
                Aşağıdaki formu doldurarak veya iletişim bilgilerimiz üzerinden bize ulaşabilirsiniz. Projeleriniz hakkında konuşmak için sabırsızlanıyoruz!
              </p>
              <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                  aydinsari@sarikare.com
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                  +90 555 522 74 56
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                  Erzene 66. Sk. No:5 D:1A, 35040 Bornova/İzmir
                </p>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-black mb-6">Teklif Formu</h2>
                <form id="contact-form" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Adınız Soyadınız *</label>
                      <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">E-posta Adresiniz *</label>
                      <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Telefon Numaranız</label>
                      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Konu</label>
                      <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Mesajınız *</label>
                    <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" maxLength={501}></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Teklif İste'}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <p className="mt-4 text-center text-green-600">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="mt-4 text-center text-red-600">Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya mesajınızın 500 karakteri geçmediğinden emin olun.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
