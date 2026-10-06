import { PrismaClient } from '@prisma/client';
import { MOCK_CAFES, INITIAL_USER } from '../src/data/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Seed Initial User
  const user = await prisma.user.upsert({
    where: { handle: INITIAL_USER.handle },
    update: {},
    create: {
      name: INITIAL_USER.name,
      handle: INITIAL_USER.handle,
      avatar: INITIAL_USER.avatar,
      level: INITIAL_USER.level,
      levelTitle: INITIAL_USER.levelTitle,
      cafesVisited: INITIAL_USER.cafesVisited,
      roasterStamps: INITIAL_USER.roasterStamps,
      perkPoints: INITIAL_USER.perkPoints,
      reviewsLogged: INITIAL_USER.reviewsLogged,
    },
  });
  console.log(`👤 Seeded user: ${user.name}`);

  // 2. Seed Cafes and Menus
  for (const c of MOCK_CAFES) {
    const cafe = await prisma.cafe.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        name: c.name,
        verified: c.verified,
        address: c.address,
        neighborhood: c.neighborhood,
        distance: c.distance,
        priceRange: c.priceRange,
        hours: c.hours,
        isOpen: c.isOpen,
        rating: c.rating,
        reviewCount: c.reviewCount,
        images: JSON.stringify(c.images),
        features: JSON.stringify(c.features),
        lat: c.lat,
        lng: c.lng,
        wifiSpeed: c.keySpecs.wifiSpeed,
        wifiLabel: c.keySpecs.wifiLabel,
        noiseDb: c.keySpecs.noiseDb,
        noiseLabel: c.keySpecs.noiseLabel,
        aspectCoffee: c.aspectRatings.coffee,
        aspectVibe: c.aspectRatings.vibe,
        aspectPlugs: c.aspectRatings.plugs,
        aspectService: c.aspectRatings.service,
        menu: {
          create: c.menu.map((m) => ({
            name: m.name,
            category: m.category,
            badge: m.badge || null,
            badgeType: m.badgeType || null,
            description: m.description,
            price: m.price,
            tastingNotes: JSON.stringify(m.tastingNotes || []),
          })),
        },
      },
    });
    console.log(`☕ Seeded cafe: ${cafe.name} (${c.menu.length} menu items)`);
  }

  // 3. Seed initial stamps for user
  const initialStamps = ['tanamera', 'giyanti'];
  for (const cafeId of initialStamps) {
    const cafe = await prisma.cafe.findUnique({ where: { id: cafeId } });
    if (cafe) {
      await prisma.stamp.create({
        data: {
          userId: user.id,
          cafeId: cafe.id,
          cafeName: cafe.name,
        },
      });
    }
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
