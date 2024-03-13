'use client';

import { DownTick } from '@icons/index';
import { cn } from '@/utils/cn';
import { useSearchContext } from './SearchContext';
import { searchInputTypeConfigs } from './config';

export function SearchTypeDropDown() {
  const { currentConfig, isSelectTypeOpen, setSearchType, setIsSelectTypeOpen } = useSearchContext();

  return (
    <>
      <div className="relative flex min-w-[200px] items-center gap-4 pr-6">
        <p className="grow text-center lg:text-left">{currentConfig.title}</p>
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
              e.stopPropagation();
              setSearchType(config.searchType);
              setIsSelectTypeOpen(state => !state);
            }}
          >
            {config.title}
          </li>
        ))}
      </ul>
    </>
  );
}
