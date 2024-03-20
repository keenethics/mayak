'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { searchSyncKey, useSearchSync, useDebounce } from '@/app/_hooks';
import { SEARCH_DEBOUNCE_TIME_MS, SEARCH_MIN_QUERY_LENGTH, getSearchTypeConfig } from './config';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const searchTypeParam = searchParams.get('searchType');
  const [query, setQuery] = useState(queryParam || '');
  const [searchType, setSearchType] = useState(searchTypeParam || '');
  const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const currentConfig = getSearchTypeConfig(searchType);

  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_TIME_MS);
  const { data: autoCompleteItems, isLoading: isAutoCompleteLoading } = useSearchSync(
    debouncedQuery,
    currentConfig.searchType,
    SEARCH_MIN_QUERY_LENGTH,
  );

  const queryClient = useQueryClient();
  const router = useRouter();

  function submitSearch() {
    queryClient.cancelQueries({ queryKey: searchSyncKey });
    router.push(`/specialist?searchType=${currentConfig.searchType}&query=${query}`);
  }
  function navigateToAutoCompleteItem(id) {
    queryClient.cancelQueries({ queryKey: searchSyncKey });
    if (currentConfig.searchType === 'request') {
      const currentQuery = router.query;
      const newSearchParams = new URLSearchParams({
        ...currentQuery,
        request: id,
      });
      newSearchParams.delete('query');
      router.push(`/specialist?${newSearchParams.toString()}`);
    } else if (currentConfig.searchType === 'specialist' || currentConfig.searchType === 'organization') {
      router.push(`/specialist/${id}`);
    }
  }

  useEffect(() => {
    setQuery(queryParam || '');
  }, [queryParam]);

  useEffect(() => {
    setSearchType(searchTypeParam || '');
  }, [searchTypeParam]);

  useEffect(() => {
    setIsAutoCompleteOpen(query !== '');
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        currentConfig,
        query,
        debouncedQuery,
        searchType,
        isSelectTypeOpen,
        isAutoCompleteOpen,
        autoCompleteItems,
        isAutoCompleteLoading,
        setQuery,
        setSearchType,
        setIsSelectTypeOpen,
        setIsAutoCompleteOpen,
        submitSearch,
        navigateToAutoCompleteItem,
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
