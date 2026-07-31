import { NextRequest } from 'next/server';
import { POST as loginPOST } from '../../src/app/api/auth/login/route'; 
import { db } from '../../src/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ==========================================
// 1. สร้าง Mock สำหรับ Database และ Libraries
// ==========================================
jest.mock('../../src/db', () => ({
  db: {
    select: jest.fn().mockReturnThis(), // ต้อง mockReturnThis เพื่อให้ต่อ .from() ได้
    from: jest.fn().mockReturnThis(),   // ต้อง mockReturnThis เพื่อให้ต่อ .where() ได้
    where: jest.fn(),                   // จุดจบของ Chain ต้องคืนค่าข้อมูลออกไป
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

// ==========================================
// 2. เริ่มเขียน Test
// ==========================================
describe('ระบบ Authentication API', () => {
  
  // เคลียร์ Mock ทุกครั้งก่อนเริ่ม Test แต่ละข้อ (ป้องกันข้อมูลกวนกัน)
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    
    it('1. เข้าสู่ระบบสำเร็จและได้รับ JWT (ควรคืนค่า 200)', async () => {
      // 📍 จำลองว่า Database ค้นหาเจอ User 1 คน (Drizzle จะคืนค่าเป็น Array เสมอ)
      const mockUser = [{ 
        id: 1, 
        email: 'test@email.com', 
        password: 'hashedpassword', 
        role: 'user' 
      }];
      (db as any).where.mockResolvedValue(mockUser);

      // 📍 จำลองว่า bcrypt เทียบรหัสผ่านแล้วถูกต้อง (true)
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      // 📍 จำลองว่า jwt สร้าง Token ได้สำเร็จ
      (jwt.sign as jest.Mock).mockReturnValue('mock-jwt-token');

      // สร้าง Request จำลอง
      const req = new NextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@email.com', password: 'password123' }),
      });

      const response = await loginPOST(req);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData).toHaveProperty('token');
      expect(responseData.token).toBe('mock-jwt-token');
    });

    it('2. เข้าสู่ระบบไม่สำเร็จถ้ารหัสผ่านผิด (ควรคืนค่า 401)', async () => {
      // 📍 จำลองว่า Database ค้นหา User เจอ
      const mockUser = [{ 
        id: 1, 
        email: 'test@email.com', 
        password: 'hashedpassword' 
      }];
      (db as any).where.mockResolvedValue(mockUser);

      // 📍 แต่จำลองว่า bcrypt เทียบรหัสผ่านแล้ว "ผิด" (false)
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const req = new NextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@email.com', password: 'wrongpassword' }),
      });

      const response = await loginPOST(req);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Invalid credentials');
    });
  });
});