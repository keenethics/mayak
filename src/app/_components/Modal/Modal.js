import React from 'react';
import PropTypes from 'prop-types';
import { ClientPortal } from './ClientPortal';
import { ModalCloseButton } from './ModalCloseButton';

export const Modal = ({ isOpen, onClose, isBlurBackground = true, isCloseButton = true, bgColor, title, children }) => {
  const blurBackground = <div className="fixed left-0 top-0 h-full w-full backdrop-blur-sm z-10"></div>;

  return (
    <ClientPortal selector="modal-root" show={isOpen}>
      {isOpen && (
        <>
          {isBlurBackground && blurBackground}
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center z-10" onClick={onClose}>
            <div
              className={`rounded-xl shadow-[0_0_32px_0px_rgba(0,58,113,0.25)] ${bgColor} px-4 py-[18px] md:p-6`}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <div className="flex items-center justify-center text-center">
                <p className="w-full  pl-2 pr-2 text-p2 md:pl-6 md:pr-6">{title}</p>

                {isCloseButton && <ModalCloseButton onClose={onClose} />}
              </div>

              {children}
            </div>
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
};
