import { useEffect } from 'react';

export function useBodyScrollLock(locked, axis) {
  const axises = {
    x: 'overflow-x-hidden',
    y: 'overflow-y-hidden',
    xy: 'overflow-hidden',
  };
  if (axises[axis] === undefined) {
    throw Error('Invalid axis parameter must be x, y or xy');
  }
  useEffect(() => {
    if (locked) {
      document.body.classList.add(axises[axis]);
    } else {
      document.body.classList.remove(axises[axis]);
    }
    return () => {
      document.body.classList.remove(axises[axis]);
    };
  });
}
