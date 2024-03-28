'use client';

import PropTypes from 'prop-types';
import { CardWrapper } from '@components/CardSpecialist/CardWrapper';
import { organizationPropType, specialistPropType } from '@components/CardSpecialist/prop-types';
import {
  AddressesList,
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
import { MethodList } from '@components/CardSpecialist/MethodList';

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

  const isBadgeList = !!labelsList.filter(label => !!label.content).length;

  const { instagram, facebook, tiktok, youtube, linkedin, viber, telegram, phone, email, website, addresses } = data;
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin, viber, telegram });
  const contactsList = getContactsList({ phone, email, website });
  const addressPrimary = addresses.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))[0];

  return (
    <CardWrapper className={className} id={data.id} type={type}>
      <div className="flex w-full flex-col lg:hidden">
        <div className="flex gap-3">
          <ProfileImage className="relative w-[75px]  md:h-[100px] md:max-w-[100px]" />
          <div>
            <SpecializationsPanel
              specialistId={data.id}
              specializations={specializationsList}
              extendedCardOpened
              className="text-c3 md:text-p4"
            />
            <SpecialistTitle id={data.id} truncate={false} name={name} className="mt-2 text-p2" />
          </div>
        </div>
        <BadgeList labels={labelsList} className="flex-wrap border-0 md:my-4" />
        <Link
          href={`/specialist/${data.id}?type=${type}`}
          scroll={false}
          className="mt-auto hidden self-end justify-self-end md:inline-block"
        >
          <CardButton />
        </Link>
      </div>
      <div className="hidden w-full lg:block">
        <header className="relative flex items-stretch gap-2.5">
          <div className="w-[200px]">
            <ProfileImage gender={isOrganization ? undefined : data.gender} className="relative">
              <SocialsList socials={socials} className="absolute bottom-4" />
            </ProfileImage>
            {isHoveredOn && (
              <ContactsList truncate={false} specialistId={data.id} contacts={contactsList} className="mt-4" />
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <SpecializationsPanel
              specialistId={data.id}
              specializations={specializationsList}
              extendedCardOpened
              className="flex-wrap"
            />
            <SpecialistTitle id={data.id} truncate={false} name={name} className="mt-2" />
            {isBadgeList && <BadgeList labels={labelsList} className="mt-4 flex-wrap" />}
            {isHoveredOn && (
              <MethodList
                specializations={specializationsList}
                methods={data.specializationMethods}
                className="mt-5"
                showCaption={false}
              />
            )}
            {isHoveredOn && addressPrimary && (
              <AddressesList
                showIcon
                className="mb-3 mt-4 border-t pt-3 md:border-b md:py-3"
                addresses={[addressPrimary]}
              />
            )}
            {isHoveredOn && (
              <Link
                href={`/specialist/${data.id}?type=${type}`}
                scroll={false}
                className="mt-auto hidden self-end justify-self-end md:inline-block"
              >
                <CardButton />
              </Link>
            )}
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
