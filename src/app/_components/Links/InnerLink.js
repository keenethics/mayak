import Link from 'next/link';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

export function InnerLink({ items, className, onClick }) {
  return (
    <>
      {items?.map((link, idx) => (
        <Link
          key={idx}
          role="listitem"
          href={link.href}
          aria-label={`Open ${link.title} on click`}
          className={cn(className)}
          onClick={onClick}
        >
          {link?.title}
        </Link>
      ))}
    </>
  );
}

InnerLink.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
