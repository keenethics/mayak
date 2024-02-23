import React from 'react';
import P from 'prop-types';
import { cn } from '@/utils/cn';

function ExperienceListItem({ icon, text, className }) {
  return (
    <div className={cn('line-clamp-1 flex flex-col gap-[10px] md:flex-row', className)}>
      <span className="self-center">{icon}</span>
      <p className={cn(' text-center text-c2 font-semibold md:self-center md:text-left lg:text-p4')}>{text}</p>
    </div>
  );
}

export { ExperienceListItem };

ExperienceListItem.propTypes = {
  icon: P.node,
  text: P.string,
  className: P.string,
};
