import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export function MethodsShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="title" label="Назва" />
        <TextField source="description" label="Опис" />
      </SimpleShowLayout>
    </Show>
  );
}
