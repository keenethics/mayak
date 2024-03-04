'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@components';
import { useRouter } from 'next/navigation';
import { useBodyScrollLock } from '@hooks';
import { cn } from '@/utils/cn';

export function CardModalWrapper({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleClose() {
    router.back('/specialist');
  }

  // this is to ensure proper modal rendering
  useEffect(() => {
    setIsOpen(true);
  }, []);

  useBodyScrollLock(isOpen, 'y');

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      bgColor="bg-other-white"
      className={cn(
        'fixed bottom-0 top-0 overflow-y-auto rounded-b-none rounded-tl-3xl lg:static' +
          ' rounded-tr-3xl lg:mx-4 lg:rounded-3xl lg:p-[50px]' +
          ' lg:max-w-[1000px]',
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
