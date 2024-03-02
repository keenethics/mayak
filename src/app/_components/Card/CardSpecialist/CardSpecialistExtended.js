'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@components';
import { useRouter } from 'next/navigation';
import { useBodyScrollLock } from '@hooks';
import { CardSpecialist } from '@/app/_components/Card/CardSpecialist/CardSpecialist';
import { cn } from '@/utils/cn';
import { specialistPropType } from '@/app/_components/Card/CardSpecialist/prop-types';

export function CardSpecialistExtended({ specialist, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleClose() {
    router.push(`/specialist`, { scroll: false });
  }
  // this is to ensure proper modal rendering
  useEffect(() => {
    setIsOpen(true);
  }, []);

  useBodyScrollLock('y');

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      bgColor="bg-other-white"
      className="no-scrollbar mt-[50px] h-full overflow-y-scroll rounded-b-none rounded-tl-[24px] rounded-tr-[24px] md:mx-[16px] md:mt-0 md:h-auto md:rounded-[24px] md:px-[50px] md:pb-[50px] lg:max-w-[1000px]"
    >
      <CardSpecialist specialist={specialist} className={cn(className)} extended={true} />
    </Modal>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};
