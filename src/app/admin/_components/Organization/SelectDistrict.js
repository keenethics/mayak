import { Loading, SelectInput, required, useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';

export function SelectDistrict({ disabled }) {
  const { data: districts, isLoading } = useGetList(RESOURCES.district);
  if (isLoading) return <Loading />;
  return (
    <SelectInput
      label="Район"
      source="district"
      validate={required()}
      disabled={disabled}
      choices={districts.map(district => ({ id: district.name, name: district.name }))}
    />
  );
}
