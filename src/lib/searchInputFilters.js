import { MODEL_SEARCH_FIELDS } from './consts';

export function searchInputFilters(modelName, filter) {
  if (!filter) return {};
  const filters = [];
  const fields = MODEL_SEARCH_FIELDS[modelName];
  fields.forEach(field => filters.push({ [field]: { contains: filter, mode: 'insensitive' } }));
  return { OR: filters };
}
