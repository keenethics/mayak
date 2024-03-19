import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function useEventSetParam(param) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const newParams = new URLSearchParams(searchParams);

  const addParam = value => {
    if (searchParams.get(param) && param.month === 'month') {
      newParams.delete(param);
    }
    newParams.append(param, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };
  const deleteParam = value => {
    if (value) {
      newParams.delete(param, value);
    } else {
      newParams.delete(param);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };
  return { addParam, deleteParam };
}
