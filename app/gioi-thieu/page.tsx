export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Giới Thiệu</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4 text-gray-600 leading-relaxed">
        <div className="text-5xl text-center mb-4">💄</div>
        <h2 className="text-xl font-bold text-pink-600 text-center">MỸ PHẨM NHA TRANG</h2>
        <p>Mỹ phẩm Nha Trang chuyên cung cấp các sản phẩm chính hãng từ <strong>Hàn Quốc, Thái Lan, Nhật Bản, Anh, Pháp, Mỹ</strong> và một số quốc gia khác.</p>
        <p>Mỹ phẩm Nha Trang hướng đến các bạn sinh viên, nhân viên văn phòng, người có thu nhập từ thấp đến trung bình khá - đáp ứng cung cấp những sản phẩm có chất lượng tốt nhất và giá thành phù hợp nhất.</p>
        <p>Các mặt hàng đang được Mỹ phẩm Nha Trang nhập về với số lượng ngày càng lớn và đa chủng loại để các bạn có nhiều sự lựa chọn phù hợp với cơ địa cũng như khả năng tài chính mỗi người.</p>
        <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 text-sm space-y-1">
          <p>📍 <strong>Địa chỉ:</strong> 62/8 Nguyễn Khuyến, p. Vĩnh Hải, Tp. Nha Trang</p>
          <p>📞 <strong>Điện thoại:</strong> <a href="tel:0997755334" className="text-pink-600">099 7755 334</a></p>
          <p>✉️ <strong>Email:</strong> <a href="mailto:haminhtram.1992@gmail.com" className="text-pink-600">haminhtram.1992@gmail.com</a></p>
          <p>🌐 <strong>Website:</strong> <a href="http://myphamnhatrang.net" className="text-pink-600">myphamnhatrang.net</a></p>
          <p>📘 <strong>Facebook:</strong> <a href="https://facebook.com/myphamnhatrang.net" className="text-pink-600">facebook.com/myphamnhatrang.net</a></p>
        </div>
      </div>
    </div>
  )
}
