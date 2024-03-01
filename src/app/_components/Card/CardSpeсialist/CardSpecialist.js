import React from 'react';
import PropType from 'prop-types';
import { ProfileImage } from './ProfileImage';
import { ContactsList } from './ContactsList';
import { SpecializationsPanel } from './SpecializationsPanel';
import { SpecialistTitle } from './SpecialistTitle';
import { ExperienceList } from './ExperienceList';
import { CardWrapper } from './CardWrapper';
import { getContactsList, getLabelsList, getSpecialistSocials } from './config';
import { CardButton } from '@/app/_components/Card/CardSpeсialist/CardButton';
import { specialistPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';
import { borderStyle } from '@/app/_components/Card/CardSpeсialist/config';
import { cn } from '@/utils/cn';
import { DetailsList } from '@/app/_components/Card/CardSpeсialist/DetailsList';
import { AddressesList } from '@/app/_components/Card/CardSpeсialist/AddressesList';
import { SocialsList } from '@/app/_components/Card/CardSpeсialist/SocialsList';

export function CardSpecialist({ specialist, className, extended = false }) {
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
  } = specialist;

  const specializationsList = specializations.map(s => s.name);
  const addressPrimary = [addresses[0]];
  const contactsList = getContactsList({ phone, email, website });
  const labelsList = getLabelsList({ yearsOfExperience, isFreeReception, formatOfWork });
  const socials = getSpecialistSocials({ instagram, facebook, tiktok, youtube, linkedin });
  const name = surname ? `${lastName} ${firstName} ${surname}` : `${lastName} ${firstName}`;

  return (
    <CardWrapper className={className} id={id}>
      <div className="hidden md:block md:max-w-[200px]">
        <ProfileImage gender={gender} className="relative sm:w-[70px] md:max-w-[200px] lg:w-[200px]">
          <SocialsList socials={socials} className="absolute bottom-[16px]" />
        </ProfileImage>
        <ContactsList truncate={!extended} specialistId={id} contacts={contactsList} className="mt-[16px]" />
      </div>
      <div className="flex w-[100%] max-w-full flex-col gap-[16px] overflow-hidden md:ml-[16px]">
        <header className="relative flex flex-row gap-[10px]">
          <ProfileImage gender={gender} className="md:hidden" />
          <div className="max-w-full overflow-hidden">
            <SpecializationsPanel
              specialistId={id}
              specializations={specializationsList}
              extendedCardOpened={extended}
            />
            <SpecialistTitle id={id} truncate={!extended} name={name} className="mt-[6px]" />
          </div>
        </header>
        <ExperienceList labels={labelsList} />
        {extended ? (
          <>
            <DetailsList
              className={cn('mt-[16px] border-t pt-[16px]', borderStyle)}
              details={{ addresses, description }}
            />
            <ContactsList
              truncate={!extended}
              specialistId={id}
              contacts={contactsList}
              className={cn('mt-[12px] border-t pt-[12px] md:hidden', borderStyle)}
            />
          </>
        ) : (
          <>
            <AddressesList className="border-t pt-[12px] md:border-b md:py-[12px]" addresses={addressPrimary} />
            <CardButton className="mt-auto" id={id} />
          </>
        )}
      </div>
    </CardWrapper>
  );
}

CardSpecialist.propTypes = {
  specialist: specialistPropType,
  extended: PropType.bool,
  className: PropType.string,
};
