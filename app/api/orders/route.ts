import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerUser } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { name, phone, address, note, items } = await req.json()
  const user = await getServerUser()

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Giỏ hàng trống' }, { status: 400 })
  }

  // Verify products and calculate total
  const productIds = items.map((i: any) => i.productId)
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } })
  let total = 0
  const orderItems = items.map((item: any) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) throw new Error('Sản phẩm không tồn tại')
    total += product.price * item.quantity
    return { productId: product.id, quantity: item.quantity, price: product.price }
  })

  const order = await prisma.order.create({
    data: {
      name, phone, address, note, total,
      userId: user?.id ?? null,
      items: { create: orderItems },
    },
    include: { items: { include: { product: true } } },
  })

  return NextResponse.json(order)
}

export async function GET() {
  const user = await getServerUser()
  if (!user) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(orders)
}
