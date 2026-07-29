# Panaprisin Web Project

โปรเจกต์เว็บแอปพลิเคชัน Full-stack พัฒนาด้วย **Next.js (App Router)** และ **TypeScript** พร้อมระบบ Backend API, ระบบยืนยันตัวตนด้วย JWT (JSON Web Tokens) และจัดการฐานข้อมูลด้วย **Drizzle ORM**

---

## 🚀 Tech Stack
* **Framework:** Next.js (App Router, TypeScript)
* **Database & ORM:** Drizzle ORM
* **Authentication:** JWT (JSON Web Tokens), bcryptjs
* **API Testing:** Thunder Client

---

## 📁 Project Structure
```text
src/
├── app/
│   └── api/
│       ├── auth/
│       │   ├── register/route.ts
│       │   └── login/route.ts
│       └── products/
│           ├── route.ts
│           └── [id]/route.ts
├── db/
│   ├── index.ts
│   └── schema.ts
└── lib/
    └── jwt.ts'

---
## 🔌 API Endpoints Documentation
* 1. Authentication (/api/auth)
Register: POST /api/auth/register

Body:

JSON
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Login: POST /api/auth/login

Body:

JSON
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Response: คืนค่า token สำหรับนำไปใช้ยืนยันตัวตนในระบบ

* 2. Products (/api/products)
Get All Products: GET /api/products (Public - ไม่ต้องใช้ Token)

Create Product: POST /api/products (Protected - ต้องแนบ Header Authorization: Bearer <token>)

Body:

JSON
{
  "name": "Product Name",
  "price": 500
}
Update Product: PUT /api/products/[id] (Protected - เฉพาะเจ้าของสินค้า)

Body:

JSON
{
  "name": "Updated Name",
  "price": 600
}
Delete Product: DELETE /api/products/[id] (Protected - เฉพาะเจ้าของสินค้า)

---

## ⚙️ Getting Started
โคลนโปรเจกต์และติดตั้ง Dependencies:

Bash
npm install
ตั้งค่าไฟล์ .env สำหรับเชื่อมต่อฐานข้อมูลและตั้งค่าความปลอดภัยของ JWT

รันโปรเจกต์ในโหมด Development:

Bash
npm run dev
เปิดใช้งานผ่าน http://localhost:3000 และทดสอบ API ผ่าน Thunder Client ได้เลย