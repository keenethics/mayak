import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

export function UpDownArrowMenu({ onIncrease, onDecrease, disabled, children }) {
  return (
    <div className="grid h-full w-full grid-cols-[min-content_min-content_min-content] place-items-center gap-2">
      <button className="h-full" onClick={onIncrease} disabled={disabled}>
        <FaAngleUp />
      </button>
      {children}
      <button className="h-full" onClick={onDecrease} disabled={disabled}>
        <FaAngleDown />
      </button>
    </div>
  );
}

UpDownArrowMenu.propTypes = {
  children: PropTypes.node,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
  disabled: PropTypes.bool,
};
