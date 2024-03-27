'use client';

import PropTypes from 'prop-types';
import { CardWrapper } from '@components/CardSpecialist/CardWrapper';
import { organizationPropType, specialistPropType } from '@components/CardSpecialist/prop-types';
import {
  BadgeList,
  CardButton,
  ContactsList,
  getContactsList,
  getLabelsList,
  getSpecialistSocials,
  ProfileImage,
  SocialsList,
  SpecialistTitle,
  SpecializationsPanel,
} from '@components/CardSpecialist';
import Link from 'next/link';

export function ShortCardWrapper({ data, type, isHoveredOn, className }) {
  const isOrganization = type === 'organization';

  const specializationsList = isOrganization ? data.type.map(t => t.name) : data.specializations.map(s => s.name);
  // eslint-disable-next-line no-nested-ternary
  const name = isOrganization
    ? data.name
    : data.surname
      ? `${data.lastName} ${data.firstName} ${data.surname}`
      : `${data.lastName} ${data.firstName}`;

  const getLabels = getLabelsList.bind(null, {
    yearsOfExperience: data.yearsOnMarket,
    isFreeReception: data.isFreeReception,
    formatOfWork: data.formatOfWork,
  });

  const labelsList = isOrganization
    ? getLabels({ specialistType: 'organization' })
    : getLabels({ specialistType: 'specialist' });

  const { instagram, facebook, tiktok, youtube, linkedin, viber, telegram, phone, email, website } = data;
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin, viber, telegram });
  const contactsList = getContactsList({ phone, email, website });

  return (
    <CardWrapper className={className} id={data.id} type={type}>
      <div className="flex flex-col lg:hidden">
        <SpecializationsPanel
          specialistId={data.id}
          specializations={specializationsList}
          extendedCardOpened
          className="text-c3 md:text-p4"
        />
        <div className="mt-3 flex items-center gap-3 md:mt-4">
          <ProfileImage className="relative w-[75px]  md:h-[100px] md:max-w-[100px]" />
          <SpecialistTitle id={data.id} truncate={false} name={name} className="text-p2" />
        </div>
        <BadgeList labels={labelsList} className="flex-wrap border-0 md:mt-4" />
        <Link
          href={`/specialist/${data.id}?type=${type}`}
          scroll={false}
          className="mt-auto hidden self-end justify-self-end md:inline-block"
        >
          <CardButton />
        </Link>
      </div>
      <div className="hidden lg:block">
        <header className="relative flex w-full items-stretch gap-2.5">
          <div>
            <ProfileImage gender={isOrganization ? undefined : data.gender} className="relative !min-w-[200px]">
              <SocialsList socials={socials} className="absolute bottom-4" />
            </ProfileImage>
            {isHoveredOn && (
              <ContactsList truncate={false} specialistId={data.id} contacts={contactsList} className="mt-4" />
            )}
          </div>

          <div className="flex-1">
            <SpecializationsPanel specialistId={data.id} specializations={specializationsList} extendedCardOpened />
            <SpecialistTitle id={data.id} truncate={false} name={name} className="mt-1.5" />
            <BadgeList
              labels={labelsList}
              className="mt-3 flex-wrap !border-t-2 !border-dashed !border-t-gray-200 !pt-4"
            />
          </div>
        </header>
      </div>
    </CardWrapper>
  );
}

ShortCardWrapper.propTypes = {
  data: PropTypes.oneOfType([organizationPropType, specialistPropType]),
  type: PropTypes.oneOf(['specialist', 'organization']),
  isHoveredOn: PropTypes.bool,
  className: PropTypes.string,
};
