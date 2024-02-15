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
} from 'react-admin';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

function ChangeWeightButtons({ source }) {
  const notify = useNotify();
  const record = useRecordContext();
  const [update, { isLoading, error }] = useUpdate('qA');
  const handleChangeWeightClick = diff => () => {
    const isDiffPositive = diff > 0;
    update(
      'QA',
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
    return null;
  }

  return (
    <WrapperField source="weight" label="Weight">
      <div className="grid h-full w-full grid-cols-[min-content_min-content_min-content] place-items-center gap-2">
        <button className="h-full" onClick={handleChangeWeightClick(1)}>
          <FaAngleUp />
        </button>
        <TextField source="weight" />
        {record[source]}
        <button className="h-full" onClick={handleChangeWeightClick(-1)}>
          <FaAngleDown />
        </button>
      </div>
    </WrapperField>
  );
}

export function ListQa() {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <ChangeWeightButtons source="priority" />
        <BooleanField source="isActive" />
        <TextField source="question" />
        <TextField source="answer" />
      </Datagrid>
    </List>
  );
}
