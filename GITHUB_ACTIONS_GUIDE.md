# 🚀 GitHub Actions ile Otomatik APK Build

GitHub Actions kullanarak **tamamen ücretsiz** ve **otomatik** APK oluşturma rehberi!

---

## ✅ Kurulum Tamamlandı!

GitHub Actions workflow dosyaları oluşturuldu:
- ✅ `.github/workflows/build-android.yml` - Debug APK (test için)
- ✅ `.github/workflows/build-android-release.yml` - Release APK/AAB (yayın için)

---

## 🎯 Nasıl Kullanılır?

### Yöntem 1: Otomatik Build (Her Push'ta)

```bash
# 1. GitHub'a kodu yükle
git add .
git commit -m "Android build hazır"
git push origin main

# 2. GitHub Actions otomatik başlar!
# 3. 5-10 dakika sonra APK hazır olur
```

### Yöntem 2: Manuel Build (İstediğiniz Zaman)

1. GitHub repo'nuza gidin
2. **Actions** sekmesine tıklayın
3. **Build Android APK** workflow'u seçin
4. **Run workflow** butonuna tıklayın
5. **Run workflow** (yeşil buton) tıklayın
6. Build başlar! ⚡

---

## 📥 APK'yı İndirme

### Adımlar:

1. GitHub repo'nuzda **Actions** sekmesine gidin
2. En son çalışan workflow'a tıklayın (yeşil ✅ işaretli)
3. Sayfayı aşağı kaydırın, **Artifacts** bölümünü bulun
4. **goldcube-debug-apk** linkine tıklayın
5. ZIP indirilir, içinden APK'yı çıkarın
6. APK hazır! 🎉

**Direkt link formatı:**
```
https://github.com/KULLANICI_ADI/GoldCube/actions
```

---

## 🔄 Build Tipleri

### 1. Debug APK (Test için)
**Ne zaman çalışır:** Her `main` branch'e push'ta

**Kullanım:**
- Geliştirme ve test için
- Ekibe dağıtım için
- Beta kullanıcılara test için

**İndirme:**
Actions → Build Android APK → Artifacts → `goldcube-debug-apk`

### 2. Release APK/AAB (Yayın için)
**Ne zaman çalışır:** 
- Tag push edildiğinde (örn: `v1.0.0`)
- Manuel başlatıldığında

**Release oluşturma:**
```bash
git tag v1.0.0
git push origin v1.0.0
```

**İndirme:**
Actions → Build Android Release APK → Artifacts → 
- `goldcube-release-apk` (APK)
- `goldcube-release-aab` (Play Store için)

---

## 🎨 İlk Build Adımları

### 1. GitHub Repository Oluştur

**Yeni repo:**
```bash
# GitHub'da yeni repo oluştur: GoldCube

# Local'de git başlat
git init
git add .
git commit -m "İlk commit - GoldCube POS uygulaması"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADI/GoldCube.git
git push -u origin main
```

**Mevcut repo varsa:**
```bash
git add .
git commit -m "GitHub Actions eklendi"
git push origin main
```

### 2. Build'in Başladığını Göreceksiniz

GitHub'da:
1. **Actions** sekmesi → Sarı daire (🟡) = Build başladı
2. 5-10 dakika bekle
3. Yeşil tik (✅) = Build başarılı!
4. Kırmızı X (❌) = Hata var (loglara bakın)

### 3. APK'yı İndir ve Test Et

Actions → Workflow → Artifacts → APK indir → Telefona yükle!

---

## ⚙️ Workflow Özellikleri

### Otomatik Cache
- ✅ Gradle cache kullanılır
- ✅ npm cache kullanılır
- ✅ İlk build: ~10 dakika
- ✅ Sonraki buildler: ~5 dakika

### Retention (Saklama Süresi)
- Debug APK: 30 gün
- Release APK/AAB: 90 gün

### Build Ortamı
- Ubuntu Latest (Linux)
- Node.js 18
- Java JDK 17
- Gradle (otomatik)

---

## 🔧 Özelleştirme

### Build'i Sadece Tag'lerde Çalıştır

`.github/workflows/build-android.yml` düzenle:
```yaml
on:
  push:
    tags:
      - 'v*'
```

