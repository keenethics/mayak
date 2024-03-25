'use client';

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Show as ShowHint, Window as HintWindow } from '@components/Hint';
import { cn } from '@/utils/cn';
import presets from '@/app/styles/tailwind';

export function ChipList({ id, className, items, wrap }) {
  const chipListRef = useRef(null);
  const [maxChipWidth, setMaxChipWidth] = useState(0);
  const [truncateAt, setTruncateAt] = useState(null);
  const truncatedCount = items.length - truncateAt;

  useEffect(() => {
    const node = chipListRef.current;
    const children = Array.from(node.children);
    let maxChildWidth = 0;
    children.forEach(el => {
      maxChildWidth = Math.max(maxChildWidth, el.getBoundingClientRect().width);
    });
    setMaxChipWidth(maxChildWidth);
  }, [items]);

  useEffect(() => {
    const node = chipListRef.current;
    const resizeHandler = () => {
      // don't truncate if wrapping is allowed
      if (wrap) {
        setTruncateAt(null);
        return;
      }
      if (truncateAt === null) {
        setTruncateAt(0);
        return;
      }

      const nodeRect = node.getBoundingClientRect();
      const children = Array.from(node.children);
      const child = children[Math.min(items.length - 1, truncateAt)];
      const childRect = child.getBoundingClientRect();

      if (childRect.right < nodeRect.right - (maxChipWidth + 36)) {
        setTruncateAt(state => Math.min(state + 1, items.length));
      } else if (childRect.right > nodeRect.right) {
        setTruncateAt(state => Math.max(state - 1, 0));
      }
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [wrap, truncateAt, items.length, maxChipWidth]);

  return (
    <ul ref={chipListRef} className={cn('flex w-full gap-2', wrap && 'flex-wrap', className)}>
      {truncateAt >= items.length || truncateAt === null ? (
        items.map(el => (
          <ChipListItem key={el.id} name={el.name} color={el.color} textColor={el.textColor} icon={el.icon} />
        ))
      ) : (
        <>
          {items.slice(0, truncateAt).map(el => (
            <ChipListItem key={el.id} name={el.name} color={el.color} textColor={el.textColor} icon={el.icon} />
          ))}

          <ShowHint id={id} opens={id}>
            <div className="relative">
              <ChipListItem
                name={`${truncatedCount}+`}
                color="rgba(0,0,0,0)"
                textColor={presets.theme.colors.gray[900]}
              />
            </div>
          </ShowHint>
          <HintWindow
            id={id}
            name={id}
            className={cn('absolute left-[-170px] z-[200] flex w-[200px] select-text flex-col text-gray-900')}
          >
            <p>{items.map(el => el.name).join('; ')}</p>
          </HintWindow>
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
  id: PropTypes.string,
  className: PropTypes.string,
  wrap: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape(chipListPropType)).isRequired,
};

ChipListItem.propTypes = chipListPropType;
