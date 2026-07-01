import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: isNaN(Number(id)) ? { slug: id } : { id: Number(id) },
    include: { category: true },
  })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    take: 4,
    include: { category: true },
  })
  return NextResponse.json({ product, related })
}
