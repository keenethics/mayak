import { useGetList } from 'react-admin';

export const useActiveFaqs = ({ page, perPage } = { page: 1, perPage: 50 }) => {
  const {
    data: faqs = [],
    isLoading,
    error,
  } = useGetList('faq', {
    pagination: { page, perPage },
  });
  if (isLoading || error) {
    return { total: 0, data: [], isLoading, error };
  }

  const filtered = faqs.filter(({ isActive }) => isActive).map(({ id, isActive }) => ({ id, isActive }));
  return { total: filtered.length, data: filtered };
};
