import React from 'react';
import Link from 'next/link';
import P from 'prop-types';
import { cn } from '@utils/cn';
import { ContactText } from './ContactText';

export function ContactsListItem({ contact, className }) {
  const { icon, content, href } = contact;
  return (
    <li className={cn('flex gap-[8px]', className)} key={content}>
      <span className="flex w-[20px] justify-center">{icon}</span>
      <ContactText>
        {Array.isArray(content) ? (
          content.map(c => <p key={c}>{c}</p>)
        ) : (
          <Link href={href} target="_blank">
            {content}
          </Link>
        )}
      </ContactText>
    </li>
  );
}

ContactsListItem.propTypes = {
  contact: P.object,
  className: P.string,
};
