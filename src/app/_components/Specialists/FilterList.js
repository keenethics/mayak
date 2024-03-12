import { DistrictFilter } from './DistrictFilter';
import { FormatFilter } from './FormatFilter';
import { TypeFilter } from './TypeFiltler';

export function FilterList() {
  return (
    <div className="flex w-max gap-4">
      <TypeFilter />
      <DistrictFilter />
      <FormatFilter />
    </div>
  );
}
