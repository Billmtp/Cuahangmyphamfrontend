'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (tab === 'register' && form.password !== form.confirmPassword) { setError('Mật khẩu không khớp'); return }
    setLoading(true)
    try {
      if (tab === 'login') await login(form.email, form.password)
      else await register(form.name, form.email, form.password, form.phone)
      router.push('/')
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <span className="text-pink-600 font-black text-2xl">MỸ PHẨM</span>
            <span className="text-gray-700 font-bold text-xl block">NHA TRANG</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            {[['login', 'Đăng Nhập'], ['register', 'Đăng Ký']].map(([t, label]) => (
              <button key={t} onClick={() => { setTab(t as any); setError('') }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t ? 'bg-white text-pink-600 shadow' : 'text-gray-500'}`}>{label}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                  <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Nguyễn Văn A" required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="0xxxxxxxxx"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200" />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="email@example.com" required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu *</label>
              <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••" required minLength={6}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200" />
            </div>
            {tab === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu *</label>
                <input type="password" value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                  placeholder="••••••••" required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200" />
              </div>
            )}
            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 disabled:opacity-60 transition-colors mt-2">
              {loading ? '⏳ Đang xử lý...' : tab === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          <Link href="/" className="text-pink-600 hover:underline">← Về trang chủ</Link>
        </p>
      </div>
    </div>
  )
}
