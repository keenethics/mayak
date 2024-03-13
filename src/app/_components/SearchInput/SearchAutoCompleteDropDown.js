import { OverlayContainer } from './OverlayContainer';
import { OverlayList } from './OverlayList';
import { useSearchContext } from './SearchContext';

export function SearchAutoCompleteDropDown() {
  const { isAutoCompleteOpen } = useSearchContext();
  const autoCompleteItems = [
    { id: 1, title: 'Тарас' },
    { id: 2, title: 'Тарас' },
    { id: 3, title: 'Тарас' },
    { id: 4, title: 'Тарас' },
    { id: 5, title: 'Тарас' },
    { id: 6, title: 'Винахідник' },
  ];
  return (
    <OverlayContainer isOpen={isAutoCompleteOpen} className="left-0 top-[58px] z-[4] lg:top-[44px]">
      <OverlayList
        listItems={autoCompleteItems.map(item => ({ ...item, onClick: () => {} }))}
        className="mr-[2px] *:mr-[6px]"
      />
      <button className="rounded-full bg-primary-200 p-2 pl-8 font-bold text-primary-800 hover:bg-primary-300">
        Показати всі результати
      </button>
    </OverlayContainer>
  );
}
