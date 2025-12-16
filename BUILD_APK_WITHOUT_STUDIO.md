# 📦 Android Studio Olmadan APK Oluşturma

Bu rehber, Android Studio kurmadan komut satırından APK nasıl oluşturulacağını gösterir.

---

## ✅ Gereksinimler

### 1. Java JDK 17+ Kurulumu

**Windows:**
```bash
# Chocolatey ile (önerilen):
choco install openjdk17

# Veya manuel:
# https://adoptium.net/ adresinden JDK 17 indirin
# İndirdikten sonra JAVA_HOME environment variable'ı ayarlayın
```

**JDK Kontrol:**
```bash
java -version
# Çıktı: openjdk version "17.x.x" görmelisiniz
```

### 2. JAVA_HOME Ayarlama (Windows)

**PowerShell (Admin olarak):**
```powershell
# JDK yolunu bulun (örnek: C:\Program Files\Eclipse Adoptium\jdk-17.0.x.xx-hotspot)
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Eclipse Adoptium\jdk-17.0.x.xx-hotspot", "Machine")

# Path'e ekle
$env:Path += ";$env:JAVA_HOME\bin"
```

**Veya Manuel:**
1. `Sistem` → `Gelişmiş sistem ayarları` → `Environment Variables`
2. `New` → Variable name: `JAVA_HOME`
3. Variable value: JDK kurulum yolu (örn: `C:\Program Files\Eclipse Adoptium\jdk-17.0.x.xx-hotspot`)
4. `Path` değişkenine `%JAVA_HOME%\bin` ekleyin

---

## 🔨 Debug APK Oluşturma (Test için)

### Adım 1: Projeyi Build Et
```bash
npm run build
npx cap sync android
```

### Adım 2: APK Oluştur
```bash
cd android
gradlew assembleDebug
```

### Adım 3: APK'yı Bul
APK şurada oluşur:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

Bu APK'yı doğrudan Android cihazınıza yükleyebilirsiniz!

---

## 🚀 Release APK Oluşturma (Play Store için)

### Adım 1: Keystore Oluştur
```bash
cd android/app

# Keystore oluştur
keytool -genkeypair -v -storetype PKCS12 -keystore goldcube-release-key.keystore -alias goldcube -keyalg RSA -keysize 2048 -validity 10000

# Şunları soracak:
# - Keystore password (güçlü bir şifre seçin, unutmayın!)
# - İsim, organizasyon bilgileri (doldurun)
```

**ÖNEMLİ:** `goldcube-release-key.keystore` dosyasını ve şifreyi GÜVENLİ bir yerde saklayın! Kaybederseniz uygulama güncelleyemezsiniz!

### Adım 2: Gradle Yapılandırması

`android/app/build.gradle` dosyasını düzenleyin:

```gradle
android {
    ...
    
    signingConfigs {
        release {
            storeFile file('goldcube-release-key.keystore')
            storePassword 'KEYSTORE_ŞİFRENİZ'
            keyAlias 'goldcube'
            keyPassword 'KEYSTORE_ŞİFRENİZ'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Adım 3: Release APK Oluştur
```bash
cd android
gradlew assembleRelease
```

APK şurada oluşur:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Adım 4: AAB Oluştur (Google Play Store için)
```bash
cd android
gradlew bundleRelease
```

AAB şurada oluşur:
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🌐 Yöntem 2: EAS Build (Online Build Servisi)

Hiç kurulum gerektirmez! Expo'nun bulut servisi kullanır.

### Kurulum:
```bash
npm install -g eas-cli
eas login
eas build:configure
```

### APK Oluştur:
```bash
# Android APK
eas build --platform android --profile preview

# iOS (Mac'siz!)
eas build --platform ios
```

**Avantajları:**
- ✅ Mac olmadan iOS build!
- ✅ Kurulum gerektirmez
- ✅ Bulutta build olur
- ⚠️ Aylık build limiti var (ücretsiz planda)

---

## 📱 APK'yı Cihaza Yükleme

### Yöntem 1: USB ile
```bash
# ADB Tools gerekli
adb install app-debug.apk
```

### Yöntem 2: Manuel
1. APK'yı telefona kopyalayın
2. Telefonda APK'ya tıklayın
3. "Bilinmeyen kaynaklardan yükleme" izni verin
4. Yükle'ye tıklayın

### Yöntem 3: Google Drive / Email
1. APK'yı Drive'a yükleyin veya email ile gönderin
2. Telefonda açın ve yükleyin

---

## 🔧 Gradle Komutları

```bash
# Debug APK
gradlew assembleDebug

# Release APK
gradlew assembleRelease

# AAB (Play Store)
gradlew bundleRelease

# Temizle ve yeniden build
gradlew clean assembleRelease

# Tüm build tiplerini göster
gradlew tasks

# Build bilgisi
gradlew --version
```

---

## 🚨 Sorun Giderme

### "gradlew: command not found"
```bash
# Windows'ta:
.\gradlew.bat assembleDebug

# Veya tam yol:
.\android\gradlew.bat -p android assembleDebug
```

### "JAVA_HOME is not set"
```bash
# Java kurulu mu kontrol et
java -version

# JAVA_HOME'u geçici olarak ayarla (PowerShell)
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.x.xx-hotspot"
```

### "SDK location not found"
`android/local.properties` dosyası oluşturun:
```properties
sdk.dir=C\:\\Users\\KULLANICI_ADI\\AppData\\Local\\Android\\Sdk
```

Veya Android SDK indirin:
https://developer.android.com/studio#command-tools

### Build hatası: "Could not resolve..."
```bash
# İnternet bağlantısını kontrol edin
# Gradle cache'i temizleyin
cd android
gradlew clean
gradlew build --refresh-dependencies
```

---

## 📦 APK vs AAB

**APK (Android Package Kit):**
- ✅ Doğrudan yüklenebilir
- ✅ Test için ideal
- ✅ APK dosyası paylaşılabilir
- ⚠️ Daha büyük boyut

**AAB (Android App Bundle):**
- ✅ Google Play Store için gerekli
- ✅ Daha küçük indirme boyutu
- ✅ Cihaza özel optimize
- ⚠️ Doğrudan yüklenemez

---

## 🎯 Hızlı Komutlar Özeti

```bash
# 1. Web build + sync
npm run build && npx cap sync android

# 2. Debug APK (test için)
cd android && gradlew assembleDebug

# 3. Release APK (dağıtım için)
cd android && gradlew assembleRelease

# 4. Play Store AAB
cd android && gradlew bundleRelease
```

---

## ✅ Checklist

- [ ] Java JDK 17+ kurulu
- [ ] JAVA_HOME ayarlandı
- [ ] `npm run build` çalıştırıldı
- [ ] `npx cap sync android` yapıldı
- [ ] `gradlew assembleDebug` başarılı
- [ ] APK oluşturuldu: `android/app/build/outputs/apk/debug/app-debug.apk`
- [ ] APK cihazda test edildi

---

## 🎉 Başarılı Build Sonrası

APK oluşturulduktan sonra:
1. ✅ Android cihazda test edin
2. ✅ Farklı cihazlarda test edin
3. ✅ Performansı kontrol edin
4. ✅ Beta kullanıcılara dağıtın
5. 🚀 Play Store'a yükleyin

---

## 📚 Ek Kaynaklar

- Gradle: https://gradle.org/
- Android CLI Tools: https://developer.android.com/studio#command-tools
- EAS Build: https://docs.expo.dev/build/introduction/
- Signing: https://developer.android.com/studio/publish/app-signing

Başarılar! 🚀

