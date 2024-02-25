'use client';

import React, { useEffect, useState } from 'react';
import P from 'prop-types';
import { Modal } from '@components';
import { useRouter } from 'next/navigation';
import { useBodyScrollLock } from '@hooks';
import { CardSpecialist } from '@/app/_components/Card/CardSpeсialist/CardSpecialist';
import { useScrollPosition } from '@/app/_hooks/useScrollPosition';
import { cn } from '@/utils/cn';

export function CardSpecialistExtended({ specialist, className }) {
  const scrollPosition = useScrollPosition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleClose() {
    return router.push(`/specialist#${specialist.id}`, { scroll: !scrollPosition });
  }

  // this is to ensure proper modal rendering
  useEffect(() => {
    setOpen(true);
  }, []);

  useBodyScrollLock('y');

  return (
    <Modal isOpen={open} onClose={handleClose} bgColor="bg-other-white"
      className="w-[100%] mx-[16px] lg:max-w-[1000px] p-[24px]">
      <CardSpecialist specialist={specialist} className={cn('pointer-events-none', className)} extended={true} />
    </Modal>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: P.object,
  className: P.string,
};
