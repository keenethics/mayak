'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import { useSearchSync } from '@/app/_hooks/api/useSearchSync';
import { getSearchTypeConfig } from './config';

const SearchContext = createContext();
export function SearchProvider({ children }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const searchTypeParam = searchParams.get('searchType');
  const [query, setQuery] = useState(queryParam || '');
  const [searchType, setSearchType] = useState(searchTypeParam || '');

  const currentConfig = getSearchTypeConfig(searchType);

  const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);

  const {
    data: autoCompleteItems,
    refetch: syncAutoCompleteItems,
    isLoading: isAutoCompleteLoading,
  } = useSearchSync(query, currentConfig.searchType);

  useEffect(() => {
    setQuery(queryParam || '');
  }, [queryParam]);

  useEffect(() => {
    setSearchType(searchTypeParam || '');
  }, [searchTypeParam]);

  useEffect(() => {
    setIsAutoCompleteOpen(query !== '');
    syncAutoCompleteItems();
  }, [query, syncAutoCompleteItems]);

  return (
    <SearchContext.Provider
      value={{
        currentConfig,
        query,
        searchType,
        isSelectTypeOpen,
        isAutoCompleteOpen,
        autoCompleteItems,
        isAutoCompleteLoading,
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
