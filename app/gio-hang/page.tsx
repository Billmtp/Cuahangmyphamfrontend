'use client'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart()
  const router = useRouter()

  if (items.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🛒</p>
      <h1 className="text-xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h1>
      <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng</p>
      <Link href="/san-pham" className="inline-block bg-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700">
        Mua Sắm Ngay
      </Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">🛒 Giỏ Hàng ({items.length} sản phẩm)</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Items */}
        <div className="flex-1 space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 items-center">
              <div className="relative w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                {item.imageUrl ? <Image src={item.imageUrl} alt={item.name} fill className="object-cover" unoptimized /> : <div className="absolute inset-0 flex items-center justify-center text-2xl">💄</div>}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/san-pham/${item.slug}`} className="font-medium text-sm text-gray-800 hover:text-pink-600 line-clamp-2">{item.name}</Link>
                <p className="text-pink-600 font-bold text-sm mt-0.5">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 hover:border-pink-400 flex items-center justify-center">−</button>
                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 hover:border-pink-400 flex items-center justify-center">+</button>
                <button onClick={() => removeItem(item.id)} className="w-7 h-7 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center ml-1">✕</button>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 hover:underline">Xóa tất cả</button>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <h2 className="font-bold text-gray-800 mb-4">Tóm Tắt Đơn Hàng</h2>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-gray-900 text-base">
                <span>Tổng cộng</span>
                <span className="text-pink-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <button onClick={() => router.push('/dat-hang')} className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors">
              Đặt Hàng Ngay →
            </button>
            <Link href="/san-pham" className="block text-center mt-3 text-sm text-gray-500 hover:text-pink-600">← Tiếp tục mua sắm</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
