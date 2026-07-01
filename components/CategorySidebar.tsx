'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface Category { id: number; name: string; slug: string; _count?: { products: number } }

export default function CategorySidebar({ categories }: { categories: Category[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('category')

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-pink-600 text-white px-4 py-3 font-semibold text-sm">📂 Danh Mục Sản Phẩm</div>
      <ul className="divide-y divide-gray-50">
        <li>
          <Link href="/san-pham"
            className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-pink-50 hover:text-pink-600 transition-colors ${!current ? 'text-pink-600 font-semibold bg-pink-50' : 'text-gray-700'}`}>
            <span>Tất cả sản phẩm</span>
          </Link>
        </li>
        {categories.map(cat => (
          <li key={cat.id}>
            <Link href={`/san-pham?category=${cat.slug}`}
              className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-pink-50 hover:text-pink-600 transition-colors ${current === cat.slug ? 'text-pink-600 font-semibold bg-pink-50' : 'text-gray-700'}`}>
              <span>{cat.name}</span>
              {cat._count && <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{cat._count.products}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
