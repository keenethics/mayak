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
  const existing = await model.findMany();
  const filteredToCreate = filter(existing, data);
  await model.createMany({ data: filteredToCreate });
}

async function main() {
  // do not create therapies that already exist to not break existing data
  await createIfNotExist(prisma.therapy, therapies, (existings, actuals) =>
    actuals.filter(actual => !existings.some(existing => existing.type === actual.type)),
  );

  // do not create districts that already exist to not break existing data
  await createIfNotExist(prisma.district, districts, (existings, actuals) =>
    actuals.filter(actual => !existings.some(existing => existing.name === actual.name)),
  );

  // do not create specializations that already exist to not break existing data
  await createIfNotExist(prisma.specialization, specializations, (existings, actuals) =>
    actuals.filter(actual => !existings.some(existing => existing.name === actual.name)),
  );

  // do not create org types that already exist to not break existing data
  await createIfNotExist(prisma.organizationType, organizationTypes, (existings, actuals) =>
    actuals.filter(actual => !existings.some(existing => existing.name === actual.name)),
  );
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
