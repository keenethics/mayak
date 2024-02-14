import React from 'react';
import Link from "next/link";
import NotFound from '@icons/notFound.png';
import Image from 'next/image';

const NotFoundPage = () => {

  return (
    <div className="flex justify-center mb-10 lg:mb-20 xl:mb-28">
      <div className='flex-col text-center'>
        <Image src={NotFound} alt="Not Found image" aria-label="Not Found image" width="430px" height="376px" className='my-0 lg:my-[16px] xl:my-[30px]' />

        <div className="whitespace-pre-line text-primary-700 text-[18px] lg:text-[28px] my-[26px] lg:my-[30px] xl:my-[45px]">
          Error
          <div className="text-h4 lg:text-h2 font-bold">404</div>
          Not found
        </div>

        <Link href={"/"} aria-label="Click to back to the home page" className={`align-middle bg-primary-500 text-other-white hover:bg-primary-400 focus:outline-none focus:bg-primary-600 active:bg-primary-700 text-sm font-bold px-6 py-3 rounded-[100px] transition-all duration-300 text-p3 `}>
          Повернутись на головну
        </Link>
      </div>

    </div >
  );
};

export default NotFoundPage;
