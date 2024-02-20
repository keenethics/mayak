import { Loading, SelectArrayInput, required, useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';

export function SelectTherapies() {
  const { data: districts, isLoading } = useGetList(RESOURCES.therapy);
  if (isLoading) return <Loading />;
  return (
    <SelectArrayInput
      label="Види терапії"
      source="district"
      validate={required()}
      choices={districts.map(therapy => ({ id: therapy.name, name: therapy.name }))}
    />
  );
}
