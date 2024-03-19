const DEFAULT_SEARCH_TYPE = 'request';

export const SEARCH_DEBOUNCE_TIME_MS = 600;
export const SEARCH_MIN_QUERY_LENGTH = 3;
export const SEARCH_AUTO_COMPLETE_MAX_COUNT = 5;

export const searchInputTypeConfigs = [
  {
    id: 1,
    searchType: 'request',
    title: 'Запит',
    placeholder: 'Введіть назву запиту',
  },
  {
    id: 2,
    searchType: 'specialist',
    title: 'Спеціаліст',
    placeholder: 'Введіть ПІБ спеціаліста',
  },
  {
    id: 3,
    searchType: 'organization',
    title: 'Організація',
    placeholder: 'Введіть назву організації',
  },
];
export function getSearchTypeConfig(searchType) {
  return (
    searchInputTypeConfigs.find(config => config.searchType === searchType) ||
    searchInputTypeConfigs.find(config => config.searchType === DEFAULT_SEARCH_TYPE)
  );
}
