import React from 'react';
import PropTypes from 'prop-types';
import { ClientPortal } from './ClientPortal';
import { ModalCloseButton } from './ModalCloseButton';

export const Modal = ({
  isOpen,
  onClose,
  isBlurBackground = true,
  isCloseButton = true,
  children,
}) => {
  const blurBackground = (
    <div className="fixed left-0 top-0 h-full w-full backdrop-blur-sm"></div>
  );

  return (
    <ClientPortal selector="modal-root" show={isOpen}>
      {isOpen && (
        <>
          {isBlurBackground && blurBackground}
          <div
            className="fixed left-0 top-0 flex h-full w-full items-center justify-center"
            onClick={onClose}
          >
            {isCloseButton ? (
              <ModalCloseButton onClose={onClose}>{children}</ModalCloseButton>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {children}
              </div>
            )}
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
  children: PropTypes.node.isRequired,
};
