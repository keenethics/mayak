import { useRouter, useSearchParams } from 'next/navigation';

export function useSetParam(param) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newParams = new URLSearchParams(searchParams);
  const addParam = value => {
    if (searchParams.get(param) && param !== 'district') {
      newParams.delete(param);
    }
    newParams.append(param, value);
    router.push(`?${newParams.toString()}`);
  };
  const deleteParam = value => {
    if (value) {
      newParams.delete(param, value);
    } else {
      newParams.delete(param);
    }
    router.push(`?${newParams.toString()}`);
  };
  return { addParam, deleteParam };
}
