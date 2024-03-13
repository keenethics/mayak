'use client';

import { DownTick } from '@icons/index';
import { useSearchContext } from './SearchContext';
import { searchInputTypeConfigs } from './config';
import { OverlayContainer } from './OverlayContainer';
import { OverlayList } from './OverlayList';

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
      <OverlayContainer
        isOpen={isSelectTypeOpen}
        className="left-0 top-[58px] z-[3] lg:left-[-24px] lg:top-[44px] lg:w-[300px]"
      >
        <OverlayList
          listItems={searchInputTypeConfigs.map(config => ({
            id: config.id,
            onClick: e => {
              e.stopPropagation();
              setSearchType(config.searchType);
              setIsSelectTypeOpen(state => !state);
            },
            title: config.title,
          }))}
        />
      </OverlayContainer>
    </>
  );
}
