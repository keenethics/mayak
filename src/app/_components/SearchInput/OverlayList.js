import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function OverlayList({ listItems, className }) {
  return (
    listItems && (
      <ul className={cn('overlay-scrollbar max-h-[150px] overflow-auto', className)}>
        {listItems.map(item => (
          <li
            className="rounded-full p-2 pl-8 hover:bg-gray-200 hover:font-bold hover:text-primary-800"
            key={item.id}
            onClick={item.onClick}
          >
            {item.title}
          </li>
        ))}
      </ul>
    )
  );
}

OverlayList.propTypes = {
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      onClick: PropTypes.func,
      title: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
};
