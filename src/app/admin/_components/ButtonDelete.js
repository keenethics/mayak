import { DeleteWithConfirmButton } from 'react-admin';
import React from 'react';

export function ButtonDelete() {
  return (
    <DeleteWithConfirmButton
      confirmContent="You will not be able to recover this record. Are you sure?"
      confirmColor="warning"
      label="Видалити"
    />
  );
}
