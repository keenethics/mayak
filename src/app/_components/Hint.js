'use client';

import { cloneElement, createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/cn';
import { ClientPortal } from './ClientPortal';

const HintContext = createContext();

export function Hint({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return <HintContext.Provider value={{ open, close, openName }}>{children}</HintContext.Provider>;
}

export function Show({ children, opens: opensWindowName, actions }) {
  const { open, close } = useContext(HintContext);

  // close hints when window is scrolled
  useEffect(() => {
    const handleScroll = () => {
      close();
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [close]);

  return cloneElement(children, {
    id: opensWindowName,
    onClick: e => {
      e.stopPropagation();
      actions?.onClick?.({ open, close });
    },
    onMouseEnter: e => {
      e.stopPropagation();
      actions?.onMouseEnter?.({ open, close });
    },
    onMouseLeave: e => {
      e.stopPropagation();
      actions?.onMouseLeave?.({ open, close });
    },
  });
}

export function Window({ children, name, className }) {
  const { openName } = useContext(HintContext);
  // translate-x-1/5 translate-y-1/4
  return (
    <ClientPortal selector={name} show={name === openName}>
      <div
        className={cn(
          'pointer-events-none absolute z-[100] inline-flex items-center justify-center gap-[10px] rounded' +
            ' bg-other-white bg-opacity-60 px-1 py-2 text-center text-[10px] font-medium leading-[0.938rem]' +
            ' shadow-[0_2px_8px_0px_rgba(192,191,206,0.50)] backdrop-blur-[3px] transition-all',
          className,
        )}
      >
        {children}
      </div>
    </ClientPortal>
  );
}

export function useHintContext() {
  const context = useContext(HintContext);
  if (context === undefined) throw new Error('HintContext was used outside HintProvider');
  return context;
}

Window.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Hint.propTypes = {
  children: PropTypes.node,
};

Show.propTypes = {
  children: PropTypes.node.isRequired,
  opens: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  }),
};
