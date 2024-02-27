import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

function getFullAddress() {
  const street = faker.location.streetAddress();
  const streetNumber = faker.number.int({ min: 1, max: 100 });
  const floor = faker.number.int({ min: 1, max: 100 });
  const room = faker.number.int({ min: 1, max: 100 });
  return `вул. ${street} ${streetNumber}, поверх ${floor}, кабінет ${room}`;
}

function nullable(value) {
  return Date.now() % 2 === 0 ? value : null;
}

// returns array of unique objects with id field
function uniqueObjectsWithId(instances) {
  return faker.helpers
    .uniqueArray(
      instances.map(s => s.id),
      faker.number.int({ min: 1, max: instances.length }),
    )
    .map(id => ({ id }));
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
  const randomAddresses = Array(faker.number.int({ min: 1, max: 3 }))
    .fill('')
    .map(() => randomAddress(districts));
  return {
    addresses: {
      create: randomAddresses,
    },
  };
}

function randomSpecialist({ districts, specializations, therapies }) {
  const gender = faker.helpers.arrayElement(['FEMALE', 'MALE']);
  const randomPlacesOfWork = Array(faker.number.int({ min: 1, max: 3 }))
    .fill('')
    .map(() => randomPlaceOfWork(districts));

  const phoneRegexp = '+380[0-9]{9}';
  return {
    specializations: {
      connect: uniqueObjectsWithId(specializations),
    },
    // take name of corresponding gender
    firstName: faker.person.firstName(gender.toLowerCase()),
    lastName: faker.person.lastName(),
    surname: nullable(faker.person.lastName()),
    gender,
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    // take one of these
    formatOfWork: faker.helpers.arrayElement(['BOTH', 'ONLINE', 'OFFLINE']),
    placesOfWork: {
      create: randomPlacesOfWork,
    },
    therapies: {
      connect: uniqueObjectsWithId(therapies),
    },
    isFreeReception: faker.datatype.boolean(),
    phone: nullable(faker.helpers.fromRegExp(phoneRegexp)),
    email: nullable(faker.internet.email()),
    website: nullable(faker.internet.url()),
    description: faker.lorem.paragraph(),
    instagram: nullable(faker.internet.url()),
    facebook: nullable(faker.internet.url()),
    tiktok: nullable(faker.internet.url()),
  };
}

function randomEvent({ tags, link }) {
  const priceType = faker.helpers.arrayElement(['FREE', 'FIXED_PRICE', 'MIN_PRICE']);
  const format = faker.helpers.arrayElement(['ONLINE', 'OFFLINE']);
  let address;
  let price;
  let locationLink;
  if (format === 'OFFLINE') {
    address = getFullAddress();
    locationLink = faker.helpers.arrayElement([
      'https://maps.app.goo.gl/3YXkdzJnoLwHsXNb7',
      'https://maps.app.goo.gl/coSnsiqkAmGuMgvY9',
      'https://maps.app.goo.gl/AuuirMDJobE7WWKN6',
    ]);
  }
  if (priceType !== 'FREE') {
    price = faker.number.int({ min: 1000, max: 5000 });
  }
  return {
    title: faker.word.noun(),
    organizerName: faker.company.name(),
    address,
    locationLink,
    priceType,
    price,
    format,
    eventDate: faker.date.future(),
    isActive: faker.datatype.boolean(),
    additionalLink: {
      connect: link,
    },
    tags: {
      connect: uniqueObjectsWithId(tags),
    },
  };
}

const prisma = new PrismaClient();

async function main() {
  // Clear the database to make sure we can run seed
  await prisma.$transaction(async trx => {
    await trx.address.deleteMany();
    await trx.specialist.deleteMany();
    await trx.placeOfWork.deleteMany();
    await trx.specialization.deleteMany();
    await trx.district.deleteMany();
    await trx.therapy.deleteMany();
    await trx.event.deleteMany();
    await trx.eventLink.deleteMany();
    await trx.eventTag.deleteMany();
    await trx.faq.deleteMany();
  });

  const districtNames = ['Личаківський', 'Шевченківський', 'Франківський', 'Залізничний', 'Галицький', 'Сихівський'];
  const specializationNames = [
    'Психологічний консультант',
    'Психотерапевт',
    'Психіатр',
    'Сексолог',
    'Соціальний працівник',
  ];
  const therapyNames = ['Індивідуальна', 'Для дітей і підлітків', 'Сімейна', 'Групова', 'Для пар', 'Для бізнесу'];
  const faqs = Array.from({ length: 5 }).map(() => ({
    isActive: true,
    question: faker.lorem.sentence(),
    answer: faker.lorem.paragraph(),
  }));

  await prisma.district.createMany({
    data: districtNames.map(name => ({ name })),
  });

  await prisma.specialization.createMany({
    data: specializationNames.map(name => ({ name })),
  });

  await prisma.therapy.createMany({
    data: therapyNames.map(name => ({ name })),
  });

  const eventTags = ['EventTag1', 'EventTag2', 'EventTag3'];

  const eventLink = { label: 'Some site', link: 'https://keenethics.com/' };

  await prisma.eventTag.createMany({
    data: eventTags.map(name => ({ name })),
  });

  await prisma.eventLink.create({ data: eventLink });

  await prisma.faq.createMany({
    data: faqs,
  });

  const therapies = await prisma.therapy.findMany({ select: { id: true } });
  const specializations = await prisma.specialization.findMany({
    select: { id: true },
  });
  const districts = await prisma.district.findMany({ select: { id: true } });

  const tags = await prisma.eventTag.findMany({ select: { id: true } });
  const link = await prisma.eventLink.findFirst({ select: { id: true } });

  // createMany does not support records with relations
  for (let i = 0; i < 10; i += 1) {
    // for instead of Promise.all to avoid overloading the database pool
    // eslint-disable-next-line no-await-in-loop
    await prisma.specialist.create({
      data: randomSpecialist({ districts, specializations, therapies }),
    });
  }
  for (let i = 0; i < 10; i += 1) {
    // for instead of Promise.all to avoid overloading the database pool
    // eslint-disable-next-line no-await-in-loop
    await prisma.event.create({
      data: randomEvent({ tags, link }),
    });
  }
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
