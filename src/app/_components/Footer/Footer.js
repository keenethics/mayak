'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import OutlinedBtn from '../OutlinedBtn';
import * as FooterImg from '../../../../public/assets/icons/white-logo.svg';
import InstagramComponent from '../Icons/Instagram';
import FacebookComponent from '../Icons/Facebook';
import XComponent from '../Icons/XSocial';

export default function Footer() {
  // Basic styles
  const flexBetween = 'flex flex-row items-center justify-between';
  const flexCenter = 'flex flex-row items-center justify-center';
  const basicLink = 'no-underline list-none cursor-pointer';
  const iconSizes = 'w-[24px] h-[24px]';
  const iconColors = 'text-other-white hover:text-primary-400';
  const transition = 'transition duration-200 ease-in-out';
  const footerBtnHoverFocus = 'hover:bg-gray-100 hover:text-primary-500 focus:bg-gray-100 focus:text-primary-600 focus:border-gray-100 active:bg-other-white active:text-primary-600 active:border-other-white';

  return (
    <footer className="text-white flex w-full flex-col bg-primary-800 px-20 py-12">
      <div className={`${flexBetween}`}>
        <Link
          href="/"
          aria-label="Reload main page on logo click"
          className={`${basicLink}`}
        >
          <Image
            src={FooterImg}
            alt="Footer logo image"
            aria-label="Footer logo image"
            className="h-[74px] w-[129px]"
          />
        </Link>
        <div className={`${flexCenter} gap-6`}>
          <p className="text-p1 font-bold text-other-white">
            Ставай нашим партнером
          </p>
          <OutlinedBtn
            className={`border-other-white text-other-white ${footerBtnHoverFocus}`}
            aria-label="Click to fill application form"
          >
            Залишити заявку
          </OutlinedBtn>
        </div>
      </div>
      <div className="my-12 h-[1px] w-full bg-gray-300"></div>
      <div className={`${flexBetween}`}>
        <p className="text-p4 font-normal text-other-white">Маяк @ 2024</p>
        <div className={`${flexCenter}`}>
          <p className="mr-4 text-p2 font-medium text-other-white">
            Слідкуй за нами в соцмережах
          </p>

          <Link
            href="/our-fb"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak facebook page on this link click"
            className={`${basicLink} ${transition} mr-4`}
          >
            <FacebookComponent
              className={`${iconColors} ${iconSizes}`}
              aria-label="Facebook social media icon"
            />
          </Link>
          <Link
            href="/our-insta"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak instagram page on this link click"
            className={`${basicLink} ${transition} mr-4`}
          >
            <InstagramComponent
              className={`${iconColors} ${iconSizes}`}
              aria-label="Instagram social media icon"
            />
          </Link>
          <Link
            href="/our-insta"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak x page on this link click"
            className={`${basicLink} ${transition}`}
          >
            <XComponent
              className={`${iconColors} ${iconSizes}`}
              aria-label="X social media icon"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
