import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db';
import { products } from '../../../db/schema';
import { verifyAuth } from '../../../lib/jwt';
import { desc } from 'drizzle-orm';

// ดึงข้อมูลสินค้าทั้งหมด
export async function GET() {
  try {
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
    return NextResponse.json(allProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// เพิ่มสินค้าใหม่ (ต้อง Login)
export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, price } = await req.json();
    if (!name || price === undefined) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    await db.insert(products).values({
      name,
      price,
      userId: user.id,
    });

    return NextResponse.json({ message: 'Product created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}