# Panaprisin Project - Deployment

โฟลเดอร์ `Deploy/` นี้ใช้สำหรับเก็บไฟล์ Configuration ที่เกี่ยวข้องกับการรันระบบผ่าน Docker ทั้งสำหรับ **Local Development** (เพื่อให้ทีมพัฒนาใช้งาน) และ **Production Deployment** (สำหรับการนำขึ้น Ubuntu Server)

---

## 🛠 สำหรับทีม Developer (Local Setup)

ใน Phase 1 นี้ เราจะรันเฉพาะ Database (PostgreSQL) ผ่าน Docker เพื่อให้ทุกคนสามารถเชื่อมต่อและเริ่มพัฒนา API/UI ได้ทันที

### ขั้นตอนการรัน Database

- สั่งรัน Database Container
เปิด Terminal หรือ Command Prompt ชี้มาที่โฟลเดอร์นี้ แล้วรันคำสั่ง: docker compose up -d

- คำสั่ง Docker พื้นฐานที่ทีมควรรู้
docker compose up -d : สั่งรันระบบแบบ Background
docker compose stop : หยุดการทำงานชั่วคราว (ข้อมูลไม่หาย)
docker compose down : ปิดและลบ Container ทิ้ง (ข้อมูลในฐานข้อมูลยังคงอยู่เพราะเราทำ Volume ไว้)
docker compose logs -f : ดู Log การทำงานของ Database แบบ Real-time เพื่อใช้ Debug