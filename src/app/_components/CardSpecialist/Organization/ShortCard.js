import PropTypes from 'prop-types';
import { organizationPropType } from '@components/CardSpecialist/prop-types';
import { ShortCardWrapper } from '@components/CardSpecialist/ShortCardWrapper';

export function CardOrganizationShort({ organization, isHoveredOn, className }) {
  return <ShortCardWrapper data={organization} type="organization" className={className} isHoveredOn={isHoveredOn} />;
}

CardOrganizationShort.propTypes = {
  organization: organizationPropType.isRequired,
  isHoveredOn: PropTypes.bool,
  className: PropTypes.string,
};
