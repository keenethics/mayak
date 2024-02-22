import React from 'react';
import P from 'prop-types';
import { cn } from '@utils/cn';
import { ExperienceListItem } from '@/app/_components/Card/Shared/ExperienceListItem';

export function ExperienceList({ labels, className }) {
  return (
    <ul className={cn('flex  gap-[10px] md:flex-initial md:gap-[24px]', className)}>
      {labels.map(({ icon, content, color }) =>
        content ? (
          <ExperienceListItem
            icon={icon}
            key={content}
            text={content}
            className={cn('flex-1 text-other-green md:flex-initial md:flex-shrink', color)}
          />
        ) : (
          ''
        ),
      )}
    </ul>
  );
}

ExperienceList.propTypes = {
  labels: P.array,
  className: P.string,
};
