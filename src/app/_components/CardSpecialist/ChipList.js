import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function ChipList({ className, items }) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map(el => (
        <div
          className="flex items-center gap-1 rounded-full bg-primary-300 px-3 py-1 text-c3 font-medium"
          style={{
            backgroundColor: el.color,
          }}
          key={el.id}
        >
          {el.icon}
          <span
            style={{
              color: el.textColor,
            }}
          >
            {el.name}
          </span>
        </div>
      ))}
    </ul>
  );
}

ChipList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
      textColor: PropTypes.string,
      className: PropTypes.string,
      icon: PropTypes.node,
    }),
  ),
};
