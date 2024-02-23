'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@components';
import { useRouter } from 'next/navigation';
import { useBodyScrollLock } from '@hooks';
import P from 'prop-types';
import { CardSpecialist } from '@/app/_components/Card/CardSpeсialist/CardSpecialist';
import { cn } from '@/utils/cn';

export function CardSpecialistExtended({ specialist, className }) {
  const router = useRouter();

  function handleClose() {
    return router.back();
  }

  const [open, setOpen] = useState(false);

  // TODO: add comment
  useEffect(() => {
    setOpen(true);
  }, []);

  useBodyScrollLock('y');

  return (
    <Modal isOpen={open} onClose={handleClose} bgColor="bg-other-white">
      <CardSpecialist specialist={specialist} className={cn('border-0 shadow-none', className)} />
    </Modal>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: P.object,
  className: P.string,
};
