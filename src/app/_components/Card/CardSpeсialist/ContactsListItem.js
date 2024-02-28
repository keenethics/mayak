import React from 'react';
import P from 'prop-types';
import { cn } from '@/utils/cn';
import { specialistContactPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';
import { ListTruncator } from '../../ListTruncator';

export function ContactsListItem({ specialistId, contact, className }) {
  const { id, icon, content, href } = contact;
  return (
    <div className="relative">
      <ListTruncator
        id={specialistId}
        items={[content]}
        itemRender={(i, index) => (
          <li className={cn('flex gap-[8px]', className)} key={id}>
            <span className="flex w-[20px] items-center justify-center">{icon}</span>
            <span
              className={cn(
                `text-inherit font-inherit max-w-full
          text-start text-[12px] leading-[1.125rem] text-gray-700 lg:text-c3`,
              )}
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {Array.isArray(content) ? (
                content.map(item => <p key={item}>{item}</p>)
              ) : (
                <a key={index} href={href} className="whitespace-nowrap break-normal">
                  {content}
                </a>
              )}
            </span>
          </li>
        )}
        tooltipItemRender={(i, index) => <p key={index}>{content}</p>}
      />
    </div>
  );
}

ContactsListItem.propTypes = {
  contact: specialistContactPropType,
  className: P.string,
  specialistId: P.string.isRequired,
};
