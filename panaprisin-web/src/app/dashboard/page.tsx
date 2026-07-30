"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();

  // ข้อมูลจำลอง (Mock Data) เปลี่ยนให้เข้ากับธีมร้าน
  const [products, setProducts] = useState([
    { id: 1, name: "ครกไม้สักโบราณ (ขนาดใหญ่)", price: 1250 },
    { id: 2, name: "ป้ายไม้แกะสลักวินเทจ", price: 890 },
    { id: 3, name: "ชุดเก้าอี้ไม้เก่าแต่งสวน", price: 4500 },
  ]);

  // เช็ค Token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen p-6 md:p-12 bg-gradient-to-br from-[#ffffff] to-[#f5e9de] overflow-hidden">
      
      {/* พื้นหลังลายไม้จางๆ ให้คุมธีม */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none">
        <Image 
          src="/bg-room.jpg" 
          alt="พื้นหลังมุมห้องวินเทจ"
          fill
          className="object-cover grayscale"
        />
      </div>

      {/* แสงสว่างตกแต่งฉากหลัง */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-80 z-0 pointer-events-none"></div>

      {/* Main Dashboard Container */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_65px_rgba(13,92,84,0.15)] overflow-hidden border border-white/60">
        
        {/* Header Section (สีเขียวเข้ม พณาไพรสิน) */}
        <div className="flex flex-col md:flex-row justify-between items-center p-6 md:px-10 md:py-8 bg-gradient-to-r from-[#0D5C54] to-[#147a6f] text-white border-b-4 border-[#D8B05A]">
          
          <div className="flex items-center gap-5 mb-4 md:mb-0">
            {/* โลโก้ร้าน */}
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D8B05A] bg-[#595147] relative shadow-lg">
               <Image src="/logo.jpg" alt="โลโก้ พณาไพรสิน" fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-sm">พณาไพรสิน</h1>
              <p className="text-sm text-[#EED9CA] opacity-90 font-medium">ระบบจัดการสินค้า (CRUD Dashboard)</p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="bg-[#BA4A2C] hover:bg-[#a13f25] px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_4px_10px_rgba(186,74,44,0.4)] hover:shadow-lg hover:-translate-y-1 text-sm md:text-base"
          >
            ออกจากระบบ (Logout)
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-10">
          
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-extrabold text-[#595147]">รายการสินค้าทั้งหมด</h2>
                <p className="text-gray-500 text-sm mt-1">จัดการเพิ่ม ลบ แก้ไข ข้อมูลสินค้าในคลังของคุณ</p>
            </div>
            
            <button className="bg-[#0D5C54] hover:bg-[#0a453f] text-white px-6 py-3 rounded-xl font-bold shadow-[0_4px_12px_rgba(13,92,84,0.3)] hover:shadow-lg hover:-translate-y-1 transition-all w-full md:w-auto flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              เพิ่มสินค้าใหม่ (Create)
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#f4f9f8] border-b-2 border-[#0D5C54]/20">
                  <th className="p-5 font-extrabold text-[#0D5C54] w-24">รหัส</th>
                  <th className="p-5 font-extrabold text-[#0D5C54]">ชื่อสินค้า</th>
                  <th className="p-5 font-extrabold text-[#0D5C54] w-40">ราคา (บาท)</th>
                  <th className="p-5 font-extrabold text-[#0D5C54] text-center w-64">จัดการ (Actions)</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-[#fcf5ef] transition-colors group">
                    <td className="p-5 text-[#595147] font-medium">{product.id}</td>
                    <td className="p-5 text-[#595147] font-bold text-lg">{product.name}</td>
                    <td className="p-5 text-[#BA4A2C] font-extrabold text-lg">฿{product.price.toLocaleString()}</td>
                    <td className="p-5 flex justify-center gap-3">
                      <button className="bg-[#D8B05A] hover:bg-[#c49f50] text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        แก้ไข (Update)
                      </button>
                      <button className="bg-white border-2 border-[#BA4A2C] text-[#BA4A2C] hover:bg-[#BA4A2C] hover:text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        ลบ (Delete)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  );
}