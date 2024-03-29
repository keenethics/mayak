'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';

const offline = 'OFFLINE';
const online = 'ONLINE';

function FormatList({ setCount, defaultValue }) {
  const [selectedFormat, setSelectedFormat] = useState(defaultValue);

  const { remove, replace } = useSetParam('format');
  const onChange = format => {
    setSelectedFormat(format);
    setCount(1);
    replace(format);
  };

  return (
    <>
      <ul>
        <li className="w-[280px] md:w-[300px]">
          <CheckBox
            name={online}
            value={online}
            type="radio"
            checked={selectedFormat === online}
            onChange={() => onChange(online)}
            text="Онлайн"
          />
        </li>
        <li className="w-[280px] md:w-[300px]">
          <CheckBox
            name={offline}
            value={offline}
            checked={selectedFormat === offline}
            type="radio"
            onChange={() => onChange(offline)}
            text="Офлайн"
          />
        </li>
      </ul>
      <ClearFilterButton
        clear={() => {
          setSelectedFormat(null);
          setCount(0);
          remove();
        }}
      />
    </>
  );
}

export function FormatFilter() {
  const formatInUrl = useSearchParams().get('format');
  const [count, setCount] = useState(Number(!!formatInUrl));
  return (
    <FilterBase filterText="Формат роботи" count={count}>
      <FormatList setCount={setCount} defaultValue={formatInUrl} />
    </FilterBase>
  );
}

FormatList.propTypes = {
  setCount: PropTypes.func,
  defaultValue: PropTypes.string,
};
