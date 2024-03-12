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
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="flex grow flex-col gap-4 rounded-full lg:flex-row lg:gap-0 lg:border-[1px] lg:border-gray-600 lg:bg-gray-100 lg:px-6 lg:py-3">
        <div className="rounded-full border-[1px] border-gray-600 bg-gray-200 py-3 pl-6 lg:border-0 lg:bg-other-white/0 lg:p-0">
          <div className="relative flex min-w-[200px] items-center gap-4 pr-6">
            <p className="grow text-center lg:text-left">Запит</p>
            <DownTick className="absolute right-4 top-0" />
          </div>
          <ul className="hidden ">
            <li>items</li>
          </ul>
        </div>
        <div className="group flex grow items-center gap-2 rounded-full border-[1px] border-gray-600 px-6 py-3 before:mr-2 before:hidden before:h-[100%] before:w-[1px] before:rounded-full before:bg-gray-500 lg:border-0 lg:bg-other-white/0 lg:p-0 lg:before:block">
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
