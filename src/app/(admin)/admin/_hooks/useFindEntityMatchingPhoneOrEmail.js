import { useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { z } from 'zod';
import { PHONE_REGEX } from '@/lib/consts';

export const useFindEntityMatchingPhoneOrEmail = ({ key, value }) => {
  const validationSchema = {
    phone: z
      .string()
      .trim()
      .refine(val => PHONE_REGEX.test(val)),
    email: z.string().trim().email(),
  };

  const { success } = validationSchema[key].safeParse(value);

  const filter = {
    [key]: value,
  };

  const { data: specialistData } = useGetList(
    RESOURCES.specialist,
    {
      filter,
    },
    { enabled: success },
  );

  const { data: organizationData } = useGetList(
    RESOURCES.organization,
    {
      filter,
    },
    { enabled: success },
  );

  const specialists = specialistData ?? [];
  const organizations = organizationData ?? [];

  const mappedOrganizations = organizations?.map(organization => ({
    ...organization,
    isOrganization: true,
  }));

  const data = specialists?.concat(mappedOrganizations);

  return {
    data: data ?? [],
    num: data?.length ?? 0,
  };
};
