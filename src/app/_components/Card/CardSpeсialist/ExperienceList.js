import React from 'react';
import P from 'prop-types';
import { cn } from '@/utils/cn';
import { ExperienceListItem } from './ExperienceListItem';
import { specialistLabelPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';
import { borderStyle } from '@/app/_components/Card/CardSpeсialist/config';

export function ExperienceList({ labels, className }) {
  return (
    <ul
      className={cn(
        'flex gap-[24px] border-t pt-[16px] md:flex-initial md:gap-[24px] md:border-0 md:pt-0',
        borderStyle,
        className,
      )}
    >
      {labels.map(({ icon, content, color }) =>
        content ? (
          <ExperienceListItem
            icon={icon}
            key={content}
            text={content}
            className={cn('flex-shrink-1 flex-initial justify-between gap-2 text-other-green', color)}
          />
        ) : (
          ''
        ),
      )}
    </ul>
  );
}

ExperienceList.propTypes = {
  labels: P.arrayOf(specialistLabelPropType),
  className: P.string,
};
