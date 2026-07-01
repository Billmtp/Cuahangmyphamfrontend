# Mỹ Phẩm Nha Trang - Web App

Clone website myphamnhatrang.net, xây dựng bằng Next.js 15 + Tailwind CSS + Prisma + PostgreSQL.

---

## 🚀 Hướng dẫn Deploy (chạy ngay sau khi giải nén)

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Cấu hình database
Mở file `.env.local` và điền thông tin:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"
JWT_SECRET="chuoi-bi-mat-cua-ban-doi-thanh-bat-ky-chuoi-nao"
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
```

### Bước 3: Tạo bảng trong database
```bash
npx prisma generate
npx prisma db push
```

### Bước 4: Seed dữ liệu mẫu (tùy chọn)
```bash
npx prisma db seed
```
> Tạo 21 danh mục + 12 sản phẩm mẫu + 1 tài khoản admin

**Tài khoản Admin mặc định:**
- Email: `admin@myphamnhatrang.com`
- Password: `admin123`

### Bước 5: Build và chạy
```bash
npm run build
npm start
# Hoặc dùng PM2:
pm2 start npm --name "mypham" -- start
```

---

## 🛠️ Chạy local (development)
```bash
npm run dev
# Mở http://localhost:3000
```

---

## 📁 Cấu trúc dự án
```
app/
  page.tsx              ← Trang chủ
  san-pham/             ← Danh sách + chi tiết sản phẩm
  gio-hang/             ← Giỏ hàng
  dat-hang/             ← Đặt hàng
  don-hang/             ← Lịch sử đơn hàng
  dang-nhap/            ← Đăng nhập / Đăng ký
  admin/                ← Quản trị (Dashboard, Sản phẩm, Đơn hàng)
  api/                  ← REST API routes
lib/
  prisma.ts             ← Prisma client singleton
  auth.ts               ← JWT authentication
  utils.ts              ← Format price, slugify
context/
  CartContext.tsx        ← Giỏ hàng (localStorage)
  AuthContext.tsx        ← Xác thực người dùng
components/
  Header.tsx            ← Header responsive + mobile menu
  Footer.tsx            ← Footer
  ProductCard.tsx       ← Card sản phẩm
  CategorySidebar.tsx   ← Sidebar danh mục
  PriceAdjust.tsx       ← Bảng điều chỉnh giá
prisma/
  schema.prisma         ← Database schema
  seed.ts               ← Seed data
```

---

## 🌐 Deploy lên Vercel (dễ nhất)
1. Push code lên GitHub
2. Import vào Vercel
3. Add Environment Variables (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_BASE_URL`)
4. Deploy tự động

## 🐳 Deploy với Docker
```dockerfile
# Dùng Node 20 Alpine, build với npm run build, run npm start
```

---

## 💡 Lưu ý
- Database: PostgreSQL (khuyến nghị Supabase, Neon, Railway - free tier)
- Node.js: >= 18
- Ảnh sản phẩm: URL từ internet (không upload file)
