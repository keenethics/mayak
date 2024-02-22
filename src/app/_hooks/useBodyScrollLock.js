import { useEffect } from 'react';

export function useBodyScrollLock(locked, axis = 'xy') {
  const axes = {
    x: 'overflow-x-hidden',
    y: 'overflow-y-hidden',
    xy: 'overflow-hidden',
  };
  if (axes[axis] === undefined) {
    throw Error('Invalid axis parameter must be x, y or xy');
  }
  useEffect(() => {
    if (locked) {
      document.body.classList.add(axes[axis]);
    } else {
      document.body.classList.remove(axes[axis]);
    }
    return () => {
      document.body.classList.remove(axes[axis]);
    };
  }, [locked, axis]);
}
