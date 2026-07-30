import { NextRequest } from 'next/server';
import { POST as registerPOST } from '../../src/app/api/auth/register/route'; 
import { POST as loginPOST } from '../../src/app/api/auth/login/route';
describe('ระบบ Authentication API', () => {
  // สร้างข้อมูลจำลองแบบสุ่มเล็กน้อย เพื่อไม่ให้ชนกับข้อมูลเดิมใน DB ทุกครั้งที่รัน
  const randomId = Math.floor(Math.random() * 10000);
  const mockUser = {
    email: `tester${randomId}@panaprisin.com`,
    password: 'securepassword123',
    name: 'QA Tester'
  };
  describe('POST /api/auth/register', () => {
    it('1. สมัครสมาชิกสำเร็จ (ควรคืนค่า 201)', async () => {
      // จำลอง Request
      const req = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUser),
      });
      // เรียกใช้ฟังก์ชัน API ตรงๆ
      const response = await registerPOST(req);
      // ตรวจสอบสถานะ
      expect(response.status).toBe(201);
    });
    it('2. สมัครสมาชิกไม่สำเร็จหากอีเมลซ้ำ (ควรคืนค่า 400 หรือ 409)', async () => {
      // ใช้อีเมลเดิมจากข้อ 1 ที่เพิ่งสมัครไป
      const req = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUser),
      });
      const response = await registerPOST(req);
      // คาดหวังว่าจะต้องถูกปฏิเสธ (แล้วแต่ Dev 1 ตั้งไว้ว่า 400 หรือ 409)
      expect(response.status).toBeGreaterThanOrEqual(400); 
    });
  });
  describe('POST /api/auth/login', () => {
    it('1. เข้าสู่ระบบสำเร็จและได้รับ JWT (ควรคืนค่า 200)', async () => {
      const req = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: mockUser.email,
          password: mockUser.password,
        }),
      });
      const response = await loginPOST(req);
      const responseData = await response.json();
      // ตรวจสอบ
      expect(response.status).toBe(200);
      expect(responseData).toHaveProperty('token'); // ต้องมี property "token" ส่งกลับมา
    });
    it('2. เข้าสู่ระบบไม่สำเร็จถ้ารหัสผ่านผิด (ควรคืนค่า 401)', async () => {
      const req = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: mockUser.email,
          password: 'wrongpassword!',
        }),
      });
      const response = await loginPOST(req);
      expect(response.status).toBe(401);
    });
  });
});