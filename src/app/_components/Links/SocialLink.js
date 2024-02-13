import React from 'react';
import p from 'prop-types';
import Link from 'next/link';
import { cn } from '@utils/cn';

export function SocialLink({ links, className }) {
  return (
    <>
      {links?.map((link, idx) => (
        <Link
          key={idx}
          role="listitem"
          href={link?.href}
          aria-label={`Open our ${link?.title} on click`}
          target="_blank"
          noopener="true"
          noreferrer="true"
          className={cn(className)}
        >
          {link?.svg}
        </Link>
      ))}
    </>
  );
}

SocialLink.propTypes = {
  links: p.array,
  className: p.string,
};
