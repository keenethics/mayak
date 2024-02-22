import React from 'react';

export function TherapiesList() {
  const tags = ['психодинамічний', 'когнітивний', 'біхевіоральний', 'військові', 'супровід у психіатрії'];

  return (
    <div className="mt-[14px]">
      <h3 className="text-p4 font-bold uppercase text-gray-600">Напрямок лікування</h3>
      <ul className="mt-[14px] flex flex-wrap gap-[10px]">
        {tags.map(t => (
          <span key={t} className="rounded-[24px] bg-primary-100 px-[12px] py-[4x] text-c3 text-primary-600">
            {t}
          </span>
        ))}
      </ul>
    </div>
  );
}
