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
import { FAQ_PRIORITY_CHANGE_STEP } from '@/lib/consts';
import { MAX_ACTIVE_FAQS, MIN_ACTIVE_FAQS } from './consts';
import { LinkTextField } from '../LinkTextField';
import { UpDownArrowMenu } from '../UpDownArrowMenu';
import { useActiveFaqs } from './hooks';

function PriorityModifier() {
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('faq');
  const refresh = useRefresh();
  const notify = useNotify();

  const handleError = queryError => {
    notify(`Неможливо оновити дані\nПомилка: ${queryError.message}`, { type: 'error' });
  };

  const handleChange = diff => () => {
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
      onIncrease={handleChange(FAQ_PRIORITY_CHANGE_STEP)}
      onDecrease={handleChange(-FAQ_PRIORITY_CHANGE_STEP)}
      disabled={isLoading}
    >
      {record.priority ? <TextField source="priority" /> : '-'}
    </UpDownArrowMenu>
  );
}

function ActiveStatusToggle() {
  const notify = useNotify();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('faq');
  const { total: activeFaqsCount, isLoading: isLoadingActiveFaqs, error: faqsLoadingError } = useActiveFaqs();
  const refresh = useRefresh();

  const handleError = queryError => {
    notify(`Неможливо оновити дані\nПомилка: ${queryError.message}`, { type: 'error' });
  };

  if (isLoadingActiveFaqs || faqsLoadingError) {
    return null;
  }

  function handleSwitch() {
    const isTryingToActivate = !record.isActive;
    const isTryingToDeactivate = record.isActive;

    if (isTryingToActivate && activeFaqsCount >= MAX_ACTIVE_FAQS) {
      return notify(`Занадто багато активних питань (максимум ${MAX_ACTIVE_FAQS}). Спочатку деактивуйте деякі.`, {
        type: 'error',
      });
    }

    if (isTryingToDeactivate && activeFaqsCount <= MIN_ACTIVE_FAQS) {
      return notify(`Принаймні ${MIN_ACTIVE_FAQS} питань повинні бути активними.`, { type: 'error' });
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
  const redirect = useRedirect();

  const redirectToEdit = useCallback(
    id => {
      redirect(`/Faq/${id}/edit`);
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
        <LinkTextField source="question" label="Питання" onClick={redirectToEdit} />
        <LinkTextField source="answer" label="Відповідь" onClick={redirectToEdit} />
      </Datagrid>
    </List>
  );
}
