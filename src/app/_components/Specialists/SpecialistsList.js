// 'use client';

import React from 'react';
import { useListSpecialists } from '@/app/_hooks/api/useSpecialist';

export function SpecialistsList() {
  // const [price, setPrice] = useState('');
  // const { data: therapies } = useListTherapies();
  const data = useListSpecialists();

  // console.log(data);

  // const { mutate: createTherapy } = useCreateTherapy();
  // const { mutate: deleteTherapy } = useDeleteTherapy();
  //
  // const onAdd = () => {
  //   createTherapy({ price: Number(price) }, { onSuccess: () => setPrice('') });
  // };
  //
  // const onDelete = id => {
  //   deleteTherapy({ id });
  // };

  return (
    <div style={{ margin: '10rem' }}>
      <span>{JSON.stringify(data?.map(d => ({ id: d.id })))}</span>
      {/* <input type="number" value={price} onChange={e => setPrice(e.target.value)} /> */}
      {/* <div> */}
      {/*   {therapies?.map(it => ( */}
      {/*     <div key={it.id} style={{ display: 'flex', gap: '2rem' }}> */}
      {/*       <div>{`${it.id}:${it.price}`}</div> */}
      {/*       <button type="button" onClick={() => onDelete(it.id)}> */}
      {/*         Delete */}
      {/*       </button> */}
      {/*     </div> */}
      {/*   ))} */}
      {/* </div> */}
    </div>
  );
}
