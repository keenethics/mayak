import PropTypes from 'prop-types';
import { specialistPropType } from '@components/CardSpecialist/prop-types';
import { ShortCardWrapper } from '@components/CardSpecialist/ShortCardWrapper';

export function CardSpecialistShort({ specialist, isHoveredOn, className }) {
  return <ShortCardWrapper data={specialist} type="specialist" className={className} isHoveredOn={isHoveredOn} />;
}

CardSpecialistShort.propTypes = {
  specialist: specialistPropType.isRequired,
  isHoveredOn: PropTypes.bool,
  className: PropTypes.string,
};
