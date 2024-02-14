import React from 'react';
import Link from 'next/link';
import NotFound from '@icons/notFound.png';
import Image from 'next/image';

const NotFoundPage = () => (
  <div className="mb-10 flex justify-center lg:mb-20 xl:mb-28">
    <div className="flex-col text-center">
      <Image
        src={NotFound}
        alt="Not Found image"
        aria-label="Not Found image"
        width="430px"
        height="376px"
        className="my-0 lg:my-[16px] xl:my-[30px]"
      />

      <div className="my-[26px] whitespace-pre-line text-[18px] text-primary-700 lg:my-[30px] lg:text-[28px] xl:my-[45px]">
        Error
        <div className="text-h4 font-bold lg:text-h2">404</div>
        Not found
      </div>

      <Link
        href={'/'}
        aria-label="Click to back to the home page"
        className={`text-sm rounded-[100px] bg-primary-500 px-6 py-3 align-middle text-p3 font-bold
         text-other-white transition-all duration-300 hover:bg-primary-400 focus:bg-primary-600 
         focus:outline-none active:bg-primary-700 `}
      >
        Повернутись на головну
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
