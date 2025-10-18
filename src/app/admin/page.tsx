'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
    price: '',
    category: 'kupalar',
    in_stock: true,
    stock_quantity: '0',
    sku: '',
    discount_percentage: '0'
  });

  const [couponFormData, setCouponFormData] = useState({
    code: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: '0',
    min_order_amount: '0',
    usage_limit: '0',
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

  // Mock data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Özel Baskılı Kupa',
      description: 'Firmanızın logosu ile özel tasarım seramik kupa. Süblimasyon baskı ile solmayan renkler.',
      price: 25.00,
      images: ['Custom printed ceramic mugs with company logos promotional products high quality materials clean white background professional photography elegant presentation golden accents'],
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
      images: ['Crystal glass award plaques elegant recognition trophies professional achievement awards luxury materials clean presentation bright lighting'],
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setCoupons(mockCoupons);
      setSales(mockSales);
      setLoading(false);
    }, 1000);
  }, []);

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
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target.result as string]);
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
          price: product.price.toString(),
          category: product.category,
          in_stock: product.in_stock,
          stock_quantity: product.stock_quantity.toString(),
          sku: product.sku,
          discount_percentage: product.discount_percentage.toString()
        });
        setUploadedImages(product.images);
      } else {
        setProductFormData({
          name: '',
          description: '',
          price: '',
          category: 'kupalar',
          in_stock: true,
          stock_quantity: '0',
          sku: '',
          discount_percentage: '0'
        });
        setUploadedImages([]);
      }
    } else {
      if (item) {
        const coupon = item as Coupon;
        setCouponFormData({
          code: coupon.code,
          discount_type: coupon.discount_type,
          discount_value: coupon.discount_value.toString(),
          min_order_amount: coupon.min_order_amount.toString(),
          usage_limit: coupon.usage_limit.toString(),
          expires_at: coupon.expires_at,
          is_active: coupon.is_active
        });
      } else {
        setCouponFormData({
          code: '',
          discount_type: 'percentage',
          discount_value: '0',
          min_order_amount: '0',
          usage_limit: '0',
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
        price: parseFloat(productFormData.price),
        images: uploadedImages,
        category: productFormData.category,
        in_stock: productFormData.in_stock,
        stock_quantity: parseInt(productFormData.stock_quantity),
        sku: productFormData.sku,
        discount_percentage: parseFloat(productFormData.discount_percentage),
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
        discount_value: parseFloat(couponFormData.discount_value),
        min_order_amount: parseFloat(couponFormData.min_order_amount),
        usage_limit: parseInt(couponFormData.usage_limit),
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

  return (
    // ... geri kalan kod
  );
}