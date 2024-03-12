import PropTypes from 'prop-types';
import { Price } from '@icons/index';
import { cn } from '@/utils/cn';
import { therapyPricePropType } from './prop-types';

export function TherapyPrices({ therapyPrices, className }) {
  return (
    <div className={cn('flex flex-row gap-3 md:gap-4', className)}>
      <span className="text-gray-500 lg:mt-[3px]">
        <Price />
      </span>
      <div className="flex w-full flex-col">
        <h3 className="font-bold text-gray-700">
          <span className="lg:hidden">Прайс</span>
          <span className="hidden lg:inline">Прайс на тип терапії</span>
        </h3>
        {therapyPrices.length ? (
          <ul className="flex flex-wrap text-p4 lg:text-p3">
            {therapyPrices.map(therapyPrice => (
              <li key={therapyPrice.id} className="basis-[50%] whitespace-nowrap text-system-info lg:font-bold">
                {therapyPrice.therapy.title} від {therapyPrice.price} грн / год &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* add uncollapsable space characters to separate two price entries on same line */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-p4 lg:text-p3">Не зазначено</p>
        )}
      </div>
    </div>
  );
}

TherapyPrices.propTypes = {
  therapyPrices: PropTypes.arrayOf(therapyPricePropType),
  className: PropTypes.string,
};
