import React from 'react';
import PropTypes from 'prop-types';
import { specialistSocialsPropType } from '@/app/_components/Card/CardSpecialist/prop-types';
import { cn } from '@/utils/cn';

export function SocialsList({ socials, className }) {
  return (
    <ul
      className={cn(
        'hidden md:flex md:flex-row md:items-center md:justify-center md:gap-[5px] lg:gap-[12px]',
        className,
      )}
    >
      {socials?.map((item, idx) =>
        item.href ? (
          <li
            key={idx}
            className="cursor-pointer text-primary-700 transition ease-in-out hover:text-primary-500 md:h-[22px] md:w-[22px] lg:h-[24px] lg:w-[24px]"
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.id} of specialist on click`}
            >
              {item.icon}
            </a>
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
};
