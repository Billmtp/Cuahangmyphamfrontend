import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mỹ Phẩm Nha Trang - Mỹ phẩm nhập khẩu chính hãng',
  description: 'Chuyên cung cấp mỹ phẩm nhập khẩu chính hãng từ Hàn Quốc, Thái Lan, Nhật Bản, Anh, Pháp, Mỹ tại Nha Trang',
  keywords: 'mỹ phẩm, nha trang, hàn quốc, nhật bản, chính hãng',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
