'use client';

import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { useListDistrict } from '@/app/_hooks/api/useDistrict';
import { FilterChip } from '../FilterChip';
import { CheckBox } from '../CheckBox';
import { FilterDropdown } from './FilterDropdown';
import { ClearFilterButton } from './ClearFilterButton';

function DistrictList({ setCount }) {
  const { data: districts, isLoading } = useListDistrict();
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const onChange = district => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter(selDistrict => selDistrict !== district));
      setCount(count => count - 1);
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
      setCount(count => count + 1);
    }
  };
  if (isLoading) return <CircularProgress />;
  if (districts) {
    return (
      <>
        <ul>
          {districts.map(district => (
            <li key={district.id} className="w-[300px]">
              <CheckBox
                name={district.id}
                value={district.id}
                key={district.id}
                checked={selectedDistricts.includes(district.name)}
                onChange={() => onChange(district.name)}
                text={district.name}
              />
            </li>
          ))}
        </ul>
        <ClearFilterButton
          clear={() => {
            setSelectedDistricts([]);
            setCount(0);
          }}
        />
      </>
    );
  }
}

export function DistrictFilter() {
  const [opened, setOpened] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <>
      <FilterChip opened={opened} setOpened={setOpened} text="Район" count={count} />
      {opened && (
        <FilterDropdown opened={opened} setOpened={setOpened}>
          <DistrictList setCount={setCount} />
        </FilterDropdown>
      )}
    </>
  );
}

DistrictList.propTypes = {
  setCount: PropTypes.func,
};
