import { SearchInput, DateTimeInput, SelectInput } from 'react-admin';

export const specialistsFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <DateTimeInput key="fromDate" label="From date" source={'createdAt_gte'} alwaysOn />,
  <DateTimeInput key="toDate" label="To date" source={'createdAt_lte'} alwaysOn />,
  <SelectInput
    label="Format of work"
    key="formatOfWork"
    source={'formatOfWork_enum'}
    choices={[
      { id: 'BOTH', name: 'BOTH' },
      { id: 'OFFLINE', name: 'OFFLINE' },
      { id: 'ONLINE', name: 'ONLINE' },
    ]}
    alwaysOn
  />,
  <SelectInput
    key="active"
    label="Active"
    source={'isActive'}
    choices={[
      { id: true, name: 'Active' },
      { id: false, name: 'Not active' },
    ]}
    alwaysOn
  />,
];

export const organizationFilters = specialistsFilters;
