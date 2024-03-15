'use client';

import { Switch } from '@mui/material';
import {
  Datagrid,
  List,
  TextField,
  WrapperField,
  useNotify,
  useRecordContext,
  useRedirect,
  useRefresh,
  useUpdate,
} from 'react-admin';

import { useCallback } from 'react';
import { LinkTextField } from '../LinkTextField';
import { UpDownArrowMenu } from '../UpDownArrowMenu';

function PriorityModifier() {
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('therapy');
  const refresh = useRefresh();
  const notify = useNotify();

  const handleError = queryError => {
    notify(`Неможливо оновити дані\nПомилка: ${queryError.message}`, { type: 'error' });
  };

  const handleChange = diff => () => {
    const isDiffPositive = diff > 0;
    update(
      'Therapy',
      { id: record.id, data: { priority: record.priority + diff }, previousData: record },
      {
        onSuccess: () => {
          notify(`Приорітет ${isDiffPositive ? 'підвищено' : 'знижено'}`);
          refresh();
        },
        onError: handleError,
      },
    );
  };

  if (error) {
    return handleError(error);
  }

  return (
    <UpDownArrowMenu onIncrease={handleChange(+1)} onDecrease={handleChange(-1)} disabled={isLoading}>
      {Number.isInteger(record.priority) ? <TextField label="Priority" source="priority" /> : '-'}
    </UpDownArrowMenu>
  );
}

function ActiveStatusToggle() {
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('therapy');

  const handleError = queryError => {
    notify(`Неможливо оновити дані\nПомилка: ${queryError.message}`, { type: 'error' });
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    return handleError(error);
  }

  function handleSwitch() {
    update(
      'therapy',
      { id: record.id, data: { isActive: !record.isActive }, previousData: record },
      {
        onSuccess: () => {
          refresh();
          notify(`Дані успішно оновлено`);
        },
        onError: handleError,
      },
    );
  }

  return <Switch disabled={isLoading} checked={record.isActive} onChange={handleSwitch} />;
}

export function TherapyList() {
  const redirect = useRedirect();

  const redirectToEdit = useCallback(
    id => {
      redirect(`/therapy/${id}/edit`);
    },
    [redirect],
  );

  // rowClick is not set in DataGrid(to prevent redirect on toggle, etc...), so we need to redirect manually
  return (
    <List>
      <Datagrid>
        <LinkTextField source="id" label="Id" onClick={redirectToEdit} />
        <WrapperField source="priority" label="Пріоритет">
          <PriorityModifier />
        </WrapperField>
        <WrapperField source="isActive" label="Активний">
          <ActiveStatusToggle />
        </WrapperField>
        <TextField label="Type" source="type" />
        <TextField label="Title" source="title" />
        <TextField label="Description" source="description" />
        <TextField label="Path to image" source="imagePath" />
      </Datagrid>
    </List>
  );
}
