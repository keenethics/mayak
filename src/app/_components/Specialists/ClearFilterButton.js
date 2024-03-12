import PropTypes from 'prop-types';
import { PillButton } from '../PillButton';

export function ClearFilterButton({ clear }) {
  return (
    <PillButton onClick={clear} variant="text" colorVariant="blue" className="self-end">
      Очистити
    </PillButton>
  );
}

ClearFilterButton.propTypes = {
  clear: PropTypes.func,
};
