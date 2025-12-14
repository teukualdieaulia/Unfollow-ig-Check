# Instagram Followers & Following Analyzer

Repository ini berisi script JavaScript yang digunakan untuk menganalisis hubungan **followers** dan **following** pada akun Instagram. Script dijalankan langsung melalui **Browser Console** tanpa memerlukan library tambahan atau setup backend.

Dengan script ini, pengguna dapat mengetahui:

* Akun yang **mengikuti kamu tetapi tidak kamu follow balik**
* Akun yang **kamu follow tetapi tidak mengikuti kamu kembali**

---

## ✨ Fitur

* Mengambil **User ID Instagram** berdasarkan username
* Mengambil seluruh data **followers** dan **following** (support pagination)
* Perbandingan followers vs following secara otomatis
* Jeda acak antar request untuk menghindari **rate limit**
* Output hasil dalam bentuk array di **console browser**
* Tidak menggunakan bot atau automation berbahaya

---

## 🛠 Teknologi

* JavaScript (Vanilla JS)
* Instagram Web API (internal)
* Browser Console

---

## 📌 Cara Penggunaan

1. Buka situs Instagram:

   ```
   https://www.instagram.com
   ```
2. Login ke akun Instagram kamu
3. Buka **Developer Tools**:

   * Windows / Linux: `Ctrl + Shift + I`
   * MacOS: `Cmd + Option + I`
4. Masuk ke tab **Console**
5. Salin seluruh kode dari repository ini
6. Tempelkan ke Console
7. Ganti username berikut:

   ```javascript
   username = "example_username";
   ```

   dengan username Instagram kamu
8. Tekan **Enter** dan tunggu proses selesai

---

## 📤 Output

Script akan menghasilkan dua array utama:

```javascript
{
  PeopleIDontFollowBack: [...],
  PeopleNotFollowingMeBack: [...]
}
```

### Penjelasan Output

* **PeopleIDontFollowBack**
  Daftar akun yang **mengikuti kamu**, tetapi **tidak kamu ikuti balik**

* **PeopleNotFollowingMeBack**
  Daftar akun yang **kamu ikuti**, tetapi **tidak mengikuti kamu kembali**

---

## ⚠️ Catatan Penting

* Script ini **bukan bot** dan tidak melakukan aksi otomatis seperti follow/unfollow
* Hanya melakukan **GET request** untuk membaca data
* Gunakan dengan **bijak** dan sesuai kebijakan Instagram
* Terlalu sering menjalankan script ini dapat menyebabkan pembatasan sementara dari Instagram

---

## ❗ Disclaimer

Repository ini dibuat **hanya untuk keperluan edukasi dan analisis pribadi**. Penulis tidak bertanggung jawab atas penyalahgunaan script ini atau pelanggaran terhadap ketentuan layanan Instagram.

Segala risiko ditanggung oleh pengguna masing-masing.

---

## 🤝 Kontribusi

Kontribusi sangat terbuka!

Silakan lakukan:

* Fork repository ini
* Buat branch baru
* Ajukan Pull Request dengan penjelasan yang jelas

---

## 📄 made by aledi keren hacker
