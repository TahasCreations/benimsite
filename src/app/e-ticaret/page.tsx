'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  in_stock: boolean;
}

// Mock data - expanded for a better look
const mockProducts: Product[] = [
  { id: '1', name: 'Özel Baskılı Kupa', description: 'Yüksek kaliteli seramik kupa.', price: 85.00, image: 'https://placehold.co/400x400/F9D423/000000?text=Kupa', category: 'kupalar', in_stock: true },
  { id: '2', name: 'Kristal Plaket', description: 'Lazer kazıma ile kişiselleştirilmiş.', price: 250.00, image: 'https://placehold.co/400x400/C0C0C0/000000?text=Plaket', category: 'plaketler', in_stock: true },
  { id: '3', name: 'Metal Roller Kalem', description: 'Şık ve profesyonel.', price: 120.00, image: 'https://placehold.co/400x400/333333/FFFFFF?text=Kalem', category: 'kalemler', in_stock: true },
  { id: '4', name: 'Deri Kapaklı Ajanda', description: '2025 yılı için özel.', price: 150.00, image: 'https://placehold.co/400x400/8B4513/FFFFFF?text=Ajanda', category: 'ajandalar', in_stock: false },
  { id: '5', name: 'Polo Yaka Tişört', description: 'Nakışlı logo baskılı.', price: 180.00, image: 'https://placehold.co/400x400/000080/FFFFFF?text=Tekstil', category: 'tekstil', in_stock: true },
  { id: '6', name: 'Bluetooth Hoparlör', description: 'Su geçirmez ve taşınabilir.', price: 350.00, image: 'https://placehold.co/400x400/FF6347/FFFFFF?text=Teknoloji', category: 'teknoloji', in_stock: true },
  { id: '7', name: 'Sihirli Kupa', description: 'Sıcak su ile renk değiştiren tasarım.', price: 110.00, image: 'https://placehold.co/400x400/4B0082/FFFFFF?text=Sihirli+Kupa', category: 'kupalar', in_stock: true },
  { id: '8', name: 'USB Bellek (32GB)', description: 'Logonuzla kişiselleştirilmiş metal USB.', price: 95.00, image: 'https://placehold.co/400x400/2E8B57/FFFFFF?text=USB', category: 'teknoloji', in_stock: true },
];

const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'kupalar', name: 'Kupalar' },
  { id: 'plaketler', name: 'Plaketler' },
  { id: 'kalemler', name: 'Kalemler' },
  { id: 'ajandalar', name: 'Ajandalar' },
  { id: 'tekstil', name: 'Tekstil' },
  { id: 'teknoloji', name: 'Teknoloji' }
];

export default function ETicaretPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500); // Reduced timeout for quicker loading
  }, []);

  const filteredProducts = useMemo(() => products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [products, selectedCategory, searchTerm]);

  const addToCart = useCallback((productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  }, []);

  const getTotalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  }, [cart]);

  const getTotalPrice = useMemo(() => {
    return Object.entries(cart).reduce((sum, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? product.price * quantity : 0);
    }, 0);
  }, [cart, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-2xl text-black cursor-pointer">
              Sarıkare Ajans
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Ana Sayfa</Link>
              <Link href="/hizmetlerimiz" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Hizmetlerimiz</Link>
              <Link href="/promosyon-urunleri" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Promosyon Ürünleri</Link>
              <Link href="/e-ticaret" className="text-black font-semibold cursor-pointer">E-Ticaret</Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-black transition-colors cursor-pointer">İletişim</Link>
              <Link href="/admin" className="text-gray-700 hover:text-black transition-colors cursor-pointer">Admin</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative cursor-pointer group">
                <i className="ri-shopping-cart-line text-2xl text-gray-700 group-hover:text-black"></i>
                {getTotalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {getTotalItems}
                  </span>
                )}
              </div>
              <button 
                className="md:hidden w-6 h-6 flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          
          {/* Left Sidebar - Filters */}
          <aside className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Filtreler</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700">Ürün Ara</label>
                  <input 
                    type="text" 
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Kupa, kalem..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Kategoriler</h3>
                  <div className="mt-2 space-y-2">
                    {categories.map(category => (
                      <button 
                        key={category.id} 
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedCategory === category.id 
                          ? 'bg-yellow-500 text-black' 
                          : 'text-gray-700 hover:bg-gray-200'
                        }`}>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Product Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="w-full h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl">
                    <div className="relative w-full h-48">
                      <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" />
                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-bold">Tükendi</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="font-bold text-xl">₺{product.price.toFixed(2)}</span>
                        <button 
                          onClick={() => addToCart(product.id)}
                          disabled={!product.in_stock}
                          className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold text-sm transition-transform transform group-hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed">
                          Sepete Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">Arama kriterlerinize uygun ürün bulunamadı.</p>
              </div>
            )}
          </div>

        </div>
         {/* Cart Sidebar - A simple version, could be a modal or a separate page */}
        {Object.keys(cart).length > 0 && (
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl p-6 transform transition-transform translate-x-0 z-50">
            <h2 className="text-2xl font-bold mb-6">Sepetiniz</h2>
            <div className="space-y-4">
              {Object.entries(cart).map(([productId, quantity]) => {
                const product = products.find(p => p.id === productId);
                if (!product) return null;
                return (
                  <div key={productId} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-600">₺{product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => removeFromCart(productId)} className="w-6 h-6 rounded-full bg-gray-200">-</button>
                      <span>{quantity}</span>
                      <button onClick={() => addToCart(productId)} className="w-6 h-6 rounded-full bg-gray-200">+</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t mt-6 pt-6">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Toplam:</span>
                <span>₺{getTotalPrice().toFixed(2)}</span>
              </div>
              <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg mt-4 hover:bg-yellow-600">Ödemeye Geç</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
