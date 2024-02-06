const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { faker } = require("@faker-js/faker");

function getFullAddress() {
  const street = faker.location.streetAddress();
  const streetNumber = faker.number.int({ min: 1, max: 100 });
  const floor = faker.number.int({ min: 1, max: 100 });
  const room = faker.number.int({ min: 1, max: 100 });
  return `вул. ${street} ${streetNumber}, поверх ${floor}, кабінет ${room}`;
}

function valueOrNull(chance, callback) {
  return faker.number.int({ min: 0, max: chance }) ? callback() : null;
}

// returns array of unique objects with id field
function uniqueObjectsWithId(instances) {
  return faker.helpers
    .uniqueArray(
      instances.map((s) => s.id),
      faker.number.int({ min: 1, max: instances.length }),
    )
    .map((id) => ({ id }));
}

function randomAddress(districts) {
  const randomNameOfClinic = `Клініка ${faker.company.name()}`;
  const randomDistricts = faker.helpers.arrayElement(districts).id; // returns randowm object from districts array
  return {
    nameOfClinic: randomNameOfClinic,
    fullAddress: getFullAddress(),
    district: {
      connect: {
        id: randomDistricts,
      },
    },
  };
}

function randomPlaceOfWork(districts) {
  const randomAddresses = Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => randomAddress(districts),
  );
  return {
    addresses: {
      create: randomAddresses,
    },
  };
}

function randomSpecialist(districts, specializations, therapies) {
  const gender = faker.helpers.arrayElement(["FEMALE", "MALE"]);
  const randomPlacesOfWork = Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => randomPlaceOfWork(districts),
  );
  const phoneRegexp = "+380[0-9]{9}";
  return {
    specializations: {
      connect: uniqueObjectsWithId(specializations),
    },
    // take name of corresponding gender
    firstName: faker.person.firstName(gender.toLowerCase()),
    lastName: faker.person.lastName(),
    surname: valueOrNull(1, () => faker.person.lastName()),
    gender,
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    // take one of these
    formatOfWork: faker.helpers.arrayElement(["BOTH", "ONLINE", "OFFLINE"]),
    placesOfWork: {
      create: randomPlacesOfWork,
    },
    therapies: {
      connect: uniqueObjectsWithId(therapies),
    },
    isFreeReception: faker.datatype.boolean(),
    phone: valueOrNull(1, () => faker.helpers.fromRegExp(phoneRegexp)),
    email: valueOrNull(1, () => faker.internet.email()),
    website: valueOrNull(1, () => faker.internet.url()),
    description: faker.lorem.paragraph(),
  };
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
  await Promise.all(
    Array.from({ length: 10 }).map(
      // eslint-disable-next-line no-unused-vars
      (_) =>
        prisma.specialist.create({
          data: randomSpecialist(districts, specializations, therapies),
        }),
    ),
  );
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
