import React from 'react';
import { PillButton } from '@components';
import PropType from 'prop-types';
import { cn } from '@utils/cn';
import { MedAttention, MedCare, OnlineMeeting } from '@icons/index';
import { buttonColorVariant, buttonType } from '@/app/_components/PillButton/style';
import { SpecializationList } from '@/app/_components/Card/Shared/SpecializationList';
import { SpecializationListItem } from '@/app/_components/Card/Shared/SpecializationListItem';
import { TherapiesList } from '@/app/_components/Card/Shared/TherapiesList';
import { InfoHeader } from '@/app/_components/Card/Shared/InfoHeader';
import { PlacesOfWorkList } from '@/app/_components/Card/Shared/PlacesOfWorkList';

export function InfoWrapper({ gender, firstName, lastName, className }) {
  const labels = [
    {
      icon: <MedCare />,
      content: '10 років досвіду',
      color: 'text-other-green',
    },
    {
      icon: <MedAttention />,
      content: 'Безкоштовний прийом',
      color: 'text-other-orange',
    },
    {
      icon: <OnlineMeeting />,
      content: 'Онлайн консультації',
      color: 'text-other-blue',
    },
  ];

  return (
    <div className={className}>
      <InfoHeader gender={gender} firstName={firstName} lastName={lastName}></InfoHeader>
      <SpecializationList>
        {labels.map(({ icon, content, color }) => (
          <SpecializationListItem
            icon={icon}
            key={content}
            text={content}
            className={cn('md:flex-0 flex-1 text-other-green md:flex-shrink', color)}
          />
        ))}
      </SpecializationList>
      <TherapiesList />
      <PlacesOfWorkList className="mt-[24px]" />
      <PillButton
        type={buttonType.outlined}
        colorVariant={buttonColorVariant.outlined.orange}
        className="ml-auto mt-[16px] hidden md:block"
      >
        Детальніше
      </PillButton>
    </div>
  );
}

InfoWrapper.propTypes = {
  firstName: PropType.string,
  lastName: PropType.string,
  gender: PropType.bool,
  className: PropType.node,
};
