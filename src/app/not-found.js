import React from 'react';
import Link from "next/link";
import { cn } from '@utils/cn';
import NotFound from '@icons/notFound.png';
import Image from 'next/image';

const NotFoundPage = () => {

  const basicBtnHover = 'hover:bg-primary-200 focus:border-primary-600';
  const basicBtnFocus = 'focus:text-primary-600 focus:bg-primary-200';
  const basicBtnActive = 'active:bg-primary-200 active:text-primary-600';

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">

        <Image src={NotFound} alt="Not Found image" aria-label="Not Found image" width="430px" height="376px" />

        <div className="whitespace-pre text-primary-700 text-[18px] lg:text-[28px]">
          Error
          <div className="text-h4 lg:text-h2 font-bold">404</div>
          Not found
        </div>

        <Link href={"/"} className="text-sm font-bold block bg-primary-300 w-full py-2.5 ">Повернутись на головну</Link>

      </div>
    </div >
  );
};

export default NotFoundPage;