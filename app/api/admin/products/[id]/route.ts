import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerUser } from '@/lib/auth'
import { slugify } from '@/lib/utils'

async function checkAdmin() {
  const user = await getServerUser()
  return user?.role === 'ADMIN'
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const data = await req.json()
  const slug = slugify(data.name)
  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data: { ...data, slug, price: parseInt(data.price), oldPrice: data.oldPrice ? parseInt(data.oldPrice) : null, categoryId: parseInt(data.categoryId) },
    include: { category: true },
  })
  return NextResponse.json(product)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  await prisma.product.delete({ where: { id: parseInt(id) } })
  return NextResponse.json({ ok: true })
}
