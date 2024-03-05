import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cn } from '@utils/cn';
import { specialistSocialsPropType } from '@/app/_components/CardSpecialist/prop-types';

export function SocialsList({ socials, className, extendedCardOpened = true }) {
  return (
    <ul
      className={cn(
        'sm:hidden md:flex md:flex-row md:items-center md:justify-center md:gap-[5px] lg:gap-3',
        className,
        extendedCardOpened && 'sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-1 ',
      )}
    >
      {socials?.map((item, idx) =>
        item.href ? (
          <li
            key={idx}
            className={cn(
              'block cursor-pointer text-center text-primary-700 transition-all hover:text-primary-500 md:h-5 md:w-5 lg:h-6 lg:w-6',
            )}
          >
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.id} of specialist on click`}
            >
              {item.icon}
            </Link>
          </li>
        ) : (
          ''
        ),
      )}
    </ul>
  );
}

SocialsList.propTypes = {
  socials: PropTypes.arrayOf(specialistSocialsPropType),
  className: PropTypes.string,
  extendedCardOpened: PropTypes.bool,
};
