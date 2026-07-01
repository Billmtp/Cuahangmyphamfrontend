import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { categories, sampleProducts } from '../lib/seed-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  // Categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  // Products
  for (const p of sampleProducts) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } })
    if (!category) continue
    const { categorySlug, ...productData } = p
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: { ...productData, categoryId: category.id },
    })
  }

  // Admin user
  const hashed = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@myphamnhatrang.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@myphamnhatrang.com',
      password: hashed,
      role: 'ADMIN',
    },
  })

  console.log('Seeding done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
