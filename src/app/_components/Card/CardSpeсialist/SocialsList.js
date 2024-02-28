import React from 'react';
import P from 'prop-types';
import { specialistSocialsPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';

export function SocialsList({ socials }) {
  return (
    <div className="hidden gap-[12px] lg:flex lg:flex-row lg:items-center lg:justify-center">
      {socials?.map((item, idx) =>
        item.href !== null ? (
          <a
            key={idx}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
            aria-label={`Open ${item.id} of specialist on click`}
          >
            {item.icon}
          </a>
        ) : (
          ''
        ),
      )}
    </div>
  );
}

SocialsList.propTypes = {
  socials: P.arrayOf(specialistSocialsPropType),
};
