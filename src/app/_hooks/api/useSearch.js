import ky from 'ky';
import { useQuery } from '@tanstack/react-query';

const specialistKey = 'specialist';

export function useListEntries(searchParams) {
  return useQuery({
    queryKey: [specialistKey, searchParams],
    queryFn: async () => ky(`/api/search`, { searchParams }).json(),
  });
}
