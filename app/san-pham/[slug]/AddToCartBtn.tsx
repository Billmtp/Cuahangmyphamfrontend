'use client'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

interface Product { id: number; name: string; price: number; imageUrl?: string | null; slug: string }

export default function AddToCartBtn({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const router = useRouter()

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <button onClick={handleAdd}
        className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold text-sm transition-all ${added ? 'bg-green-500 text-white' : 'bg-pink-600 hover:bg-pink-700 text-white active:scale-95'}`}>
        {added ? '✓ Đã thêm!' : '🛒 Thêm vào giỏ'}
      </button>
      <button onClick={() => { addItem(product); router.push('/gio-hang') }}
        className="flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold text-sm border-2 border-pink-600 text-pink-600 hover:bg-pink-50 active:scale-95 transition-all">
        Mua Ngay
      </button>
    </div>
  )
}
