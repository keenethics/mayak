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
  const blurBackground = <div className="fixed left-0 top-0 z-[150] h-full w-full backdrop-blur-sm"></div>;

  return (
    <ClientPortal selector="modal-root" show={isOpen}>
      {isOpen && (
        <>
          {isBlurBackground && blurBackground}
          <div
            className="fixed left-0 top-0 z-[200] flex h-full w-full items-center justify-center overflow-y-scroll"
            onClick={onClose}
          >
            <motion.div
              className={cn(
                `rounded-xl shadow-[0_0_32px_0px_rgba(0,58,113,0.25)] ${bgColor} px-4 py-[18px] md:p-6`,
                className,
              )}
              onClick={e => {
                e.stopPropagation();
              }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, y: 100, transition: { duration: 0.2 } }}
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
