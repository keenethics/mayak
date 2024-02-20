'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import Logo from '@icons/logo.svg';
import BurgerIcon from '@icons/burger.svg';
import CloseIcon from '@icons/close-cross.svg';
import siteNav from '@config/siteNav';
import { cn } from '@utils/cn';
import { SocialLink, InnerLink, OutlinedButton } from '@components';
import { useBodyScrollLock } from '@hooks';

export function Header() {
  const { links, innerLinks } = siteNav;

  //  Basic styles
  const flexBetween = 'flex flex-row items-center justify-between';
  const flexCenter = 'flex flex-row items-center justify-center';
  const basicLink = 'no-underline list-none cursor-pointer';
  const listItemText = 'text-p2 font-bold';
  const listItemTextHover = 'text-primary-700 hover:text-primary-500';
  const iconColors = 'text-primary-700 hover:text-primary-500';
  const transition = 'transition duration-200 ease-in-out';
  const basicBtnHover = 'hover:bg-primary-200 focus:border-primary-600';
  const basicBtnFocus = 'focus:text-primary-600 focus:bg-primary-200';
  const basicBtnActive = 'active:bg-primary-200 active:text-primary-600';
  const logoHeight = 'h-[36px]';
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(state => !state);
  }, [setMenuOpen]);

  useBodyScrollLock(isMenuOpen, 'y');
  return (
    <>
      {/* this element is used to fill the space under navbar on mobile screens */}
      <div className={'border-t-[1px] p-4 lg:hidden'}>
        <div className={logoHeight}></div>
      </div>
      <nav
        className={cn(
          flexBetween,
          'fixed top-0 z-10 w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-4 py-4 lg:static lg:px-20',
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
              className={cn(basicLink, transition, listItemTextHover, listItemText, 'gap-4 px-3 py-1')}
            />
          </div>
          <SocialLink
            links={links}
            className={cn(basicLink, transition, iconColors, 'hover:color-primary-500 gap-6 hover:text-primary-500')}
          />
          <OutlinedButton
            className={cn(
              basicBtnActive,
              basicBtnFocus,
              basicBtnHover,
              'border-gray-700 text-p4 font-bold text-primary-500',
            )}
            aria-label="Click to fill feedback form"
          >
            Зворотній звʼязок
          </OutlinedButton>
        </div>
        <BurgerIcon className={'block lg:hidden'} onClick={toggleMenu} />
        <div
          className={cn(
            'absolute left-[100dvw] top-0 flex h-dvh w-dvw flex-col bg-other-black transition-all duration-300 lg:hidden',
            isMenuOpen && 'left-0',
          )}
        >
          <div className={cn(flexBetween, 'w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-4 py-4')}>
            <Link href="/" aria-label="Reload main page on logo click" className={cn(basicLink)}>
              <Logo
                alt="Mayak logo"
                aria-label="Mayak logo"
                priority="true"
                className={cn('h-[36px] w-[66px] lg:h-[74px] lg:w-[129px]')}
              />
            </Link>
            <CloseIcon onClick={toggleMenu} />
          </div>
          <div className="flex grow flex-col bg-other-white p-4">
            <div className={cn('flex flex-col items-center')}>
              <InnerLink
                items={innerLinks}
                className={cn(
                  basicLink,
                  transition,
                  listItemTextHover,
                  listItemText,
                  'w-full border-b-[1px] border-gray-600 px-3 py-1 pb-1 pt-3 text-center',
                )}
              />
            </div>
            <OutlinedButton
              className={cn(
                basicBtnActive,
                basicBtnFocus,
                basicBtnHover,
                'my-8 border-gray-700 text-p4 font-bold text-primary-500',
              )}
              aria-label="Click to fill feedback form"
            >
              Зворотній звʼязок
            </OutlinedButton>
            <div className={cn(flexBetween, 'items-center')}>
              <p className={cn('inline lg:hidden', 'text-p4 text-primary-700')}>Наші соціальні мережі:</p>
              <SocialLink
                links={links}
                className={cn(
                  basicLink,
                  transition,
                  iconColors,
                  'hover:color-primary-500 gap-4 hover:text-primary-500',
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
