/**
 * Seed dữ liệu mẫu.
 *
 * Chạy: npm run db:seed
 *
 * Lưu ý: mật khẩu ở đây là placeholder. Khi module auth hoàn thiện,
 * thay bằng hash thật (argon2/bcrypt) — hiện tại đăng nhập chưa được nối.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@bepnhaminh.app' },
    update: {},
    create: {
      email: 'demo@bepnhaminh.app',
      passwordHash: 'PLACEHOLDER_CHUA_PHAI_HASH_THAT',
      displayName: 'Mẹ Bắp',
    },
  });

  const family = await prisma.family.upsert({
    where: { inviteCode: 'BEPNHA01' },
    update: {},
    create: {
      name: 'Bếp Nhà Mình',
      inviteCode: 'BEPNHA01',
      ownerId: user.id,
    },
  });

  await prisma.familyMember.upsert({
    where: { userId_familyId: { userId: user.id, familyId: family.id } },
    update: {},
    create: { userId: user.id, familyId: family.id, role: 'OWNER' },
  });

  const recipe = await prisma.recipe.create({
    data: {
      familyId: family.id,
      createdById: user.id,
      title: 'Canh chua cá lóc',
      description: 'Món canh chua miền Nam, chua từ me, ngọt từ cá.',
      servings: 4,
      prepMinutes: 15,
      cookMinutes: 25,
      steps: [
        'Cá lóc làm sạch, cắt khúc, ướp chút muối.',
        'Nấu nước me, lọc lấy nước chua.',
        'Cho cá vào nấu chín, thêm cà chua, dọc mùng.',
        'Nêm nếm, thêm rau thơm và ngò gai trước khi tắt bếp.',
      ],
      tags: ['canh', 'miền Nam'],
      ingredients: {
        create: [
          { name: 'Cá lóc', quantity: 1, unit: 'kg', position: 0 },
          { name: 'Me chua', quantity: 50, unit: 'g', position: 1 },
          { name: 'Cà chua', quantity: 3, unit: 'piece', position: 2 },
          { name: 'Dọc mùng', quantity: 1, unit: 'bunch', position: 3 },
        ],
      },
    },
  });

  console.log(`Đã tạo: user ${user.email}, gia đình "${family.name}", công thức "${recipe.title}"`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
