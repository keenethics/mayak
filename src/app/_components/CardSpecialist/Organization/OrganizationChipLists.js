import PropTypes from 'prop-types';
import { ChipList } from '@components/CardSpecialist/ChipList';
import presets from '@/app/styles/tailwind';
import { cn } from '@/utils/cn';

export function OrganizationChipLists({ className, expertSpecializations }) {
  const expertSpecializationsChipItems = expertSpecializations.map((el, i) => ({
    id: i,
    name: el.name,
    color: presets.theme.colors.secondary[100],
    textColor: presets.theme.colors.secondary[600],
  }));
  return (
    <div className={cn('flex flex-col gap-3 *:flex *:flex-col *:gap-2', className)}>
      <div>
        <h4 className="text-[0.875rem] font-bold leading-5 text-gray-600">СПЕЦІАЛІСТИ</h4>
        <ChipList items={expertSpecializationsChipItems} />
      </div>
    </div>
  );
}

OrganizationChipLists.propTypes = {
  className: PropTypes.string,
  expertSpecializations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};
