import { DistrictFilter, FormatFilter, TypeFilter, SpecializationFilter } from '@components/Specialists';

export function Filters() {
  return (
    <div className="relative inline-flex w-full flex-col items-start gap-6 py-6">
      <div className="no-scrollbar relative flex w-full touch-pan-x content-start items-start gap-4 overflow-x-auto">
        <TypeFilter />
        <SpecializationFilter />
        <DistrictFilter />
        <FormatFilter />
      </div>
    </div>
  );
}
