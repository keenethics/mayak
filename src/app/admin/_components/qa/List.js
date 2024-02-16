'use client';

import {
  useNotify,
  WrapperField,
  useUpdate,
  useRecordContext,
  List,
  Datagrid,
  TextField,
  useRefresh,
} from 'react-admin';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Switch } from '@mui/material';
import { UpDownArrowMenu } from '../UpDownArrowMenu';
import { QA_PRIORITY_CHANGE_STEP } from '@/lib/consts';

function ChangePriorityButtons() {
  const notify = useNotify();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('qa');
  const refresh = useRefresh();
  const handleError = queryError => {
    notify(`Неможливо оновити дані\nПомилка: ${queryError.message}`, { type: 'error' });
  };

  const handleChangeWeightClick = diff => () => {
    const isDiffPositive = diff > 0;
    update(
      'Qa',
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
    <UpDownArrowMenu
      onIncrease={handleChangeWeightClick(QA_PRIORITY_CHANGE_STEP)}
      onDecrease={handleChangeWeightClick(-QA_PRIORITY_CHANGE_STEP)}
      disabled={isLoading}
    >
      <TextField source="priority" />
    </UpDownArrowMenu>
  );
}

// create a custom switch component to update the isActive field in qa
function IsActiveSwitch() {
  const notify = useNotify();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('qa');

  const handleError = queryError => {
    notify(`Неможливо оновити дані\nПомилка: ${queryError.message}`, { type: 'error' });
  };

  const handleSwitch = () => {
    update(
      'Qa',
      { id: record.id, data: { isActive: !record.isActive }, previousData: record },
      {
        onSuccess: () => {
          notify(`Дані успішно оновлено`);
        },
        onError: handleError,
      },
    );
  };

  if (error) {
    return handleError(error);
  }

  return <Switch disabled={isLoading} checked={record.isActive} onChange={handleSwitch} />;
}

export function ListQa() {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <WrapperField source="priority" label="Приорітет">
          <ChangePriorityButtons />
        </WrapperField>
        <WrapperField source="isActive" label="Активний">
          <IsActiveSwitch />
        </WrapperField>
        <TextField source="question" label="Питання" />
        <TextField source="answer" label="Відповідь" />
      </Datagrid>
    </List>
  );
}
