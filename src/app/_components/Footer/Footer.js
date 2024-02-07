import React from 'react';
import Link from 'next/link';
import FooterImg from '@logo/white-logo.svg';
import OutlinedBtn from '../OutlinedBtn/OutlinedBtn';
import cn from '@/app/utils/cn';
import siteNav from '@/app/config/siteNav';
import SocialLink from '../SocialLink/SocialLink';

export default function Footer() {
  // Basic styles
  const flexBetween = 'inline-flex flex-row items-center justify-between';
  const flexCenter = 'inline-flex flex-row items-center justify-center';
  const basicLink = 'no-underline list-none cursor-pointer';
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
          <FooterImg
            alt="Footer logo image"
            aria-label="Footer logo image"
            priority="true"
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
        <div className={cn(flexCenter, 'gap-4')}>
          <p className={cn('text-p2 font-medium text-other-white')}>Слідкуй за нами в соцмережах</p>
          <SocialLink
            status="footerSocials"
            items={siteNav}
            className={cn(basicLink, transition, iconColors, 'hover:color-primary-500 hover:text-primary-500')}
          ></SocialLink>
        </div>
      </div>
    </footer>
  );
}
