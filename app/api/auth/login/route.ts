import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 })
  }
  const token = signToken({ id: user.id, email: user.email, role: user.role })
  const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  res.cookies.set('auth_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' })
  return res
}
