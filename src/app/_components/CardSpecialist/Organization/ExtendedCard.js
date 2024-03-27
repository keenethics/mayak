import PropTypes from 'prop-types';
import { Map } from '@components/Map';
import { CardOrganization } from '@components/CardSpecialist/Organization/Card';
import { CardModalWrapper } from '@components/CardSpecialist/CardModalWrapper';
import { organizationPropType } from '@/app/_components/CardSpecialist/prop-types';
import { addressesToPoints } from '@/utils/common';

export function CardOrganizationExtended({ organization, className }) {
  const points = addressesToPoints(organization.addresses);
  const center = [points[0].latitude, points[1].longitude];
  return (
    <CardModalWrapper className="mt-10 w-full max-w-[1080px] lg:mt-0 lg:w-[1080px]" key={organization?.id}>
      <div className="flex flex-col gap-3 lg:gap-6">
        <CardOrganization organization={organization} className={className} extended />
        <Map points={points} center={center} zoom={13} className="h-[198px] w-full lg:h-[232px]" />
      </div>
    </CardModalWrapper>
  );
}

CardOrganizationExtended.propTypes = {
  organization: organizationPropType,
  className: PropTypes.string,
};
