'use client'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<number | null>(null)
  const [form, setForm] = useState({ name: user?.name || '', phone: '', address: '', note: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address) { setError('Vui lòng điền đầy đủ thông tin'); return }
    setLoading(true)
    setError('')
    try {
      const r = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: items.map(i => ({ productId: i.id, quantity: i.quantity })) }),
      })
      const data = await r.json()
      if (!r.ok) throw new Error(data.error)
      setSuccess(data.id)
      clearCart()
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  if (success) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h1>
      <p className="text-gray-500 mb-2">Mã đơn hàng: <strong className="text-pink-600">#{success}</strong></p>
      <p className="text-gray-500 mb-6 text-sm">Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.</p>
      <div className="flex gap-3 justify-center">
        <Link href="/" className="bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700">Về Trang Chủ</Link>
        {user && <Link href="/don-hang" className="border border-pink-600 text-pink-600 px-6 py-3 rounded-xl font-bold hover:bg-pink-50">Xem Đơn Hàng</Link>}
      </div>
    </div>
  )

  if (items.length === 0) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <p className="text-4xl mb-3">🛒</p>
      <p className="font-medium text-gray-700">Giỏ hàng trống</p>
      <Link href="/san-pham" className="text-pink-600 text-sm mt-2 block hover:underline">← Mua sắm ngay</Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">📝 Đặt Hàng</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">Thông tin giao hàng</h2>
            {[
              { name: 'name', label: 'Họ và tên *', placeholder: 'Nguyễn Văn A', type: 'text' },
              { name: 'phone', label: 'Số điện thoại *', placeholder: '0xxxxxxxxx', type: 'tel' },
              { name: 'address', label: 'Địa chỉ giao hàng *', placeholder: 'Số nhà, đường, phường, tỉnh/thành', type: 'text' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  value={(form as any)[f.name]}
                  onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
              <textarea placeholder="Yêu cầu đặc biệt, thời gian giao hàng..."
                value={form.note} onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))}
                rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200 resize-none" />
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
              💳 Thanh toán khi nhận hàng (COD)
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
              {loading ? '⏳ Đang xử lý...' : '✓ Xác Nhận Đặt Hàng'}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <h2 className="font-semibold text-gray-800 mb-3">Đơn hàng ({items.length})</h2>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex gap-2 text-sm">
                  <div className="relative w-10 h-10 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    {item.imageUrl ? <Image src={item.imageUrl} alt={item.name} fill className="object-cover" unoptimized /> : <div className="absolute inset-0 flex items-center justify-center text-lg">💄</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-gray-500 text-xs">x{item.quantity}</p>
                  </div>
                  <span className="text-pink-600 font-medium flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
              <span>Tổng cộng</span>
              <span className="text-pink-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
