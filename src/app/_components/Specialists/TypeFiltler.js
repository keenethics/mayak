'use client';

import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { useListTherapies } from '@/app/_hooks/api/useTherapy';
import { CheckBox } from '../CheckBox';
import { FilterChip } from '../FilterChip';
import { FilterDropdown } from './FilterDropdown';
import { ClearFilterButton } from './ClearFilterButton';

function TypeList({ setCount }) {
  const { data: therapies, isLoading } = useListTherapies();
  const [selectedType, setSelectedType] = useState(null);
  const onChange = type => {
    setSelectedType(type);
    setCount(1);
  };
  if (isLoading) return <CircularProgress />;
  if (therapies) {
    return (
      <>
        <ul>
          {therapies.map(therapy => (
            <li key={therapy.type} className="w-[300px]">
              <CheckBox
                name="type"
                value={therapy.type}
                key={therapy.type}
                type="radio"
                checked={selectedType === therapy.type}
                onChange={() => onChange(therapy.type)}
                text={therapy.title}
              />
            </li>
          ))}
        </ul>
        <ClearFilterButton
          clear={() => {
            setSelectedType(null);
            setCount(0);
          }}
        />
      </>
    );
  }
}

export function TypeFilter() {
  const [opened, setOpened] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <>
      <FilterChip opened={opened} setOpened={setOpened} text="Тип" count={count} />
      {opened && (
        <FilterDropdown opened={opened} setOpened={setOpened}>
          <TypeList setCount={setCount} />
        </FilterDropdown>
      )}
    </>
  );
}

TypeList.propTypes = {
  setCount: PropTypes.func,
};
