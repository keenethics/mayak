'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  AddressesList,
  BadgeList,
  CardButton,
  CardWrapper,
  ContactsList,
  DetailsList,
  getContactsList,
  getLabelsList,
  getSpecialistSocials,
  ProfileImage,
  SocialsList,
  SpecialistTitle,
  SpecializationsPanel,
} from '@components';
import { specialistPropType } from '@/app/_components/CardSpecialist/prop-types';

export function CardSpecialist({ specialist, className, extended = false }) {
  if (!specialist) throw new Error('Specialist is not found');

  const {
    id,
    gender,
    firstName,
    lastName,
    surname,
    specializations,
    yearsOfExperience,
    isFreeReception,
    formatOfWork,
    therapyPrices,
    addresses,
    phone,
    email,
    website,
    description,
    instagram,
    facebook,
    tiktok,
    youtube,
    linkedin,
    viber,
    telegram,
  } = specialist;
  const specializationsList = specializations.map(s => s.name);
  const addressPrimary = addresses[0];
  const contactsList = getContactsList({ phone, email, website });
  const labelsList = getLabelsList({ yearsOfExperience, isFreeReception, formatOfWork, specialistType: 'specialist' });
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin, viber, telegram });
  const name = surname ? `${lastName} ${firstName} ${surname}` : `${lastName} ${firstName}`;

  return (
    <CardWrapper className={className} id={id}>
      <div className="hidden max-w-[150px] md:block lg:max-w-[200px]">
        <ProfileImage gender={gender} className="relative sm:w-[70px] md:max-w-[200px] lg:w-[200px]">
          <SocialsList socials={socials} className="absolute bottom-4" />
        </ProfileImage>
        <ContactsList truncate={!extended} specialistId={id} contacts={contactsList} className="mt-4" />
      </div>
      <div className="flex w-[100%] max-w-full flex-col gap-4 overflow-hidden md:ml-4">
        <header className="relative flex flex-row gap-2.5">
          <ProfileImage gender={gender} className="md:hidden">
            <SocialsList socials={socials} className="absolute bottom-4" />
          </ProfileImage>
          <div className="max-w-full overflow-hidden">
            <SpecializationsPanel
              specialistId={id}
              specializations={specializationsList}
              extendedCardOpened={extended}
            />
            <SpecialistTitle id={id} truncate={!extended} name={name} className="mt-1.5" />
          </div>
        </header>
        <BadgeList labels={labelsList} />
        {extended ? (
          <>
            <DetailsList
              className="border-t border-dashed border-t-gray-200 pt-4"
              details={{ addresses, description, therapyPrices }}
            />
            <ContactsList
              truncate={!extended}
              specialistId={id}
              contacts={contactsList}
              className="mt-3 border-t border-dashed border-t-gray-200 pt-3 md:hidden"
            />
          </>
        ) : (
          <>
            {addressPrimary && (
              <AddressesList className="border-t pt-3 md:border-b md:py-3" addresses={[addressPrimary]} />
            )}
            <Link
              href={`/specialist/${id}`}
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

CardSpecialist.propTypes = {
  specialist: specialistPropType.isRequired,
  extended: PropTypes.bool,
  className: PropTypes.string,
};
