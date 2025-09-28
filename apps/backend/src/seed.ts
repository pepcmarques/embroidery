import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Embroidery Threads' },
      update: {},
      create: {
        name: 'Embroidery Threads',
        description:
          'Premium quality embroidery threads in various colors and materials',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Embroidery Hoops' },
      update: {},
      create: {
        name: 'Embroidery Hoops',
        description: 'High-quality hoops for all your embroidery projects',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Needles & Tools' },
      update: {},
      create: {
        name: 'Needles & Tools',
        description: 'Essential needles and tools for embroidery work',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Fabric & Canvas' },
      update: {},
      create: {
        name: 'Fabric & Canvas',
        description: 'Premium fabrics and canvases for embroidery',
      },
    }),
  ]);

  console.log('📁 Created categories:', categories.length);

  // Create products
  const products = await Promise.all([
    // Embroidery Threads
    prisma.product.create({
      data: {
        name: 'DMC Cotton Embroidery Floss - Set of 24',
        description:
          'Premium quality cotton embroidery floss in 24 popular colors. Perfect for all embroidery projects.',
        price: 29.99,
        stock: 50,
        categoryId: categories[0].id,
        imageUrl:
          'https://images.unsplash.com/photo-1558618047-3c8c76e24a0e?w=400&h=400&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Metallic Gold Thread Collection',
        description:
          'Luxurious metallic gold threads for adding sparkle to your embroidery work.',
        price: 19.99,
        stock: 30,
        categoryId: categories[0].id,
        imageUrl:
          'https://images.unsplash.com/photo-1492168732976-2676c584c675?w=400&h=400&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Rainbow Silk Thread Bundle',
        description:
          'Beautiful silk threads in rainbow colors. Smooth and lustrous finish.',
        price: 45.99,
        stock: 25,
        categoryId: categories[0].id,
        imageUrl:
          'https://images.unsplash.com/photo-1452827073306-6e6e661baf57?w=400&h=400&fit=crop',
      },
    }),

    // Embroidery Hoops
    prisma.product.create({
      data: {
        name: 'Bamboo Embroidery Hoop - 6 inch',
        description:
          'Eco-friendly bamboo embroidery hoop with smooth edges. Perfect for medium projects.',
        price: 12.99,
        stock: 75,
        categoryId: categories[1].id,
        imageUrl:
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Professional Wooden Hoop Set',
        description:
          'Set of 3 wooden hoops in different sizes (4", 6", 8"). Made from premium beechwood.',
        price: 34.99,
        stock: 40,
        categoryId: categories[1].id,
        imageUrl:
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      },
    }),

    // Needles & Tools
    prisma.product.create({
      data: {
        name: 'Embroidery Needle Assortment',
        description:
          'Complete set of embroidery needles in various sizes. Includes sharp and ballpoint needles.',
        price: 15.99,
        stock: 60,
        categoryId: categories[2].id,
        imageUrl:
          'https://images.unsplash.com/photo-1558618047-3c8c76e24a0e?w=400&h=400&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Embroidery Scissors - Gold Plated',
        description:
          'Sharp, precise embroidery scissors with gold plating. Perfect for detailed cutting work.',
        price: 22.99,
        stock: 35,
        categoryId: categories[2].id,
        imageUrl:
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Thread Organizer & Storage Box',
        description:
          'Keep your threads organized with this premium storage solution. Holds up to 100 spools.',
        price: 39.99,
        stock: 20,
        categoryId: categories[2].id,
        imageUrl:
          'https://images.unsplash.com/photo-1558618047-3c8c76e24a0e?w=400&h=400&fit=crop',
      },
    }),

    // Fabric & Canvas
    prisma.product.create({
      data: {
        name: 'Linen Embroidery Fabric - Natural',
        description:
          'High-quality linen fabric perfect for embroidery. 18-count weave, natural color.',
        price: 18.99,
        stock: 45,
        categoryId: categories[3].id,
        imageUrl:
          'https://images.unsplash.com/photo-1452827073306-6e6e661baf57?w=400&h=400&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Aida Cross Stitch Cloth - White 14ct',
        description:
          'Classic white Aida cloth with 14 count weave. Perfect for cross stitch and embroidery.',
        price: 14.99,
        stock: 55,
        categoryId: categories[3].id,
        imageUrl:
          'https://images.unsplash.com/photo-1558618047-3c8c76e24a0e?w=400&h=400&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Canvas Tote Bag - Set of 5',
        description:
          'Blank canvas tote bags perfect for embroidery projects. Set of 5 natural cotton bags.',
        price: 24.99,
        stock: 30,
        categoryId: categories[3].id,
        imageUrl:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      },
    }),
  ]);

  console.log('🧵 Created products:', products.length);

  // Create admin user
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@embroidery.com' },
    update: {},
    create: {
      email: 'admin@embroidery.com',
      name: 'Admin User',
      password: hashedPassword,
      is_admin: true,
    },
  });

  console.log('👤 Created admin user:', adminUser.email);

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
