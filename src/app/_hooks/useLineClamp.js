/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';

export function useLineClamp(ref, lines = 1) {
  const [clamps, setClamps] = useState(true);

  useEffect(() => {
    const checkClamps = () => {
      if (!ref.current) return;

      const initialValues = {
        webkitLineClamp: ref.current.style.webkitLineClamp,
        display: ref.current.style.display,
        webkitBoxOrient: ref.current.style.webkitBoxOrient,
        overflow: ref.current.style.overflow,
      };

      ref.current.style.webkitLineClamp = lines.toString();
      ref.current.style.display = '-webkit-box';
      ref.current.style.webkitBoxOrient = 'vertical';
      ref.current.style.overflow = 'hidden';

      setClamps(ref.current.clientHeight !== ref.current.scrollHeight);

      ref.current.style.webkitLineClamp = initialValues.webkitLineClamp;
      ref.current.style.display = initialValues.display;
      ref.current.style.webkitBoxOrient = initialValues.webkitBoxOrient;
      ref.current.style.overflow = initialValues.overflow;
    };

    checkClamps();

    window.addEventListener('resize', checkClamps);
    return () => window.removeEventListener('resize', checkClamps);
  }, [ref, lines]);

  return clamps;
}
