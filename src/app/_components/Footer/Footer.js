import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InstagramComponent from '@icons/Instagram';
import FacebookComponent from '@icons/Facebook';
import XComponent from '@icons/XSocial';
import * as FooterImg from '@logo/white-logo.svg';
import OutlinedBtn from '../OutlinedBtn/OutlinedBtn';
import cn from '@/app/utils/cn';

export default function Footer() {
  // Basic styles
  const flexBetween = 'inline-flex flex-row items-center justify-between';
  const flexCenter = 'inline-flex flex-row items-center justify-center';
  const basicLink = 'no-underline list-none cursor-pointer';
  const iconSizes = 'w-[24px] h-[24px]';
  const iconColors = 'text-other-white hover:text-primary-400';
  const transition = 'transition duration-200 ease-in-out';
  const footerBtnHover = 'hover:bg-gray-100 hover:text-primary-500  ';
  const footerBtnFocus = 'focus:bg-gray-100 focus:text-primary-600 ';
  const footerBtnActive = 'active:bg-other-white active:text-primary-600';
  const footerBtnBorder = 'focus:border-gray-100 active:border-other-white';
  const outlinedColors = 'border-other-white text-other-white';
  const outlinedText = 'text-sm';

  return (
    <footer className={cn('text-white flex w-full flex-col bg-primary-800 px-20 py-12')}>
      <div className={cn(flexBetween)}>
        <Link href="/" aria-label="Reload main page on logo click" className={cn(basicLink)}>
          <Image
            src={FooterImg}
            alt="Footer logo image"
            aria-label="Footer logo image"
            className={cn('h-[74px] w-[129px]')}
          />
        </Link>
        <div className={cn(flexCenter, 'gap-6')}>
          <p className={cn('text-p1 font-bold text-other-white')}>Ставай нашим партнером</p>
          <OutlinedBtn
            className={cn(
              footerBtnHover,
              footerBtnFocus,
              footerBtnActive,
              footerBtnBorder,
              outlinedColors,
              outlinedText,
              // 'text-sm',
              // 'text-sm text-other-white',
            )}
            aria-label="Click to fill application form"
          >
            Залишити заявку
          </OutlinedBtn>
        </div>
      </div>
      <div className={cn('my-12 h-[1px] w-full bg-gray-300')}></div>
      <div className={cn(flexBetween)}>
        <p className={cn('text-p4 font-normal text-other-white')}>Маяк @ 2024</p>
        <div className={cn(flexCenter)}>
          <p className={cn('mr-4 text-p2 font-medium text-other-white')}>Слідкуй за нами в соцмережах</p>

          <Link
            href="/our-fb"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak facebook page on this link click"
            className={cn(basicLink, transition, 'mr-4')}
          >
            <FacebookComponent className={cn(iconColors, iconSizes)} aria-label="Facebook social media icon" />
          </Link>
          <Link
            href="/our-insta"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak instagram page on this link click"
            className={cn(basicLink, transition, 'mr-4')}
          >
            <InstagramComponent className={cn(iconColors, iconSizes)} aria-label="Instagram social media icon" />
          </Link>
          <Link
            href="/our-insta"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak x page on this link click"
            className={cn(basicLink, transition)}
          >
            <XComponent className={cn(iconColors, iconSizes)} aria-label="X social media icon" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
