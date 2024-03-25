import PropTypes from 'prop-types';
import { Map } from '@components/Map';
import { CardSpecialist } from '@components/CardSpecialist/Specialist/Card';
import { CardModalWrapper } from '@components/CardSpecialist/CardModalWrapper';
import { specialistPropType } from '@components/CardSpecialist/prop-types';

export function CardSpecialistExtended({ specialist, className }) {
  const addressesPoints = specialist.addresses.map(({ fullAddress, latitude, longitude }) => ({
    title: fullAddress,
    latitude,
    longitude,
  }));
  const center = [addressesPoints[0].latitude, addressesPoints[1].longitude];

  return (
    <CardModalWrapper className="mt-[40px] w-full max-w-[1080px] lg:mt-0 lg:w-[1080px]" key={specialist.id}>
      <div className="flex flex-col gap-4">
        <CardSpecialist specialist={specialist} className={className} extended />
        <div className="h-[198px] w-full md:h-[232px]">
          <Map points={addressesPoints} center={center} zoom={13} />
        </div>
      </div>
    </CardModalWrapper>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};
