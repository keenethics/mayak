import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InstagramComponent from '@icons/Instagram';
import FacebookComponent from '@icons/Facebook';
import XComponent from '@icons/XSocial';
import logo from '@logo/logo.svg';
import OutlinedBtn from '@outlinedBtn/OutlinedBtn';
import cn from '@/app/utils/cn';

export default function Header() {
  //  Basic styles
  const flexBetween = 'flex flex-row items-center justify-between';
  const flexCenter = 'flex flex-row items-center justify-center';
  const basicLink = 'no-underline list-none cursor-pointer';
  const listItemText = 'text-p2 font-bold';
  const listItemTextHover = 'text-primary-700 hover:text-primary-500';
  const iconSizes = 'w-[24px] h-[24px]';
  const iconColors = 'text-primary-700 hover:text-primary-500';
  const transition = 'transition duration-200 ease-in-out';
  const basicBtnHover = 'hover:bg-primary-200 focus:border-primary-600';
  const basicBtnFocus = 'focus:text-primary-600 focus:bg-primary-200';
  const basicBtnActive = 'active:bg-primary-200 active:text-primary-600';

  return (
    <nav className={cn(flexBetween, 'w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-20 py-4')}>
      <Link href="/" aria-label="Reload main page on logo click" className={cn(basicLink)}>
        <Image
          src={logo}
          alt="Mayak logo"
          aria-label="Mayak logo"
          priority={true}
          className={cn('h-[74px] w-[129px]')}
        />
      </Link>
      <div className={cn(flexCenter, ' gap-6')}>
        <ul role="list" className={cn(flexCenter, 'list-none gap-4')}>
          <li className="px-3 py-1 ">
            <Link
              href="/specialists"
              aria-label="Open specialists page on this link click"
              className={cn(basicLink, transition, listItemTextHover)}
            >
              <p className={cn(listItemText, transition)}>Спеціалісти</p>
            </Link>
          </li>
          <li className="px-3 py-1">
            <Link
              href="/events"
              aria-label="Open events page on this link click"
              className={cn(basicLink, transition, listItemTextHover)}
            >
              <p className={cn(listItemText, transition)}>Події</p>
            </Link>
          </li>
        </ul>

        <div className={cn(flexBetween, 'gap-6')}>
          <Link
            href="/our-instagram"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak instagram page on this link click"
            className={cn(basicLink, transition)}
          >
            <InstagramComponent
              className={cn(iconSizes, transition, iconColors)}
              aria-label="Instagram social media icon"
            />
          </Link>
          <Link
            href="/our-facebook"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak facebook page on this link click"
            className={cn(basicLink, transition)}
          >
            <FacebookComponent
              className={cn(iconSizes, transition, iconColors)}
              aria-label="Facebook social media icon"
            />
          </Link>
          <Link
            href="/our-x"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak x page on this link click"
            className={cn(basicLink, transition)}
          >
            <XComponent className={cn(iconSizes, transition, iconColors)} aria-label="X social media icon" />
          </Link>
        </div>
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
