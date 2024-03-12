import { SearchInput } from '../SearchInput';
import { Heading } from '../Typography';

export function SearchSection() {
  return (
    <section className="px-[80px] pb-[88px] pt-[72px]">
      <div className="mx-auto flex max-w-[906px] flex-col gap-12">
        <Heading type="h1" className="text-center text-[3.5rem] font-bold leading-[4rem]">
          Шукай пункти психологічної підтримки у місті <span className="text-secondary-400">Львові</span>
        </Heading>
        <SearchInput />
      </div>
    </section>
  );
}
