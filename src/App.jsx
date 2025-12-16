import React, { useState, useRef } from 'react';
import { ShoppingCart, Search, Menu, X, Diamond, DollarSign, CreditCard, Banknote, Printer, User, CheckCircle, Calculator, Camera, Scan, ArrowDownUp, UserCircle, Plus, Minus, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);
  const [transactionType, setTransactionType] = useState('satis'); // 'satis' veya 'alis'
  const [operationType, setOperationType] = useState('altin'); // 'altin', 'pirlanta', 'ziynet', 'doviz', 'hurda'
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('TRY');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const barcodeInputRef = useRef(null);

  // Müşteri veritabanı
  const customers = [
    { id: 1, name: 'Ahmet Yılmaz', phone: '0532 123 4567', email: 'ahmet@email.com', totalPurchases: 125000, vip: true },
    { id: 2, name: 'Ayşe Demir', phone: '0533 234 5678', email: 'ayse@email.com', totalPurchases: 85000, vip: false },
    { id: 3, name: 'Mehmet Kaya', phone: '0534 345 6789', email: 'mehmet@email.com', totalPurchases: 210000, vip: true },
    { id: 4, name: 'Fatma Şahin', phone: '0535 456 7890', email: 'fatma@email.com', totalPurchases: 45000, vip: false },
    { id: 5, name: 'Ali Öztürk', phone: '0536 567 8901', email: 'ali@email.com', totalPurchases: 156000, vip: true },
    { id: 6, name: 'Zeynep Aydın', phone: '0537 678 9012', email: 'zeynep@email.com', totalPurchases: 32000, vip: false },
  ];

  // Ürün veritabanı - İşlem tipine göre
  const allProducts = {
    altin: [
      { id: 'AU001', name: 'Çeyrek Altın', code: 'AU001', price: 2850, weight: '1.75g', type: 'altin', karat: '22K', buyPrice: 2800 },
      { id: 'AU002', name: 'Yarım Altın', code: 'AU002', price: 5700, weight: '3.5g', type: 'altin', karat: '22K', buyPrice: 5600 },
      { id: 'AU003', name: 'Tam Altın', code: 'AU003', price: 11400, weight: '7g', type: 'altin', karat: '22K', buyPrice: 11200 },
      { id: 'AU004', name: 'Cumhuriyet Altını', code: 'AU004', price: 12100, weight: '7.2g', type: 'altin', karat: '22K', buyPrice: 11900 },
      { id: 'AU005', name: 'Reşat Altını', code: 'AU005', price: 12500, weight: '7.2g', type: 'altin', karat: '22K', buyPrice: 12300 },
      { id: 'AU006', name: 'Gram Altın', code: 'AU006', price: 1620, weight: '1g', type: 'altin', karat: '24K', buyPrice: 1600 },
    ],
    pirlanta: [
      { id: 'DM001', name: '0.50 Karat Pırlanta', code: 'DM001', price: 18500, weight: '0.50ct', type: 'pirlanta', clarity: 'VS1', color: 'H', buyPrice: 17000 },
      { id: 'DM002', name: '1.00 Karat Pırlanta', code: 'DM002', price: 42000, weight: '1.00ct', type: 'pirlanta', clarity: 'VS2', color: 'G', buyPrice: 39000 },
      { id: 'DM003', name: '0.25 Karat Pırlanta', code: 'DM003', price: 8500, weight: '0.25ct', type: 'pirlanta', clarity: 'SI1', color: 'I', buyPrice: 7800 },
      { id: 'DM004', name: '1.50 Karat Pırlanta', code: 'DM004', price: 68000, weight: '1.50ct', type: 'pirlanta', clarity: 'VVS2', color: 'F', buyPrice: 63000 },
      { id: 'DM005', name: '2.00 Karat Pırlanta', code: 'DM005', price: 125000, weight: '2.00ct', type: 'pirlanta', clarity: 'VVS1', color: 'E', buyPrice: 115000 },
    ],
    ziynet: [
      { id: 'ZY001', name: '14K Altın Yüzük', code: 'ZY001', price: 8500, weight: '4.2g', type: 'ziynet', karat: '14K', category: 'Yüzük', buyPrice: 7800 },
      { id: 'ZY002', name: '18K Pırlanta Kolye', code: 'ZY002', price: 15600, weight: '5.8g', type: 'ziynet', karat: '18K', category: 'Kolye', buyPrice: 14200 },
      { id: 'ZY003', name: '22K Bileklik', code: 'ZY003', price: 12800, weight: '8.5g', type: 'ziynet', karat: '22K', category: 'Bileklik', buyPrice: 11900 },
      { id: 'ZY004', name: '14K Damla Küpe', code: 'ZY004', price: 6200, weight: '3.1g', type: 'ziynet', karat: '14K', category: 'Küpe', buyPrice: 5700 },
      { id: 'ZY005', name: '18K Alyans Seti', code: 'ZY005', price: 19500, weight: '9.2g', type: 'ziynet', karat: '18K', category: 'Set', buyPrice: 18000 },
      { id: 'ZY006', name: '22K Has Bileklik', code: 'ZY006', price: 24500, weight: '15.3g', type: 'ziynet', karat: '22K', category: 'Bileklik', buyPrice: 22800 },
    ],
    doviz: [
      { id: 'FX001', name: 'ABD Doları', code: 'FX001', price: 34.25, buyPrice: 34.15, type: 'doviz', symbol: '$', unit: 'USD' },
      { id: 'FX002', name: 'Euro', code: 'FX002', price: 37.42, buyPrice: 37.30, type: 'doviz', symbol: '€', unit: 'EUR' },
      { id: 'FX003', name: 'İngiliz Sterlini', code: 'FX003', price: 43.85, buyPrice: 43.70, type: 'doviz', symbol: '£', unit: 'GBP' },
      { id: 'FX004', name: 'İsviçre Frangı', code: 'FX004', price: 39.20, buyPrice: 39.05, type: 'doviz', symbol: 'CHF', unit: 'CHF' },
    ],
    hurda: [
      { id: 'HR001', name: 'Hurda 8 Ayar', code: 'HR001', price: 0, weight: '0g', type: 'hurda', karat: '8K', buyPrice: 520 },
      { id: 'HR002', name: 'Hurda 14 Ayar', code: 'HR002', price: 0, weight: '0g', type: 'hurda', karat: '14K', buyPrice: 920 },
      { id: 'HR003', name: 'Hurda 18 Ayar', code: 'HR003', price: 0, weight: '0g', type: 'hurda', karat: '18K', buyPrice: 1180 },
      { id: 'HR004', name: 'Hurda 22 Ayar', code: 'HR004', price: 0, weight: '0g', type: 'hurda', karat: '22K', buyPrice: 1450 },
      { id: 'HR005', name: 'Hurda 24 Ayar', code: 'HR005', price: 0, weight: '0g', type: 'hurda', karat: '24K', buyPrice: 1600 },
    ]
  };

  const operationTypes = [
    { id: 'altin', name: 'Altın', icon: '🪙', color: 'bg-yellow-500' },
    { id: 'pirlanta', name: 'Pırlanta', icon: '💎', color: 'bg-blue-500' },
    { id: 'ziynet', name: 'Ziynet', icon: '👑', color: 'bg-purple-500' },
    { id: 'doviz', name: 'Döviz', icon: '💵', color: 'bg-green-500' },
    { id: 'hurda', name: 'Hurda', icon: '♻️', color: 'bg-orange-500' },
  ];

  const currencyRates = {
    TRY: 1,
    USD: 0.029,
    EUR: 0.027,
    GBP: 0.023
  };

  const products = allProducts[operationType] || [];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id && item.transactionType === transactionType);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.transactionType === transactionType
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, transactionType, operationType }]);
    }
  };

  const removeFromCart = (productId, txType) => {
    const existingItem = cart.find(item => item.id === productId && item.transactionType === txType);
    if (existingItem.quantity > 1) {
      setCart(cart.map(item =>
        item.id === productId && item.transactionType === txType
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      setCart(cart.filter(item => !(item.id === productId && item.transactionType === txType)));
    }
  };

  const updateQuantity = (productId, txType, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => !(item.id === productId && item.transactionType === txType)));
    } else {
      setCart(cart.map(item =>
        item.id === productId && item.transactionType === txType
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.transactionType === 'satis' ? item.price : item.buyPrice;
      return total + (itemPrice * item.quantity);
    }, 0);
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
    if (!selectedCustomer) {
      alert('Lütfen müşteri seçiniz');
      return;
    }
    if (!paymentMethod) {
      alert('Lütfen ödeme yöntemi seçiniz');
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowPaymentModal(false);
      setCart([]);
      setPaymentMethod('');
    }, 2500);
  };

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    const barcode = barcodeInputRef.current.value;
    const product = products.find(p => p.code === barcode);
    if (product) {
      addToCart(product);
      barcodeInputRef.current.value = '';
      setShowBarcodeScanner(false);
    } else {
      alert('Ürün bulunamadı!');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

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
                <p className="text-xs text-gold-100">Kapsamlı İşlem Terminali</p>
              </div>
            </div>
            
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
          <div className="lg:col-span-3 space-y-4">
            {/* Müşteri Seçimi */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <UserCircle className="w-5 h-5" />
                  Müşteri
                </h3>
                <button
                  onClick={() => setShowCustomerModal(true)}
                  className="bg-gold-600 hover:bg-gold-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  {selectedCustomer ? 'Değiştir' : 'Seç'}
                </button>
              </div>
              {selectedCustomer && (
                <div className="mt-3 bg-gold-50 rounded-lg p-3 border border-gold-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 flex items-center gap-2">
                        {selectedCustomer.name}
                        {selectedCustomer.vip && <span className="text-xs bg-gold-600 text-white px-2 py-0.5 rounded-full">VIP</span>}
                      </p>
                      <p className="text-sm text-gray-600">{selectedCustomer.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Toplam Alışveriş</p>
                      <p className="text-sm font-bold text-gold-700">₺{selectedCustomer.totalPurchases.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* İşlem Tipi ve Yönü */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">İşlem Tipi</h3>
                <div className="flex bg-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setTransactionType('satis')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                      transactionType === 'satis'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    SATIŞ
                  </button>
                  <button
                    onClick={() => setTransactionType('alis')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                      transactionType === 'alis'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4" />
                    ALIŞ
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {operationTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setOperationType(type.id)}
                    className={`p-3 rounded-lg border-2 transition ${
                      operationType === type.id
                        ? `${type.color} text-white border-transparent shadow-lg`
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-xs font-semibold">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Arama ve Barkod */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Ürün ara (ad veya kod)..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-gold-500 focus:outline-none text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowBarcodeScanner(true)}
                  className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <Scan className="w-4 h-4" />
                  <span className="hidden sm:inline">Barkod</span>
                </button>
              </div>
            </div>

            {/* Ürünler */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {operationTypes.find(t => t.id === operationType)?.name} {transactionType === 'satis' ? 'Satışı' : 'Alışı'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-3 hover:border-gold-500 hover:shadow-md transition cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-mono">{product.code}</span>
                      {product.karat && (
                        <span className="text-xs bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full font-bold">
                          {product.karat}
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-1">{product.name}</h4>
                    {product.weight && (
                      <p className="text-xs text-gray-600 mb-2">{product.weight}</p>
                    )}
                    {product.clarity && (
                      <p className="text-xs text-gray-600 mb-2">
                        {product.clarity} / {product.color}
                      </p>
                    )}
                    {product.category && (
                      <p className="text-xs text-gray-600 mb-2">{product.category}</p>
                    )}
                    {product.symbol && (
                      <p className="text-xs text-gray-600 mb-2">{product.symbol} {product.unit}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        {transactionType === 'satis' && product.price > 0 && (
                          <p className="text-sm font-bold text-green-600">
                            ₺{product.price.toLocaleString()}
                          </p>
                        )}
                        {transactionType === 'alis' && product.buyPrice > 0 && (
                          <p className="text-sm font-bold text-blue-600">
                            ₺{product.buyPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className={`p-1.5 rounded transition ${
                          transactionType === 'satis'
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Ürün bulunamadı
                </div>
              )}
            </div>
          </div>

          {/* Sepet Sidebar */}
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
                  <div className="space-y-2 mb-4 max-h-80 overflow-y-auto">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.transactionType}`} className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                item.transactionType === 'satis'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {item.transactionType === 'satis' ? 'SATIŞ' : 'ALIŞ'}
                              </span>
                              <span className="text-xs text-gray-500">{item.code}</span>
                            </div>
                            <h4 className="font-semibold text-xs text-gray-800">{item.name}</h4>
                            <p className="text-xs text-gray-600">{item.weight || item.unit}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.transactionType)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-gold-700">
                            ₺{(item.transactionType === 'satis' ? item.price : item.buyPrice).toLocaleString()}
                          </p>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.transactionType, item.quantity - 1)}
                              className="w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, item.transactionType, parseInt(e.target.value) || 0)}
                              className="w-10 text-center text-sm border border-gray-300 rounded"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.transactionType, item.quantity + 1)}
                              className="w-6 h-6 bg-gold-600 hover:bg-gold-700 text-white rounded flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
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
                      <CheckCircle className="w-4 h-4" />
                      İşlemi Tamamla
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Müşteri Seçim Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-gold-700 to-gold-600 text-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <UserCircle className="w-6 h-6" />
                  Müşteri Seç
                </h3>
                <button 
                  onClick={() => setShowCustomerModal(false)}
                  className="hover:bg-gold-600 rounded-full p-1 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Müşteri ara (isim veya telefon)..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredCustomers.map(customer => (
                  <div
                    key={customer.id}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowCustomerModal(false);
                      setSearchTerm('');
                    }}
                    className="p-3 border border-gray-200 rounded-lg hover:border-gold-500 hover:bg-gold-50 cursor-pointer transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 flex items-center gap-2">
                          {customer.name}
                          {customer.vip && <span className="text-xs bg-gold-600 text-white px-2 py-0.5 rounded-full">VIP</span>}
                        </p>
                        <p className="text-sm text-gray-600">{customer.phone}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Toplam</p>
                        <p className="text-sm font-bold text-gold-700">₺{customer.totalPurchases.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barkod Okuyucu Modal */}
      {showBarcodeScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full">
            <div className="bg-gradient-to-r from-gold-700 to-gold-600 text-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Scan className="w-6 h-6" />
                  Barkod Oku
                </h3>
                <button 
                  onClick={() => setShowBarcodeScanner(false)}
                  className="hover:bg-gold-600 rounded-full p-1 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center">
                <Camera className="w-24 h-24 text-gray-400" />
              </div>
              <p className="text-center text-gray-600 mb-4 text-sm">
                Kamera ile barkod okutun veya manuel girin
              </p>
              <form onSubmit={handleBarcodeSubmit}>
                <input
                  ref={barcodeInputRef}
                  type="text"
                  placeholder="Barkod numarası..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none mb-4 text-center text-lg font-mono"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white py-3 rounded-lg font-bold transition"
                >
                  Ürün Ekle
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Ödeme Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-gold-700 to-gold-600 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  İşlem Onayı
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
              {/* Müşteri Bilgisi */}
              {selectedCustomer && (
                <div className="mb-4 bg-gold-50 rounded-lg p-4 border border-gold-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Müşteri</h4>
                  <p className="text-gray-700">{selectedCustomer.name}</p>
                  <p className="text-sm text-gray-600">{selectedCustomer.phone}</p>
                </div>
              )}

              {/* Sipariş Özeti */}
              <div className="mb-4 bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">İşlem Özeti</h4>
                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.transactionType}`} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        <span className={`text-xs ${item.transactionType === 'satis' ? 'text-green-600' : 'text-blue-600'}`}>
                          [{item.transactionType === 'satis' ? 'S' : 'A'}]
                        </span> {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        ₺{((item.transactionType === 'satis' ? item.price : item.buyPrice) * item.quantity).toLocaleString('tr-TR')}
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

              {/* Ödeme Yöntemi */}
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
                    <span className="block text-sm font-semibold">Karma</span>
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
                  Onayla
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
            <p className="text-gray-600 mb-4">
              {transactionType === 'satis' ? 'Satış' : 'Alış'} işlemi tamamlandı.
            </p>
            <div className="bg-gold-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-1">
                Müşteri: <strong>{selectedCustomer?.name}</strong>
              </p>
              <p className="text-sm text-gray-700 mb-1">
                Toplam: <strong className="text-gold-700">
                  {currency === 'TRY' ? '₺' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}
                  {getTotalInCurrency()}
                </strong>
              </p>
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
