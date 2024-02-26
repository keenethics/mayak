import React from 'react';
import PropTypes from 'prop-types';
import СloseIcon from '../../../../public/assets/icons/closeIcon.svg';

export const ModalCloseButton = ({ onClose }) => (
  <button onClick={onClose} className="p-[9.3px]">
    <СloseIcon
      alt="Сlose Icon"
      aria-label="Сlose Icon"
      priority="true"
      className="text-gray-700 hover:text-primary-400"
    />
  </button>
);

ModalCloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};
