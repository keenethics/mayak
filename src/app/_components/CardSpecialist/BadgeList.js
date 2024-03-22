import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { specialistLabelPropType } from '@components/CardSpecialist/prop-types';

function BadgeListItem({ icon, text, className }) {
  return (
    <div className={cn('flex flex-col gap-2.5 md:flex-row', className)}>
      <span className="h-[15px] w-[15px] self-center lg:h-5 lg:w-5">{icon}</span>
      <p className="text-center text-c4 font-semibold md:self-center md:text-left lg:text-p4">{text}</p>
    </div>
  );
}

BadgeListItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  className: PropTypes.string,
};

export function BadgeList({ labels, className }) {
  const labelsFiltered = labels.filter(label => !!label.content);

  return (
    <ul
      className={cn(
        'flex gap-6 border-t border-dashed border-t-gray-200 pt-4 md:flex-initial md:gap-6 md:border-0 md:pt-0',
        className,
      )}
    >
      {labelsFiltered.map(({ icon, content, color }) => (
        <BadgeListItem
          icon={icon}
          key={content}
          text={content}
          className={cn('flex-shrink-1 flex-initial justify-between gap-2 text-other-green', color)}
        />
      ))}
    </ul>
  );
}

BadgeList.propTypes = {
  labels: PropTypes.arrayOf(specialistLabelPropType),
  className: PropTypes.string,
};
