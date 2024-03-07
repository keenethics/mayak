import { useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';

export const useFindMatchingEntities = ({ key, value }) => {
  const { data: specialistData } = useGetList(RESOURCES.specialist);
  const { data: organizationData } = useGetList(RESOURCES.organization);

  const allEntities = specialistData?.concat(organizationData);

  const data = allEntities?.filter(entity => entity[key] === value);

  return {
    data,
    num: data?.length,
  };
};
