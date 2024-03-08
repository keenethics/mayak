import Link from 'next/link';
import NotFound from '@images/notFound.svg';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

export function NotFoundPageWrapper({ children, href = '/', hrefText = 'Повернутися на головну', className }) {
  return (
    <div className={cn('fixed bottom-0 top-0 grid w-full place-content-center', className)}>
      <div className="flex-col text-center">
        <NotFound
          alt="Not Found image"
          aria-label="Not Found image"
          priority="true"
          className="h-auto w-full md:h-[376px] lg:h-[430px]"
        />
        <div className="mb-[26px] mt-[10px] whitespace-pre-line text-[18px] text-primary-700 md:mt-0 lg:mb-[30px] lg:text-[28px]  xl:mb-[45px]">
          {children}
        </div>
        <Link
          href={href}
          aria-label="Click to back to the home page"
          className={`text-sm rounded-[100px] bg-primary-500 px-6 py-3 align-middle text-p3 font-bold
         text-other-white transition-all duration-300 hover:bg-primary-400 focus:bg-primary-600
         focus:outline-none active:bg-primary-700 `}
        >
          {hrefText}
        </Link>
      </div>
    </div>
  );
}

NotFoundPageWrapper.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  hrefText: PropTypes.string,
  className: PropTypes.string,
};
