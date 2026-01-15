
# PT. Sovware Data Mandiri
### Frontend Test Assesment

## Tech Stack Requirements
Bahasa
* TypeScript
Depedensi Wajib
* HeroUI (UI)
* Zustand (State Management)
* React Flow
Depedensi Tambahan
* React (Build by Vite)
* React-router-dom
* React-Pro-Sidebar
* Embla-Carousel-Autoplay
* HeroUI Icons
Struktur Folder
* Based DDD (domain driven design)
* Per-Modular (dibuat terisolasi)

## Cara Install
* Clone repository 
```
https://github.com/ujangaripin24/frontend-sovware-data-mandiri
```
* Masuk ke folder frontend-sovware-data-mandiri
* Install pada terminal menggunakan perintah dibawah (Pastikan Node versi v20.19.4 LTS)
```
npm install
```
* Jalankan program dengan perintah
```
npm run dev
```
* Kunjungi dibrowser 'http://localhost:5173/'

## Cara Pakai
### Autentikasi
* Masuk ke 'http://localhost:5173/' dengan google chrome
* login menggunakan email dan password
```
email: admin@test.com
password: 123456
```
* *Jika gagal akan menampilkan pesan Alert*.
* Setelah berhasil login maka akan menampilkan SplashScreen kemudian diarahkan ke halaman Dashboard .

### Menggunakan Desain Diagram Flow
* Masuk ke menu Design (Dibagian Sidebar).
* [Anggap Saja] Sudah tersedia beberapa data Class pilih terlebih dahulu Class yang akan dipakai setelah pilih kemudian klik 'Open Class'.
* Maka akan muncul modal yang menampilkan daftar data  Flow yang [Anggap Saja] sudah tersedia.
* Pilih salah satu Flow yang akan dibuat Pemrosesan alur diagram.
* Maka akan muncul Canvas
* Pada panel Canvas pilih 'PROCESSOR' (sebelah kanan dengan icon CPU)
* Pilih 1 atau 2 'Entity' yang akan dibuatkan 'Flow' kemudiah klik 'Add'

## Task
### 1. Authentication
* Test Case 1.1 – Login With Valid Credentials [done]
* Test Case 1.2 – Login With Invalid Credentials [done]
* Test Case 1.3 – Authentication Token Expired [done]
### 2. Create Design Flow (Drag & Drop Canvas)
* Test Case 2.1 – Add Processor to Canvas [done]
* Test Case 2.2 – Move Processor on Canvas [done]
* Test Case 2.3 – Delete Processor [done]
### 3. Connection Processor (Connect Nodes Like NiFi)
* Test Case 3.1 – Create Connection Between Two Processors [done]
* Test Case 3.2 – Invalid Connection Attempt [done]
* Test Case 3.3 – Delete Connection [done]
### 4. Publish Design
* Test Case 4.1 – Successful Publish Flow [done]
* Test Case 4.2 – Publish Validation Error [done]
* Test Case 4.3 – Publish Without Any Processor [done]
