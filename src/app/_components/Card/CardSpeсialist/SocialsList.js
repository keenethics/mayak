import React, { useRef } from 'react';
import P from 'prop-types';
import { specialistSocialsPropType } from '@/app/_components/Card/CardSpeсialist/prop-types';
import { TooltipCustom } from '@/app/_components/TooltipCustom';
import { useLineClamp } from '@/app/_hooks';
import { cn } from '@/utils/cn';

export function SocialsList({ socials }) {
  const linkRef = useRef(null);
  const isLinkLineClamped = useLineClamp(linkRef);
  return (
    <div className="hidden gap-[12px] lg:flex lg:flex-row lg:items-center lg:justify-center">
      {socials?.map((item, idx) =>
        item.href !== null ? (
          <TooltipCustom
            key={idx}
            textToDisplay={item.href}
            show={isLinkLineClamped}
            className={cn('bg-primary-900 text-primary-700')}
          >
            <a
              ref={linkRef}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
              aria-label={`Open ${item.id} of specialist on click`}
            >
              {item.icon}
            </a>
          </TooltipCustom>
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
