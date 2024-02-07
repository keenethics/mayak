import React from 'react';
import p from 'prop-types';
import Link from 'next/link';
import cn from '@/app/utils/cn';

export default function SocialLink({ items, className }) {
  const { links } = items;
  return (
    <div className="flex gap-4">
      {links?.map((link, idx) => (
        <Link
          key={idx}
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

SocialLink.propTypes = {
  items: p.object,
  className: p.string,
};
