import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import PriceAdjust from '@/components/PriceAdjust'

export const dynamic = 'force-dynamic'

async function getData() {
  const [featured, categories, newest] = await Promise.all([
    prisma.product.findMany({ where: { featured: true }, include: { category: true }, take: 8 }),
    prisma.category.findMany({ include: { _count: { select: { products: true } } }, orderBy: { name: 'asc' } }),
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' }, take: 8 }),
  ])
  return { featured, categories, newest }
}

const ORIGINS = [
  { flag: '🇰🇷', name: 'Hàn Quốc', value: 'Hàn Quốc' },
  { flag: '🇯🇵', name: 'Nhật Bản', value: 'Nhật Bản' },
  { flag: '🇹🇭', name: 'Thái Lan', value: 'Thái Lan' },
  { flag: '🇫🇷', name: 'Pháp', value: 'Pháp' },
  { flag: '🇺🇸', name: 'Mỹ', value: 'Mỹ' },
  { flag: '🇬🇧', name: 'Anh', value: 'Anh' },
]

export default async function HomePage() {
  const { featured, categories, newest } = await getData()

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-700 text-white py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <p className="text-pink-200 text-sm font-medium mb-2">✨ Chính hãng 100%</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
              Mỹ Phẩm<br/><span className="text-yellow-300">Nhập Khẩu</span><br/>Chính Hãng
            </h1>
            <p className="text-pink-100 mb-6 text-sm sm:text-base max-w-md mx-auto md:mx-0">
              Hàn Quốc · Nhật Bản · Thái Lan · Pháp · Mỹ · Anh<br/>
              Giá tốt nhất Nha Trang
            </p>
            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
              <Link href="/san-pham" className="bg-white text-pink-600 font-bold px-6 py-3 rounded-full hover:bg-pink-50 transition-colors text-sm sm:text-base shadow">
                Xem Sản Phẩm
              </Link>
              <Link href="/lien-he" className="border-2 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm sm:text-base">
                Liên Hệ Ngay
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 text-8xl sm:text-9xl">💄</div>
        </div>
      </section>

      {/* Origin filter - có tác dụng thực sự */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Lọc theo xuất xứ</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Link href="/san-pham"
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-pink-600 hover:text-white text-gray-700 px-4 py-2 rounded-full flex-shrink-0 text-sm font-medium transition-colors border border-transparent hover:border-pink-600">
              🌏 Tất cả
            </Link>
            {ORIGINS.map(({ flag, name, value }) => (
              <Link key={value} href={`/san-pham?origin=${encodeURIComponent(value)}`}
                className="flex items-center gap-1.5 bg-pink-50 hover:bg-pink-600 hover:text-white text-pink-700 px-4 py-2 rounded-full flex-shrink-0 border border-pink-100 hover:border-pink-600 text-sm font-medium transition-colors">
                <span className="text-base">{flag}</span>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Categories grid */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">📂 Danh Mục Sản Phẩm</h2>
            <Link href="/san-pham" className="text-pink-600 text-sm hover:underline">Xem tất cả →</Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
            {categories.slice(0, 12).map(cat => (
              <Link key={cat.id} href={`/san-pham?category=${cat.slug}`}
                className="group bg-white rounded-xl p-3 text-center border border-gray-100 hover:border-pink-300 hover:shadow-sm transition-all">
                <div className="text-2xl mb-1">{getCatEmoji(cat.name)}</div>
                <p className="text-xs font-medium text-gray-700 group-hover:text-pink-600 leading-tight line-clamp-2">{cat.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{cat._count.products} SP</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            {featured.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">⭐ Sản Phẩm Nổi Bật</h2>
                  <Link href="/san-pham" className="text-pink-600 text-sm hover:underline">Xem thêm →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {featured.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </section>
            )}

            {newest.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">🆕 Sản Phẩm Mới</h2>
                  <Link href="/san-pham" className="text-pink-600 text-sm hover:underline">Xem thêm →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {newest.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </section>
            )}

            {featured.length === 0 && newest.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">💄</p>
                <p className="font-medium">Chưa có sản phẩm nào</p>
                <p className="text-sm mt-1">Vào trang Admin để thêm sản phẩm hoặc chạy lệnh seed</p>
                <Link href="/admin/products" className="inline-block mt-3 text-sm bg-pink-600 text-white px-4 py-2 rounded-xl hover:bg-pink-700">+ Thêm sản phẩm</Link>
              </div>
            )}
          </div>

          <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
            <PriceAdjust />
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl p-4">
              <h4 className="font-bold mb-2">📞 Hỗ Trợ Trực Tuyến</h4>
              <p className="text-sm mb-3 text-pink-100">Liên hệ ngay để được tư vấn miễn phí!</p>
              <a href="tel:0997755334" className="block text-center bg-white text-pink-600 font-bold py-2 rounded-xl text-sm hover:bg-pink-50">
                099 7755 334
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function getCatEmoji(name: string) {
  if (name.includes('Son')) return '💋'
  if (name.includes('Mascara')) return '👁️'
  if (name.includes('Phấn')) return '✨'
  if (name.includes('Kem Nền') || name.includes('BB')) return '🎭'
  if (name.includes('Sữa Rửa') || name.includes('Tẩy Trang')) return '🧴'
  if (name.includes('Dưỡng Da') || name.includes('Serum')) return '💧'
  if (name.includes('Mặt Nạ')) return '🎭'
  if (name.includes('Chống Nắng')) return '☀️'
  if (name.includes('Dầu Gội') || name.includes('Tóc')) return '💆'
  if (name.includes('Nước Hoa Hồng')) return '🌹'
  if (name.includes('Kẻ Mắt')) return '✏️'
  if (name.includes('Kẻ Chân Mày')) return '🖊️'
  if (name.includes('Dụng Cụ')) return '🪄'
  if (name.includes('Mụn') || name.includes('Trị')) return '🌿'
  if (name.includes('Che Khuyết')) return '🌟'
  if (name.includes('Xà Phòng') || name.includes('Sữa Tắm')) return '🧼'
  if (name.includes('Body')) return '🧖'
  if (name.includes('Tẩy Lông')) return '🪒'
  if (name.includes('Thực Phẩm')) return '💊'
  if (name.includes('Tan Mỡ') || name.includes('Rạn')) return '🏃'
  if (name.includes('Dưỡng Mắt') || name.includes('Dưỡng Mi')) return '👀'
  return '💄'
}
