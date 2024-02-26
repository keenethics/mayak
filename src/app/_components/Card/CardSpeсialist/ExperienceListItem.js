import React from 'react';
import P from 'prop-types';
import { cn } from '@/utils/cn';

function ExperienceListItem({ icon, text, className }) {
  return (
    <div className={cn('flex flex-col gap-[10px] md:flex-row', className)}>
      <span className="h-[15px] w-[15px] self-center sm:h-[15px] sm:w-[15px] md:h-[15px] md:w-[15px] lg:h-[20px] lg:w-[20px]">
        {icon}
      </span>
      <p className={cn('text-center text-c2 font-semibold md:self-center md:text-left lg:text-p4')}>{text}</p>
    </div>
  );
}

export { ExperienceListItem };

ExperienceListItem.propTypes = {
  icon: P.element,
  text: P.string,
  className: P.string,
};
