"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// กำหนด Type ให้กับข้อมูลสินค้า (TypeScript)
interface Product {
  id: string;
  name: string;
  price: number;
}

export default function DashboardPage() {
  const router = useRouter();

  // State สำหรับจัดการข้อมูล
  const [products, setProducts] = useState<Product[]>([]);
  
  // State สำหรับ Modal (Popup ฟอร์ม)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  // State สำหรับฟอร์ม
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // ==========================================
  // 1. ดึงข้อมูลสินค้าทั้งหมด (READ)
  // ==========================================
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      // ⚠️ เปลี่ยน URL ตรงนี้ให้ตรงกับที่เพื่อน Backend ทำไว้
      const res = await fetch("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("ดึงข้อมูลล้มเหลว:", error);
    }
  };

  // เช็ค Token และโหลดข้อมูลตอนเปิดหน้าเว็บ
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("ดึงข้อมูลล้มเหลว:", error);
      }
    };

    void loadProducts();
  }, [router]);

  // ==========================================
  // 2. บันทึกข้อมูล (CREATE & UPDATE)
  // ==========================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    // กำหนด URL และ Method (ถ้าแก้ไขใช้ PUT, ถ้าเพิ่มใหม่ใช้ POST)
    // ⚠️ เปลี่ยน URL ตรงนี้ให้ตรงกับที่เพื่อน Backend ทำไว้
    const url = isEditing ? `/api/products/${currentId}` : "/api/products";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price: Number(price) }),
      });

      if (res.ok) {
        fetchProducts(); // โหลดข้อมูลใหม่หลังจากบันทึกเสร็จ
        closeModal();    // ปิด Popup
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("บันทึกข้อมูลล้มเหลว:", error);
    }
  };

  // ==========================================
  // 3. ลบข้อมูล (DELETE)
  // ==========================================
  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) return;
    
    const token = localStorage.getItem("token");
    try {
      // ⚠️ เปลี่ยน URL ตรงนี้ให้ตรงกับที่เพื่อน Backend ทำไว้
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchProducts(); // โหลดข้อมูลใหม่หลังจากลบเสร็จ
      } else {
        alert("ลบข้อมูลไม่สำเร็จ");
      }
    } catch (error) {
      console.error("ลบข้อมูลล้มเหลว:", error);
    }
  };

  // ==========================================
  // ฟังก์ชันช่วยเหลือ (Helpers)
  // ==========================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setName("");
    setPrice("");
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setIsEditing(true);
    setCurrentId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen p-6 md:p-12 bg-gradient-to-br from-[#ffffff] to-[#f5e9de] overflow-hidden">
      
      {/* พื้นหลัง */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none">
        <Image src="/bg-room.jpg" alt="พื้นหลังมุมห้องวินเทจ" fill className="object-cover grayscale" />
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-80 z-0 pointer-events-none"></div>

      {/* Main Dashboard Container */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_65px_rgba(13,92,84,0.15)] overflow-hidden border border-white/60">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center p-6 md:px-10 md:py-8 bg-gradient-to-r from-[#0D5C54] to-[#147a6f] text-white border-b-4 border-[#D8B05A]">
          <div className="flex items-center gap-5 mb-4 md:mb-0">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D8B05A] bg-[#595147] relative shadow-lg">
               <Image src="/logo.jpg" alt="โลโก้ พณาไพรสิน" fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-sm">พณาไพรสิน</h1>
              <p className="text-sm text-[#EED9CA] opacity-90 font-medium">ระบบจัดการสินค้า (CRUD Dashboard)</p>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-[#BA4A2C] hover:bg-[#a13f25] px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_4px_10px_rgba(186,74,44,0.4)] hover:shadow-lg hover:-translate-y-1 text-sm md:text-base">
            ออกจากระบบ (Logout)
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-extrabold text-[#595147]">รายการสินค้าทั้งหมด</h2>
                <p className="text-gray-500 text-sm mt-1">จัดการเพิ่ม ลบ แก้ไข ข้อมูลสินค้าในคลังของคุณ</p>
            </div>
            {/* ปุ่มเพิ่มสินค้า เปิด Modal */}
            <button onClick={openCreateModal} className="bg-[#0D5C54] hover:bg-[#0a453f] text-white px-6 py-3 rounded-xl font-bold shadow-[0_4px_12px_rgba(13,92,84,0.3)] hover:shadow-lg hover:-translate-y-1 transition-all w-full md:w-auto flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              เพิ่มสินค้าใหม่ (Create)
            </button>
          </div>

          {/* Table */}
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 font-medium">ยังไม่มีข้อมูลสินค้า</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-[#fcf5ef] transition-colors group">
                      <td className="p-5 text-[#595147] font-medium">{product.id}</td>
                      <td className="p-5 text-[#595147] font-bold text-lg">{product.name}</td>
                      <td className="p-5 text-[#BA4A2C] font-extrabold text-lg">฿{Number(product.price).toLocaleString()}</td>
                      <td className="p-5 flex justify-center gap-3">
                        <button onClick={() => openEditModal(product)} className="bg-[#D8B05A] hover:bg-[#c49f50] text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                          แก้ไข (Update)
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="bg-white border-2 border-[#BA4A2C] text-[#BA4A2C] hover:bg-[#BA4A2C] hover:text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                          ลบ (Delete)
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* Modal (Popup) สำหรับเพิ่ม/แก้ไขสินค้า */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border-t-8 border-[#0D5C54] animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-extrabold text-[#595147] mb-6 text-center">
              {isEditing ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#595147] mb-1">ชื่อสินค้า</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="เช่น ครกไม้สักโบราณ"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0D5C54] focus:ring-2 focus:ring-[#0D5C54]/20 outline-none transition-all text-gray-700 bg-gray-50/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#595147] mb-1">ราคา (บาท)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0D5C54] focus:ring-2 focus:ring-[#0D5C54]/20 outline-none transition-all text-gray-700 bg-gray-50/50"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#0D5C54] to-[#147a6f] hover:from-[#147a6f] hover:to-[#1a9c8e] shadow-md hover:shadow-lg transition-all"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}