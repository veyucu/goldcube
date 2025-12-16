import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Diamond, DollarSign, CreditCard, Banknote, Printer, User, CheckCircle, Calculator } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currency, setCurrency] = useState('TRY');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ['Tümü', 'Yüzük', 'Kolye', 'Bileklik', 'Küpe', 'Altın', 'Pırlanta', 'Set', 'İkili'];

  const currencyRates = {
    TRY: 1,
    USD: 0.031,
    EUR: 0.029,
    GBP: 0.025
  };

  const products = [
    {
      id: 1,
      name: '14K Pırlanta Yüzük',
      category: 'Yüzük',
      price: 12500,
      weight: '3.5g',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
      karat: '14K',
      stone: '0.25 ct',
      code: 'YZK-001'
    },
    {
      id: 2,
      name: '22K Altın Bileklik',
      category: 'Bileklik',
      price: 8750,
      weight: '12.8g',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop',
      karat: '22K',
      code: 'BLK-002'
    },
    {
      id: 3,
      name: 'Elmas Kolye',
      category: 'Kolye',
      price: 18900,
      weight: '5.2g',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
      karat: '18K',
      stone: '0.50 ct',
      code: 'KLY-003'
    },
    {
      id: 4,
      name: 'Pırlanta Küpe',
      category: 'Küpe',
      price: 15600,
      weight: '4.1g',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
      karat: '18K',
      stone: '0.35 ct',
      code: 'KPE-004'
    },
    {
      id: 5,
      name: 'Altın Halka Küpe',
      category: 'Küpe',
      price: 6200,
      weight: '6.3g',
      image: 'https://images.unsplash.com/photo-1590164018433-2444895f3c93?w=300&h=300&fit=crop',
      karat: '22K',
      code: 'KPE-005'
    },
    {
      id: 6,
      name: 'Tasarım Yüzük',
      category: 'Yüzük',
      price: 9800,
      weight: '4.8g',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop',
      karat: '18K',
      code: 'YZK-006'
    },
    {
      id: 7,
      name: 'İnce Altın Bileklik',
      category: 'Bileklik',
      price: 7400,
      weight: '8.5g',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop',
      karat: '14K',
      code: 'BLK-007'
    },
    {
      id: 8,
      name: 'Zümrüt Kolye',
      category: 'Kolye',
      price: 22500,
      weight: '6.7g',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      karat: '18K',
      stone: 'Zümrüt',
      code: 'KLY-008'
    },
    {
      id: 9,
      name: 'Altın Zincir',
      category: 'Kolye',
      price: 5600,
      weight: '9.2g',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
      karat: '22K',
      code: 'KLY-009'
    },
    {
      id: 10,
      name: 'Tek Taş Yüzük',
      category: 'Yüzük',
      price: 14200,
      weight: '3.1g',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
      karat: '18K',
      stone: '0.40 ct',
      code: 'YZK-010'
    },
    {
      id: 11,
      name: 'Dörtlü Bileklik',
      category: 'Bileklik',
      price: 11300,
      weight: '15.3g',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop',
      karat: '22K',
      code: 'BLK-011'
    },
    {
      id: 12,
      name: 'Damla Küpe',
      category: 'Küpe',
      price: 8900,
      weight: '3.8g',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
      karat: '14K',
      stone: '0.20 ct',
      code: 'KPE-012'
    },
    {
      id: 13,
      name: 'Alyans Set',
      category: 'Set',
      price: 16800,
      weight: '8.5g',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop',
      karat: '14K',
      code: 'SET-013'
    },
    {
      id: 14,
      name: 'Has Altın Bileklik',
      category: 'Bileklik',
      price: 19500,
      weight: '24.1g',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop',
      karat: '22K',
      code: 'BLK-014'
    },
    {
      id: 15,
      name: 'Beştaş Yüzük',
      category: 'Yüzük',
      price: 17600,
      weight: '4.2g',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
      karat: '18K',
      stone: '0.60 ct',
      code: 'YZK-015'
    },
    {
      id: 16,
      name: 'İkili Altın Zincir',
      category: 'İkili',
      price: 13400,
      weight: '18.7g',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
      karat: '22K',
      code: 'IKL-016'
    },
    {
      id: 17,
      name: 'Sıra Taş Küpe',
      category: 'Küpe',
      price: 12100,
      weight: '5.3g',
      image: 'https://images.unsplash.com/photo-1590164018433-2444895f3c93?w=300&h=300&fit=crop',
      karat: '18K',
      stone: '0.45 ct',
      code: 'KPE-017'
    },
    {
      id: 18,
      name: 'Lüks Kolye Set',
      category: 'Set',
      price: 28900,
      weight: '11.2g',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      karat: '18K',
      stone: '1.20 ct',
      code: 'SET-018'
    },
    {
      id: 19,
      name: 'Kare Taş Yüzük',
      category: 'Yüzük',
      price: 10700,
      weight: '3.9g',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop',
      karat: '14K',
      stone: '0.30 ct',
      code: 'YZK-019'
    },
    {
      id: 20,
      name: 'Zincir Bileklik',
      category: 'Bileklik',
      price: 9200,
      weight: '10.8g',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop',
      karat: '22K',
      code: 'BLK-020'
    }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem.quantity > 1) {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getConvertedPrice = (price) => {
    return (price * currencyRates[currency]).toFixed(2);
  };

  const getTotalInCurrency = () => {
    return getConvertedPrice(getTotalPrice() * 1.2);
  };

  const handlePayment = () => {
    if (!customerName || !paymentMethod) {
      alert('Lütfen müşteri adı ve ödeme yöntemi seçiniz');
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowPaymentModal(false);
      setCart([]);
      setCustomerName('');
      setPaymentMethod('');
    }, 2000);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Tümü' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gold-700 to-gold-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Diamond className="w-7 h-7 md:w-8 md:h-8" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold">GoldCube POS</h1>
                <p className="text-xs text-gold-100">Satış Terminali</p>
              </div>
            </div>
            
            {/* Currency Selector */}
            <div className="flex items-center gap-2">
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-gold-800 text-white px-2 py-1 rounded text-sm border border-gold-600 focus:outline-none"
              >
                <option value="TRY">₺ TRY</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
              
              <button className="relative p-2 hover:bg-gold-600 rounded-lg transition">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Ürün adı veya kodu ile ara..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-gold-500 focus:outline-none text-sm bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-4 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                      selectedCategory === category
                        ? 'bg-gold-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid - Kompakt */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => addToCart(product)}
                >
                  <div className="relative overflow-hidden aspect-square rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 right-1 bg-gold-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                      {product.karat}
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-500 mb-1">{product.code}</p>
                    <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>{product.weight}</span>
                      {product.stone && <span className="text-gold-700">💎 {product.stone}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gold-700">
                        ₺{product.price.toLocaleString('tr-TR')}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-gold-600 hover:bg-gold-700 text-white p-1.5 rounded transition"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">Ürün bulunamadı</p>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Sepet
                </h2>
                <span className="bg-gold-100 text-gold-800 px-2 py-1 rounded-full text-xs font-bold">
                  {getTotalItems()} Ürün
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-400 text-sm">Sepet Boş</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-4 max-h-80 overflow-y-auto scrollbar-hide">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-2 bg-gray-50 p-2 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs text-gray-800 truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.code}</p>
                          <p className="text-sm text-gold-700 font-bold">
                            ₺{item.price.toLocaleString('tr-TR')}
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1">
                          <button
                            onClick={() => addToCart(item)}
                            className="w-5 h-5 bg-gold-600 hover:bg-gold-700 rounded flex items-center justify-center text-white text-xs font-bold"
                          >
                            +
                          </button>
                          <span className="text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-5 h-5 bg-gray-300 hover:bg-gray-400 rounded flex items-center justify-center text-gray-700 text-xs font-bold"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Ara Toplam</span>
                      <span>₺{getTotalPrice().toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>KDV (%20)</span>
                      <span>₺{(getTotalPrice() * 0.2).toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-gray-800 pt-2 border-t">
                      <span>Toplam ({currency})</span>
                      <span className="text-gold-700">
                        {currency === 'TRY' ? '₺' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                        {getTotalInCurrency()}
                      </span>
                    </div>
                    <button 
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-lg font-bold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm"
                    >
                      <CreditCard className="w-4 h-4" />
                      Tahsilat Yap
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-gold-700 to-gold-600 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Tahsilat İşlemi
                </h3>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="hover:bg-gold-600 rounded-full p-1 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Customer Info */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Müşteri Adı
                </label>
                <input
                  type="text"
                  placeholder="Müşteri adını giriniz"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              {/* Order Summary */}
              <div className="mb-4 bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Sipariş Özeti</h4>
                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        ₺{(item.price * item.quantity).toLocaleString('tr-TR')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 space-y-1">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Ara Toplam</span>
                    <span>₺{getTotalPrice().toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>KDV (%20)</span>
                    <span>₺{(getTotalPrice() * 0.2).toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                    <span>Genel Toplam</span>
                    <span className="text-gold-700">
                      {currency === 'TRY' ? '₺' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                      {getTotalInCurrency()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Ödeme Yöntemi
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-4 rounded-lg border-2 transition ${
                      paymentMethod === 'cash'
                        ? 'border-gold-600 bg-gold-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Banknote className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <span className="block text-sm font-semibold">Nakit</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 transition ${
                      paymentMethod === 'card'
                        ? 'border-gold-600 bg-gold-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <span className="block text-sm font-semibold">Kredi Kartı</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-4 rounded-lg border-2 transition ${
                      paymentMethod === 'transfer'
                        ? 'border-gold-600 bg-gold-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <span className="block text-sm font-semibold">Havale/EFT</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('mixed')}
                    className={`p-4 rounded-lg border-2 transition ${
                      paymentMethod === 'mixed'
                        ? 'border-gold-600 bg-gold-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Calculator className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <span className="block text-sm font-semibold">Karma Ödeme</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
                >
                  İptal
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Tahsilatı Tamamla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">İşlem Başarılı!</h3>
            <p className="text-gray-600 mb-4">Tahsilat işlemi tamamlandı.</p>
            <div className="bg-gold-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-1">Müşteri: <strong>{customerName}</strong></p>
              <p className="text-sm text-gray-700 mb-1">Toplam: <strong className="text-gold-700">
                {currency === 'TRY' ? '₺' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                {getTotalInCurrency()}
              </strong></p>
              <p className="text-sm text-gray-700">
                Ödeme: <strong>
                  {paymentMethod === 'cash' ? 'Nakit' : 
                   paymentMethod === 'card' ? 'Kredi Kartı' : 
                   paymentMethod === 'transfer' ? 'Havale/EFT' : 'Karma'}
                </strong>
              </p>
            </div>
            <button className="mt-4 bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 mx-auto">
              <Printer className="w-4 h-4" />
              Fiş Yazdır
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

