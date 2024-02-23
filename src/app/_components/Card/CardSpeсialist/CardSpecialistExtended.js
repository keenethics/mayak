'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@components';
import { useRouter } from 'next/navigation';
import { useBodyScrollLock } from '@hooks';

export function CardSpecialistExtended() {
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
    <Modal isOpen={open} onClose={handleClose} title="Title of modal" bgColor="bg-primary-200">
      <p>Modal content goes here..</p>
    </Modal>
  );
}
