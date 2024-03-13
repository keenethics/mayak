const DEFAULT_SEARCH_TYPE = 'request';
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
