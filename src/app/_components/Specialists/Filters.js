import { DistrictFilter, FormatFilter, TypeFilter } from '@components/Specialists';

export function Filters() {
  return (
    <div className="inline-flex flex-col items-start gap-6 md:py-6">
      <div className="flex w-[906px] touch-pan-x flex-wrap content-start items-start gap-4 self-stretch">
        <TypeFilter />
        <DistrictFilter />
        <FormatFilter />
      </div>
    </div>
  );
}
