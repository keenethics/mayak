import ky from 'ky';
import { useQuery } from '@tanstack/react-query';

const districtKey = 'district';

async function listDistricts() {
  return ky('/api/district').json();
}

export function useListDistrict() {
  return useQuery({
    queryKey: [districtKey],
    queryFn: listDistricts,
  });
}
