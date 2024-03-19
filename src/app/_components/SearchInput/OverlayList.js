import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { cn } from '@/utils/cn';
import { useOverflowChildren } from '@/app/_hooks';

export function OverlayList({ listItems, className, isLoading, onItemsOverflow = () => {} }) {
  const itemsListRef = useRef(null);
  const overflown = useOverflowChildren(itemsListRef);
  useEffect(() => {
    onItemsOverflow(overflown);
  }, [overflown, onItemsOverflow]);
  return (
    <>
      {isLoading && (
        <div className="flex justify-center py-2">
          <CircularProgress />
        </div>
      )}
      {listItems && (
        <ul ref={itemsListRef} className={cn('overlay-scrollbar max-h-[150px] overflow-auto', className)}>
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
      )}
    </>
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
  isLoading: PropTypes.bool,
  onItemsOverflow: PropTypes.func,
};
