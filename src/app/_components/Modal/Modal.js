'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ClientPortal } from '../ClientPortal';
import { ModalCloseButton } from './ModalCloseButton';
import { cn } from '@/utils/cn';

export const Modal = ({
  isOpen,
  onClose,
  isBlurBackground = true,
  isCloseButton = true,
  bgColor,
  title,
  children,
  className,
}) => {
  const blurBackground = <div className="no-scrollbar fixed left-0 top-0 z-[150] h-full w-full backdrop-blur-sm"></div>;

  const motionData = {
    initial: {
      opacity: 0.5,
      y: '20vh',
      transition: { duration: 0.1 },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      y: '10vh',
      transition: { duration: 0.2 },
    },
  };

  return (
    <ClientPortal selector="modal-root" show={isOpen}>
      {isOpen && (
        <>
          {isBlurBackground && blurBackground}
          <div
            className="no-scrollbar fixed left-0 top-0 z-[200] grid h-full w-full place-content-center overflow-y-scroll"
            onClick={onClose}
          >
            <motion.div
              className={cn('rounded-xl px-4 py-[18px] shadow-custom-2 md:p-6', bgColor, className)}
              onClick={e => {
                e.stopPropagation();
              }}
              {...motionData}
            >
              <div className="flex items-center justify-center text-center">
                <p className="w-full pl-2 pr-2 text-p2 md:pl-6 md:pr-6">{title}</p>

                {isCloseButton && <ModalCloseButton onClose={onClose} />}
              </div>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </ClientPortal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isBlurBackground: PropTypes.bool,
  isCloseButton: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};
