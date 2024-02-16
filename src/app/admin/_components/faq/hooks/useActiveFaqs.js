import { useGetList } from 'react-admin';

export const useActiveFaqs = ({ page, perPage } = { page: 1, perPage: 50 }) => {
  const {
    data: faqs,
    isLoading,
    error,
  } = useGetList('faq', {
    pagination: { page, perPage },
  });

  if (isLoading || error) {
    return null;
  }

  const sorted = faqs.map(({ id, isActive }) => ({ id, isActive })).sort(a => a.isActive);
  const filtered = sorted.filter(({ isActive }) => isActive);
  return { total: filtered.length, data: filtered };
};
