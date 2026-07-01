import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const payload = await getServerUser()
  if (!payload) return NextResponse.json(null)
  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: { id: true, name: true, email: true, phone: true, role: true },
  })
  return NextResponse.json(user)
}
