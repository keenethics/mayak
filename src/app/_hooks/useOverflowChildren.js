import { useEffect, useState } from 'react';

export function useOverflowChildren(ref) {
  const [state, setState] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new ResizeObserver(elements => {
      const el = elements[0];
      const children = Array.from(el.target.children);

      const isAnyOverflown = children.some(child => {
        const childRect = child.getBoundingClientRect();
        const containerRect = node.getBoundingClientRect();

        return (
          childRect.top < containerRect.top ||
          childRect.left < containerRect.left ||
          childRect.bottom > containerRect.bottom ||
          childRect.right > containerRect.right
        );
      });

      setState(isAnyOverflown);
    });
    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [ref]);

  return state;
}
