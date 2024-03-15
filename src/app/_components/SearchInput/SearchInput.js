'use client';

import { ClearSearchIcon, SearchIcon } from '@icons/index';
import { PillButton } from '@components/PillButton';
import { cn } from '@/utils/cn';
import { useSearchContext } from './SearchContext';
import { SearchTypeDropDown } from './SearchTypeDropDown';
import { SearchAutoCompleteDropDown } from './SearchAutoCompleteDropDown';

export function SearchInput() {
  const { currentConfig, query, isSelectTypeOpen, setQuery, setIsSelectTypeOpen, syncAutoCompleteItems } =
    useSearchContext();

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="flex grow flex-col gap-4 rounded-full lg:flex-row lg:gap-0 lg:border-[1px] lg:border-gray-600 lg:bg-gray-100 lg:px-6 lg:py-3">
        <div
          className={cn(
            'relative rounded-full border-[1px] border-gray-600 bg-gray-200 py-3 pl-6 lg:border-0 lg:bg-other-white/0 lg:p-0',
            isSelectTypeOpen && 'bg-gray-100',
          )}
          onClick={e => {
            e.stopPropagation();
            setIsSelectTypeOpen(state => !state);
          }}
        >
          <SearchTypeDropDown />
        </div>
        <div className="group relative flex grow items-center gap-2 rounded-full border-[1px] border-gray-600 px-4 py-3 before:mr-2 before:hidden before:h-[100%] before:w-[1px] before:rounded-full before:bg-gray-500 lg:border-0 lg:bg-other-white/0 lg:p-0  lg:before:block">
          <SearchIcon className={cn('group-focus-within:hidden', query && 'hidden')} />
          <input
            className="h-6 w-[1px] grow border-none bg-other-black/0 p-0 caret-primary-500 placeholder:text-p3 placeholder:text-gray-500 focus:ring-0"
            placeholder={currentConfig.placeholder}
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              syncAutoCompleteItems();
            }}
          />
          <ClearSearchIcon className={cn('hidden', query && 'block')} onClick={() => setQuery('')} />
          <SearchAutoCompleteDropDown />
        </div>
      </div>
      <PillButton variant="filled" colorVariant="blue" className="px-6 py-3">
        Знайти
      </PillButton>
    </div>
  );
}
