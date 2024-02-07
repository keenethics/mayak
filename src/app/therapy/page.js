'use client';

import React, { useState } from 'react';
import { useListTherapies, useCreateTherapy, useDeleteTherapy } from '../_hooks';

export default function Therapies() {
  const [price, setPrice] = useState('');
  const { data: therapies } = useListTherapies();
  const { mutate: createTherapy } = useCreateTherapy();
  const { mutate: deleteTherapy } = useDeleteTherapy();

  const onAdd = () => {
    createTherapy({ price: Number(price) }, { onSuccess: () => setPrice('') });
  };

  const onDelete = (id) => {
    deleteTherapy({ id });
  };

  return (
    <div style={{ margin: '10rem' }}>
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      <button type="button" onClick={() => onAdd()}>
        Add
      </button>
      <div>
        {therapies?.map(it => (
          <div key={it.id} style={{ display: 'flex', gap: '2rem' }}>
            <div>{`${it.id}:${it.price}`}</div>
            <button type="button" onClick={() => onDelete(it.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
