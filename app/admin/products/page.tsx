'use client'
import { useState, useEffect } from 'react'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const ORIGINS = ['Hàn Quốc', 'Nhật Bản', 'Thái Lan', 'Pháp', 'Mỹ', 'Anh', 'Việt Nam']
const EMPTY_FORM = { name: '', price: '', oldPrice: '', imageUrl: '', categoryId: '', description: '', featured: false, origin: '', inStock: true }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<any>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([p, c]) => { setProducts(p); setCategories(c); setLoading(false) })
  }, [])

  const openAdd = () => { setEditingId(null); setForm(EMPTY_FORM); setShowForm(true) }
  const openEdit = (p: any) => {
    setEditingId(p.id)
    setForm({ name: p.name, price: String(p.price), oldPrice: p.oldPrice ? String(p.oldPrice) : '', imageUrl: p.imageUrl || '', categoryId: String(p.categoryId), description: p.description || '', featured: p.featured, origin: p.origin || '', inStock: p.inStock })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const url = editingId ? `/api/admin/products/${editingId}` : '/api/admin/products'
    const method = editingId ? 'PUT' : 'POST'
    const r = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const p = await r.json()
    if (editingId) setProducts(prev => prev.map(x => x.id === editingId ? p : x))
    else setProducts(prev => [p, ...prev])
    setShowForm(false); setEditingId(null); setForm(EMPTY_FORM); setSaving(false)
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Xóa sản phẩm "${name}"?`)) return
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  if (loading) return <div className="text-center py-20">⏳ Đang tải...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-gray-800">📦 Quản Lý Sản Phẩm ({products.length})</h1>
        <button onClick={showForm ? () => { setShowForm(false); setEditingId(null) } : openAdd}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${showForm ? 'bg-gray-200 text-gray-700' : 'bg-pink-600 text-white hover:bg-pink-700'}`}>
          {showForm ? '✕ Đóng' : '+ Thêm sản phẩm'}
        </button>
      </div>

      {/* Form thêm/sửa */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">{editingId ? '✏️ Chỉnh sửa sản phẩm' : '➕ Thêm sản phẩm mới'}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Tên sản phẩm *</label>
              <input required value={form.name} onChange={e => setForm((p: any) => ({ ...p, name: e.target.value }))}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" placeholder="Tên sản phẩm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Giá bán *</label>
              <input required type="number" value={form.price} onChange={e => setForm((p: any) => ({ ...p, price: e.target.value }))}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" placeholder="150000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Giá gốc (để hiện giảm giá)</label>
              <input type="number" value={form.oldPrice} onChange={e => setForm((p: any) => ({ ...p, oldPrice: e.target.value }))}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" placeholder="Không bắt buộc" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Danh mục *</label>
              <select required value={form.categoryId} onChange={e => setForm((p: any) => ({ ...p, categoryId: e.target.value }))}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400">
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Xuất xứ</label>
              <select value={form.origin} onChange={e => setForm((p: any) => ({ ...p, origin: e.target.value }))}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400">
                <option value="">-- Chọn xuất xứ --</option>
                {ORIGINS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">URL ảnh sản phẩm</label>
              <input value={form.imageUrl} onChange={e => setForm((p: any) => ({ ...p, imageUrl: e.target.value }))}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400" placeholder="https://..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Mô tả</label>
              <textarea value={form.description} onChange={e => setForm((p: any) => ({ ...p, description: e.target.value }))}
                rows={3} className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-400 resize-none" />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm((p: any) => ({ ...p, featured: e.target.checked }))} className="accent-pink-600 w-4 h-4" />
                <span className="text-sm font-medium">⭐ Nổi bật</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.inStock} onChange={e => setForm((p: any) => ({ ...p, inStock: e.target.checked }))} className="accent-green-500 w-4 h-4" />
                <span className="text-sm font-medium">✅ Còn hàng</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={saving}
              className="bg-pink-600 text-white px-6 py-2 rounded-xl font-semibold text-sm hover:bg-pink-700 disabled:opacity-60">
              {saving ? '⏳ Đang lưu...' : editingId ? '✓ Cập nhật' : '✓ Thêm mới'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm(EMPTY_FORM) }}
              className="px-6 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50">Hủy</button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Tìm sản phẩm..."
          className="w-full sm:w-72 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-pink-400" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Sản phẩm', 'Danh mục', 'Xuất xứ', 'Giá', 'Tình trạng', 'Thao tác'].map(h =>
                  <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p: any) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="relative w-9 h-9 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {p.imageUrl
                          ? <Image src={p.imageUrl} alt={p.name} fill className="object-cover" unoptimized />
                          : <div className="absolute inset-0 flex items-center justify-center text-sm">💄</div>}
                      </div>
                      <div>
                        <p className="line-clamp-1 max-w-[180px] font-medium">{p.name}</p>
                        {p.featured && <span className="text-xs text-yellow-500">⭐ Nổi bật</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.category?.name}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.origin || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-medium text-pink-600">{formatPrice(p.price)}</span>
                    {p.oldPrice && <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(p.oldPrice)}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {p.inStock ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)}
                        className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg font-medium transition-colors">
                        ✏️ Sửa
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)}
                        className="text-xs bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1 rounded-lg font-medium transition-colors">
                        🗑️ Xóa
                      </button>
                      <Link href={`/san-pham/${p.slug}`} target="_blank"
                        className="text-xs bg-gray-50 text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-lg font-medium transition-colors">
                        👁️
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">Không tìm thấy sản phẩm</div>
          )}
        </div>
      </div>
    </div>
  )
}
