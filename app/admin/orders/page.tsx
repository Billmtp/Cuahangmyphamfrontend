'use client'
import { useState, useEffect } from 'react'
import { formatPrice } from '@/lib/utils'

const statusLabel: Record<string, string> = {
  PENDING: 'Chờ xác nhận', CONFIRMED: 'Đã xác nhận', SHIPPING: 'Đang giao', DONE: 'Hoàn thành', CANCELLED: 'Đã hủy'
}
const statusColor: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700', CONFIRMED: 'bg-blue-100 text-blue-700',
  SHIPPING: 'bg-purple-100 text-purple-700', DONE: 'bg-green-100 text-green-700', CANCELLED: 'bg-red-100 text-red-700'
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/orders').then(r => r.json()).then(data => { setOrders(data); setLoading(false) })
  }, [])

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/admin/orders', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  if (loading) return <div className="text-center py-20">⏳ Đang tải...</div>

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">🛒 Quản Lý Đơn Hàng</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">Chưa có đơn hàng nào</div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <div>
                  <span className="font-bold">Đơn #{order.id}</span>
                  <span className="text-sm text-gray-400 ml-2">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                  <p className="text-sm text-gray-600 mt-0.5">👤 {order.name} — 📞 {order.phone}</p>
                  <p className="text-sm text-gray-500">📍 {order.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer ${statusColor[order.status]}`}>
                    {Object.entries(statusLabel).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <div className="text-sm text-gray-500">{order.items.length} sản phẩm</div>
                <div className="font-bold text-pink-600">{formatPrice(order.total)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
