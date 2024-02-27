import React from 'react';
import P from 'prop-types';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { specialistContactPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';

export function ContactsListItem({ contact, className }) {
  const { id, icon, content, href } = contact;

  return (
    <li className={cn('flex gap-[8px]', className)} key={id}>
      <span className="flex w-[20px] items-center justify-center">{icon}</span>
      <span
        className={cn(
          `text-inherit font-inherit line-clamp-1 text-start text-[12px] leading-[1.125rem] text-gray-700 lg:text-c3`,
        )}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {Array.isArray(content) ? (
          content.map(item => (
            <p key={item} className={cn('line-clamp-1')}>
              {item}
            </p>
          ))
        ) : href ? (
          <Link href={href} target="_blank" rel="noopener noreferrer" className="line-clamp-1 text-primary-400">
            {content}
          </Link>
        ) : (
          <p className="line-clamp-1 break-all">{content}</p>
        )}
      </span>
    </li>
  );
}

ContactsListItem.propTypes = {
  contact: specialistContactPropType,
  className: P.string,
};
