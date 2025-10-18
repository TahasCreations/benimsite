import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <div className="font-['Pacifico'] text-4xl text-black mb-4">
        Sarıkare Ajans
      </div>
      <h1 className="text-6xl md:text-8xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-6 mb-4">Sayfa Bulunamadı</h2>
      <p className="text-lg text-gray-500 max-w-md">Aradığınız sayfa mevcut değil, taşınmış veya silinmiş olabilir.</p>
      <Link
        href="/"
        className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-semibold transition-colors cursor-pointer"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}