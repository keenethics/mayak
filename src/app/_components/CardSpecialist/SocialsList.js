import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cn } from '@utils/cn';
import { specialistSocialsPropType } from '@/app/_components/CardSpecialist/prop-types';

export function SocialsList({ socials, className }) {
  const socialsFiltered = socials.filter(social => !!social.href);

  return (
    <ul className={cn('flex w-full justify-around sm:justify-center sm:gap-14 md:gap-1.5 lg:gap-3', className)}>
      {socialsFiltered.map((item, idx) => (
        <li
          key={idx}
          className="block h-6 w-6 cursor-pointer text-center text-primary-700 transition-all hover:text-primary-500 md:h-5 md:w-5 lg:h-6 lg:w-6"
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
      ))}
    </ul>
  );
}

SocialsList.propTypes = {
  socials: PropTypes.arrayOf(specialistSocialsPropType),
  className: PropTypes.string,
};
