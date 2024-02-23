import React from 'react';
import { Calendar, Clock, Mail, MedAttention, MedCare, OnlineMeeting, Phone } from '@icons/index';
import PropType from 'prop-types';
import { FormatOfWork } from '@prisma/client';
import { CardWrapper } from '@/app/_components/Card/Shared/CardWrapper';
import { CardHeader } from '@/app/_components/Card/Shared/CardHeader';
import { ExperienceList } from '@/app/_components/Card/Shared/ExperienceList';
import { TherapiesList } from '@/app/_components/Card/Shared/TherapiesList';
import { PlacesOfWorkList } from '@/app/_components/Card/Shared/PlacesOfWorkList';
import { ProfileImageSpecialist } from '@/app/_components/Card/Shared/ProfileImageSpecialist';
import { ContactsList } from '@/app/_components/Card/Shared/ContactsList';
import { CardSectionWrapper } from '@/app/_components/Card/Shared/CardSectionWrapper';
import { SpecializationsPanel } from '@/app/_components/Card/Shared/SpecializationsPanel';
import { SpecialistTitle } from '@/app/_components/Card/Shared/SpecialistTitle';
import { CardButton } from '@/app/_components/Card/Shared/CardButton';
import { cn } from '@/utils/cn';
import { displayYearsOfExperience } from '@/utils/common';

export function CardSpecialist({ specialist, children, className }) {
  const {
    id,
    phone,
    email,
    website,
    gender,
    firstName,
    lastName,
    specializations,
    yearsOfExperience,
    isFreeReception,
    formatOfWork,
    therapies,
    placesOfWork,
  } = specialist;

  const contacts = [
    {
      id: 'phone',
      icon: <Phone />,
      content: phone,
      href: `tel:${phone}`,
    },
    {
      id: 'email',
      icon: <Mail />,
      content: email,
      href: `mailto:${email}`,
    },
    {
      id: 'website',
      icon: <Calendar />,
      content: website,
      href: website,
    },
    {
      id: 'schedule',
      icon: <Clock />,
      content: ['пн-пт 9:00-18:00', 'ср-чт 18:00-20:00', 'ср-чт 08:00-13:00'],
      href: null,
    },
  ];

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

  return (
    <CardWrapper
      className={cn(
        className,
        'shadow-[4px_2px_4px_0px_rgba(192,191,206,0.25),0px_0px_16px_0px_rgba(192,191,206,0.50)]',
      )}
    >
      <CardSectionWrapper className="hidden md:block md:max-w-[200px]">
        <ProfileImageSpecialist gender={gender} />
        <ContactsList contacts={contacts} className="mt-[16px]" />
      </CardSectionWrapper>
      <CardSectionWrapper className="flex w-[100%] flex-col md:ml-[16px]">
        <div className="flex-1">
          <CardHeader gender={gender} firstName={firstName} lastName={lastName}>
            <ProfileImageSpecialist gender={gender} className="md:hidden" />
            <div>
              <SpecializationsPanel specializations={specializationsList} />
              <SpecialistTitle title={`${firstName} ${lastName}`} />
            </div>
          </CardHeader>
          <ExperienceList labels={labels} className="mt-[16px]" />
          <TherapiesList therapies={therapiesList} className="mt-[14px]" />
          <PlacesOfWorkList className="mt-[24px]" places={placeOfWork} />
        </div>
        <CardButton className="mt-[16px]" id={id} />
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
