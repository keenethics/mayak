import React from 'react';
import P from 'prop-types';
import Link from 'next/link';
import { ListTruncator } from '@components';
import { specialistContactPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';
import { cn } from '@/utils/cn';

function ContactItem({ type, content, href, className }) {
  return (
    <>
      {type === 'link' && (
        <Link href={href} target="_blank" rel="noopener noreferrer" className={cn('text-primary-400', className)}>
          {content}
        </Link>
      )}
      {type === 'text' && <p className={cn('text-c3 text-gray-900', className)}>{content}</p>}
    </>
  );
}

ContactItem.propTypes = {
  type: P.oneOf(['link', 'text']).isRequired,
  href: P.string,
  content: P.string.isRequired,
  className: P.string,
};

function InfoRow({ icon, children }) {
  return (
    <div className="flex items-center">
      <span className="flex w-[20px] flex-shrink-0 items-start justify-center">{icon}</span>
      <div
        className={`text-inherit font-inherit ml-2 max-w-full flex-grow overflow-auto break-words
                text-start text-c3 text-gray-700`}
      >
        {children}
      </div>
    </div>
  );
}

InfoRow.propTypes = {
  icon: P.node,
  children: P.node,
};

export function ContactsListItem({ truncate, specialistId, contact }) {
  const { icon, content, href } = contact;
  const isArray = Array.isArray(content);

  return (
    <div className="relative">
      {truncate && !isArray ? (
        <ListTruncator
          id={specialistId}
          content={
            <InfoRow icon={icon}>
              <ContactItem type={href ? 'link' : 'text'} href={href} content={content} className="whitespace-nowrap" />
            </InfoRow>
          }
          hintContent={
            <ContactItem
              type={href ? 'link' : 'text'}
              href={href}
              content={content}
              className="whitespace-normal break-words text-c4"
            />
          }
          hintWindowClassName="translate-x-full right-[-10px] top-0 z-[200] w-max"
        />
      ) : (
        <InfoRow icon={icon}>
          {isArray &&
            !href &&
            content.map(item => (
              <p className={'whitespace-normal break-words text-c3'} key={item}>
                {item}
              </p>
            ))}
          {!isArray && (
            <ContactItem
              type={href ? 'link' : 'text'}
              href={href}
              content={content}
              className="whitespace-normal break-words"
            />
          )}
        </InfoRow>
      )}
    </div>
  );
}

ContactsListItem.propTypes = {
  contact: specialistContactPropType,
  specialistId: P.string.isRequired,
  truncate: P.bool,
};
