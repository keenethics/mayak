import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { specialistSocialsPropType } from '@/app/_components/CardSpecialist/prop-types';

export function SocialsList({ socials, className }) {
  return (
    <ul className={cn('hidden md:flex md:flex-row md:items-center md:justify-center md:gap-[5px] lg:gap-3', className)}>
      {socials?.map((item, idx) =>
        item.href ? (
          <li
            key={idx}
            className="md:h-5.5 md:w-5.5 cursor-pointer text-primary-700 transition ease-in-out hover:text-primary-500 lg:h-6 lg:w-6"
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
