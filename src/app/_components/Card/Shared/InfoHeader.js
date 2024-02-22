import React from 'react';
import PropType from 'prop-types';
import { cn } from '@utils/cn';
import { ProfileImageSpecialist } from '@/app/_components/Card/Shared/ProfileImageSpecialist';
import { SpecializationsPanel } from '@/app/_components/Card/Shared/SpecializationsPanel';

export function InfoHeader({ gender, firstName, lastName, className }) {
  const specializations = ['психотерапевт', 'сексолог'];

  return (
    <header className={cn('flex gap-[10px]', className)}>
      <ProfileImageSpecialist gender={gender} className="md:hidden" />
      <div>
        <SpecializationsPanel specializations={specializations}></SpecializationsPanel>
        <h4 className="text-p3 font-bold text-gray-700 md:text-p1">{`${firstName} ${lastName}`}</h4>
      </div>
    </header>
  );
}

InfoHeader.propTypes = {
  firstName: PropType.string,
  lastName: PropType.string,
  gender: PropType.bool,
  className: PropType.node,
};
