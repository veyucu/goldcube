# GoldCube POS - Kuyumcu Satış Terminali

Profesyonel kuyumcu mağazaları için tasarlanmış modern POS (Point of Sale) sistemi. Hem web hem mobil cihazlarda sorunsuz çalışır.

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## 📱 Özellikler

### 💼 Mağaza İçi Kullanım
- ⚡ Hızlı ürün ekleme ve satış işlemleri
- 🔍 Ürün adı ve kod ile arama
- 🏷️ 9 farklı kategori filtreleme
- 📊 20+ ürün kataloğu (genişletilebilir)
- 💎 Detaylı ürün bilgileri (karat, ağırlık, taş)

### 💰 Tahsilat İşlemleri
- 💵 Çoklu para birimi desteği (TRY, USD, EUR, GBP)
- 💳 4 farklı ödeme yöntemi:
  - Nakit
  - Kredi Kartı
  - Havale/EFT
  - Karma Ödeme
- 🧮 Otomatik KDV hesaplama (%20)
- 👤 Müşteri bilgileri kayıt
- 🖨️ Fiş yazdırma hazırlığı

### 🎨 Kullanıcı Arayüzü
- 📱 Tam responsive tasarım
- 🖥️ Kompakt ürün kartları (ekrana daha çok ürün sığar)
- ⚡ Hızlı ve sezgisel kullanım
- 🎯 POS odaklı profesyonel arayüz
- ✨ Modern ve şık altın temalı tasarım

## 🛠️ Teknolojiler

- React 18
- Vite
- Tailwind CSS
- Lucide Icons
- PWA (Progressive Web App) desteği

## 🌐 Kullanım

### Web Tarayıcı (Bilgisayar)
```
http://localhost:3000
```

### Mobil Cihazlar (Aynı Wi-Fi ağında)
```
http://192.168.1.XXX:3000
```

### Mobil Uygulama Olarak Kullanım

**iOS (Safari):**
1. Safari'de siteyi açın
2. Paylaş butonuna tıklayın
3. "Ana Ekrana Ekle" seçeneğini seçin

**Android (Chrome):**
1. Chrome'da siteyi açın
2. Menü (3 nokta) butonuna tıklayın
3. "Ana ekrana ekle" seçeneğini seçin

Artık uygulamayı tam ekran mobil uygulama gibi kullanabilirsiniz!

## 📦 Ürün Yönetimi

Her ürün için:
- ✅ Ürün kodu (örn: YZK-001)
- ✅ Ürün adı ve kategorisi
- ✅ Fiyat bilgisi (₺)
- ✅ Altın karatı (14K, 18K, 22K)
- ✅ Ağırlık (gram)
- ✅ Taş bilgisi (varsa, karat)
- ✅ Yüksek kaliteli ürün görseli

## 🔄 Satış Akışı

1. **Ürün Seçimi**: Kategorilerden veya arama ile ürün bulun
2. **Sepete Ekleme**: Ürüne tıklayarak veya + butonuyla sepete ekleyin
3. **Miktar Ayarlama**: +/- butonları ile miktarı ayarlayın
4. **Para Birimi**: İsterseniz farklı para birimine geçin
5. **Tahsilat**: "Tahsilat Yap" butonuna tıklayın
6. **Müşteri Bilgisi**: Müşteri adını girin
7. **Ödeme Yöntemi**: Ödeme yöntemini seçin
8. **Tamamla**: İşlemi tamamlayın
9. **Fiş**: Opsiyonel olarak fiş yazdırın

## 🎯 Kullanım Senaryoları

- Mağaza içi hızlı satış işlemleri
- Tablet veya telefon üzerinden mobil satış
- Farklı para birimlerinde satış (turistik bölgeler için ideal)
- Müşteri bazlı satış takibi
- Stok ve ürün yönetimi

## 🔐 Güvenlik

- ✅ Müşteri bilgileri güvenli şekilde işlenir
- ✅ Ödeme bilgileri lokal olarak saklanır
- ✅ HTTPS üzerinden güvenli bağlantı (production'da)

