import { useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';

export const useFindMatchingEntities = ({ key, value }) => {
  const { data: specialistData } = useGetList(RESOURCES.specialist);
  const { data: organizationData } = useGetList(RESOURCES.organization);

  const mappedOrganizationData = organizationData?.map(organization => ({
    ...organization,
    isOrganization: true,
  }));

  const allEntities = specialistData?.concat(mappedOrganizationData);

  const data = allEntities?.filter(entity => entity[key] === value);

  return {
    data,
    num: data?.length,
  };
};
