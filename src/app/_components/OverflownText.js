import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';

export function ToolTip({ text, top, left }) {
  return (
    <div
      className={cn(
        'absolute z-10 w-max scale-0 rounded bg-other-white px-1 py-2 shadow-custom-3 group-hover:scale-100',
        top,
        left,
      )}
    >
      <p className="text-c2">{text}</p>
    </div>
  );
}

export function OverflownText({ className, text }) {
  const ref = useRef(null);
  const [isOverflown, setIsOverflown] = useState(false);
  useEffect(() => {
    const element = ref.current;
    setIsOverflown(element.scrollWidth > element.clientWidth);
  }, []);
  return (
    <div className="group relative">
      <p ref={ref} className={className}>
        {text}
      </p>
      {isOverflown && <ToolTip text={text} />}
    </div>
  );
}

OverflownText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

ToolTip.propTypes = {
  text: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
};
