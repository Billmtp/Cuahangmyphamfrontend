const priceChanges = [
  { name: 'Son Bourjois Rouge Edition Velvet', oldPrice: 250000, newPrice: 220000 },
  { name: 'Kem tẩy lông Veet 100ml', oldPrice: 115000, newPrice: 100000 },
  { name: 'Kem chống nắng Florsan SPF40', oldPrice: 75000, newPrice: 70000 },
  { name: 'Son kem lì L.A Girl Matte', oldPrice: 115000, newPrice: 100000 },
  { name: 'Sữa rửa mặt Innisfree Green Tea', oldPrice: 180000, newPrice: 165000 },
  { name: 'Mascara 4D Dimension Mistine', oldPrice: 70000, newPrice: 40000 },
]

export default function PriceAdjust() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-pink-600 text-white px-4 py-3 font-semibold text-sm">🏷️ Điều Chỉnh Giá</div>
      <ul className="divide-y divide-gray-50">
        {priceChanges.map((item, i) => (
          <li key={i} className="px-4 py-3 text-xs">
            <p className="font-medium text-gray-800 line-clamp-2 mb-1">{item.name}</p>
            <div className="flex items-center gap-2">
              <span className="line-through text-gray-400">{item.oldPrice.toLocaleString('vi-VN')}đ</span>
              <span className="text-red-500 font-bold">→ {item.newPrice.toLocaleString('vi-VN')}đ</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
