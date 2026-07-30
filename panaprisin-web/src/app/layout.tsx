import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

// 1. นำเข้าและตั้งค่าฟอนต์ Sarabun แทน Geist
const sarabun = Sarabun({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"], // Sarabun ต้องระบุน้ำหนักที่ใช้
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
});

// 2. ปรับชื่อเว็บให้เข้ากับโปรเจกต์
export const metadata: Metadata = {
  title: "พณาไพรสิน | ของเก่า ของสะสม",
  description: "ของเก่า ของสะสม แต่งบ้าน แต่งสวน งานไม้เก่า วินเทจ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th" // เปลี่ยนภาษาของเว็บเป็นไทย
      className={`${sarabun.variable} h-full antialiased`} // คง class เดิมไว้ และใส่ตัวแปรฟอนต์
    >
      {/* 3. นำ sarabun.className มาแทรกคู่กับ class เดิมที่เพื่อนเขียนไว้ */}
      <body className={`${sarabun.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}