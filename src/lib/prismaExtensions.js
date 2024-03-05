import { getSpecialistFullName } from '@/utils/getSpecialistFullName.mjs';

export function specialistQueryExtension(prisma) {
  return {
    async create({ args }) {
      const searchEntry = await prisma.searchEntry.create({
        data: {
          sortString: getSpecialistFullName(args.data),
          specialist: {
            create: args.data,
          },
        },
        select: {
          specialist: {},
        },
      });
      return searchEntry.specialist;
    },
  };
}

export function organizationQueryExtension(prisma) {
  return {
    async create({ args }) {
      const searchEntry = await prisma.searchEntry.create({
        data: {
          sortString: args.data.name,
          organization: {
            create: args.data,
          },
        },
        select: {
          organization: {},
        },
      });
      return searchEntry.organization;
    },
  };
}
