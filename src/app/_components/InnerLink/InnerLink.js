import React from 'react';
import Link from 'next/link';
import p from 'prop-types';
import cn from '@utils/cn';

export default function InnerLink({ items, className }) {
  const { innerLinks } = items;
  return (
    <div className="flex list-none gap-4 text-primary-700  ">
      {innerLinks?.map((link, idx) => (
        <Link
          key={idx}
          role="listitem"
          href={link.href}
          aria-label={`Open ${link.title} on click`}
          target="_blank"
          noopener="true"
          noreferrer="true"
          className={cn(className)}
        >
          {link?.title}
        </Link>
      ))}
    </div>
  );
}

InnerLink.propTypes = {
  items: p.object,
  className: p.string,
};
