import { useEffect, useRef } from 'react';
import { useFocus } from '@/app/_hooks/useFocus';
import { useSearchContext } from './SearchContext';

export function SearchInputField() {
  const { currentConfig, query, setQuery, setIsAutoCompleteOpen } = useSearchContext();
  const inputRef = useRef(null);
  const inputFocused = useFocus(inputRef);

  useEffect(() => {
    setIsAutoCompleteOpen(inputFocused);
  }, [inputFocused, setIsAutoCompleteOpen]);

  return (
    <input
      ref={inputRef}
      className="h-6 w-[1px] grow border-none bg-other-black/0 p-0 caret-primary-500 placeholder:text-p3 placeholder:text-gray-500 focus:ring-0"
      placeholder={currentConfig.placeholder}
      value={query}
      onChange={e => {
        setQuery(e.target.value);
      }}
    />
  );
}
