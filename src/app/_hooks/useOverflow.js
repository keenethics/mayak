import { useRef, useState, useCallback, useEffect } from 'react';

export function useOverflow() {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [overflown, setOverflown] = useState(false);

  const calculateOverflow = useCallback(() => {
    const wrapperWidth = wrapperRef.current?.offsetWidth;
    const containerWidth = containerRef.current?.offsetWidth;
    if (wrapperWidth > containerWidth) {
      setOverflown(true);
    } else {
      setOverflown(false);
    }
  }, []);

  useEffect(() => {
    calculateOverflow();
    window.addEventListener('resize', calculateOverflow);

    return () => {
      window.removeEventListener('resize', calculateOverflow);
    };
  }, [calculateOverflow]);

  return { wrapperRef, containerRef, overflown };
}
