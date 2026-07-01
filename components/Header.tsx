'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [q, setQ] = useState('')
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) { router.push(`/san-pham?search=${encodeURIComponent(q)}`); setSearchOpen(false); setQ('') }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-pink-600 text-white text-xs py-1 px-4 text-center">
        📞 Hotline: 099 7755 334 &nbsp;|&nbsp; 📍 62/8 Nguyễn Khuyến, Vĩnh Hải, Nha Trang
      </div>

      {/* Main header */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex flex-col leading-tight">
            <span className="text-pink-600 font-black text-lg sm:text-xl tracking-tight">MỸ PHẨM</span>
            <span className="text-gray-700 font-bold text-sm sm:text-base tracking-widest">NHA TRANG</span>
          </div>
        </Link>

        {/* Desktop search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="flex-1 border border-pink-300 rounded-l-full px-4 py-2 text-sm outline-none focus:border-pink-500"
          />
          <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded-r-full hover:bg-pink-700 text-sm">🔍</button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search */}
          <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden text-gray-600 hover:text-pink-600 p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>

          {/* Cart */}
          <Link href="/gio-hang" className="relative p-1 text-gray-600 hover:text-pink-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">{totalItems}</span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="relative group">
              <button className="hidden sm:flex items-center gap-1 text-sm text-gray-700 hover:text-pink-600">
                <span className="w-7 h-7 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-xs">{user.name[0]}</span>
                <span className="hidden lg:block max-w-20 truncate">{user.name}</span>
              </button>
              <div className="absolute right-0 top-8 bg-white border rounded-xl shadow-lg py-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {user.role === 'ADMIN' && <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-pink-50 text-pink-600 font-semibold">⚙️ Quản trị</Link>}
                <Link href="/don-hang" className="block px-4 py-2 text-sm hover:bg-pink-50">📦 Đơn hàng</Link>
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 text-red-500">🚪 Đăng xuất</button>
              </div>
            </div>
          ) : (
            <Link href="/dang-nhap" className="hidden sm:block text-sm bg-pink-600 text-white px-3 py-1.5 rounded-full hover:bg-pink-700 whitespace-nowrap">Đăng nhập</Link>
          )}

          {/* Mobile menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="flex">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm sản phẩm..."
              className="flex-1 border border-pink-300 rounded-l-full px-4 py-2 text-sm outline-none"
              autoFocus />
            <button type="submit" className="bg-pink-600 text-white px-4 rounded-r-full text-sm">🔍</button>
          </form>
        </div>
      )}

      {/* Nav */}
      <nav className="hidden md:block border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 flex gap-6 py-2 text-sm font-medium">
          {[['/', 'Trang Chủ'], ['/san-pham', 'Sản Phẩm'], ['/gioi-thieu', 'Giới Thiệu'], ['/huong-dan', 'Hướng Dẫn'], ['/khuyen-mai', 'Khuyến Mãi'], ['/lien-he', 'Liên Hệ']].map(([href, label]) => (
            <Link key={href} href={href} className="text-gray-600 hover:text-pink-600 transition-colors">{label}</Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white shadow-lg">
          {[['/', 'Trang Chủ'], ['/san-pham', 'Sản Phẩm'], ['/gioi-thieu', 'Giới Thiệu'], ['/huong-dan', 'Hướng Dẫn'], ['/khuyen-mai', 'Khuyến Mãi'], ['/lien-he', 'Liên Hệ']].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 text-sm border-b border-gray-50 hover:bg-pink-50 hover:text-pink-600">{label}</Link>
          ))}
          {user ? (
            <>
              {user.role === 'ADMIN' && <Link href="/admin" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm border-b text-pink-600 font-semibold">⚙️ Quản trị</Link>}
              <Link href="/don-hang" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm border-b">📦 Đơn hàng</Link>
              <button onClick={() => { logout(); setMenuOpen(false) }} className="w-full text-left px-6 py-3 text-sm text-red-500">🚪 Đăng xuất</button>
            </>
          ) : (
            <Link href="/dang-nhap" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-pink-600 font-semibold">Đăng nhập / Đăng ký</Link>
          )}
        </div>
      )}
    </header>
  )
}
