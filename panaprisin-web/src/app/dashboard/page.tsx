"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // สร้างข้อมูลจำลอง (Mock Data) ไว้ก่อน พรุ่งนี้ค่อยเปลี่ยนเป็นดึงจาก API
  const [products, setProducts] = useState([
    { id: 1, name: "เสื้อยืดสกรีนลาย", price: 250 },
    { id: 2, name: "กางเกงยีนส์วินเทจ", price: 890 },
  ]);

  // เช็คว่ามี Token ไหม ถ้าไม่มีให้เตะกลับไปหน้า Login
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 bg-blue-600 text-white">
          <h1 className="text-2xl font-bold">ระบบจัดการสินค้า (CRUD Dashboard)</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            ออกจากระบบ
          </button>
        </div>

        {/* Action Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">รายการสินค้าทั้งหมด</h2>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm">
              + เพิ่มสินค้าใหม่ (Create)
            </button>
          </div>

          {/* Table Section (Read) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-200">
                  <th className="p-4 font-semibold text-gray-600">รหัส</th>
                  <th className="p-4 font-semibold text-gray-600">ชื่อสินค้า</th>
                  <th className="p-4 font-semibold text-gray-600">ราคา (บาท)</th>
                  <th className="p-4 font-semibold text-gray-600 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-700">{product.id}</td>
                    <td className="p-4 text-gray-700 font-medium">{product.name}</td>
                    <td className="p-4 text-gray-700">{product.price}</td>
                    <td className="p-4 flex justify-center gap-2">
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm">
                        แก้ไข (Update)
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
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