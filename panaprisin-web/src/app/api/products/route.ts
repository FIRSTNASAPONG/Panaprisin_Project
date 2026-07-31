import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db';
import { products } from '../../../db/schema';
import { verifyAuth } from '../../../lib/jwt';
import { eq, and } from 'drizzle-orm';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const { id } = await params; 
    const { name, price } = await req.json();
    
    // 📍 จุดที่แก้: แปลง id เป็น Number(id) เพื่อให้ตรงกับ schema ที่เป็น serial(ตัวเลข)
    await db.update(products)
      .set({ name, price })
      .where(and(eq(products.id, Number(id)), eq(products.userId, user.id))); // user.id ถ้าเป็น serial ก็ต้องแปลงด้วยถ้าของเดิมเป็น uuid
      
    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const { id } = await params;
    
    await db.delete(products)
      .where(and(eq(products.id, Number(id)), eq(products.userId, user.id)));
      
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}