import {
  SearchInput,
  DateTimeInput,
  SelectInput,
  BooleanInput,
} from 'react-admin';

export const specialistsFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <DateTimeInput key="fromDate" label="From date" source={'createdAt_gte'} />,
  <DateTimeInput key="toDate" label="To date" source={'createdAt_lte'} />,
  <SelectInput
    label="Format of work"
    key="formatOfWork"
    source={'formatOfWork_enum'}
    choices={[
      { id: 'BOTH', name: 'BOTH' },
      { id: 'OFFLINE', name: 'OFFLINE' },
      { id: 'ONLINE', name: 'ONLINE' },
    ]}
  />,
  <BooleanInput key="active" label="Active" source={'isActive'} />,
];

export const organizationFilters = specialistsFilters;
