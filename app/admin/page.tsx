import { prisma } from '@/lib/prisma'
export const dynamic = 'force-dynamic'
export default async function AdminDashboard() {
  const [products, orders, users] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ])
  const revenue = await prisma.order.aggregate({ _sum: { total: true }, where: { status: 'DONE' } })
  const stats = [
    { label: 'Sản phẩm', value: products, icon: '📦', color: 'bg-blue-50 text-blue-600' },
    { label: 'Đơn hàng', value: orders, icon: '🛒', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Người dùng', value: users, icon: '👤', color: 'bg-purple-50 text-purple-600' },
    { label: 'Doanh thu', value: (revenue._sum.total || 0).toLocaleString('vi-VN') + 'đ', icon: '💰', color: 'bg-green-50 text-green-600' },
  ]
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`text-2xl w-10 h-10 flex items-center justify-center rounded-xl mb-3 ${s.color}`}>{s.icon}</div>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
