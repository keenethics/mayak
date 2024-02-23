import React from 'react';
import Link from 'next/link';
import p from 'prop-types';
import { cn } from '@/utils/cn';

export function InnerLink({ items, className }) {
  return (
    <>
      {items?.map((link, idx) => (
        <Link
          key={idx}
          role="listitem"
          href={link.href}
          aria-label={`Open ${link.title} on click`}
          className={cn(className)}
        >
          {link?.title}
        </Link>
      ))}
    </>
  );
}

InnerLink.propTypes = {
  items: p.array,
  className: p.string,
};
