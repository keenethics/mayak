'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
// import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';

const priceVariants = ['Безкоштовно', 'до 500 грн', '500-1000 грн', '1000-1500 грн', 'більше 1500 грн'];

function PricesList({ setCount, defaultValue }) {
  const [selectedPrices, setSelectedPrices] = useState(defaultValue);

  // const { add, remove } = useSetParam('price');

  const onChange = price => {
    if (selectedPrices.includes(price)) {
      setSelectedPrices(selectedPrices.filter(selPrice => selPrice !== price));
      setCount(count => count - 1);
      // remove(district);
    } else {
      setSelectedPrices([...selectedPrices, price]);
      setCount(count => count + 1);
      // add(district);
    }
  };

  return (
    <>
      <ul>
        {priceVariants.map(priceVariant => (
          <li key={priceVariant} className="w-[280px] md:w-[300px]">
            <CheckBox
              name={priceVariant}
              value={priceVariant}
              checked={selectedPrices.includes(priceVariant)}
              onChange={() => onChange(priceVariant)}
              text={priceVariant}
            />
          </li>
        ))}
      </ul>
      <ClearFilterButton
        clear={() => {
          setSelectedPrices([]);
          setCount(0);
          // remove();
        }}
      />
    </>
  );
}

export function PriceFilter() {
  const priceInUrl = useSearchParams().getAll('price');
  const [count, setCount] = useState(priceInUrl.length);
  return (
    <FilterBase filterText="Ціна" count={count}>
      <PricesList setCount={setCount} defaultValue={priceInUrl} />
    </FilterBase>
  );
}

PricesList.propTypes = {
  setCount: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
};
