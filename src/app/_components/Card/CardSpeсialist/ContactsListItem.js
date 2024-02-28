import React from 'react';
import P from 'prop-types';
import { cn } from '@/utils/cn';
import { specialistContactPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';
import { ListTruncator } from '../../ListTruncator';

export function ContactsListItem({ specialistId, contact, className }) {
  const { id, icon, content, href } = contact;
  return (
    <li className={cn('flex max-w-full gap-[8px]', className)} key={id}>
      <span className="flex w-[20px] items-center justify-center">{icon}</span>
      <span
        className={cn(
          `text-inherit font-inherit relative max-w-full
          text-start text-[12px] leading-[1.125rem] text-gray-700 lg:text-c3`,
        )}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {Array.isArray(content) ? (
          content.map(item => (
            <p key={item} className={'line-clamp-1'}>
              {item}
            </p>
          ))
        ) : (
          <ListTruncator
            id={specialistId}
            items={[content]}
            itemRender={(item, index) => (
              <a key={index} href={href} className="whitespace-nowrap">
                {item}
              </a>
            )}
            tooltipItemRender={(item, index) => (
              <a key={index} href={href} className="whitespace-nowrap">
                {item}
              </a>
            )}
          />
        )}
      </span>
    </li>
  );
}

ContactsListItem.propTypes = {
  contact: specialistContactPropType,
  className: P.string,
  specialistId: P.string.isRequired,
};
