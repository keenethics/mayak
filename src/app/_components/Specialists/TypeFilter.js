'use client';

import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam, useListTherapies } from '@hooks';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';

function TypeList({ setCount, defaultValue }) {
  const { data: therapies, isLoading } = useListTherapies();
  const [selectedType, setSelectedType] = useState(defaultValue);

  const { replace, remove } = useSetParam('type');

  const onChange = type => {
    setSelectedType(type);
    setCount(1);
    replace(type);
  };

  if (!isLoading && !therapies?.length) return null;

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <ul>
        {therapies.map(therapy => {
          const { type, title } = therapy;
          return (
            <li key={type} className="w-[280px] md:w-[300px]">
              <CheckBox
                name="type"
                value={type}
                key={type}
                type="radio"
                checked={selectedType === type}
                onChange={() => onChange(type)}
                text={title}
              />
            </li>
          );
        })}
      </ul>
      <ClearFilterButton
        clear={() => {
          setSelectedType(null);
          setCount(0);
          remove();
        }}
      />
    </>
  );
}

export function TypeFilter() {
  const typeInUrl = useSearchParams().get('type');
  const [count, setCount] = useState(Number(!!typeInUrl));
  return (
    <FilterBase filterText="Тип" count={count}>
      <TypeList setCount={setCount} defaultValue={typeInUrl} />
    </FilterBase>
  );
}

TypeList.propTypes = {
  setCount: PropTypes.func,
  defaultValue: PropTypes.string,
};
