import { FilterChip } from '../FilterChip';
import { TypeFilter } from './TypeFiltler';

const filters = ['Тип', 'Район', 'Формат роботи'];

export function FilterList() {
  return (
    <div className="flex w-max gap-4">
      {filters.map(filter => (
        <>
          <FilterChip text={filter} />
          <TypeFilter />
        </>
      ))}
    </div>
  );
}
