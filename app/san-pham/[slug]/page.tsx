import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import AddToCartBtn from './AddToCartBtn'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ slug: string }> }

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })
  if (!product) notFound()

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    include: { category: true },
    take: 4,
  })

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-pink-600">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:text-pink-600">Sản phẩm</Link>
        <span>/</span>
        <Link href={`/san-pham?category=${product.category.slug}`} className="hover:text-pink-600">{product.category.name}</Link>
        <span>/</span>
        <span className="text-gray-800 line-clamp-1">{product.name}</span>
      </nav>

      {/* Product detail */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" unoptimized />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-8xl">💄</div>
              )}
              {discount > 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">-{discount}%</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="text-pink-500 text-sm font-medium mb-1">{product.category.name}</p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl sm:text-3xl font-black text-pink-600">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
              )}
              {discount > 0 && (
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded">Tiết kiệm {formatPrice(product.oldPrice! - product.price)}</span>
              )}
            </div>

            {product.description && (
              <div className="prose text-sm text-gray-600 mb-6 leading-relaxed whitespace-pre-line">{product.description}</div>
            )}

            <div className="flex items-center gap-2 text-sm text-green-600 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {product.inStock ? 'Còn hàng' : 'Hết hàng'}
            </div>

            <AddToCartBtn product={{ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, slug: product.slug }} />

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-100 text-center text-xs text-gray-500">
              {[['🚚', 'Giao hàng toàn quốc'], ['✅', 'Hàng chính hãng'], ['🔄', 'Đổi trả 7 ngày']].map(([icon, label]) => (
                <div key={label} className="flex flex-col items-center gap-1"><span className="text-lg">{icon}</span><span>{label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Sản Phẩm Liên Quan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
