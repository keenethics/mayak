import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function Label({ bgColor, textColor, icon, text }) {
  return (
    <div className={cn('inline-flex items-center justify-center gap-1 rounded-3xl px-3 py-1', bgColor)}>
      {icon}
      <p className={cn('text-c3', textColor)}>{text}</p>
    </div>
  );
}

Label.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.element,
};
