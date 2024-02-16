'use client';

import {
  useNotify,
  WrapperField,
  useUpdate,
  useRecordContext,
  List,
  Datagrid,
  TextField,
  BooleanField,
  BooleanInput,
} from 'react-admin';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { Switch } from '@mui/material';

function ChangeWeightButtons({ source }) {
  const notify = useNotify();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('qa');
  const handleChangeWeightClick = diff => () => {
    const isDiffPositive = diff > 0;
    update(
      'Qa',
      { id: record.id, data: { weight: record.weight + diff }, previousData: record },
      {
        onSuccess: () => {
          notify(`Weight ${isDiffPositive ? 'increased' : 'decreased'}`, { type: 'success' });
        },
        onError: queryError => {
          notify(`Could not update weight\nError message: ${queryError.message}`, { type: 'error' });
        },
      },
    );
  };

  if (error) {
    return notify(`Could not update weight\nError message: ${error.message}`, { type: 'error' });
  }

  return (
    <WrapperField source="weight" label="Weight">
      <div className="grid h-full w-full grid-cols-[min-content_min-content_min-content] place-items-center gap-2">
        <button className="h-full" onClick={handleChangeWeightClick(1)} disabled={isLoading}>
          <FaAngleUp />
        </button>
        <TextField source="weight" />
        {record[source]}
        <button className="h-full" onClick={handleChangeWeightClick(-1)} disabled={isLoading}>
          <FaAngleDown />
        </button>
      </div>
    </WrapperField>
  );
}

// create a custom switch component to update the isActive field in qa
function IsActiveSwitch() {
  const notify = useNotify();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('qa');

  const handleSwitch = () => {
    update(
      'Qa',
      { id: record.id, data: { isActive: !record.isActive }, previousData: record },
      {
        onSuccess: () => {
          notify(`Спеціаліста успішно оновленно`);
        },
        onError: queryError => {
          notify(`Оновити неможливо\nПомилка: ${queryError.message}`, { type: 'error' });
        },
      },
    );
  };

  if (error) {
    return notify(`Could not update weight\nError message: ${error.message}`, { type: 'error' });
  }

  return <Switch disabled={isLoading} checked={record.isActive} onChange={handleSwitch} />;
}

export function ListQa() {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <ChangeWeightButtons source="weight" />
        <WrapperField source="isActive" label="Активний">
          <IsActiveSwitch />
        </WrapperField>
        <TextField source="question" />
        <TextField source="answer" />
      </Datagrid>
    </List>
  );
}
