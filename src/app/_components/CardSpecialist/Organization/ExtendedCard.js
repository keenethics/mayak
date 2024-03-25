import PropTypes from 'prop-types';
import { Map } from '@components/Map';
import { CardOrganization } from '@components/CardSpecialist/Organization/Card';
import { CardModalWrapper } from '@components/CardSpecialist/CardModalWrapper';
import { organizationPropType } from '@/app/_components/CardSpecialist/prop-types';

export function CardOrganizationExtended({ organization, className }) {
  const addressesPoints = organization.addresses.map(({ fullAddress, latitude, longitude }) => ({
    title: fullAddress,
    latitude,
    longitude,
  }));
  const center = [addressesPoints[0].latitude, addressesPoints[1].longitude];
  return (
    <CardModalWrapper className="mt-[40px] w-full max-w-[1080px] lg:mt-0 lg:w-[1080px]" key={organization?.id}>
      <div className="flex flex-col gap-4">
        <CardOrganization organization={organization} className={className} extended />
        <div className="h-[198px] w-full md:h-[232px]">
          <Map points={addressesPoints} center={center} zoom={13} />
        </div>
      </div>
    </CardModalWrapper>
  );
}

CardOrganizationExtended.propTypes = {
  organization: organizationPropType,
  className: PropTypes.string,
};
