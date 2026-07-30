import nextJest from 'next/jest.js';

// โหลด Next.js config และ .env อัตโนมัติ
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  // API Test ต้องรันบน Node environment (ไม่ใช้ jsdom)
  testEnvironment: 'node',
  
  // จัดการ Path Alias ให้ตรงกับใน tsconfig.json
  moduleNameMapper: {
    '^@/(.*)$': '/src/$1',
  },
  
  // บอกให้ Jest หาไฟล์เทสในโฟลเดอร์ tests/
  testMatch: ['**/tests/**/*.test.ts'],
};

// ส่งออก Config ไปให้ Jest ใช้งาน
export default createJestConfig(config);