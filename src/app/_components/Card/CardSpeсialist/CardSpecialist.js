import React from 'react';
import PropType from 'prop-types';
import { ProfileImage } from './ProfileImage';
import { CardSectionWrapper } from './CardSectionWrapper';
import { ContactsList } from './ContactsList';
import { SpecializationsPanel } from './SpecializationsPanel';
import { SpecialistTitle } from './SpecialistTitle';
import { ExperienceList } from './ExperienceList';
import { PlacesOfWorkList } from './PlacesOfWorkList';
import { CardWrapper } from './CardWrapper';
import { getContactsList, getLabelsList, getSpecialistSocials } from './config';
import { CardButton } from '@/app/_components/Card/CardSpeсialist/CardButton';
import { specialistPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';
import { borderStyle } from '@/app/_components/Card/CardSpeсialist/config';
import { cn } from '@/utils/cn';
import { DetailsList } from '@/app/_components/Card/CardSpeсialist/DetailsList';

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
    placesOfWork,
    phone,
    email,
    website,
    description,
    instagram,
    facebook,
    tiktok,
  } = specialist;

  const specializationsList = specializations.map(s => s.name);
  const placeOfWork = [placesOfWork[0].addresses[0]];
  const contactsList = getContactsList({ phone, email, website });
  const labelsList = getLabelsList({ yearsOfExperience, isFreeReception, formatOfWork });
  const socials = getSpecialistSocials({ instagram, facebook, tiktok });
  const name = surname ? `${lastName} ${firstName} ${surname}` : `${lastName} ${firstName}`;

  return (
    <CardWrapper className={className} id={id}>
      <CardSectionWrapper className="hidden md:block md:max-w-[200px]">
        <ProfileImage gender={gender} className="sm:w-[70px] md:max-w-[200px] lg:w-[200px]" socials={socials} />
        <ContactsList truncate={!extended} specialistId={id} contacts={contactsList} className="mt-[16px]" />
      </CardSectionWrapper>
      <CardSectionWrapper className="flex w-[100%] max-w-full flex-col overflow-hidden md:ml-[16px]">
        <div className="relative w-full">
          <header className="flex flex-row gap-[10px]">
            <ProfileImage gender={gender} className="md:hidden" socials={socials} />
            <div className="max-w-full overflow-hidden">
              <SpecializationsPanel specialistId={id} specializations={specializationsList} />
              <SpecialistTitle name={name} className="mt-[6px]" />
            </div>
          </header>
          <ExperienceList labels={labelsList} className="mt-[16px] md:mt-[12px]" />
          {!extended && (
            <PlacesOfWorkList
              className="mt-[16px] border-t pt-[12px] md:mt-[12px] md:border-b md:py-[12px]"
              places={placeOfWork}
            />
          )}
        </div>
        {!extended && <CardButton className="mt-auto" id={id} />}
        {extended && (
          <>
            <DetailsList
              className={cn('mt-[16px] border-t pt-[16px]', borderStyle)}
              details={{ placeOfWork, description }}
            />
            <ContactsList
              truncate={!extended}
              specialistId={id}
              contacts={contactsList}
              className={cn('mt-[12px] border-t pt-[12px] md:hidden', borderStyle)}
            />
          </>
        )}
      </CardSectionWrapper>
    </CardWrapper>
  );
}

CardSpecialist.propTypes = {
  specialist: specialistPropType,
  extended: PropType.bool,
  className: PropType.string,
};
