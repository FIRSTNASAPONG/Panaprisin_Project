import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';
import { products } from '../../../../db/schema';
import { verifyAuth } from '../../../../lib/jwt';
import { eq, and } from 'drizzle-orm';

// แก้ไขสินค้า
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params; // <--- ต้อง await ตรงนี้ก่อน!
    const { name, price } = await req.json();
    
    // อัปเดตเฉพาะสินค้าที่เป็นของตัวเอง
    await db.update(products)
      .set({ name, price })
      .where(and(eq(products.id, id), eq(products.userId, user.id)));

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ลบสินค้า
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params; // <--- ต้อง await ตรงนี้เหมือนกัน!

    // ลบเฉพาะสินค้าที่เป็นของตัวเอง
    await db.delete(products)
      .where(and(eq(products.id, id), eq(products.userId, user.id)));

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}