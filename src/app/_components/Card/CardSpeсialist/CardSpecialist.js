import React from 'react';
import { MedAttention, MedCare, OnlineMeeting } from '@icons/index';
import PropType from 'prop-types';
import { FormatOfWork } from '@prisma/client';
import { displayYearsOfExperience } from '@/utils/common';
import { ProfileImage } from './ProfileImage';
import { CardSectionWrapper } from './CardSectionWrapper';
import { ContactsList } from './ContactsList';
import { SpecializationsPanel } from './SpecializationsPanel';
import { SpecialistTitle } from './SpecialistTitle';
import { ExperienceList } from './ExperienceList';
import { TherapiesList } from './TherapiesList';
import { PlacesOfWorkList } from './PlacesOfWorkList';
import { CardWrapper } from './CardWrapper';
import { contacts } from './config';

export function CardSpecialist({ specialist, children, className }) {
  const {
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

  const labels = [
    {
      id: 'yearsOfExperience',
      icon: <MedCare />,
      content: displayYearsOfExperience(yearsOfExperience),
      color: 'text-other-green',
    },
    {
      id: 'isFreeReception',
      icon: <MedAttention />,
      content: isFreeReception ? 'Безкоштовний прийом' : null,
      color: 'text-other-orange',
    },
    {
      id: 'formatOfWork',
      icon: <OnlineMeeting />,
      content: formatOfWork === FormatOfWork.ONLINE ? 'Онлайн консультації' : null,
      color: 'text-other-blue',
    },
  ];
  const specializationsList = specializations.map(s => s.name);
  const therapiesList = therapies.map(t => t.name.toLowerCase());
  const placeOfWork = [placesOfWork[0].addresses[0]];
  const contactsList = contacts({ phone, email, website });

  return (
    <CardWrapper className={className}>
      <CardSectionWrapper className="hidden md:block md:max-w-[200px]">
        <ProfileImage gender={gender} className="w-[200px]" />
        <ContactsList contacts={contactsList} className="mt-[16px]" />
      </CardSectionWrapper>
      <CardSectionWrapper className="flex w-[100%] flex-col md:ml-[16px]">
        <div className="flex-1">
          <header className="flex flex-row gap-[10px]">
            <ProfileImage gender={gender} className="h-[80px] md:hidden" />
            <div>
              <SpecializationsPanel specializations={specializationsList} />
              <SpecialistTitle title={`${firstName} ${lastName}`} />
            </div>
          </header>
          <ExperienceList labels={labels} className="mt-[16px] md:mt-[12px]" />
          <TherapiesList therapies={therapiesList} className="mt-[14px] md:mt-[12px]" />
          <PlacesOfWorkList className="mt-[16px] md:mt-[12px]" places={placeOfWork} />
        </div>
        {children}
      </CardSectionWrapper>
    </CardWrapper>
  );
}

CardSpecialist.propTypes = {
  specialist: PropType.object,
  children: PropType.node,
  className: PropType.string,
};
