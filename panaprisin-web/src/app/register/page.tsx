"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert("สมัครสมาชิกสำเร็จ! ไปหน้า Login กันเลย");
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "เกิดข้อผิดพลาดในการสมัคร");
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#147a6f] via-[#0D5C54] to-[#052b27]">
      
      {/* --- เปลี่ยนมาใช้รูปพื้นหลังมุมครัวโบราณ (bg-kitchen.jpg) --- */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay pointer-events-none">
        <Image 
          src="/bg-kitchen.jpg" 
          alt="พื้นหลังครัวโบราณ"
          fill
          className="object-cover grayscale"
        />
      </div>

      {/* แสงออร่าตกแต่งฉากหลัง */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#1a9c8e] rounded-full mix-blend-multiply filter blur-3xl opacity-40 z-0 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#08423c] rounded-full mix-blend-multiply filter blur-3xl opacity-60 z-0 pointer-events-none"></div>

      {/* การ์ดฟอร์มสมัครสมาชิก (สีขอบบนเป็นสีเขียวมรกต) */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_25px_65px_rgba(0,0,0,0.4)] p-10 border-t-8 border-[#047857]">
        
        {/* โลโก้เล็กๆ ด้านบน */}
        <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D8B05A] shadow-md bg-[#595147] relative">
               <Image src="/logo.jpg" alt="โลโก้ พณาไพรสิน" fill className="object-cover" />
            </div>
        </div>

        {/* หัวข้อ */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#595147] mb-2 drop-shadow-sm">สร้างบัญชีใหม่</h2>
          <p className="text-gray-500 font-medium text-sm">
            สมัครสมาชิกเพื่อเข้าร่วมครอบครัว <span className="text-[#047857] font-bold">พณาไพรสิน</span>
          </p>
        </div>
        
        {/* กล่องแสดง Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium animate-bounce">
            ⚠️ {error}
          </div>
        )}
        
        {/* ฟอร์มกรอกข้อมูล */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-[#595147] mb-1">อีเมล (Email)</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white shadow-inner"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#595147] mb-1">รหัสผ่าน (Password)</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* ปุ่มกดยืนยัน */}
          <button
            type="submit"
            className="w-full py-4 mt-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#047857] hover:to-[#064e3b] shadow-[0_8px_20px_rgba(4,120,87,0.3)] hover:shadow-[0_12px_25px_rgba(4,120,87,0.5)] hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            ยืนยันการสมัครสมาชิก
          </button>
        </form>

        {/* ลิงก์กลับไปหน้า Login */}
        <div className="mt-8 text-center text-sm font-medium text-gray-500">
          <p>
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/login" className="text-[#BA4A2C] hover:text-[#8a331c] transition-colors font-bold underline hover:no-underline">
              เข้าสู่ระบบที่นี่
            </Link>
          </p>
        </div>
        
        {/* ปุ่มกลับหน้าแรก */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← กลับไปหน้าแรก
          </Link>
        </div>

      </div>
    </div>
  );
}