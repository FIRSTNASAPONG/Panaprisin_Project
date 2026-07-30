import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row overflow-hidden">
      
      {/* ================= ฝั่งซ้าย: โซนแบรนดิ้ง ================= */}
      <div className="relative flex flex-1 flex-col justify-center items-center p-12 bg-gradient-to-br from-[#147a6f] via-[#0D5C54] to-[#052b27] text-white shadow-[15px_0_30px_rgba(0,0,0,0.25)] z-10 overflow-hidden">
        
        {/* รูปภาพพื้นหลังงานไม้แบบโปร่งแสง (ฝั่งซ้าย) */}
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
          <Image 
            src="/bg-wood.jpg" 
            alt="พื้นหลังงานไม้"
            fill
            className="object-cover grayscale"
          />
        </div>

        {/* แสงออร่าตกแต่งฉากหลัง (ซ่อนอยู่หลังรูปอีกที) */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#1a9c8e] rounded-full mix-blend-multiply filter blur-3xl opacity-40 z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#08423c] rounded-full mix-blend-multiply filter blur-3xl opacity-60 z-0"></div>

        {/* โลโก้ป้ายไม้ (ลิงก์ไป Facebook) */}
        <div className="relative mb-8 z-10">
          <div className="absolute inset-0 bg-[#D8B05A] rounded-full blur-xl opacity-30 animate-pulse"></div>
          <a 
            href="https://www.facebook.com/panaprisin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#EED9CA] shadow-[0_0_50px_rgba(0,0,0,0.4)] flex justify-center items-center bg-[#595147] cursor-pointer hover:scale-105 transition-transform duration-500"
            title="คลิกเพื่อไปยังเพจ Facebook พณาไพรสิน"
          >
            <Image 
              src="/logo.jpg" 
              alt="โลโก้ พณาไพรสิน" 
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
              priority
            />
          </a>
        </div>

        {/* ข้อความฝั่งซ้าย */}
        <div className="max-w-lg text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide text-[#EED9CA] drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
            พณาไพรสิน
          </h1>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-[#D8B05A] drop-shadow-md">
            ของเก่า ของสะสม แต่งบ้าน แต่งสวน <br />
            งานไม้เก่า วินเทจ
          </p>
        </div>
      </div>

      {/* ================= ฝั่งขวา: โซนฟอร์ม Login/Register ================= */}
      {/* 1. เปลี่ยนสีพื้นหลังให้สว่างขึ้น (from-white to สีครีมอ่อนๆ) */}
      <div className="relative flex flex-1 flex-col justify-center items-center p-8 md:p-12 bg-gradient-to-br from-[#ffffff] to-[#f5e9de] z-0 overflow-hidden">
        
        {/* 2. เพิ่มความชัดของรูปภาพจาก opacity-10 เป็น opacity-20 */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-multiply">
          <Image 
            src="/bg-room.jpg" 
            alt="พื้นหลังมุมห้องวินเทจ"
            fill
            className="object-cover grayscale"
          />
        </div>

        {/* แสงสว่างตกแต่งฉากหลังฝั่งขวา */}
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-80 z-0"></div>

        {/* การ์ดฟอร์ม */}
        <div className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-[0_25px_65px_rgba(13,92,84,0.15)] p-10 border-t-8 border-[#BA4A2C] z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#595147] mb-3 drop-shadow-sm">ยินดีต้อนรับ</h2>
            <p className="text-gray-500 font-medium text-sm">
              กรุณาเข้าสู่ระบบหรือสมัครสมาชิก <br/>
              เพื่อเริ่มต้นใช้งานระบบจัดการร้านค้า
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <Link
              href="/login"
              className="w-full flex justify-center items-center py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#BA4A2C] to-[#a13f25] hover:from-[#a13f25] hover:to-[#8a331c] transition-all duration-300 shadow-[0_8px_20px_rgba(186,74,44,0.3)] hover:shadow-[0_12px_25px_rgba(186,74,44,0.5)] hover:-translate-y-1 text-lg"
            >
              เข้าสู่ระบบ (Login)
            </Link>
            <Link
              href="/register"
              className="w-full flex justify-center items-center py-4 rounded-xl font-bold text-[#0D5C54] bg-white border-2 border-[#0D5C54] hover:bg-[#f0f9f8] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 text-lg"
            >
              สมัครสมาชิก (Register)
            </Link>
          </div>
          <div className="mt-10 text-center text-xs text-gray-400 font-medium">
            <p>Preflight Project • Full Stack Development</p>
          </div>
        </div>
      </div>
      
    </main>
  );
}