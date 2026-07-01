import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerUser } from '@/lib/auth'

export async function GET() {
  const user = await getServerUser()
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(orders)
}

export async function PATCH(req: NextRequest) {
  const user = await getServerUser()
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id, status } = await req.json()
  const order = await prisma.order.update({ where: { id }, data: { status } })
  return NextResponse.json(order)
}
