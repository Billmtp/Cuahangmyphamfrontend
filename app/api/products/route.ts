import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')
  const origin = searchParams.get('origin')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const skip = (page - 1) * limit

  const where: any = {}
  if (category) where.category = { slug: category }
  if (search) where.name = { contains: search, mode: 'insensitive' }
  if (featured === 'true') where.featured = true
  if (origin) where.origin = origin

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ])

  return NextResponse.json({ products, total, page, totalPages: Math.ceil(total / limit) })
}
