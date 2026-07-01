import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { name, email, password, phone } = await req.json()
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return NextResponse.json({ error: 'Email đã tồn tại' }, { status: 400 })
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { name, email, password: hashed, phone } })
  const token = signToken({ id: user.id, email: user.email, role: user.role })
  const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  res.cookies.set('auth_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' })
  return res
}
