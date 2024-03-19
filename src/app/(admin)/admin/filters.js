import { SearchInput, DateTimeInput, SelectInput, NullableBooleanInput } from 'react-admin';

export const specialistsFilters = [
  <SearchInput placeholder="Пошук" key="search" source="q" alwaysOn />,
  <DateTimeInput label="Було додано від" key="fromDate" source="createdAt_gte" alwaysOn />,
  <DateTimeInput label="Було додано до" key="toDate" source="createdAt_lte" alwaysOn />,
  <SelectInput
    label="Формат послуг"
    key="formatOfWork"
    source="formatOfWork_enum"
    choices={[
      { id: null, name: 'Усі' },
      { id: 'BOTH', name: 'Офлайн + онлайн' },
      { id: 'OFFLINE', name: 'Офлайн' },
      { id: 'ONLINE', name: 'Онлайн' },
    ]}
    alwaysOn
  />,
  <NullableBooleanInput
    key="active"
    label="Статус"
    source="isActive"
    nullLabel="Усі"
    falseLabel="Неактивний"
    trueLabel="Активний"
    alwaysOn
  />,
];

export const organizationFilters = specialistsFilters;
