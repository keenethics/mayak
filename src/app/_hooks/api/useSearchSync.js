import ky from 'ky';
import { useQuery } from '@tanstack/react-query';

export function useSearchSync(query, searchType) {
  const hookProps = useQuery({
    queryKey: [query, searchType],
    queryFn: () => {
      const baseQueryString = `searchSync=true&searchType=${searchType}&query=${query}`;
      return ky(`/api/search?${baseQueryString}`).json();
    },
  });
  return {
    ...hookProps,
    data: hookProps.data?.data,
  };
}
