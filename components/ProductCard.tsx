'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: number; name: string; slug: string; price: number; oldPrice?: number | null
  imageUrl?: string | null; category?: { name: string }
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100">
      <Link href={`/san-pham/${product.slug}`}>
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl">💄</span>
            </div>
          )}
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
          )}
        </div>
      </Link>
      <div className="p-3">
        <p className="text-xs text-pink-500 mb-0.5">{product.category?.name}</p>
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-pink-600 min-h-[2.5rem]">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="text-pink-600 font-bold text-sm">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="text-gray-400 text-xs line-through ml-1">{formatPrice(product.oldPrice)}</span>}
          </div>
          <button
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, slug: product.slug })}
            className="bg-pink-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-pink-700 active:scale-95 transition-all"
          >+ Thêm</button>
        </div>
      </div>
    </div>
  )
}
