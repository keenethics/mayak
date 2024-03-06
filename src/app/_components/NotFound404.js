import React from 'react';
import Link from 'next/link';
import NotFound from '@images/notFound.svg';
import PropTypes from 'prop-types';

export function NotFound404({ children, href = '/', hrefText = 'Повернутися на головну', className }) {
  return (
    <div className={className}>
      <div className="flex flex-col text-center">
        <NotFound
          alt="Not Found image"
          aria-label="Not Found image"
          priority="true"
          className="h-auto w-full md:h-[300px] lg:h-[430px]"
        />
        <div
          className="mb-[26px] mt-[10px] whitespace-pre-line text-[18px] text-primary-700 md:mt-0 lg:mb-[30px] lg:text-[28px]  xl:mb-[45px]">
          {children}
        </div>
        <Link
          href={href}
          aria-label="Click to back to the home page"
          className="text-sm flex flex-wrap content-center self-center rounded-[100px] bg-primary-500 px-6 py-3 text-p3 font-bold
         text-other-white transition-all duration-300 hover:bg-primary-400 focus:bg-primary-600
         focus:outline-none active:bg-primary-700"
        >
          {hrefText}
        </Link>
      </div>
    </div>
  );
}

NotFound404.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  hrefText: PropTypes.string,
  className: PropTypes.string,
};
