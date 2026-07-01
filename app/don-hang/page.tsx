'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const statusLabel: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700' },
  SHIPPING: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700' },
  DONE: { label: 'Hoàn thành', color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
}

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) { router.push('/dang-nhap'); return }
    if (user) {
      fetch('/api/orders').then(r => r.json()).then(data => { setOrders(data); setFetching(false) }).catch(() => setFetching(false))
    }
  }, [user, loading])

  if (loading || fetching) return <div className="text-center py-20 text-gray-400">⏳ Đang tải...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">📦 Đơn Hàng Của Tôi</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500">Chưa có đơn hàng nào</p>
          <Link href="/san-pham" className="text-pink-600 text-sm mt-2 block hover:underline">Mua sắm ngay →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => {
            const st = statusLabel[order.status] || statusLabel.PENDING
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <span className="font-bold text-gray-800">Đơn #{order.id}</span>
                    <span className="text-gray-400 text-sm ml-2">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${st.color}`}>{st.label}</span>
                </div>
                <div className="space-y-2 mb-3">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span className="line-clamp-1">{item.product.name} <span className="text-gray-400">x{item.quantity}</span></span>
                      <span className="flex-shrink-0 ml-2">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <div className="text-sm text-gray-500">📍 {order.address}</div>
                  <div className="font-bold text-pink-600">{formatPrice(order.total)}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
