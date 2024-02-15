import React from 'react';
import Link from 'next/link';
import NotFound from '@icons/notFound.svg';
import { cn } from '@/utils/cn';

const NotFoundPage = () => (
  <div className="mb-10 flex justify-center lg:mb-20 xl:mb-28">
    <div className="flex-col text-center">
      <NotFound alt="Not Found image" aria-label="Not Found image"
        priority="true" className={cn('h-auto w-full md:h-[430px] md:w-[376px]')} />

      <div className="whitespace-pre-line text-primary-700 text-[18px] lg:text-[28px] mb-[26px] mt-[10px] md:mt-0 lg:mb-[30px]  xl:mb-[45px]">
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
