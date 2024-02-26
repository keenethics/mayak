'use client';

import { cloneElement, createContext, useContext, useState } from 'react';
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

export function Show({ children, opens: opensWindowName }) {
  const { open, close } = useContext(HintContext);

  // let timeoutId = null;

  // setting timeout to prevent element "blinking" when mouse moves from trigger to window
  return cloneElement(children, {
    id: opensWindowName,
    onMouseEnter: () => {
      // if (timeoutId !== null) {
      //   clearTimeout(timeoutId);
      //   timeoutId = null;
      // }
      open(opensWindowName);
    },
    onMouseLeave: () => {
      // timeoutId = setTimeout(close, 400); // 100ms delay
      close();
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
          'shadow-[0_2px_8px_0_rgba(192, 191, 206, 0.50)] absolute z-[100] inline-flex items-center justify-center gap-[10px] rounded-[4px] bg-other-white bg-opacity-60 px-[4px] py-[8px] text-center text-[10px] font-medium leading-[0.938rem] backdrop-blur-[3px]',
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
};
