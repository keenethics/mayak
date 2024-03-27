'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import { getContactsList, getLabelsList, getSpecialistSocials } from '@components/CardSpecialist/config';
import { ProfileImage } from '@components/CardSpecialist/ProfileImage';
import { ContactsList } from '@components/CardSpecialist/ContactsList';
import { BadgeList } from '@components/CardSpecialist/BadgeList';
import { SpecialistTitle } from '@components/CardSpecialist/SpecialistTitle';
import { SpecializationsPanel } from '@components/CardSpecialist/SpecializationsPanel';
import { CardWrapper } from '@components/CardSpecialist/CardWrapper';
import { SocialsList } from '@components/CardSpecialist/SocialsList';
import { DetailsList } from '@components/CardSpecialist/DetailsList';
import { AddressesList } from '@components/CardSpecialist/AddressesList';
import { CardButton } from '@components/CardSpecialist/CardButton';
import { organizationPropType } from '@components/CardSpecialist/prop-types';
import { OrganizationChipLists } from './OrganizationChipLists';
import { OwnershipTypeTile } from './OwnershipTypeTile';

export function CardOrganization({ organization, className, extended = false }) {
  const {
    id,
    name,
    type,
    ownershipType,
    isInclusiveSpace,
    expertSpecializations,
    yearsOnMarket,
    formatOfWork,
    addresses,
    supportFocuses,
    isFreeReception,
    description,
    phone,
    email,
    website,
    instagram,
    facebook,
    tiktok,
    youtube,
    linkedin,
    viber,
    telegram,
  } = organization;
  const addressPrimary = addresses[0];
  const contactsList = getContactsList({ phone, email, website });
  const labelsList = getLabelsList({
    yearsOfExperience: yearsOnMarket,
    isFreeReception,
    formatOfWork,
    isInclusiveSpace,
    specialistType: 'organization',
  });
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin, viber, telegram });

  return (
    <CardWrapper className={className} id={id} type="organization">
      <div className="hidden max-w-[150px] md:block lg:max-w-[200px]">
        <ProfileImage className="relative sm:w-[70px] md:max-w-[200px] lg:w-[200px]">
          <SocialsList socials={socials} className="absolute bottom-4" />
        </ProfileImage>
        <ContactsList truncate={!extended} specialistId={id} contacts={contactsList} className="mt-4" />
      </div>
      <div className="flex w-full max-w-full flex-col gap-4 overflow-hidden md:ml-4">
        <header className="relative flex flex-row gap-2.5">
          <ProfileImage className="md:hidden">
            <SocialsList socials={socials} className="absolute bottom-4 hidden md:inline-block" />
          </ProfileImage>
          <div className="w-full overflow-hidden">
            <div className="flex justify-between gap-4">
              <div className="flex w-full justify-between gap-4">
                <SpecializationsPanel
                  specialistId={id}
                  specializations={type.map(t => t.name)}
                  extendedCardOpened={extended}
                />
              </div>
              <div className="hidden md:block">
                <OwnershipTypeTile ownershipType={ownershipType} />
              </div>
            </div>
            <SpecialistTitle id={id} truncate={!extended} name={name} className="md:mt-1.5" />
            <div className="md:hidden">
              <OwnershipTypeTile ownershipType={ownershipType} />
            </div>
          </div>
        </header>
        <BadgeList labels={labelsList} />
        <OrganizationChipLists
          className="border-t border-dashed border-t-gray-200 pt-4"
          id={id}
          expertSpecializations={expertSpecializations}
          extended={extended}
        />
        {extended ? (
          <>
            <DetailsList
              className="mt-4 border-t border-dashed border-t-gray-200 pt-4"
              details={{
                addresses,
                description,
                supportFocuses,
              }}
              text="клініку"
            />
            <ContactsList
              truncate={!extended}
              specialistId={id}
              contacts={contactsList}
              className="mt-3 border-t border-dashed border-t-gray-200 pt-3 md:hidden"
            />
            <SocialsList socials={socials} className="border-t border-dashed border-t-gray-200 pt-3 md:hidden" />
          </>
        ) : (
          <>
            {addressPrimary && (
              <AddressesList className="border-t pt-3 md:border-b md:py-3" addresses={[addressPrimary]} />
            )}
            <Link
              href={`/specialist/${id}?type=organization`}
              scroll={false}
              className="mt-auto hidden self-end justify-self-end md:inline-block"
            >
              <CardButton />
            </Link>
          </>
        )}
      </div>
    </CardWrapper>
  );
}

CardOrganization.propTypes = {
  organization: organizationPropType.isRequired,
  extended: PropTypes.bool,
  className: PropTypes.string,
};
