import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const therapies = [
    {
      isActive: true,
      type: 'individual',
      title: 'Індивідуальна',
      description: 'для тебе',
      imagePath: '/assets/images/therapy_individual.svg',
      priority: 6,
    },
    {
      isActive: true,
      type: 'kids',
      title: 'Для дітей і підлітків',
      description: 'для найрідніших',
      imagePath: '/assets/images/therapy_kids.svg',
      priority: 5,
    },
    {
      isActive: true,
      type: 'family',
      title: 'Сімейна',
      description: 'для всієї родини',
      imagePath: '/assets/images/therapy_family.svg',
      priority: 4,
    },
    {
      isActive: true,
      type: 'group',
      title: 'Групова',
      description: 'для людей з однаковими потребами',
      imagePath: '/assets/images/therapy_group.svg',
      priority: 3,
    },
    {
      isActive: true,
      type: 'pair',
      title: 'Для пар',
      description: 'для тебе і партнера',
      imagePath: '/assets/images/therapy_pair.svg',
      priority: 2,
    },
    {
      isActive: true,
      type: 'business',
      title: 'Для бізнесу',
      description: 'для співробітників',
      imagePath: '/assets/images/therapy_business.svg',
      priority: 1,
    },
  ];

  // do not create therapies that already exist to not break existing data
  const existingTherapies = await prisma.therapy.findMany();
  const therapiesToCreate = therapies.filter(
    therapy => !existingTherapies.find(existing => existing.type === therapy.type),
  );

  await prisma.therapy.createMany({
    data: therapiesToCreate,
  });
}

main().then(
  async () => {
    await prisma.$disconnect();
  },
  async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  },
);
