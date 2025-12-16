# 📱 GoldCube POS - Native Mobil Uygulama Derleme Rehberi

Bu rehber, GoldCube POS uygulamasını **Android** ve **iOS** için native mobil uygulamaya nasıl dönüştüreceğinizi gösterir.

## ✅ Kurulum Tamamlandı!

Capacitor başarıyla kuruldu ve Android + iOS projeleri oluşturuldu! 🎉

---

## 📱 Android Uygulaması Oluşturma

### Gereksinimler:
- **Android Studio** (https://developer.android.com/studio)
- **Java JDK 17+**

### Adımlar:

#### 1. Build ve Sync
```bash
npm run cap:android
```
Bu komut:
- Web uygulamasını build eder
- Android projesini senkronize eder
- Android Studio'yu açar

#### 2. Android Studio'da:
- Proje yüklendikten sonra **"Run"** butonuna tıklayın
- Emülatör veya gerçek cihaz seçin
- Uygulama cihaza yüklenecek ve çalışacak

#### 3. APK Oluşturma (Yayınlamak için):
Android Studio'da:
- **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
- APK dosyası `android/app/build/outputs/apk/` klasöründe oluşur

#### 4. Play Store için AAB:
```bash
# Android Studio'da:
Build → Generate Signed Bundle / APK → Android App Bundle
```

---

## 🍎 iOS Uygulaması Oluşturma

### Gereksinimler:
- **macOS** (zorunlu)
- **Xcode** (Mac App Store'dan ücretsiz)
- **Apple Developer Account** (yayınlamak için - $99/yıl)

### Adımlar:

#### 1. Build ve Sync (Mac'te)
```bash
npm run cap:ios
```
Bu komut:
- Web uygulamasını build eder
- iOS projesini senkronize eder
- Xcode'u açar

#### 2. Xcode'da:
- Proje yüklendikten sonra cihaz/simülatör seçin
- **Play** butonuna tıklayın
- Uygulama çalışacak

#### 3. App Store için:
- Xcode'da: **Product** → **Archive**
- Archive oluşturulduktan sonra **Distribute App**
- App Store Connect'e yükleyin

---

## 🔄 Geliştirme Süreci

### Kod Değişikliği Yaptığınızda:

#### Hızlı Test (Hot Reload):
```bash
# Terminal 1: Web sunucusunu çalıştır
npm run dev

# Terminal 2: Live reload ile mobilde test et
npx cap run android --livereload --external
# veya
npx cap run ios --livereload --external
```

#### Production Build:
```bash
# Tüm platformları güncelle
npm run cap:build

# Sadece Android
npm run cap:android

# Sadece iOS
npm run cap:ios
```

---

## 📦 Proje Yapısı

```
GoldCube/
├── android/           # Android native projesi
├── ios/              # iOS native projesi
├── src/              # React kaynak kodları
├── dist/             # Build çıktısı (web assets)
├── capacitor.config.json  # Capacitor yapılandırması
└── package.json
```

---

## 🛠️ Önemli Komutlar

```bash
# Web build
npm run build

# Tüm platformları senkronize et
npm run cap:sync

# Android'i aç
npm run cap:android

# iOS'u aç (sadece Mac'te)
npm run cap:ios

# Kapasitör pluginleri güncelle
npx cap sync

# Android cihazda çalıştır
npx cap run android

# iOS simülatörde çalıştır
npx cap run ios
```

---

## 🎨 Uygulama İkonu ve Splash Screen

### İkon Oluşturma:
1. 1024x1024 PNG ikon hazırlayın
2. https://capacitorjs.com/docs/guides/splash-screens-and-icons kullanın
3. Veya manuel olarak:
   - Android: `android/app/src/main/res/` klasörüne ekleyin
   - iOS: Xcode'da Assets.xcassets'e ekleyin

### Splash Screen:
- `capacitor.config.json` dosyasında zaten yapılandırıldı
- Renk: Altın (#997500)
- Süre: 2 saniye

---

## 📱 Test Etme

### Android:
```bash
# Gerçek cihazda (USB Debug açık)
npx cap run android --target=<device-id>

# Emülatörde
npx cap run android
```

### iOS:
```bash
# Simülatörde
npx cap run ios --target="iPhone 15 Pro"

# Gerçek cihazda (Mac + Xcode gerekli)
npx cap run ios --target=<device-id>
```

---

## 🚀 Yayınlama

### Google Play Store (Android):
1. Android Studio'da **signed AAB** oluşturun
2. Google Play Console'a giriş yapın
3. Yeni uygulama oluşturun
4. AAB dosyasını yükleyin
5. Store listing bilgilerini doldurun
6. Review için gönderin

### Apple App Store (iOS):
1. Apple Developer hesabı oluşturun ($99/yıl)
2. App Store Connect'te uygulama oluşturun
3. Xcode'da Archive oluşturun
4. App Store Connect'e yükleyin
5. App bilgilerini doldurun
6. Review için gönderin

---

## 🔧 Sorun Giderme

### Android Studio açılmıyor:
```bash
# Manuel olarak aç
cd android
# Sonra Android Studio'da bu klasörü açın
```

### iOS build hatası:
```bash
# Pod'ları temizle ve yeniden yükle
cd ios/App
pod deintegrate
pod install
```

### Değişiklikler görünmüyor:
```bash
# Temiz build
npm run build
npx cap sync
npx cap copy
```

### Cache temizleme:
```bash
# Node modules
rm -rf node_modules
npm install

# Android
cd android && ./gradlew clean

# iOS
cd ios/App && pod cache clean --all
```

---

## 📚 Ek Kaynaklar

- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Studio**: https://developer.android.com/studio
- **Xcode**: https://developer.apple.com/xcode/
- **Capacitor Plugins**: https://capacitorjs.com/docs/plugins

---

## 💡 İpuçları

1. **Geliştirme sırasında**: `--livereload` kullanın, hızlı test için
2. **Production build**: Her zaman `npm run build` sonrası `cap sync` yapın
3. **Plugin ekleme**: `npm install` sonrası mutlaka `cap sync` çalıştırın
4. **iOS**: Mac olmadan iOS uygulaması derleyemezsiniz
5. **Test**: Gerçek cihazlarda test edin, emülatörler her zaman gerçeği yansıtmaz

---

## ✅ Sonraki Adımlar

1. ✅ Capacitor kuruldu
2. ✅ Android projesi oluşturuldu
3. ✅ iOS projesi oluşturuldu
4. 🔄 **Şimdi**: Android Studio veya Xcode ile uygulamayı çalıştırın
5. 📱 **Sonra**: Gerçek cihazda test edin
6. 🚀 **Son**: Store'lara yayınlayın

---

## 🎯 Hızlı Başlangıç

**Windows'ta Android için:**
```bash
npm run cap:android
```

**Mac'te iOS için:**
```bash
npm run cap:ios
```

**Her ikisi için:**
```bash
npm run build
npx cap sync
```

Başarılar! 🎉

