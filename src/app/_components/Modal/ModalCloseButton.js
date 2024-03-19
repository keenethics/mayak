'use client';

import PropTypes from 'prop-types';
import { CloseIcon } from '@icons';

export const ModalCloseButton = ({ onClose }) => (
  <button onClick={onClose} className="p-[9.3px]">
    <CloseIcon
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
