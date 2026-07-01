import Link from 'next/link'
import { notFound } from 'next/navigation'

const articles: Record<string, { icon: string; title: string; time: string; content: string }> = {
  'chon-kem-chong-nang': {
    icon: '☀️', title: 'Cách chọn kem chống nắng phù hợp', time: '5 phút đọc',
    content: `
## Tại sao cần dùng kem chống nắng?

Ánh nắng mặt trời chứa tia UV (UVA và UVB) gây lão hóa da, sạm nám và tăng nguy cơ ung thư da. Kem chống nắng là bước **không thể bỏ qua** trong routine dưỡng da hàng ngày, dù trời nắng hay mây.

## Hiểu về chỉ số SPF và PA

**SPF (Sun Protection Factor):** Đo khả năng chống tia UVB
- SPF 30: chặn ~97% tia UVB
- SPF 50: chặn ~98% tia UVB
- SPF 50+: chặn ~98.5% tia UVB

**PA (Protection Grade of UVA):**
- PA+ đến PA++++: càng nhiều dấu + càng chống UVA tốt hơn

## Chọn theo loại da

**Da dầu/hỗn hợp:**
Chọn loại dạng gel hoặc fluid, không chứa dầu (oil-free), có kiểm soát dầu. Ví dụ: Innisfree Daily UV Defense SPF 36, La Roche-Posay Anthelios Fluid.

**Da khô:**
Chọn loại dạng kem, có thành phần dưỡng ẩm như hyaluronic acid hoặc glycerin. Ví dụ: Neutrogena Hydro Boost Water Gel Lotion SPF 30.

**Da nhạy cảm:**
Ưu tiên kem chống nắng vật lý (chứa Zinc Oxide hoặc Titanium Dioxide), tránh hóa chất gây kích ứng. Ví dụ: Aveeno Positively Mineral Sensitive Skin Sunscreen SPF 50.

## Lưu ý khi sử dụng

- Thoa **15-20 phút trước** khi ra ngoài
- Lượng dùng cho mặt: khoảng **1/4 muỗng cà phê** (tương đương 2 ngón tay)
- Thoa lại **mỗi 2 tiếng** hoặc sau khi đổ mồ hôi, bơi lội
- Dùng hàng ngày, **kể cả trong nhà** vì tia UVA xuyên qua kính
    `
  },
  'quy-trinh-duong-da': {
    icon: '💧', title: 'Quy trình dưỡng da cơ bản', time: '7 phút đọc',
    content: `
## Routine buổi sáng

Mục tiêu: Bảo vệ da khỏi tác nhân môi trường trong ngày.

**Bước 1 — Rửa mặt**
Dùng sữa rửa mặt nhẹ dịu, massage nhẹ nhàng 60 giây rồi rửa sạch bằng nước ấm.

**Bước 2 — Nước hoa hồng (Toner)**
Thấm vào bông cotton hoặc vỗ nhẹ bằng tay lên mặt. Giúp cân bằng pH và chuẩn bị cho bước tiếp theo.

**Bước 3 — Serum**
Dùng 2-3 giọt, thoa đều và nhẹ nhàng ấn vào da. Chọn serum theo vấn đề da: Vitamin C (sáng da), Niacinamide (thu lỗ chân lông), Hyaluronic Acid (cấp ẩm).

**Bước 4 — Kem dưỡng ẩm**
Khóa ẩm và dưỡng da. Thoa khi da còn hơi ẩm để hấp thụ tốt hơn.

**Bước 5 — Kem chống nắng (SPF 30+)**
Bước quan trọng nhất buổi sáng, không được bỏ qua!

## Routine buổi tối

Mục tiêu: Làm sạch sâu và phục hồi da trong lúc ngủ.

**Bước 1 — Tẩy trang**
Dùng dầu tẩy trang hoặc micellar water để làm sạch kem chống nắng và trang điểm.

**Bước 2 — Rửa mặt**
Double cleanse (rửa mặt lần 2) để đảm bảo sạch hoàn toàn.

**Bước 3 — Toner**

**Bước 4 — Serum (tập trung trị liệu)**
Buổi tối có thể dùng Retinol (chống lão hóa) hoặc AHA/BHA (tẩy tế bào chết) — nhưng không dùng cùng nhau.

**Bước 5 — Kem dưỡng ẩm hoặc Mặt nạ ngủ**

## Mẹo nhỏ

- Kiên trì ít nhất **4-6 tuần** mới thấy hiệu quả
- Introduce sản phẩm mới **từng cái một**, cách nhau 1-2 tuần
- **Patch test** (thử trên vùng da nhỏ) trước khi dùng sản phẩm mới
    `
  },
  'chon-son-hop-tone-da': {
    icon: '💋', title: 'Cách chọn son phù hợp tone da', time: '4 phút đọc',
    content: `
## Xác định tone da của bạn

**Cách đơn giản nhất:** Nhìn vào mạch máu ở cổ tay dưới ánh sáng tự nhiên:
- **Xanh lá/tím:** Tone lạnh (cool undertone)
- **Xanh dương/tím:** Tone trung tính (neutral undertone)  
- **Xanh lá/vàng:** Tone ấm (warm undertone)

## Son phù hợp theo tone da

**Da sáng trắng (tone lạnh):**
Đẹp nhất với màu hồng phấn, đỏ cherry, hồng baby, nude hồng, berry (tím đỏ).
Tránh: cam sáng, nâu quá đậm.

**Da sáng ngà (tone trung tính):**
Hầu hết màu son đều hợp. Đặc biệt đẹp với: nude hồng đất, đỏ tươi, hồng san hô, cam đất.

**Da bánh mật (tone ấm):**
Đẹp nhất với cam đất, nâu đỏ, đỏ gạch, hồng cam, nude nâu, terracotta.
Tránh: hồng lạnh, tím lạnh.

**Da ngăm (tone ấm đậm):**
Phù hợp với màu đậm: đỏ đậm, cherry, berry, cam đất đậm, nâu đỏ, oxblood.
Màu nude nhạt thường làm da trông xỉn hơn.

## Tips chọn son

- **Son nude:** Chọn tone gần với màu môi tự nhiên của bạn, đậm hơn 1-2 tone là đẹp nhất
- **Son đỏ:** Đỏ tươi hợp tone lạnh, đỏ gạch hợp tone ấm
- **Son hồng:** Hồng lạnh cho tone lạnh, hồng cam cho tone ấm
- Thử son trên **môi thật** thay vì thử trên mu bàn tay vì màu sẽ khác nhau nhiều
    `
  },
  'nhan-biet-hang-chinh-hang': {
    icon: '✅', title: 'Phân biệt hàng chính hãng và hàng giả', time: '6 phút đọc',
    content: `
## Tại sao cần phân biệt?

Mỹ phẩm giả có thể chứa các chất độc hại như thủy ngân, chì, axit mạnh... gây hại nghiêm trọng cho da và sức khỏe. Biết cách phân biệt giúp bạn mua sắm an toàn hơn.

## 5 dấu hiệu nhận biết hàng thật

**1. Bao bì và tem nhãn**
- Chữ in sắc nét, không bị nhòe hay mờ
- Màu sắc đồng đều, không lem
- Tem hologram (nếu có) phản sáng đều, không bị bong tróc
- Thông tin đầy đủ: thành phần, hạn sử dụng, nơi sản xuất, nhà nhập khẩu

**2. Mùi hương**
Mỹ phẩm thật có mùi thơm nhẹ, dễ chịu, không nồng hay hăng. Hàng giả thường có mùi hóa chất khó chịu hoặc mùi cồn nồng.

**3. Kết cấu sản phẩm**
Son thật: màu lên đều, không bị lem hay trôi nhanh. Son giả: màu loang, mùi lạ, chảy ở nhiệt độ thường.

**4. Mã vạch và QR code**
Nhiều hãng lớn có thể tra cứu mã vạch trên app hoặc website chính hãng. Một số hãng có QR code để xác thực sản phẩm.

**5. Giá cả**
Nếu giá quá rẻ so với thị trường (giảm quá 50%), hãy nghi ngờ. Ví dụ son MAC chính hãng 350.000đ mà bán 80.000đ thì chắc chắn không phải hàng thật.

## Mua ở đâu để an toàn?

- Cửa hàng có địa chỉ rõ ràng, giấy phép kinh doanh
- Website chính hãng của thương hiệu
- Đại lý được ủy quyền chính thức
- Tránh mua từ nguồn không rõ ràng trên mạng xã hội

**Tại Mỹ Phẩm Nha Trang**, tất cả sản phẩm đều được nhập khẩu trực tiếp từ các đại lý chính hãng, có hóa đơn và chứng từ đầy đủ.
    `
  },
  'cham-soc-da-mun': {
    icon: '🌿', title: 'Chăm sóc da mụn đúng cách', time: '8 phút đọc',
    content: `
## Những sai lầm thường gặp với da mụn

❌ **Nặn mụn bằng tay không sạch** — gây viêm nhiễm, để lại sẹo
❌ **Rửa mặt quá nhiều lần** — làm da mất cân bằng, tăng tiết dầu
❌ **Dùng quá nhiều sản phẩm cùng lúc** — kích ứng da
❌ **Bỏ bước dưỡng ẩm** — da mụn vẫn cần độ ẩm
❌ **Dùng kem trị mụn nồng độ cao ngay từ đầu** — gây bong tróc, kích ứng

## Routine đơn giản cho da mụn

**Sáng:**
1. Sữa rửa mặt dịu nhẹ (CeraVe, La Roche-Posay Effaclar)
2. Toner không cồn
3. Serum Niacinamide 5-10% (kiểm soát dầu, thu lỗ chân lông)
4. Kem dưỡng ẩm oil-free
5. Kem chống nắng không gây mụn (non-comedogenic)

**Tối:**
1. Tẩy trang nhẹ nhàng
2. Sữa rửa mặt
3. Toner chứa BHA (Salicylic Acid) 2-3 lần/tuần
4. Kem trị mụn điểm (Benzoyl Peroxide hoặc Adapalene)
5. Kem dưỡng ẩm nhẹ

## Thành phần nên dùng

- **Salicylic Acid (BHA):** Tẩy tế bào chết, thông tắc lỗ chân lông
- **Niacinamide:** Kiểm soát dầu, giảm đỏ
- **Benzoyl Peroxide:** Diệt khuẩn mụn
- **Tea Tree Oil:** Kháng khuẩn nhẹ
- **Retinol:** Ngăn ngừa mụn dài hạn (dùng buổi tối)

## Thành phần cần tránh

- **Dầu khoáng (Mineral Oil)** — bít lỗ chân lông
- **Lanolin** — gây dị ứng với nhiều người da mụn
- **Cồn nồng độ cao** — kích ứng, làm da tiết dầu nhiều hơn

## Khi nào cần gặp bác sĩ da liễu?

Nếu sau 2-3 tháng tự chăm sóc không cải thiện, mụn viêm nặng, nang mụn lớn — hãy gặp bác sĩ da liễu để được kê đơn phù hợp.
    `
  },
  'trang-diem-tu-nhien': {
    icon: '✨', title: 'Trang điểm tự nhiên cho người mới', time: '6 phút đọc',
    content: `
## No-Makeup Makeup Look là gì?

Là phong cách trang điểm giúp bạn trông đẹp hơn phiên bản tự nhiên của mình mà không ai nhận ra bạn đang trang điểm. Đây là look hoàn hảo cho người mới bắt đầu.

## Sản phẩm cần chuẩn bị

- Kem chống nắng SPF 30+
- BB Cream hoặc Cushion nhẹ
- Kem che khuyết điểm (nếu cần)
- Phấn phủ bột mịn
- Má hồng màu nude/coral nhạt
- Mascara
- Son dưỡng màu hoặc son nude

## Các bước thực hiện

**Bước 1 — Skincare trước**
Rửa mặt và dưỡng ẩm trước khi trang điểm. Da được dưỡng ẩm tốt giúp lớp nền bám đẹp hơn nhiều.

**Bước 2 — Kem chống nắng**
Thoa đều, để khô 5 phút.

**Bước 3 — BB Cream hoặc Cushion**
Dùng ngón tay hoặc beauty blender thấm đều từ giữa mặt ra ngoài. Chỉ cần 1 lớp mỏng — mục tiêu là che đi khuyết điểm nhỏ, không phải che kín hoàn toàn.

**Bước 4 — Che khuyết điểm (nếu cần)**
Chấm nhẹ vào vùng quầng thâm mắt hoặc mụn, tán nhẹ bằng đầu ngón tay.

**Bước 5 — Phấn phủ**
Phủ nhẹ lên vùng chữ T (trán, mũi, cằm) để thơm da và giữ makeup lâu hơn.

**Bước 6 — Má hồng**
Mỉm cười, thoa nhẹ lên phần gò má. Chọn màu san hô hoặc hồng nhạt cho vẻ tươi tắn tự nhiên.

**Bước 7 — Mascara**
Nhìn xuống, đưa chổi từ gốc mi lên ngọn. 1-2 lớp là đủ. Không cần mascara dưới nếu muốn look thật tự nhiên.

**Bước 8 — Son dưỡng có màu hoặc son nude**
Chọn màu gần với môi tự nhiên của bạn hoặc nhạt hơn 1 tone.

## Tips quan trọng

- **Blend thật kỹ** — ranh giới sắc nét mới lộ là đang trang điểm
- **Ít hơn là nhiều hơn** — no-makeup look cần sản phẩm nhẹ, mỏng
- **Ánh sáng tự nhiên** là tốt nhất để kiểm tra makeup
    `
  },
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]
  if (!article) notFound()

  const paragraphs = article.content.trim().split('\n').filter(l => l.trim())

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/huong-dan" className="text-pink-600 text-sm hover:underline mb-4 block">← Quay lại Hướng Dẫn</Link>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="text-4xl mb-3">{article.icon}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h1>
        <p className="text-sm text-gray-400 mb-6">⏱ {article.time}</p>
        <hr className="mb-6" />

        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-3">
          {paragraphs.map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">{line.replace('## ', '')}</h2>
            if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-gray-800">{line.replace(/\*\*/g, '')}</p>
            if (line.startsWith('❌') || line.startsWith('✅') || line.startsWith('-') || line.startsWith('*')) {
              return <p key={i} className="pl-2 border-l-2 border-pink-200">{line}</p>
            }
            return <p key={i}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
          })}
        </div>
      </div>

      <div className="mt-6 bg-pink-50 rounded-2xl p-5 border border-pink-100 text-center">
        <p className="text-sm text-gray-600 mb-3">Tìm sản phẩm phù hợp tại Mỹ Phẩm Nha Trang 💄</p>
        <Link href="/san-pham" className="inline-block bg-pink-600 text-white px-6 py-2 rounded-xl font-semibold text-sm hover:bg-pink-700">
          Xem Sản Phẩm →
        </Link>
      </div>
    </div>
  )
}
