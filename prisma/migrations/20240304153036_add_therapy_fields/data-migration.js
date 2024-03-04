import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async tx => {
    const therapies = await tx.therapy.findMany();
    // eslint-disable-next-line no-restricted-syntax
    for (const { id, name } of therapies) {
      // eslint-disable-next-line no-await-in-loop
      await tx.therapy.update({
        where: { id },
        data: {
          type: name,
        },
      });
    }
  });
}

main()
  .catch(async e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
