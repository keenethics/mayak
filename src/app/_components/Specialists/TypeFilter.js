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
  const { addParam, deleteParam } = useSetParam('type');
  const onChange = type => {
    setSelectedType(type);
    setCount(1);
    addParam(type);
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
            deleteParam();
          }}
        />
      </>
    );
  }
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
