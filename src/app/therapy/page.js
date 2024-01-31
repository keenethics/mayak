"use client";
import { useState } from "react";
import {
  useListTherapies,
  useCreateTherapy,
  useDeleteTherapy,
} from "@/app/_hooks";

export default function Therapies() {
  const [price, setPrice] = useState("");
  const { data: therapies } = useListTherapies();
  const { mutate: createTherapy } = useCreateTherapy();
  const { mutate: deleteTherapy } = useDeleteTherapy();

  const onAdd = (price) => {
    createTherapy({ price }, { onSuccess: () => setPrice("") });
  };

  const onDelete = (id) => {
    deleteTherapy({ id });
  };

  return (
    <>
      <div style={{ margin: "10rem" }}>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={() => onAdd(Number(price))}>Add</button>
        <div>
          {therapies?.map(({ id, price }) => (
            <div key={id} style={{ display: "flex", gap: "2rem" }}>
              <div>{`${id}:${price}`}</div>
              <button onClick={() => onDelete(id)}> Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
