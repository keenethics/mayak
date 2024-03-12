import { useRef } from 'react';
import PropTypes from 'prop-types';

export function FilterDropdown({ children, setOpened }) {
  const dropdownRef = useRef(null);
  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpened(false);
      document.removeEventListener('click', handleClickOutside);
    }
  };
  document.addEventListener('click', handleClickOutside);
  return (
    <div
      ref={dropdownRef}
      className="absolute top-8 z-10 flex w-max flex-col rounded-3xl border bg-other-white px-2 py-1"
    >
      {children}
    </div>
  );
}

FilterDropdown.propTypes = {
  setOpened: PropTypes.func,
  children: PropTypes.node,
};
