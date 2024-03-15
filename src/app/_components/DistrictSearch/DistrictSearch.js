import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { Heading } from '@/app/_components';
import { getDistrictsList } from '@/app/_components/DistrictSearch/actions';
import { DistrictList } from '@/app/_components/DistrictSearch/DistrictList';

export async function DistrictSearch({ className }) {
  const optionsList = await getDistrictsList();

  return (
    <section className={cn('mx-auto w-full max-w-[900px] px-4 lg:px-0', className)}>
      <Heading type="h3" className="text-p4 font-bold uppercase text-primary-600">
        Райони міста Львова
      </Heading>
      <DistrictList list={optionsList} className="mt-4 w-[100%]" />
    </section>
  );
}

DistrictSearch.propTypes = {
  className: PropTypes.string,
};
