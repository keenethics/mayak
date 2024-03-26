import { PrismaClient } from '@prisma/client';
import {
  districts,
  organizationTypes,
  psychologyMethods,
  psychotherapyMethods,
  specializations,
  therapies,
} from './data.mjs';

const prisma = new PrismaClient();

specializations.push(
  {
    name: 'Психолог',
    methods: {
      connectOrCreate: psychologyMethods.map(method => {
        const { title, description } = method;
        return {
          where: { title },
          create: { title, description },
        };
      }),
    },
  },
  {
    name: 'Психотерапевт',
    methods: {
      connectOrCreate: psychotherapyMethods.map(method => {
        const { title, description } = method;
        return {
          where: { title },
          create: { title, description },
        };
      }),
    },
  },
);

async function translateTherapies(therapiesToTranslate) {
  const tranlated = [];
  for (let i = 0; i < therapiesToTranslate.length; i += 1) {
    const therapy = therapiesToTranslate[i];

    const requestsToConnect = therapy.requests.map(requestName => ({ name: requestName }));
    // eslint-disable-next-line no-await-in-loop
    await prisma.request.createMany({
      data: requestsToConnect,
      skipDuplicates: true,
    });

    tranlated.push({ ...therapy, requests: { connect: requestsToConnect } });
  }

  return tranlated;
}

async function createIfNotExist(model, data, filter) {
  // eslint-disable-next-line no-restricted-syntax
  for (const it of data) {
    // eslint-disable-next-line no-await-in-loop
    await model.upsert({ where: filter(it), create: it, update: {} });
  }
}

async function main() {
  const translatedTherapies = await translateTherapies(therapies);
  await createIfNotExist(prisma.therapy, translatedTherapies, therapy => ({ type: therapy.type }));
  await createIfNotExist(prisma.district, districts, district => ({ name: district.name }));
  await createIfNotExist(prisma.specialization, specializations, specialization => ({ name: specialization.name }));
  await createIfNotExist(prisma.organizationType, organizationTypes, organizationType => ({
    name: organizationType.name,
  }));
  await createIfNotExist(
    prisma.method,
    psychotherapyMethods
      .map(method => ({ ...method, specialization: { connect: { name: 'Психотерапевт' } } }))
      .concat(psychologyMethods.map(method => ({ ...method, specialization: { connect: { name: 'Психолог' } } }))),
    method => ({ title: method.title }),
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
