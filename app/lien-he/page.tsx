export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Liên Hệ</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: '📍', label: 'Địa chỉ', value: '62/8 Nguyễn Khuyến, p. Vĩnh Hải, Tp. Nha Trang (Gần chợ Vĩnh Hải, Trường Tiểu học Vĩnh Hải 2)', link: null },
          { icon: '📞', label: 'Điện thoại', value: '099 7755 334', link: 'tel:0997755334' },
          { icon: '✉️', label: 'Email', value: 'haminhtram.1992@gmail.com', link: 'mailto:haminhtram.1992@gmail.com' },
          { icon: '📘', label: 'Facebook', value: 'facebook.com/myphamnhatrang.net', link: 'https://facebook.com/myphamnhatrang.net' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
            {item.link ? (
              <a href={item.link} className="font-medium text-pink-600 hover:underline break-all">{item.value}</a>
            ) : (
              <p className="font-medium text-gray-800 text-sm">{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
