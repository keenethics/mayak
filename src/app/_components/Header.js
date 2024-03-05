'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import Logo from '@icons/logo.svg';
import BurgerIcon from '@icons/burger.svg';
import CloseIcon from '@icons/closeIcon.svg';
import siteNav from '@config/siteNav';
import { useBodyScrollLock } from '@hooks';
import { InnerLink, PillButton, SocialLink } from '@components';
import { cn } from '@utils/cn';

export function Header() {
  const { links, innerLinks } = siteNav;

  //  Basic styles
  const flexBetween = 'flex flex-row items-center justify-between';
  const flexCenter = 'flex flex-row items-center justify-center';
  const basicLink = 'no-underline list-none cursor-pointer';
  const listItemText = 'text-p2 font-bold';
  const listItemTextHover = 'text-primary-700 hover:text-primary-500';
  const iconColors = 'text-primary-700 hover:text-primary-500';
  const logoHeight = 'h-[36px]';

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(state => !state);
  }, [setMenuOpen]);

  useBodyScrollLock(isMenuOpen, 'y');
  return (
    <>
      {/* this element is used to fill the space under navbar on mobile screens */}
      <div className="border-t-[1px] p-4 lg:hidden">
        <div className={logoHeight} />
      </div>
      <nav
        className={cn(
          flexBetween,
          'fixed left-0 right-0 top-0 z-[50] w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-4 py-4 lg:px-20',
        )}
      >
        <Link href="/" aria-label="Reload main page on logo click" className={cn(basicLink)}>
          <Logo
            alt="Mayak logo"
            aria-label="Mayak logo"
            priority="true"
            className={cn(logoHeight, 'w-[66px] lg:h-[74px] lg:w-[129px]')}
          />
        </Link>
        <div className={cn(flexCenter, 'hidden gap-6 lg:flex')}>
          <div className="flex list-none gap-4 text-primary-700">
            <InnerLink
              items={innerLinks}
              className={cn(basicLink, listItemTextHover, listItemText, 'gap-4 px-3 py-1 transition-all')}
            />
          </div>
          <SocialLink
            links={links}
            className={cn(basicLink, iconColors, 'hover:color-primary-500 gap-6 transition-all hover:text-primary-500')}
          />
          <PillButton
            variant="outlined"
            colorVariant="blue"
            className="border-gray-700 text-p4 font-bold text-primary-500"
            aria-label="Click to fill feedback form"
          >
            Зворотній звʼязок
          </PillButton>
        </div>
        {/* Hamburger Menu */}
        <BurgerIcon className="block transition-all lg:hidden" onClick={toggleMenu} />
        <div
          className={cn(
            'absolute inset-0 flex h-dvh w-dvw flex-col bg-other-black transition-all lg:hidden ',
            isMenuOpen === false && 'hidden',
          )}
        >
          <div className={cn(flexBetween, 'w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-4 py-4')}>
            <Link href="/" aria-label="Reload main page on logo click" className={cn(basicLink)}>
              <Logo
                alt="Mayak logo"
                aria-label="Mayak logo"
                priority="true"
                className="h-[36px] w-[66px] lg:h-[74px] lg:w-[129px]"
              />
            </Link>
            <CloseIcon onClick={toggleMenu} className="transition-all" />
          </div>
          <div className="flex grow flex-col bg-other-white p-4">
            <div className="flex flex-col items-center">
              <InnerLink
                items={innerLinks}
                className={cn(
                  basicLink,
                  listItemTextHover,
                  listItemText,
                  'w-full border-b-[1px] border-gray-600 px-3 py-1 pb-1 pt-3 text-center transition-all',
                )}
              />
            </div>
            <PillButton
              variant="outlined"
              colorVariant="blue"
              className="my-8 border-gray-700 text-p4 font-bold text-primary-500"
              aria-label="Click to fill feedback form"
            >
              Зворотній звʼязок
            </PillButton>
            <div className={cn(flexBetween, 'items-center')}>
              <p className="inline text-p4 text-primary-700 lg:hidden">Наші соціальні мережі:</p>
              <SocialLink
                links={links}
                className={cn(
                  basicLink,
                  iconColors,
                  'hover:color-primary-500 gap-4 transition-all hover:text-primary-500',
                )}
              />
            </div>
          </div>
          {/* Part of the Donation task */}
          <div className="h-[100px] bg-secondary-100 text-primary-700">Donation stub</div>
        </div>
      </nav>
    </>
  );
}
