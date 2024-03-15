import { useGetList } from 'react-admin';
import { EMAIL, PHONE, RESOURCES } from '@admin/_lib/consts';
import { z } from 'zod';
import { PHONE_REGEX } from '@/lib/consts';

export const useFindEntityMatchingPhoneOrEmail = ({ key, value, idToExclude }) => {
  const validationSchema = {
    [PHONE]: z
      .string()
      .trim()
      .refine(val => PHONE_REGEX.test(val)),
    [EMAIL]: z.string().trim().email(),
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

  const data = specialists?.concat(mappedOrganizations).filter(entity => entity.id !== idToExclude) ?? [];

  const num = data.length;

  return {
    data,
    num,
  };
};
