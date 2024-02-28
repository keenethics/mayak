import React from 'react';
import P from 'prop-types';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { specialistContactPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';
import { ListTruncator } from '../../ListTruncator';

function ListItem({ data, className }) {
  const { content, href } = data;

  const isArray = Array.isArray(content);
  return (
    <>
      {isArray &&
        !href &&
        content.map(item => (
          <p className={className} key={item}>
            {item}
          </p>
        ))}
      {!isArray && href && (
        <Link href={href} target="_blank" rel="noopener noreferrer" className={cn('text-primary-400', className)}>
          {content}
        </Link>
      )}
      {!isArray && !href && <p className={className}>{content}</p>}
    </>
  );
}

ListItem.propTypes = {
  data: P.shape({
    content: P.oneOfType([P.string, P.arrayOf(P.string)]),
    href: P.string,
  }),
  className: P.string,
};

function InfoRow({ icon, content, href, className }) {
  return (
    <li className="flex items-center">
      <span className="flex w-[20px] flex-shrink-0 items-start justify-center">{icon}</span>
      <div
        className={cn(
          `text-inherit font-inherit ml-4 max-w-full flex-grow overflow-auto break-words
          text-start text-[12px] leading-[1.125rem] text-gray-700 lg:text-c3`,
        )}
      >
        <ListItem data={{ content, href }} className={className} />
      </div>
    </li>
  );
}

InfoRow.propTypes = {
  icon: P.node,
  content: P.oneOfType([P.string, P.arrayOf(P.string)]),
  className: P.string,
  href: P.string,
};

export function ContactsListItem({ truncate, specialistId, contact }) {
  const { icon, content, href } = contact;
  return (
    <div className="relative">
      {truncate && !Array.isArray(content) ? (
        <ListTruncator
          id={specialistId}
          items={[content]}
          itemRender={() => <InfoRow className={'whitespace-nowrap'} icon={icon} content={content} href={href} />}
          tooltipItemRender={(i, index) => <ListItem key={`${i}-${index}`} data={{ content, href }} />}
          hintWindowClassName="translate-x-full right-[-10px] top-0 z-[200]"
        />
      ) : (
        <InfoRow className={'whitespace-normal break-words'} icon={icon} content={content} href={href} />
      )}
    </div>
  );
}

ContactsListItem.propTypes = {
  contact: specialistContactPropType,
  // className: P.string,
  specialistId: P.string.isRequired,
  truncate: P.bool,
};
