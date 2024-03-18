'use client';

import { ClearSearchIcon, SearchIcon } from '@icons/index';
import { PillButton } from '@components/PillButton';
import { cn } from '@/utils/cn';
import { useSearchContext } from './SearchContext';
import { SearchTypeDropDown } from './SearchTypeDropDown';
import { SearchAutoCompleteDropDown } from './SearchAutoCompleteDropDown';
import { SearchInputField } from './SearchInputField';

export function SearchInput() {
  const { query, isSelectTypeOpen, setQuery, setIsSelectTypeOpen, submitSearch } = useSearchContext();

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="flex grow flex-col gap-4 rounded-full lg:flex-row lg:gap-0 lg:border-[1px] lg:border-gray-600 lg:bg-gray-100">
        <div
          className={cn(
            'after:hidden after:h-[100%] after:w-[1px] after:rounded-full after:bg-gray-500 hover:after:bg-other-white/0 lg:after:block',
            'relative rounded-full border-[1px] border-gray-600 bg-gray-200 py-3 pl-6 hover:bg-gray-200 lg:flex lg:border-0 lg:bg-other-white/0',
            isSelectTypeOpen && 'bg-other-white',
          )}
          onClick={e => {
            e.stopPropagation();
            setIsSelectTypeOpen(state => !state);
          }}
        >
          <SearchTypeDropDown />
        </div>
        <div className="group relative flex grow items-center gap-2 rounded-full border-[1px] border-gray-600 px-4 py-3 lg:border-0 lg:bg-other-white/0">
          <SearchIcon className={cn('group-focus-within:hidden', query && 'hidden')} />
          <SearchInputField />
          <ClearSearchIcon className={cn('hidden cursor-pointer', query && 'block')} onClick={() => setQuery('')} />
          <SearchAutoCompleteDropDown />
        </div>
      </div>
      <PillButton variant="filled" colorVariant="blue" className="px-6 py-3" onClick={submitSearch}>
        Знайти
      </PillButton>
    </div>
  );
}
