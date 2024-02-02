const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { faker } = require("@faker-js/faker");

function getFullAddress() {
  return `вул. ${faker.location.streetAddress()} ${faker.number.int({ min: 1, max: 100 })}, поверх ${faker.number.int({ min: 1, max: 100 })}, кабінет ${faker.number.int({ min: 1, max: 100 })}`;
}

function valueOrNull(chance, callback) {
  return faker.number.int({ min: 0, max: chance }) ? callback() : null;
}

function randomAddress(districts) {
  return {
    nameOfClinic: `Клініка ${faker.company.name()}`,
    fullAddress: getFullAddress(),
    district: {
      connect: {
        id: faker.helpers.arrayElement(districts).id,
      },
    },
  };
}

function randomPlaceOfWork(districts) {
  return {
    addresses: {
      create: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
        randomAddress(districts),
      ),
    },
  };
}

function randomSpecialist(districts, specializations, therapies) {
  const gender = faker.helpers.arrayElement(["FEMALE", "MALE"]);
  return {
    specializations: {
      connect: uniqueObjectsWithId(specializations),
    },
    firstName: faker.person.firstName(gender.toLowerCase()),
    lastName: faker.person.lastName(),
    surname: valueOrNull(1, () => faker.person.lastName()),
    gender,
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    formatOfWork: faker.helpers.arrayElement(["BOTH", "ONLINE", "OFFLINE"]),
    placesOfWork: {
      create: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
        randomPlaceOfWork(districts),
      ),
    },
    therapies: {
      connect: uniqueObjectsWithId(therapies),
    },
    isFreeReception: faker.datatype.boolean(),
    phone: valueOrNull(1, () => faker.helpers.fromRegExp("+380[0-9]{9}")),
    email: valueOrNull(1, () => faker.internet.email()),
    website: valueOrNull(1, () => faker.internet.url()),
    description: faker.lorem.paragraph(),
  };
}

function uniqueObjectsWithId(instances) {
  return faker.helpers
    .uniqueArray(
      instances.map((s) => s.id),
      faker.number.int({ min: 1, max: instances.length - 1 }),
    )
    .map((id) => ({ id }));
}

async function main() {
  // Clear the database to make sure we can run seed
  await prisma.$transaction([
    prisma.address.deleteMany(),
    prisma.specialist.deleteMany(),
    prisma.placeOfWork.deleteMany(),
    prisma.specialization.deleteMany(),
    prisma.district.deleteMany(),
    prisma.therapy.deleteMany(),
  ]);

  const districtNames = [
    "Личаківський",
    "Шевченківський",
    "Франківський",
    "Залізничний",
    "Галицький",
    "Сихівський",
  ];
  const specializationNames = [
    "Психологічний консультант",
    "Психотерапевт",
    "Психіатр",
    "Сексолог",
    "Соціальний працівник",
  ];
  const therapyNames = [
    "Індивідуальна",
    "Для дітей і підлітків",
    "Сімейна",
    "Групова",
    "Для пар",
    "Для бізнесу",
  ];

  await prisma.district.createMany({
    data: districtNames.map((name) => ({ name })),
  });

  await prisma.specialization.createMany({
    data: specializationNames.map((name) => ({ name })),
  });

  await prisma.therapy.createMany({
    data: therapyNames.map((name) => ({ name })),
  });

  const therapies = await prisma.therapy.findMany({ select: { id: true } });
  const specializations = await prisma.specialization.findMany({
    select: { id: true },
  });
  const districts = await prisma.district.findMany({ select: { id: true } });

  // createMany does not support records with relations
  for (let i = 0; i < 10; i++) {
    await prisma.specialist.create({
      data: randomSpecialist(districts, specializations, therapies),
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
