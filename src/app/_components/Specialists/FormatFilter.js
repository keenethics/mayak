'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckBox, ClearFilterButton, FilterBase } from '@components';
import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';

const offline = 'OFFLINE';
const online = 'ONLINE';

function FormatList({ setCount, defaultValue }) {
  const [selectedFormat, setSelectedFormat] = useState(defaultValue);
  const { addParam, deleteParam } = useSetParam('format');
  const onChange = format => {
    setSelectedFormat(format);
    setCount(1);
    addParam(format);
  };
  return (
    <>
      <ul>
        <li className="w-[300px]">
          <CheckBox
            name={offline}
            value={offline}
            checked={selectedFormat === offline}
            type="radio"
            onChange={() => onChange(offline)}
            text="Офлайн"
          />
        </li>
        <li className="w-[300px]">
          <CheckBox
            name={online}
            value={online}
            type="radio"
            checked={selectedFormat === online}
            onChange={() => onChange(online)}
            text="Онлайн"
          />
        </li>
      </ul>
      <ClearFilterButton
        clear={() => {
          setSelectedFormat(null);
          setCount(0);
          deleteParam();
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
