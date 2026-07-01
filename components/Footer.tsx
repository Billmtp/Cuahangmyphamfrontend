import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <div className="mb-3">
            <span className="text-pink-400 font-black text-xl">MỸ PHẨM</span>
            <span className="text-white font-bold text-lg block">NHA TRANG</span>
          </div>
          <p className="text-sm leading-relaxed">Chuyên cung cấp mỹ phẩm nhập khẩu chính hãng từ Hàn Quốc, Thái Lan, Nhật Bản, Anh, Pháp, Mỹ...</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Liên hệ</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 62/8 Nguyễn Khuyến, Vĩnh Hải, Nha Trang</li>
            <li>📞 <a href="tel:0997755334" className="hover:text-pink-400">099 7755 334</a></li>
            <li>✉️ <a href="mailto:haminhtram.1992@gmail.com" className="hover:text-pink-400">haminhtram.1992@gmail.com</a></li>
            <li>🌐 <a href="http://myphamnhatrang.net" className="hover:text-pink-400">myphamnhatrang.net</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Danh mục</h4>
          <ul className="space-y-1 text-sm columns-2">
            {['Son Môi', 'Kem Nền', 'Sữa Rửa Mặt', 'Mascara', 'Dưỡng Da', 'Mặt Nạ', 'Chống Nắng', 'Dầu Gội'].map(c => (
              <li key={c}><Link href={`/san-pham`} className="hover:text-pink-400">{c}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        © 2024 Mỹ Phẩm Nha Trang. All rights reserved.
      </div>
    </footer>
  )
}
