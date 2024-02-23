import React from 'react';
import P from 'prop-types';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { Paragraph } from '../../Typography';

export function ContactsListItem({ contact, className }) {
  const { id, icon, content, href } = contact;

  return (
    <li className={cn('flex gap-[8px]', className)} key={id}>
      <span className="flex w-[20px] justify-center">{icon}</span>
      <span
        className={cn(
          `text-inherit font-inherit line-clamp-1 text-start text-[12px] leading-[1.125rem] text-gray-700 lg:text-c3`,
        )}
      >
        {Array.isArray(content) ? (
          content.map(c => (
            <p key={c} className={cn('line-clamp-1')}>
              {c}
            </p>
          ))
        ) : (
          <Link
            href={href}
            target="_blank"
            // noopener norefferer
          >
            <Paragraph className={cn('line-clamp-1 text-primary-400')}>{content}</Paragraph>
          </Link>
        )}
      </span>
    </li>
  );
}

ContactsListItem.propTypes = {
  contact: P.object,
  className: P.string,
};
