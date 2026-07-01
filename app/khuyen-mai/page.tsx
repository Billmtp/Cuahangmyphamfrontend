import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
export const dynamic = 'force-dynamic'
export default async function SalePage() {
  const products = await prisma.product.findMany({
    where: { oldPrice: { not: null } },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 mb-8 text-white text-center">
        <h1 className="text-2xl sm:text-3xl font-black mb-1">🔥 Khuyến Mãi Hot</h1>
        <p className="text-pink-100">Giá tốt nhất - Hàng chính hãng</p>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">Chưa có sản phẩm khuyến mãi</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
