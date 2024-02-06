"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import OutlinedBtn from "../OutlinedBtn";
import * as logo from "../../../../public/assets/icons/logo.svg";
import InstagramComponent from "../Icons/Instagram";
import FacebookComponent from "../Icons/Facebook";
import XComponent from "../Icons/XSocial";

export default function Header() {
  //  Basic styles
  const flexBetween = "flex flex-row items-center justify-between";
  const flexCenter = "flex flex-row items-center justify-center";
  const basicLink = "no-underline list-none cursor-pointer";
  const listItemText =
    "text-primary-700 text-p2 font-bold hover:text-primary-500";
  const iconSizes = "w-[24px] h-[24px]";
  const iconColors = "text-primary-700 hover:text-primary-500";
  const transition = "transition duration-200 ease-in-out";

  return (
    <nav
      className={`${flexBetween} w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-20 py-4`}
    >
      <Link
        href="/"
        aria-label="Reload main page on logo click"
        className={`${basicLink}`}
      >
        <Image
          src={logo}
          alt="Mayak logo"
          aria-label="Mayak logo"
          priority={true}
          className="h-[74px] w-[129px]"
        />
      </Link>
      <div className={`${flexCenter} gap-6`}>
        <ul role="list" className={`${flexCenter} list-none gap-4`}>
          <li className="px-3 py-1 ">
            <Link
              href="/specialists"
              aria-label="Open specialists page on this link click"
              className={`${basicLink}`}
            >
              <p className={`${listItemText} ${transition}`}>Спеціалісти</p>
            </Link>
          </li>
          <li className="px-3 py-1">
            <Link
              href="/events"
              aria-label="Open events page on this link click"
              className={`${basicLink}`}
            >
              <p className={`${listItemText} ${transition}`}>Події</p>
            </Link>
          </li>
        </ul>
        <div className={`${flexBetween} gap-6`}>
          <Link
            href="/our-instagram"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak instagram page on this link click"
            className={`${basicLink} ${transition}`}
          >
            <InstagramComponent
              className={`${iconSizes} ${iconColors}`}
              aria-label="Instagram social media icon"
            />
          </Link>
          <Link
            href="/our-facebook"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak facebook page on this link click"
            className={`${basicLink}  ${transition}`}
          >
            <FacebookComponent
              className={`${iconSizes} ${iconColors}`}
              aria-label="Facebook social media icon"
            />
          </Link>
          <Link
            href="/our-x"
            target="_blank"
            noopener="true"
            noreferrer="true"
            aria-label="Open Mayak x page on this link click"
            className={`${basicLink}  ${transition}`}
          >
            <XComponent
              className={`${iconSizes} ${iconColors}`}
              aria-label="X social media icon"
            />
          </Link>
        </div>
        <OutlinedBtn
          className="border-gray-700 text-primary-500"
          aria-label="Click to fill feedback form"
        >
          Зворотній звʼязок
        </OutlinedBtn>
      </div>
    </nav>
  );
}
