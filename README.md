# RAPZ AI — Android Floating Assistant

Proyek sumber Android Studio (Kotlin) untuk panel AI melayang di atas aplikasi lain.

## Fitur
- Panel overlay Android (`SYSTEM_ALERT_WINDOW`) yang hanya aktif setelah pengguna memberi izin.
- Screen capture satu frame memakai `MediaProjection`; Android menampilkan dialog persetujuan sistem.
- OCR menggunakan Google ML Kit Text Recognition.
- Teks soal dikirim ke backend milik sendiri untuk memperoleh jawaban AI.
- Tombol tutup panel dan hentikan layanan.

## Persyaratan
- Android Studio terbaru yang mendukung Android Gradle Plugin 8.6+
- JDK 17
- Android 8.0+ (API 26+)
- Koneksi internet untuk OCR model unduhan pertama dan AI backend.

## Membuka proyek
1. Buka folder `rapz_ai_android` di Android Studio.
2. Tunggu Gradle Sync.
3. Jalankan aplikasi pada HP Android.
4. Tekan **Aktifkan RAPZ AI**. Izinkan "Tampil di atas aplikasi lain".
5. Tekan **Mulai panel melayang** lalu setujui dialog perekaman layar Android.
6. Buka aplikasi yang berisi soal, tekan panel **Ambil & Jawab**. Teks OCR akan dikirim ke backend.

## Integrasi AI (WAJIB)
Jangan menaruh API key AI di APK. APK dapat dibongkar dan kunci akan dicuri.
Jalankan backend contoh di folder `backend` pada server HTTPS milikmu.

```bash
cd backend
npm install
AI_API_KEY="API_KEY_MILIKMU" npm start
```

Atur `AI_BACKEND_URL` di `app/src/main/java/com/rapzai/app/Config.kt` ke URL HTTPS backend-mu, misalnya:
`https://domain-kamu.example/solve`

Backend contoh menggunakan OpenAI Responses API. Sesuaikan model/endpoint dengan akun dan kebijakan API yang kamu gunakan.

## Catatan privasi dan batasan
- Pengguna harus menyetujui screen capture melalui dialog Android setiap sesi.
- Android dapat menampilkan indikator bahwa layar sedang dibagikan/direkam.
- Aplikasi tidak menangkap layar diam-diam, tidak menyembunyikan indikator sistem, dan tidak melewati proteksi layar (`FLAG_SECURE`).
- OCR bisa keliru pada tulisan tangan, rumus, tabel, atau gambar buram. Periksa jawaban sebelum digunakan.
- Gunakan hanya pada layar dan materi yang memang boleh kamu proses.
- Untuk menghentikan capture, tekan **Hentikan** atau tutup layanan dari notifikasi.
