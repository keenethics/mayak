import React from 'react';
import Link from 'next/link';
import FooterImg from '@icons/white-logo.svg';
import { cn } from '@utils/cn';
import siteNav from '@config/siteNav';
import OutlinedBtn from '@components/OutlinedBtn/OutlinedBtn';
import SocialLink from '@components/Links/SocialLink';

export function Footer() {
  const { links } = siteNav;

  // Basic styles
  const flexBetweenMd = 'md:inline-flex md:flex-row md:items-center md:justify-between';
  const flexCenter = 'inline-flex flex-row items-center justify-center';
  const flexCenterMd = 'md:inline-flex md:flex-row md:items-center md:justify-center';
  const flexColCenter = 'flex flex-col items-center';
  const flexColRevCenter = 'flex flex-col-reverse items-center';
  const basicLink = 'no-underline list-none cursor-pointer';
  const iconColors = 'text-other-white hover:text-primary-400';
  const transition = 'transition duration-200 ease-in-out';
  const footerBtnHover = 'hover:bg-gray-100 hover:text-primary-500  ';
  const footerBtnFocus = 'focus:bg-gray-100 focus:text-primary-600 ';
  const footerBtnActive = 'active:bg-other-white active:text-primary-600';
  const footerBtnBorder = 'focus:border-gray-100 active:border-other-white';
  const outlinedColors = 'border-other-white text-other-white';

  return (
    <footer
      className={cn('text-white relative flex w-full flex-col overflow-hidden bg-primary-800 p-4 md:px-20 md:py-12')}
    >
      <div className={cn(flexColCenter, flexBetweenMd, 'gap-4')}>
        <Link href="/" aria-label="Reload main page on logo click" className={cn(basicLink)}>
          <FooterImg
            alt="Footer logo image"
            aria-label="Footer logo image"
            priority="true"
            className={cn('flex-no-shrink fill-current h-[36px] w-[66px] md:h-[74px] md:w-[129px]')}
          />
        </Link>
        <div className={cn(flexColCenter, flexCenterMd, 'gap-2 py-3 text-other-white md:gap-6')}>
          <p className={cn('text-p4 font-bold md:text-p1')}>Ставай нашим партнером</p>
          <OutlinedBtn
            className={cn(footerBtnHover, footerBtnFocus, footerBtnActive, footerBtnBorder, outlinedColors, 'text-p4')}
            aria-label="Click to fill application form"
          >
            Залишити заявку
          </OutlinedBtn>
        </div>
      </div>
      <div className={cn('relative left-[-10%] my-3 h-[1px] w-[120%] bg-gray-300 md:static md:my-12 md:w-full')}></div>
      <div className={cn(flexColRevCenter, flexBetweenMd, 'gap-4 text-other-white')}>
        <p className={cn('text-[0.75rem] font-normal leading-5 md:text-p4 ')}>Маяк @ 2024</p>
        <div className={cn(flexCenter, 'gap-5 md:gap-4')}>
          <p className={cn('hidden md:inline', 'text-p2 font-medium')}>Слідкуй за нами в соцмережах</p>
          <p className={cn('inline md:hidden', 'text-p4')}>Наші соціальні мережі:</p>
          <SocialLink
            role="list"
            status="footerSocials"
            links={links}
            className={cn(basicLink, transition, iconColors, 'hover:color-primary-500 gap-4 hover:text-primary-500')}
          />
        </div>
      </div>
    </footer>
  );
}
