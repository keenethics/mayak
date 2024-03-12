'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { FilterChip } from '../FilterChip';
import { CheckBox } from '../CheckBox';
import { FilterDropdown } from './FilterDropdown';
import { ClearFilterButton } from './ClearFilterButton';

const offline = 'OFFLINE';
const online = 'ONLINE';

function FormatList({ setCount }) {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const onChange = format => {
    setSelectedFormat(format);
    setCount(1);
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
        }}
      />
    </>
  );
}

export function FormatFilter() {
  const [opened, setOpened] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <>
      <FilterChip opened={opened} setOpened={setOpened} text="Формат роботи" count={count} />
      {opened && (
        <FilterDropdown opened={opened} setOpened={setOpened}>
          <FormatList setCount={setCount} />
        </FilterDropdown>
      )}
    </>
  );
}

FormatList.propTypes = {
  setCount: PropTypes.func,
};
