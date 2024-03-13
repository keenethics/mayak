'use client';

import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
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

  return (
    <SearchContext.Provider
      value={{ query, searchType, currentConfig, setQuery, setSearchType, isSelectTypeOpen, setIsSelectTypeOpen }}
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
