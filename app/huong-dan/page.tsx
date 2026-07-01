import Link from 'next/link'

const guides = [
  {
    slug: 'chon-kem-chong-nang',
    icon: '☀️',
    title: 'Cách chọn kem chống nắng phù hợp',
    desc: 'Hướng dẫn chọn kem chống nắng theo loại da và nhu cầu sử dụng hàng ngày.',
    time: '5 phút đọc',
  },
  {
    slug: 'quy-trinh-duong-da',
    icon: '💧',
    title: 'Quy trình dưỡng da cơ bản',
    desc: 'Các bước cơ bản trong routine skincare buổi sáng và buổi tối.',
    time: '7 phút đọc',
  },
  {
    slug: 'chon-son-hop-tone-da',
    icon: '💋',
    title: 'Cách chọn son phù hợp tone da',
    desc: 'Gợi ý màu son theo màu da để có nét đẹp tự nhiên nhất.',
    time: '4 phút đọc',
  },
  {
    slug: 'nhan-biet-hang-chinh-hang',
    icon: '✅',
    title: 'Phân biệt hàng chính hãng và hàng giả',
    desc: 'Những dấu hiệu nhận biết mỹ phẩm chính hãng nhập khẩu.',
    time: '6 phút đọc',
  },
  {
    slug: 'cham-soc-da-mun',
    icon: '🌿',
    title: 'Chăm sóc da mụn đúng cách',
    desc: 'Những sai lầm thường gặp và cách chăm sóc da mụn hiệu quả.',
    time: '8 phút đọc',
  },
  {
    slug: 'trang-diem-tu-nhien',
    icon: '✨',
    title: 'Trang điểm tự nhiên cho người mới',
    desc: 'Hướng dẫn trang điểm no-makeup makeup look đơn giản nhất.',
    time: '6 phút đọc',
  },
]

export default function GuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">📖 Hướng Dẫn Làm Đẹp</h1>
      <p className="text-gray-500 mb-6 text-sm">Chia sẻ kiến thức và mẹo làm đẹp từ đội ngũ Mỹ Phẩm Nha Trang</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {guides.map(g => (
          <Link key={g.slug} href={`/huong-dan/${g.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-pink-200 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">{g.icon}</div>
            <h2 className="font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">{g.title}</h2>
            <p className="text-sm text-gray-500 mb-3">{g.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">⏱ {g.time}</span>
              <span className="text-xs text-pink-600 font-medium">Đọc ngay →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
