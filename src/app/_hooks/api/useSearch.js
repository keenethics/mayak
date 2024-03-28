import ky from 'ky';
import { useInfiniteQuery } from '@tanstack/react-query';

const listEntries = searchParams => ky('/api/search', { searchParams }).json();

export const usePaginatedEntries = searchParams =>
  useInfiniteQuery({
    queryFn: ({ pageParam = '' }) => {
      const params = Array.from(searchParams.entries())
        .map(([key, value]) => ({ [key]: value }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), { lastCursor: pageParam });
      return listEntries(params);
    },
    getNextPageParam: lastPage => lastPage?.metaData.lastCursor,
  });
