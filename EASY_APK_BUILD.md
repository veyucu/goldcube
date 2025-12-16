# 🚀 Android Studio Olmadan APK - En Kolay Yöntemler

## ⚡ YÖNTEM 1: Android Command Line Tools (ÜCRETSİZ)

Android Studio kurmadan sadece SDK tools kullanın!

### Adım 1: Command Line Tools İndirin
1. https://developer.android.com/studio#command-tools adresine gidin
2. "Command line tools only" bölümünden **Windows** için indirin
3. İndirilen ZIP'i açın

### Adım 2: Kurulum
```bash
# Klasör oluştur
mkdir C:\Android
mkdir C:\Android\cmdline-tools

# ZIP içeriğini C:\Android\cmdline-tools\latest\ içine çıkarın
# Yapı şöyle olmalı:
# C:\Android\cmdline-tools\latest\bin\
# C:\Android\cmdline-tools\latest\lib\
```

### Adım 3: SDK Kurun
```bash
cd C:\Android\cmdline-tools\latest\bin

# SDK Manager ile gerekli paketleri yükle
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Lisansları kabul et
sdkmanager --licenses
```

### Adım 4: Environment Variables Ayarla

**PowerShell (Admin olarak):**
```powershell
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Android", "Machine")
$env:Path += ";C:\Android\cmdline-tools\latest\bin;C:\Android\platform-tools"
```

### Adım 5: APK Oluştur
```bash
cd C:\Dosyalar\Projeler\GoldCube
npm run apk:debug
```

**APK Konumu:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🌐 YÖNTEM 2: Expo EAS Build (BULUT - EN KOLAY!)

Hiçbir kurulum gerektirmez! Bulutta build olur!

### Adım 1: EAS CLI Kur
```bash
npm install -g @expo/eas-cli
```

### Adım 2: Expo Hesabı Oluştur
```bash
eas login
# Veya kayıt ol: eas register
```

### Adım 3: Proje Yapılandır
```bash
eas build:configure
```

### Adım 4: APK Build Et
```bash
# Preview APK (test için - ÜCRETSİZ)
eas build -p android --profile preview

# Production AAB (Play Store için)
eas build -p android --profile production
```

**Avantajları:**
- ✅ Hiçbir kurulum gerekmiyor
- ✅ Mac olmadan iOS build!
- ✅ Bulutta otomatik build
- ✅ APK linki email ile gelir
- ✅ Ücretsiz plan var (aylık limit ile)

**ÜCRETSİZ PLAN:**
- 30 build/ay (Preview APK için yeterli)

---

## 🎯 YÖNTEM 3: GitHub Actions (TAMAMEN ÜCRETSİZ)

GitHub üzerinde otomatik build!

### `.github/workflows/build-android.yml` oluşturun:

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build web
        run: npm run build
      
      - name: Sync Capacitor
        run: npx cap sync android
      
      - name: Build APK
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug
      
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-debug
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

**Kullanım:**
1. Kodu GitHub'a push edin
2. Actions sekmesinde build başlar
3. APK'yı Artifacts'ten indirin

---

## 💡 Hangi Yöntemi Seçmeliyim?

### Android Command Line Tools
✅ Tamamen kontrolünüzde  
✅ Offline çalışır  
⚠️ İlk kurulum biraz zaman alır  
⚠️ ~2-3 GB disk alanı  

### Expo EAS Build
✅ Hiç kurulum yok  
✅ En hızlı başlangıç  
✅ Mac olmadan iOS!  
⚠️ İnternet gerekli  
⚠️ Aylık build limiti  

### GitHub Actions
✅ Tamamen ücretsiz  
✅ Otomatik build  
✅ Sınırsız build  
⚠️ GitHub hesabı gerekli  
⚠️ Her build 5-10 dakika  

---

## 🏆 ÖNERİM

**Test ve geliştirme için:** Expo EAS Build  
**Production ve sürekli kullanım için:** Android Command Line Tools  
**Otomatik deployment için:** GitHub Actions  

---

## 📦 APK Oluştuktan Sonra

### Test Etme:
```bash
# USB ile yükle (ADB varsa)
adb install app-debug.apk

# Veya APK'yı telefona email/Drive ile gönder
```

### Cihazda Kurulum:
1. APK'yı telefona kopyala
2. Dosya yöneticisinden APK'ya tıkla
3. "Bilinmeyen kaynaklardan uygulama yükle" iznini ver
4. Kur butonuna tıkla
5. Uygulama hazır! 🎉

---

## 🔧 Hızlı Sorun Çözümleri

### "SDK location not found"
→ Command Line Tools kur veya EAS Build kullan

### "JAVA_HOME not set"
→ Java kurulumu kontrol et: `java -version`

### "gradlew: permission denied"
```bash
chmod +x android/gradlew
```

### Build çok yavaş
→ Gradle daemon kullan (otomatik)  
→ İlk build yavaş, sonrakiler hızlı olur

---

## 🎯 Tek Komut Özeti

### Local (Command Line Tools kurulu ise):
```bash
npm run apk:debug
```

### Cloud (EAS):
```bash
eas build -p android --profile preview
```

### GitHub Actions:
```bash
git push origin main
# APK otomatik build olur
```

Başarılar! 🚀

