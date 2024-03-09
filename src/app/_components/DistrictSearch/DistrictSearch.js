import { Heading } from '@components';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { getDistrictsList } from '@/app/_components/DistrictSearch/actions';
import { DistrictList } from '@/app/_components/DistrictSearch/DistrictList';

export async function DistrictSearch({ className }) {
  const optionsList = await getDistrictsList();

  return (
    <section className={cn('mx-auto w-full max-w-[900px]', className)}>
      <Heading type="h3" className="text-p4 font-bold uppercase text-primary-600">
        Райони міста Львова
      </Heading>
      <DistrictList list={optionsList} />
    </section>
  );
}

DistrictSearch.propTypes = {
  className: PropTypes.string,
};
