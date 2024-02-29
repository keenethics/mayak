import React from 'react';
import P from 'prop-types';
import Link from 'next/link';
import { ListTruncator } from '@components';
import { specialistContactPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';

function InfoRow({ icon, children }) {
  return (
    <div className="flex items-center">
      <span className="flex w-[20px] flex-shrink-0 items-start justify-center">{icon}</span>
      <div
        className={`text-inherit font-inherit ml-4 max-w-full flex-grow overflow-auto break-words
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
      {truncate && !Array.isArray(content) ? (
        <ListTruncator
          id={specialistId}
          content={
            <InfoRow icon={icon}>
              {!isArray && href && (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={'whitespace-nowrap text-primary-400'}
                >
                  {content}
                </Link>
              )}
              {!isArray && !href && <p className={'whitespace-nowrap text-c3 text-gray-900'}>{content}</p>}
            </InfoRow>
          }
          hintContent={
            <>
              {!isArray && href && (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={'whitespace-normal break-words text-primary-400'}
                >
                  {content}
                </Link>
              )}
              {!isArray && !href && <p className={'whitespace-normal break-words text-gray-900'}>{content}</p>}
            </>
          }
          hintWindowClassName="translate-x-full -right-[10px] top-0 z-[200] w-max"
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
          {!isArray && href && (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={'whitespace-normal break-words text-primary-400'}
            >
              {content}
            </Link>
          )}
          {!isArray && !href && <p className={'whitespace-normal break-words text-c3 text-gray-900'}>{content}</p>}
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
