import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';
import presets from '@/app/styles/tailwind';

export function ChipList({ className, items, wrap }) {
  const chipListRef = useRef(null);
  const [truncateAt, setTruncateAt] = useState(null);

  const truncatedCount = items.length - truncateAt;

  useEffect(() => {
    const node = chipListRef.current;

    const resizeHandler = () => {
      // don't truncate if wrapping is allowed
      if (wrap) {
        setTruncateAt(null);
        return;
      }

      const nodeRect = node.getBoundingClientRect();
      const children = Array.from(node.children);

      let i = 0;
      let overflowIndex = -1;

      while (i < children.length) {
        const childRect = children[i].getBoundingClientRect();
        if (childRect.right > nodeRect.right) {
          overflowIndex = i;
          break;
        }
        i += 1;
      }
      setTruncateAt(overflowIndex === -1 ? null : overflowIndex - 1);
    };

    resizeHandler();
    node.addEventListener('resize', resizeHandler);
    return () => {
      node.removeEventListener('resize', resizeHandler);
    };
  }, [wrap]);

  return (
    <ul ref={chipListRef} className={cn('flex w-full gap-2', wrap && 'flex-wrap', className)}>
      {truncateAt === null ? (
        items.map(el => (
          <ChipListItem key={el.id} name={el.name} color={el.color} textColor={el.textColor} icon={el.icon} />
        ))
      ) : (
        <>
          {items.slice(0, truncateAt).map(el => (
            <ChipListItem key={el.id} name={el.name} color={el.color} textColor={el.textColor} icon={el.icon} />
          ))}
          <ChipListItem name={`${truncatedCount}+`} color="rgba(0,0,0,0)" textColor={presets.theme.colors.gray[900]} />
        </>
      )}
    </ul>
  );
}

function ChipListItem({ name, icon, color, textColor }) {
  return (
    <div
      className="flex items-center gap-1 rounded-full bg-primary-300 px-3 py-1 text-c3 font-medium"
      style={{
        backgroundColor: color,
      }}
    >
      {icon}
      <span
        className="whitespace-nowrap"
        style={{
          color: textColor,
        }}
      >
        {name}
      </span>
    </div>
  );
}

const chipListPropType = {
  id: PropTypes.any,
  name: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  icon: PropTypes.node,
};

ChipList.propTypes = {
  className: PropTypes.string,
  wrap: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape(chipListPropType)).isRequired,
};

ChipListItem.propTypes = chipListPropType;
