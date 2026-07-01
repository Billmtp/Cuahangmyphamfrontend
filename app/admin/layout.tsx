'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) router.push('/')
  }, [user, loading])

  if (loading) return <div className="text-center py-20">⏳</div>
  if (!user || user.role !== 'ADMIN') return null

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-52 bg-gray-900 text-white md:min-h-screen">
        <div className="p-4 border-b border-gray-800">
          <p className="font-bold text-pink-400">⚙️ Quản Trị</p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>
        <nav className="p-2">
          {[['/', '🏠 Trang chủ'], ['/admin', '📊 Dashboard'], ['/admin/products', '📦 Sản phẩm'], ['/admin/orders', '🛒 Đơn hàng']].map(([href, label]) => (
            <Link key={href} href={href} className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors mb-1">{label}</Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-4 sm:p-6">{children}</main>
    </div>
  )
}
