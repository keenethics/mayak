import { SearchInput, DateTimeInput, SelectInput } from 'react-admin';
import { QuickFilter } from './_components';

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

export const eventFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <DateTimeInput key="fromDate" label="Дата події від:" source={'eventDate_gte'} alwaysOn />,
  <DateTimeInput key="toDate" label="Дата події до:" source={'eventDate_lte'} alwaysOn />,
  <SelectInput
    label="Формат заходу"
    key="format"
    source={'format_enum'}
    choices={[
      { id: 'OFFLINE', name: 'Офлайн' },
      { id: 'ONLINE', name: 'Онлайн' },
    ]}
    alwaysOn
  />,
  <DateTimeInput key="fromCreationDate" label="Дата додавання події від:" source={'createdAt_gte'} alwaysOn />,
  <DateTimeInput key="toCreationDate" label="Дата додавання події до:" source={'createdAt_lte'} alwaysOn />,
  <SelectInput
    key="status"
    label="Статус"
    source={'isActive'}
    choices={[
      { id: true, name: 'Активний' },
      { id: false, name: 'Неактивний' },
    ]}
    alwaysOn
  />,
  <QuickFilter key="futureEvents" source="eventDate_gt" label="Майбутні події" defaultValue={new Date()} />,
  <QuickFilter key="archivedEvents" source="eventDate_lt" label="Архівовані події" defaultValue={new Date()} />,
];
