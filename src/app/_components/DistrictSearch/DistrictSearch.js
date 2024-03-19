import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { Heading } from '@components';
import { getDistrictsList } from '@/app/_components/DistrictSearch/actions';
import { List } from '@/app/_components/DistrictSearch/List';

export async function DistrictSearch({ className }) {
  const districtsList = await getDistrictsList();
  const optionsList = districtsList
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((acc, district) => [...acc, district], [{ id: 'all-districts', name: 'Усі' }]);

  return (
    <section className={cn('mx-auto w-full max-w-[900px] px-4 lg:px-0', className)}>
      <Heading type="h3" className="text-p4 font-bold uppercase text-primary-600">
        Райони міста Львова
      </Heading>
      <List list={optionsList} className="mt-4 w-full" />
    </section>
  );
}

DistrictSearch.propTypes = {
  className: PropTypes.string,
};
