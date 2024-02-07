import React from 'react';
import p from 'prop-types';
import Link from 'next/link';
import cn from '@/app/utils/cn';

export default function SocialLink({ items, className, status }) {
  const { links } = items;
  return status === 'footerSocials' ? (
    <div className="flex gap-4">
      {links
        ?.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
        .map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            aria-label={`Open ${link.title} on click`}
            target="_blank"
            noopener="true"
            noreferrer="true"
            status={status}
            className={cn(className)}
          >
            {link?.svg}
          </Link>
        ))}
    </div>
  ) : (
    <div className="flex gap-6">
      {links?.map((link, idx) => (
        <Link
          key={idx}
          href={link.href}
          aria-label={`Open ${link.title} on click`}
          target="_blank"
          noopener="true"
          noreferrer="true"
          status={status}
          className={cn(className)}
        >
          {link?.svg}
        </Link>
      ))}
    </div>
  );
}

SocialLink.propTypes = {
  items: p.object,
  className: p.string,
  status: p.string,
};
