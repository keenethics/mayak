import React from 'react';
import PropType from 'prop-types';
import { ProfileImage } from './ProfileImage';
import { CardSectionWrapper } from './CardSectionWrapper';
import { ContactsList } from './ContactsList';
import { SpecializationsPanel } from './SpecializationsPanel';
import { SpecialistTitle } from './SpecialistTitle';
import { ExperienceList } from './ExperienceList';
import { TherapiesList } from './TherapiesList';
import { PlacesOfWorkList } from './PlacesOfWorkList';
import { CardWrapper } from './CardWrapper';
import { getContactsList, getLabelsList } from './config';
import { CardButton } from '@/app/_components/Card/CardSpeсialist/CardButton';
import { specialistPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';

export function CardSpecialist({ specialist, className, extended = false }) {
  const {
    id,
    gender,
    firstName,
    lastName,
    specializations,
    yearsOfExperience,
    isFreeReception,
    formatOfWork,
    therapies,
    placesOfWork,
    phone,
    email,
    website,
  } = specialist;

  const specializationsList = specializations.map(s => s.name);
  const therapiesList = therapies.map(t => t.name.toLowerCase());
  const placeOfWork = [placesOfWork[0].addresses[0]];
  const contactsList = getContactsList({ phone, email, website });
  const labelsList = getLabelsList({ yearsOfExperience, isFreeReception, formatOfWork });

  return (
    <CardWrapper className={className} id={id}>
      <CardSectionWrapper className="hidden md:block md:max-w-[200px]">
        <ProfileImage gender={gender} className="sm:w-[70px] md:max-w-[200px] lg:w-[200px]" />
        <ContactsList contacts={contactsList} className="mt-[16px]" />
      </CardSectionWrapper>
      <CardSectionWrapper className="flex w-[100%] flex-col md:ml-[16px]">
        <div className="flex-1">
          <header className="flex flex-row gap-[10px]">
            <ProfileImage gender={gender} className="md:hidden" />
            <div>
              <SpecializationsPanel specializations={specializationsList} />
              <SpecialistTitle title={`${firstName} ${lastName}`} />
            </div>
          </header>
          <ExperienceList labels={labelsList} className="mt-[16px] md:mt-[12px]" />
          <TherapiesList therapies={therapiesList} className="mt-[14px] md:mt-[12px]" />
          <PlacesOfWorkList className="mt-[16px] md:mt-[12px]" places={placeOfWork} />
        </div>
        {!extended && <CardButton className="mt-[16px]" id={id} />}
      </CardSectionWrapper>
    </CardWrapper>
  );
}

CardSpecialist.propTypes = {
  specialist: specialistPropType,
  extended: PropType.bool,
  className: PropType.string,
};
