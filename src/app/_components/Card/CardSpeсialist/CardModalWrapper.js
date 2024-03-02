'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@components';
import { useRouter } from 'next/navigation';
import { useBodyScrollLock } from '@hooks';
import { cn } from '@/utils/cn';

export function CardModalWrapper({ children, className }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleClose() {
    router.push(`/specialist`, { scroll: false });
  }

  // this is to ensure proper modal rendering
  useEffect(() => {
    setOpen(true);
  }, []);

  useBodyScrollLock('y');

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      bgColor="bg-other-white"
      className={cn(
        'no-scrollbar h-full overflow-y-scroll rounded-b-none rounded-tl-[24px]' +
          ' rounded-tr-[24px] md:mx-[16px] md:mt-0 md:h-auto md:rounded-[24px] md:px-[50px] md:pb-[50px] lg:max-w-[1000px]',
        className,
      )}
    >
      {children}
    </Modal>
  );
}

CardModalWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
