'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  in_stock: boolean;
  created_at: string;
}

export default function ETicaretPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'kupalar', name: 'Kupalar' },
    { id: 'plaketler', name: 'Plaketler' },
    { id: 'kalemler', name: 'Kalemler' },
    { id: 'ajandalar', name: 'Ajandalar' },
    { id: 'tekstil', name: 'Tekstil' },
    { id: 'teknoloji', name: 'Teknoloji' }
  ];

  // Mock data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Özel Baskılı Kupa',
      description: 'Firmanızın logosu ile özel tasarım seramik kupa. Süblimasyon baskı ile solmayan renkler.',
      price: 25.00,
      image: 'Custom printed ceramic mugs with company logos promotional products high quality materials clean white background professional photography elegant presentation golden accents',
      category: 'kupalar',
      in_stock: true,
      created_at: '2024-01-15'
    },
    // ... diğer ürünler
  ];

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? product.price * quantity : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-2xl text-black cursor-pointer">
              Sarıkare Ajans
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-black transition-colors cursor-pointer">
                Ana Sayfa
              </Link>
              <Link href="/hizmetlerimiz" className="text-gray-700 hover:text-black transition-colors cursor-pointer">
                Hizmetlerimiz
              </Link>
              <Link href="/promosyon-urunleri" className="text-gray-700 hover:text-black transition-colors cursor-pointer">
                Promosyon Ürünleri
              </Link>
              <Link href="/e-ticaret" className="text-black font-semibold cursor-pointer">
                E-Ticaret
              </Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-black transition-colors cursor-pointer">
                İletişim
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-black transition-colors cursor-pointer">
                Admin
              </Link>
            </div>
            
            {/* Cart Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative cursor-pointer">
                <i className="ri-shopping-cart-line text-2xl text-gray-700 hover:text-black"></i>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#CBA135] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {getTotalItems()}
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

      {/* ... geri kalan e-ticaret sayfası içeriği */}
    </div>
  );
}