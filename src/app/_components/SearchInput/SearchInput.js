'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ClearSearchIcon, DownTick, SearchIcon } from '@icons/index';
import { cn } from '@/utils/cn';

export function SearchInput() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const [query, setQuery] = useState(queryParam);
  return (
    <div className="flex w-full gap-4">
      <div className="flex grow rounded-full border-[1px] border-gray-600 bg-gray-100 px-6 py-3">
        <div>
          <div className="flex min-w-[200px] items-center gap-4 pr-4 after:h-[100%]">
            <p className="grow">Запит</p>
            <DownTick />
          </div>
          <ul className="hidden ">
            <li>items</li>
          </ul>
        </div>
        <div className="group flex grow items-center gap-2 before:mr-2 before:h-[100%] before:w-[1px] before:rounded-full before:bg-gray-500">
          <SearchIcon className={cn('group-focus-within:hidden', query && 'hidden')} />
          <input
            className="h-6 w-[1px] grow border-none bg-other-black/0 p-0 caret-primary-500 placeholder:text-p3 placeholder:text-gray-500 focus:ring-0"
            placeholder="Введіть запит"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <ClearSearchIcon className={cn('hidden', query && 'block')} onClick={() => setQuery('')} />
        </div>
      </div>
      <button className="rounded-full bg-primary-500 px-6 py-3 text-p3 font-bold text-other-white">Знайти</button>
    </div>
  );
}
