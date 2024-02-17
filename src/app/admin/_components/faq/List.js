'use client';

import {
  Datagrid,
  List,
  TextField,
  WrapperField,
  useNotify,
  useRecordContext,
  useRefresh,
  useUpdate,
} from 'react-admin';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Switch } from '@mui/material';
import { QA_PRIORITY_CHANGE_STEP } from '@/lib/consts';
import { MAX_ACTIVE_FAQS, MIN_ACTIVE_FAQS } from './consts';
import { LinkTextField } from '../LinkTextField';
import { UpDownArrowMenu } from '../UpDownArrowMenu';
import { useActiveFaqs } from './hooks';

function ChangePriorityButtons() {
  const notify = useNotify();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('faq');
  const refresh = useRefresh();

  const handleError = queryError => {
    notify(`Неможливо оновити дані\nПомилка: ${queryError.message}`, { type: 'error' });
  };

  const handleChangeWeightClick = diff => () => {
    const isDiffPositive = diff > 0;
    update(
      'Faq',
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

function IsActiveSwitch() {
  const notify = useNotify();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('faq');
  const { total: activeFaqsCount, isLoading: isLoadingActiveFaqs, error: faqsLoadingError } = useActiveFaqs();
  const refresh = useRefresh();

  if (isLoadingActiveFaqs || faqsLoadingError) {
    return null;
  }

  const handleError = queryError => {
    notify(`Неможливо оновити дані\nПомилка: ${queryError.message}`, { type: 'error' });
  };

  function handleSwitch() {
    const isTryingToActivate = !record.isActive;
    const isTryingToDeactivate = record.isActive;

    if (isTryingToActivate && activeFaqsCount >= MAX_ACTIVE_FAQS) {
      return notify(`Занадто багато активних питань (максимум ${MAX_ACTIVE_FAQS}). Спочатку деактивуйте деякі.`);
    }

    if (isTryingToDeactivate && activeFaqsCount <= MIN_ACTIVE_FAQS) {
      return notify(`Принаймні ${MIN_ACTIVE_FAQS} питань повинні бути активними.`);
    }

    return update(
      'Faq',
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

  if (error) {
    return handleError(error);
  }

  return <Switch disabled={isLoading} checked={record.isActive} onChange={handleSwitch} />;
}

export function ListFaq() {
  function redirectTo(id) {
    return `/Faq/${id}/edit`;
  }

  // rowClick is not set in DataGrid(to prevent redirect on toggle, etc...), so we need to redirect manually
  return (
    <List>
      <Datagrid>
        <LinkTextField source="id" label="Id" pathFn={redirectTo} />
        <WrapperField source="priority" label="Приорітет">
          <ChangePriorityButtons />
        </WrapperField>
        <WrapperField source="isActive" label="Активний" pathFn={redirectTo}>
          <IsActiveSwitch />
        </WrapperField>
        <LinkTextField source="question" label="Питання" pathFn={redirectTo} />
        <LinkTextField source="answer" label="Відповідь" pathFn={redirectTo} />
      </Datagrid>
    </List>
  );
}
