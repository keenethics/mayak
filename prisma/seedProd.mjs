import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const districts = ['Личаківський', 'Шевченківський', 'Франківський', 'Залізничний', 'Галицький', 'Сихівський'].map(
  name => ({ name }),
);

const specializations = ['Психолог', 'Психотерапевт', 'Психіатр', 'Сексолог', 'Соціальний працівник'].map(name => ({
  name,
}));

const organizationTypes = ['Психологічний центр', 'Соціальна служба', 'Лікарня'].map(name => ({ name }));

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

async function createIfNotExist(model, data, filter) {
  // eslint-disable-next-line no-restricted-syntax
  for (const it of data) {
    // eslint-disable-next-line no-await-in-loop
    await model.upsert({ where: filter(it), create: it, update: {} });
  }
}

async function main() {
  await createIfNotExist(prisma.therapy, therapies, therapy => ({ type: therapy.type }));
  await createIfNotExist(prisma.district, districts, district => ({ name: district.name }));
  await createIfNotExist(prisma.specialization, specializations, specialization => ({ name: specialization.name }));
  await createIfNotExist(prisma.organizationType, organizationTypes, organizationType => ({
    name: organizationType.name,
  }));
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
