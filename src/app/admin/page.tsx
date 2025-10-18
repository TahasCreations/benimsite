'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Component-level interfaces
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  in_stock: boolean;
  stock_quantity: number;
  sku: string;
  discount_percentage: number;
  created_at: string;
}

interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  usage_limit: number;
  used_count: number;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

interface Sale {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  coupon_code?: string;
  discount_amount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

// Static mock data moved outside the component to prevent re-creation on render
const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Özel Baskılı Kupa',
      description: 'Firmanızın logosu ile özel tasarım seramik kupa. Süblimasyon baskı ile solmayan renkler.',
      price: 25.00,
      images: ['https://placehold.co/400x400/F9D423/000000?text=Kupa'],
      category: 'kupalar',
      in_stock: true,
      stock_quantity: 150,
      sku: 'KP-001',
      discount_percentage: 10,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      name: 'Kristal Plaket',
      description: 'Özel etkinlikler için kristal cam plaket. Lazer kazıma ile isim ve logo işleme.',
      price: 150.00,
      images: ['https://placehold.co/400x400/C0C0C0/000000?text=Plaket'],
      category: 'plaketler',
      in_stock: true,
      stock_quantity: 50,
      sku: 'PL-001',
      discount_percentage: 0,
      created_at: '2024-01-14'
    }
  ];

  const mockCoupons: Coupon[] = [
    {
      id: '1',
      code: 'WELCOME20',
      discount_type: 'percentage',
      discount_value: 20,
      min_order_amount: 100,
      usage_limit: 100,
      used_count: 15,
      expires_at: '2024-12-31',
      is_active: true,
      created_at: '2024-01-01'
    },
    {
      id: '2',
      code: 'STUDENT50',
      discount_type: 'fixed',
      discount_value: 50,
      min_order_amount: 200,
      usage_limit: 50,
      used_count: 8,
      expires_at: '2024-06-30',
      is_active: true,
      created_at: '2024-01-10'
    }
  ];

  const mockSales: Sale[] = [
    {
      id: '1',
      customer_name: 'Ahmet Yılmaz',
      customer_email: 'ahmet@email.com',
      customer_phone: '+90 555 123 45 67',
      items: [
        { product_id: '1', product_name: 'Özel Baskılı Kupa', quantity: 2, price: 25.00 },
        { product_id: '2', product_name: 'Kristal Plaket', quantity: 1, price: 150.00 }
      ],
      subtotal: 200,
      coupon_code: 'WELCOME20',
      discount_amount: 40,
      total: 160,
      status: 'confirmed',
      created_at: '2024-01-20'
    },
    {
      id: '2',
      customer_name: 'Fatma Demir',
      customer_email: 'fatma@email.com',
      customer_phone: '+90 555 987 65 43',
      items: [
        { product_id: '1', product_name: 'Özel Baskılı Kupa', quantity: 5, price: 25.00 }
      ],
      subtotal: 125,
      discount_amount: 0,
      total: 125,
      status: 'shipped',
      created_at: '2024-01-19'
    }
  ];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'product' | 'coupon'>('product');
  const [editingItem, setEditingItem] = useState<Product | Coupon | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [productFormData, setProductFormData] = useState({
    name: '',
    description: '',
    price: '' as string | number,
    category: 'kupalar',
    in_stock: true,
    stock_quantity: 0,
    sku: '',
    discount_percentage: 0
  });

  const [couponFormData, setCouponFormData] = useState({
    code: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: 0,
    min_order_amount: 0,
    usage_limit: 0,
    expires_at: '',
    is_active: true
  });

  const categories = [
    { id: 'kupalar', name: 'Kupalar' },
    { id: 'plaketler', name: 'Plaketler' },
    { id: 'kalemler', name: 'Kalemler' },
    { id: 'ajandalar', name: 'Ajandalar' },
    { id: 'tekstil', name: 'Tekstil' },
    { id: 'teknoloji', name: 'Teknoloji' }
  ];

  const loadMockData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setCoupons(mockCoupons);
      setSales(mockSales);
      setLoading(false);
    }, 1000);
  }, []); // Dependencies removed as mock data is now stable

  useEffect(() => {
    loadMockData();
  }, [loadMockData]);

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result) {
            setUploadedImages(prev => [...prev, result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const generateInvoice = (sale: Sale) => {
    const invoiceData = {
      invoice_number: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString('tr-TR'),
      customer: {
        name: sale.customer_name,
        email: sale.customer_email,
        phone: sale.customer_phone
      },
      items: sale.items,
      subtotal: sale.subtotal,
      discount: sale.discount_amount,
      total: sale.total,
      company: {
        name: 'Sarıkare Ajans',
        address: 'Erzene 66. Sk. No:5 D:1A, 35040 Bornova/İzmir',
        phone: '+90 555 522 74 56',
        email: 'aydinsari@sarikare.com'
      }
    };

    // Simulate PDF generation
    console.log('Fatura oluşturuluyor:', invoiceData);
    alert(`Fatura oluşturuldu: ${invoiceData.invoice_number}`);
  };

  const openModal = (type: 'product' | 'coupon', item?: Product | Coupon) => {
    setModalType(type);
    setEditingItem(item || null);
    
    if (type === 'product') {
      if (item) {
        const product = item as Product;
        setProductFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          in_stock: product.in_stock,
          stock_quantity: product.stock_quantity,
          sku: product.sku,
          discount_percentage: product.discount_percentage
        });
        setUploadedImages(product.images);
      } else {
        setProductFormData({
          name: '',
          description: '',
          price: '', // Fiyat başlangıçta boş bir dize olabilir
          category: 'kupalar',
          in_stock: true,
          stock_quantity: 0,
          sku: '',
          discount_percentage: 0
        });
        setUploadedImages([]);
      }
    } else {
      if (item) {
        const coupon = item as Coupon;
        setCouponFormData({
          code: coupon.code,
          discount_type: coupon.discount_type,
          discount_value: coupon.discount_value,
          min_order_amount: coupon.min_order_amount,
          usage_limit: coupon.usage_limit,
          expires_at: coupon.expires_at,
          is_active: coupon.is_active
        });
      } else {
        setCouponFormData({
          code: '',
          discount_type: 'percentage',
          discount_value: 0,
          min_order_amount: 0,
          usage_limit: 0,
          expires_at: '',
          is_active: true
        });
      }
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setUploadedImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (modalType === 'product') {
      const productData: Product = {
        id: editingItem?.id || Date.now().toString(),
        name: productFormData.name,
        description: productFormData.description,
        price: Number(productFormData.price),
        images: uploadedImages,
        category: productFormData.category,
        in_stock: productFormData.in_stock,
        stock_quantity: Number(productFormData.stock_quantity),
        sku: productFormData.sku,
        discount_percentage: Number(productFormData.discount_percentage),
        created_at: editingItem?.created_at || new Date().toISOString().split('T')[0]
      };

      if (editingItem) {
        setProducts(prev => prev.map(p => p.id === editingItem.id ? productData : p));
      } else {
        setProducts(prev => [productData, ...prev]);
      }
    } else {
      const couponData: Coupon = {
        id: editingItem?.id || Date.now().toString(),
        code: couponFormData.code,
        discount_type: couponFormData.discount_type,
        discount_value: Number(couponFormData.discount_value),
        min_order_amount: Number(couponFormData.min_order_amount),
        usage_limit: Number(couponFormData.usage_limit),
        used_count: (editingItem as Coupon)?.used_count || 0,
        expires_at: couponFormData.expires_at,
        is_active: couponFormData.is_active,
        created_at: editingItem?.created_at || new Date().toISOString().split('T')[0]
      };

      if (editingItem) {
        setCoupons(prev => prev.map(c => c.id === editingItem.id ? couponData : c));
      } else {
        setCoupons(prev => [couponData, ...prev]);
      }
    }

    setLoading(false);
    closeModal();
  };

  const deleteItem = async (type: 'product' | 'coupon', itemId: string) => {
    if (confirm(`Bu ${type === 'product' ? 'ürünü' : 'kuponu'} silmek istediğinizden emin misiniz?`)) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (type === 'product') {
        setProducts(prev => prev.filter(p => p.id !== itemId));
      } else {
        setCoupons(prev => prev.filter(c => c.id !== itemId));
      }
      
      setLoading(false);
    }
  };

  const updateSaleStatus = async (saleId: string, newStatus: Sale['status']) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSales(prev => prev.map(s => 
      s.id === saleId ? { ...s, status: newStatus } : s
    ));
    
    setLoading(false);
  };

  const getTotalRevenue = () => {
    return sales.filter(s => s.status !== 'cancelled').reduce((sum, sale) => sum + sale.total, 0);
  };

  const getStatusColor = (status: Sale['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Sale['status']) => {
    switch (status) {
      case 'pending': return 'Bekliyor';
      case 'confirmed': return 'Onaylandı';
      case 'shipped': return 'Kargoda';
      case 'delivered': return 'Teslim Edildi';
      case 'cancelled': return 'İptal Edildi';
      default: return status;
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredCoupons = coupons.filter(c => c.code.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSales = sales.filter(s => s.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.includes(searchTerm));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-2xl text-black cursor-pointer">
              Sarıkare Ajans
            </Link>
            <h1 className="text-xl font-semibold">Yönetim Paneli</h1>
            <div>{/* Spacer */}</div>
          </div>
        </nav>
      </header>

      <main className="p-6 md:p-10">
        {/* Dashboard Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Toplam Gelir</h3>
            <p className="text-3xl font-bold mt-2">₺{getTotalRevenue().toLocaleString('tr-TR')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Toplam Satış</h3>
            <p className="text-3xl font-bold mt-2">{sales.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Toplam Ürün</h3>
            <p className="text-3xl font-bold mt-2">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Aktif Kupon</h3>
            <p className="text-3xl font-bold mt-2">{coupons.filter(c => c.is_active).length}</p>
          </div>
        </section>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('products')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'products' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Ürünler
            </button>
            <button onClick={() => setActiveTab('coupons')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'coupons' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Kuponlar
            </button>
            <button onClick={() => setActiveTab('sales')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'sales' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Satışlar
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {activeTab !== 'sales' && (
              <button onClick={() => openModal(activeTab === 'products' ? 'product' : 'coupon')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors">
                Yeni {activeTab === 'products' ? 'Ürün' : 'Kupon'} Ekle
              </button>
            )}
          </div>

          {loading ? <p>Yükleniyor...</p> : (
            <div className="overflow-x-auto">
              {activeTab === 'products' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ürün</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map(product => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Image width={40} height={40} className="rounded-md object-cover" src={product.images[0]} alt={product.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₺{product.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.stock_quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => openModal('product', product)} className="text-indigo-600 hover:text-indigo-900 mr-4">Düzenle</button>
                          <button onClick={() => deleteItem('product', product.id)} className="text-red-600 hover:text-red-900">Sil</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'coupons' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kod</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İndirim</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Kullanma</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCoupons.map(coupon => (
                      <tr key={coupon.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `₺${coupon.discount_value.toFixed(2)}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${coupon.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {coupon.is_active ? 'Aktif' : 'Pasif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.expires_at}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => openModal('coupon', coupon)} className="text-indigo-600 hover:text-indigo-900 mr-4">Düzenle</button>
                          <button onClick={() => deleteItem('coupon', coupon.id)} className="text-red-600 hover:text-red-900">Sil</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'sales' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sipariş ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSales.map(sale => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{sale.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.customer_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₺{sale.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(sale.status)}`}>
                            {getStatusText(sale.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.created_at}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                           <select 
                              value={sale.status} 
                              onChange={(e) => updateSaleStatus(sale.id, e.target.value as Sale['status'])}
                              className="text-xs p-1 rounded border border-gray-300 mr-2"
                            >
                              <option value="pending">Bekliyor</option>
                              <option value="confirmed">Onaylandı</option>
                              <option value="shipped">Kargoda</option>
                              <option value="delivered">Teslim Edildi</option>
                              <option value="cancelled">İptal Edildi</option>
                            </select>
                          <button onClick={() => generateInvoice(sale)} className="text-indigo-600 hover:text-indigo-900">Fatura</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-8">
              <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Düzenle' : 'Yeni'} {modalType === 'product' ? 'Ürün' : 'Kupon'}</h2>
              
              {modalType === 'product' ? (
                <>
                  {/* Product Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ürün Adı</label>
                      <input type="text" value={productFormData.name} onChange={e => setProductFormData({...productFormData, name: e.target.value})} required className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Açıklama</label>
                      <textarea value={productFormData.description} onChange={e => setProductFormData({...productFormData, description: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded-lg"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Fiyat (₺)</label>
                      <input type="number" value={productFormData.price} onChange={e => setProductFormData({...productFormData, price: e.target.value})} required className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                      <select value={productFormData.category} onChange={e => setProductFormData({...productFormData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white">
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Stok Miktarı</label>
                      <input type="number" value={productFormData.stock_quantity} onChange={e => setProductFormData({...productFormData, stock_quantity: parseInt(e.target.value)})} required className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">SKU</label>
                      <input type="text" value={productFormData.sku} onChange={e => setProductFormData({...productFormData, sku: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">İndirim Yüzdesi (%)</label>
                      <input type="number" value={productFormData.discount_percentage} onChange={e => setProductFormData({...productFormData, discount_percentage: parseFloat(e.target.value)})} className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" checked={productFormData.in_stock} onChange={e => setProductFormData({...productFormData, in_stock: e.target.checked})} id="in_stock" className="h-4 w-4 text-yellow-600 border-gray-300 rounded"/>
                      <label htmlFor="in_stock" className="ml-2 block text-sm text-gray-900">Stokta Var</label>
                    </div>
                  </div>
                  {/* Image Upload */}
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ürün Görselleri</label>
                    <div 
                      onDragEnter={handleDrag} 
                      onDragLeave={handleDrag} 
                      onDragOver={handleDrag} 
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'}`}
                    >
                      <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileInput} className="hidden" />
                      <p>Görselleri buraya sürükleyin veya tıklayıp seçin</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <Image width={96} height={96} src={image} alt="uploaded" className="object-cover rounded-lg"/>
                          <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">X</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Coupon Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kupon Kodu</label>
                      <input type="text" value={couponFormData.code} onChange={e => setCouponFormData({...couponFormData, code: e.target.value.toUpperCase()})} required className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">İndirim Tipi</label>
                      <select value={couponFormData.discount_type} onChange={e => setCouponFormData({...couponFormData, discount_type: e.target.value as 'percentage' | 'fixed'})} className="w-full px-4 py-2 border rounded-lg bg-white">
                        <option value="percentage">Yüzdelik (%)</option>
                        <option value="fixed">Sabit Tutar (₺)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">İndirim Değeri</label>
                      <input type="number" value={couponFormData.discount_value} onChange={e => setCouponFormData({...couponFormData, discount_value: parseFloat(e.target.value)})} required className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Sipariş Tutarı (₺)</label>
                      <input type="number" value={couponFormData.min_order_amount} onChange={e => setCouponFormData({...couponFormData, min_order_amount: parseFloat(e.target.value)})} className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kullanım Limiti</label>
                      <input type="number" value={couponFormData.usage_limit} onChange={e => setCouponFormData({...couponFormData, usage_limit: parseInt(e.target.value)})} className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Son Kullanma Tarihi</label>
                      <input type="date" value={couponFormData.expires_at} onChange={e => setCouponFormData({...couponFormData, expires_at: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" checked={couponFormData.is_active} onChange={e => setCouponFormData({...couponFormData, is_active: e.target.checked})} id="is_active" className="h-4 w-4 text-yellow-600 border-gray-300 rounded"/>
                      <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">Aktif</label>
                    </div>
                  </div>
                </>
              )}

              {/* Modal Actions */}
              <div className="mt-8 flex justify-end gap-4">
                <button type="button" onClick={closeModal} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg">
                  İptal
                </button>
                <button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg disabled:opacity-50">
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}