'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ClearSearchIcon, DownTick, SearchIcon } from '@icons/index';
import { cn } from '@/utils/cn';
import { getSearchTypeConfig, searchInputTypeConfigs } from './config';

export function SearchInput() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const searchTypeParam = searchParams.get('searchType');
  const [query, setQuery] = useState(queryParam);
  const [searchType, setSearchType] = useState(searchTypeParam);
  const currConfig = getSearchTypeConfig(searchType);

  const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
  function toggleSelectTypeOpen(e) {
    e.stopPropagation();
    setIsSelectTypeOpen(state => !state);
  }

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="flex grow flex-col gap-4 rounded-full lg:flex-row lg:gap-0 lg:border-[1px] lg:border-gray-600 lg:bg-gray-100 lg:px-6 lg:py-3">
        <div
          className={cn(
            'relative rounded-full border-[1px] border-gray-600 bg-gray-200 py-3 pl-6 lg:border-0 lg:bg-other-white/0 lg:p-0',
            isSelectTypeOpen && 'bg-gray-100',
          )}
          onClick={toggleSelectTypeOpen}
        >
          <div className="relative flex min-w-[200px] items-center gap-4 pr-6">
            <p className="grow text-center lg:text-left">{currConfig.title}</p>
            <button className='top-0" absolute right-4'>
              <DownTick />
            </button>
          </div>
          <ul
            className={cn(
              'shadow-[1px_2px_4px_0px_rgba(192,191,206,0.50),0px_0px_8px_0px_rgba(192,191,206,0.50)]',
              'absolute left-0 top-[58px] z-[1] hidden w-full flex-col rounded-[24px] bg-other-white p-1 text-gray-700 lg:left-[-24px] lg:w-[300px]',
              isSelectTypeOpen && 'flex',
            )}
          >
            {searchInputTypeConfigs.map(config => (
              <li
                className="rounded-full p-2 pl-8 hover:bg-gray-200 hover:font-bold hover:text-primary-800"
                key={config.id}
                onClick={e => {
                  setSearchType(config.searchType);
                  toggleSelectTypeOpen(e);
                }}
              >
                {config.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="group flex grow items-center gap-2 rounded-full border-[1px] border-gray-600 px-4 py-3 before:mr-2 before:hidden before:h-[100%] before:w-[1px] before:rounded-full before:bg-gray-500 lg:border-0 lg:bg-other-white/0 lg:p-0  lg:before:block">
          <SearchIcon className={cn('group-focus-within:hidden', query && 'hidden')} />
          <input
            className="h-6 w-[1px] grow border-none bg-other-black/0 p-0 caret-primary-500 placeholder:text-p3 placeholder:text-gray-500 focus:ring-0"
            placeholder={currConfig.placeholder}
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
