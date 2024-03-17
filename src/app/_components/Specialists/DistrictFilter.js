'use client';

import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useListDistrict, useSetParam } from '@hooks';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';

function DistrictList({ setCount, defaultValue }) {
  const { data: districts, isLoading } = useListDistrict();
  const [selectedDistricts, setSelectedDistricts] = useState(defaultValue);

  const { add, remove } = useSetParam('district');

  const onChange = district => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter(selDistrict => selDistrict !== district));
      setCount(count => count - 1);
      remove(district);
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
      setCount(count => count + 1);
      add(district);
    }
  };

  if (isLoading) return <CircularProgress />;

  if (!isLoading && !districts?.length) return null;

  return (
    <>
      <ul>
        {districts.map(district => {
          const { id, name } = district;
          return (
            <li key={id} className="w-[280px] md:w-[300px]">
              <CheckBox
                name={id}
                value={id}
                key={id}
                checked={selectedDistricts.includes(id)}
                onChange={() => onChange(id)}
                text={name}
              />
            </li>
          );
        })}
      </ul>
      <ClearFilterButton
        clear={() => {
          setSelectedDistricts([]);
          setCount(0);
          remove();
        }}
      />
    </>
  );
}

export function DistrictFilter() {
  const districtsInUrl = useSearchParams().getAll('district');
  const [count, setCount] = useState(districtsInUrl.length);
  return (
    <FilterBase filterText="Райони" count={count}>
      <DistrictList setCount={setCount} defaultValue={districtsInUrl} />
    </FilterBase>
  );
}

DistrictList.propTypes = {
  setCount: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
};
