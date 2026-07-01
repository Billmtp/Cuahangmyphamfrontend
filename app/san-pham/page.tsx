import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import CategorySidebar from '@/components/CategorySidebar'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props { searchParams: Promise<{ category?: string; search?: string; page?: string; origin?: string }> }

const ORIGINS = [
  { flag: '🇰🇷', name: 'Hàn Quốc', value: 'Hàn Quốc' },
  { flag: '🇯🇵', name: 'Nhật Bản', value: 'Nhật Bản' },
  { flag: '🇹🇭', name: 'Thái Lan', value: 'Thái Lan' },
  { flag: '🇫🇷', name: 'Pháp', value: 'Pháp' },
  { flag: '🇺🇸', name: 'Mỹ', value: 'Mỹ' },
  { flag: '🇬🇧', name: 'Anh', value: 'Anh' },
]

export default async function ProductsPage({ searchParams }: Props) {
  const { category, search, page: pageStr, origin } = await searchParams
  const page = parseInt(pageStr || '1')
  const limit = 12

  const where: any = {}
  if (category) where.category = { slug: category }
  if (search) where.name = { contains: search, mode: 'insensitive' }
  if (origin) where.origin = origin

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({ where, include: { category: true }, orderBy: { createdAt: 'desc' }, skip: (page-1)*limit, take: limit }),
    prisma.product.count({ where }),
    prisma.category.findMany({ include: { _count: { select: { products: true } } }, orderBy: { name: 'asc' } }),
  ])

  const totalPages = Math.ceil(total / limit)
  const currentCategory = categories.find(c => c.slug === category)
  const currentOrigin = ORIGINS.find(o => o.value === origin)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-pink-600">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:text-pink-600">Sản phẩm</Link>
        {currentCategory && <><span>/</span><span className="text-gray-800">{currentCategory.name}</span></>}
        {currentOrigin && <><span>/</span><span className="text-gray-800">{currentOrigin.flag} {currentOrigin.name}</span></>}
        {search && <><span>/</span><span className="text-gray-800">"{search}"</span></>}
      </nav>

      {/* Origin filter bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        <Link href="/san-pham"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 text-sm font-medium transition-colors border ${!origin ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'}`}>
          🌏 Tất cả
        </Link>
        {ORIGINS.map(o => (
          <Link key={o.value} href={`/san-pham?origin=${encodeURIComponent(o.value)}`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 text-sm font-medium transition-colors border ${origin === o.value ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'}`}>
            <span>{o.flag}</span><span>{o.name}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-56 flex-shrink-0">
          <Suspense><CategorySidebar categories={categories} /></Suspense>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold text-gray-800">
              {currentOrigin ? `${currentOrigin.flag} Hàng ${currentOrigin.name}`
                : currentCategory ? currentCategory.name
                : search ? `Kết quả: "${search}"`
                : 'Tất Cả Sản Phẩm'}
            </h1>
            <p className="text-sm text-gray-500">{total} sản phẩm</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">Không tìm thấy sản phẩm</p>
              <Link href="/san-pham" className="text-pink-600 text-sm mt-2 block hover:underline">Xem tất cả sản phẩm</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                const params = new URLSearchParams()
                if (category) params.set('category', category)
                if (search) params.set('search', search)
                if (origin) params.set('origin', origin)
                params.set('page', String(p))
                return (
                  <Link key={p} href={`/san-pham?${params}`}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-pink-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-pink-300'}`}
                  >{p}</Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
