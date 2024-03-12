'use client';

import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useHintContext } from '@components/Hint';
import { cn } from '@utils/cn';
import { screens } from '@/app/styles/tailwind/ui';

export function CardWrapper({ children, className, id }) {
  const router = useRouter();
  const matches = useMediaQuery(`(max-width: ${screens.md})`);
  const params = useSearchParams();
  const { toggle } = useHintContext();

  const isExtendedCardOpened = !!params.get('id');

  const handleClick = () => {
    router.push(`/specialist/${id}`, { scroll: false });
    toggle();
  };

  const hasClickHandler = matches && !isExtendedCardOpened;

  return (
    <div
      className={cn(
        'transition-all md:flex md:cursor-auto lg:mx-auto',
        isExtendedCardOpened ? 'cursor-auto' : 'cursor-pointer',
        className,
      )}
      onClick={hasClickHandler ? handleClick : undefined}
    >
      {children}
    </div>
  );
}

CardWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
};
