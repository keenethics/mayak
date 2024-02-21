import React from 'react';
import P from 'prop-types';
import { cn } from '@/utils/cn';

function SpecializationTextIcon({ icon, text, className }) {
  return (
    <div className={cn('flex items-center gap-[11px]', className)}>
      {icon}
      <span className={cn('text-inherit text-center text-p4 font-semibold')}>{text}</span>
    </div>
  );
}

export { SpecializationTextIcon };

SpecializationTextIcon.propTypes = {
  icon: P.node,
  text: P.string,
  className: P.string,
};
