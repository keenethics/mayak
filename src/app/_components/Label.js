import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function Label({ className, textClassName, icon, text }) {
  return (
    <div className={cn('inline-flex items-center justify-center gap-1 rounded-3xl px-3 py-1', className)}>
      {icon}
      <p className={cn('text-c3', textClassName)}>{text}</p>
    </div>
  );
}

Label.propTypes = {
  className: PropTypes.string,
  textClassName: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.element,
};