### Build'i Manuel Yapmak

`.github/workflows/build-android.yml` düzenle:
```yaml
on:
  workflow_dispatch:  # Sadece bu satırı bırak
```

### Farklı Branch'lerde Çalıştır

```yaml
on:
  push:
    branches: [ main, develop, staging ]
```

---

## 📊 Build İstatistikleri

### Ücretsiz Limitler (Public Repo):
- ✅ **Sınırsız build**
- ✅ **Sınırsız dakika**
- ✅ **Sınırsız storage** (artifacts için limit var)

### Private Repo İçin:
- ✅ **2000 dakika/ay** (ücretsiz)
- ✅ **500 MB storage**
- Her build ~5-10 dakika = **~200-400 build/ay**

---

## 🐛 Sorun Giderme

### Build Başlamıyor
- `.github/workflows/` klasörünün doğru yerde olduğundan emin olun
- YAML dosyalarında girinti hatası var mı kontrol edin
- Actions sekmesinde workflow görünüyor mu kontrol edin

### Build Başarısız (❌)
1. Actions → Başarısız workflow'a tıkla
2. Kırmızı adıma tıkla
3. Logları oku
4. Hatayı düzelt, tekrar push et

### APK İndiremiyor
- Artifacts 30/90 gün sonra silinir
- Yeniden build tetikle
- Veya release oluştur

### "No space left" Hatası
- Nadir görülür
- Workflow'u tekrar çalıştırın
- Genellikle geçici sorun

---

## 🚀 İleri Seviye

### Slack/Discord Bildirimi Ekle

```yaml
- name: Slack bildirim
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'APK build tamamlandı!'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### APK'yı Otomatik Email ile Gönder

```yaml
- name: Email gönder
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{secrets.EMAIL_USERNAME}}
    password: ${{secrets.EMAIL_PASSWORD}}
    subject: GoldCube APK Hazır!
    to: test@example.com
    from: GitHub Actions
    attachments: android/app/build/outputs/apk/debug/app-debug.apk
```

### APK'yı GitHub Release'e Ekle

```yaml
- name: GitHub Release oluştur
  uses: softprops/action-gh-release@v1
  if: startsWith(github.ref, 'refs/tags/')
  with:
    files: |
      android/app/build/outputs/apk/release/app-release-unsigned.apk
      android/app/build/outputs/bundle/release/app-release.aab
```

---

## 📱 APK'yı Test Kullanıcılara Dağıtma

### Yöntem 1: GitHub Releases
```bash
git tag v1.0.0
git push origin v1.0.0
```
Release otomatik oluşur, APK ekli olur.

### Yöntem 2: Google Drive
1. APK'yı Actions'dan indir
2. Google Drive'a yükle
3. Linki paylaş

### Yöntem 3: Firebase App Distribution
GitHub Actions ile entegre edilebilir!

---

## 🎯 Sonraki Adımlar

1. ✅ Kodu GitHub'a push et
2. ✅ Actions sekmesinde build'i izle
3. ✅ APK'yı indir
4. ✅ Telefonda test et
5. ✅ Ekiple paylaş
6. 🚀 Play Store'a yükle (Release AAB ile)

---

## 💡 İpuçları

1. **Her commit'te build olmasın:** Manuel workflow kullan
2. **Hızlı build:** Cache kullanımını artır
3. **Test otomasyonu:** Build sonrası otomatik testler ekle
4. **Beta dağıtım:** Firebase App Distribution entegrasyonu
5. **Versiyon takibi:** Git tag'leri kullan

---

## 🎉 Özet

**GitHub Actions ile:**
- ✅ Tamamen ücretsiz
- ✅ Sınırsız build
- ✅ Otomatik veya manuel
- ✅ Takım ile paylaşım kolay
- ✅ CI/CD pipeline hazır

**Şimdi yapılacak:**
```bash
git add .
git commit -m "GitHub Actions hazır"
git push origin main
```

Sonra GitHub'da Actions sekmesinde izle! 🚀

---

## 📚 Ek Kaynaklar

- GitHub Actions Docs: https://docs.github.com/en/actions
- Workflow Syntax: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
- Android Build Actions: https://github.com/marketplace?type=actions&query=android

Başarılar! 🎊

