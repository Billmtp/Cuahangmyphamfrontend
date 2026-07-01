import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerUser } from '@/lib/auth'
import { slugify } from '@/lib/utils'

async function checkAdmin() {
  const user = await getServerUser()
  return user?.role === 'ADMIN'
}

export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const data = await req.json()
  const slug = slugify(data.name)
  const product = await prisma.product.create({
    data: { ...data, slug, price: parseInt(data.price), oldPrice: data.oldPrice ? parseInt(data.oldPrice) : null, categoryId: parseInt(data.categoryId) },
    include: { category: true },
  })
  return NextResponse.json(product)
}
