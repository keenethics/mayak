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
      {isArray && !href && content.map(item => <p key={item}>{item}</p>)}
      {!isArray && href && (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('whitespace-nowrap text-primary-400', className)}
        >
          {content}
        </Link>
      )}
      {!isArray && !href && <p className={'whitespace-nowrap'}>{content}</p>}
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

function InfoRow({ icon, content, href }) {
  const isArray = Array.isArray(content);
  return (
    <li className="flex gap-[8px]">
      <span className="flex w-[20px] items-center justify-center">{icon}</span>
      <span
        className={cn(
          `text-inherit font-inherit max-w-full
          text-start text-[12px] leading-[1.125rem] text-gray-700 lg:text-c3`,
        )}
      >
        {isArray && !href && content.map(item => <p key={item}>{item}</p>)}
        {!isArray && href && (
          <Link href={href} target="_blank" rel="noopener noreferrer" className={'whitespace-nowrap text-primary-400'}>
            {content}
          </Link>
        )}
        {!isArray && !href && <p className={'whitespace-nowrap'}>{content}</p>}
      </span>
    </li>
  );
}

InfoRow.propTypes = {
  icon: P.node,
  content: P.oneOfType([P.string, P.arrayOf(P.string)]),
  href: P.string,
};

export function ContactsListItem({ specialistId, contact }) {
  const { icon, content, href } = contact;
  return (
    <div className="relative">
      <ListTruncator
        id={specialistId}
        items={[content]}
        itemRender={() => <InfoRow icon={icon} content={content} href={href} />}
        tooltipItemRender={(i, index) => <ListItem key={`${i}-${index}`} data={{ content, href }} />}
      />
    </div>
  );
}

ContactsListItem.propTypes = {
  contact: specialistContactPropType,
  className: P.string,
  specialistId: P.string.isRequired,
};
