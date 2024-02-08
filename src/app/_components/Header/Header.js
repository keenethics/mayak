import React from 'react';
import Link from 'next/link';
import Logo from '@icons/logo.svg';
import OutlinedBtn from '@outlinedBtn/OutlinedBtn';
import InnerLink from '@innerLink/InnerLink';
import SocialLink from '@socialLink/SocialLink';
import siteNav from '@config/siteNav';
import cn from '@utils/cn';

export default function Header() {
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

  return (
    <nav className={cn(flexBetween, 'w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-20 py-4')}>
      <Link href="/" aria-label="Reload main page on logo click" className={cn(basicLink)}>
        <Logo alt="Mayak logo" aria-label="Mayak logo" priority="true" className={cn('h-[74px] w-[129px]')} />
      </Link>
      <div className={cn(flexCenter, 'gap-6')}>
        <InnerLink
          role="list"
          items={siteNav}
          href="/specialists"
          className={cn(basicLink, transition, listItemTextHover, listItemText, 'gap-4 px-3 py-1')}
        ></InnerLink>
        <SocialLink
          role="list"
          items={siteNav}
          status="headerSocials"
          className={cn(basicLink, transition, iconColors, 'hover:color-primary-500 hover:text-primary-500')}
        ></SocialLink>
        <OutlinedBtn
          className={cn(basicBtnActive, basicBtnFocus, basicBtnHover, 'border-gray-700 text-primary-500')}
          aria-label="Click to fill feedback form"
        >
          Зворотній звʼязок
        </OutlinedBtn>
      </div>
    </nav>
  );
}
