"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // เก็บ Token ลง LocalStorage
        localStorage.setItem("token", data.token);
        alert("เข้าสู่ระบบสำเร็จ!");
        router.push("/dashboard"); // ล็อกอินผ่านเด้งไป Dashboard
      } else {
        setError(data.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#ffffff] to-[#f5e9de]">
      
      {/* --- เปลี่ยนมาใช้รูปพื้นหลังบ้านไม้ (bg-house.jpg) --- */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-multiply">
        <Image 
          src="/bg-house.jpg" 
          alt="พื้นหลังบ้านไม้วินเทจ"
          fill
          className="object-cover grayscale"
        />
      </div>

      {/* แสงสว่างตกแต่งฉากหลังให้ดูละมุนขึ้น */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-80 z-0 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-60 z-0 pointer-events-none"></div>

      {/* การ์ดฟอร์มเข้าสู่ระบบ */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_25px_65px_rgba(13,92,84,0.15)] p-10 border-t-8 border-[#BA4A2C]">
        
        {/* โลโก้เล็กๆ ด้านบน */}
        <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D8B05A] shadow-md bg-[#595147] relative">
               <Image src="/logo.jpg" alt="โลโก้ พณาไพรสิน" fill className="object-cover" />
            </div>
        </div>

        {/* หัวข้อ */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#595147] mb-2 drop-shadow-sm">เข้าสู่ระบบ</h2>
          <p className="text-gray-500 font-medium text-sm">
            ยินดีต้อนรับกลับสู่ <span className="text-[#BA4A2C] font-bold">พณาไพรสิน</span>
          </p>
        </div>
        
        {/* กล่องแสดง Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium animate-bounce">
            ⚠️ {error}
          </div>
        )}
        
        {/* ฟอร์มกรอกข้อมูล */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-[#595147] mb-1">อีเมล (Email)</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#BA4A2C] focus:ring-2 focus:ring-[#BA4A2C]/20 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white shadow-inner"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
                 <label className="block text-sm font-bold text-[#595147]">รหัสผ่าน (Password)</label>
                 <a href="#" className="text-xs text-[#BA4A2C] hover:underline">ลืมรหัสผ่าน?</a>
            </div>
           
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#BA4A2C] focus:ring-2 focus:ring-[#BA4A2C]/20 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#BA4A2C] to-[#a13f25] hover:from-[#a13f25] hover:to-[#8a331c] shadow-[0_8px_20px_rgba(186,74,44,0.3)] hover:shadow-[0_12px_25px_rgba(186,74,44,0.5)] hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        {/* ลิงก์ไปหน้าสมัครสมาชิก */}
        <div className="mt-8 text-center text-sm font-medium text-gray-500">
          <p>
            ยังไม่มีบัญชีใช่หรือไม่?{" "}
            <Link href="/register" className="text-[#0D5C54] hover:text-[#0a453f] transition-colors font-bold underline hover:no-underline">
              สมัครสมาชิกที่นี่
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