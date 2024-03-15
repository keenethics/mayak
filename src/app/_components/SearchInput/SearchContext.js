'use client';

import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { getSearchTypeConfig } from './config';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const searchTypeParam = searchParams.get('searchType');
  const [query, setQuery] = useState(queryParam || '');
  const [searchType, setSearchType] = useState(searchTypeParam);
  const currentConfig = getSearchTypeConfig(searchType);
  const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [autoCompleteItems, setAutoCompleteItems] = useState([]);

  async function syncAutoCompleteItems() {
    const baseQueryString = `searchSync=true&searchType=${currentConfig.searchType}&query=${query}`;
    const res = await fetch(`/api/search?${baseQueryString}`);
    const data = await res.json();
    setAutoCompleteItems(data.data);
  }

  useEffect(() => {
    setIsAutoCompleteOpen(query !== '');
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        currentConfig,
        query,
        searchType,
        isSelectTypeOpen,
        isAutoCompleteOpen,
        autoCompleteItems,
        setQuery,
        setSearchType,
        setIsSelectTypeOpen,
        setIsAutoCompleteOpen,
        syncAutoCompleteItems,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) throw new Error('SearchContext is used outside of provider');
  return context;
}

SearchProvider.propTypes = {
  children: PropTypes.node,
};
