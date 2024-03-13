'use client';

import { NotFoundLayout } from '@components/NotFoundLayout';

export default function Error() {
  return (
    <NotFoundLayout href="/specialist" hrefText="Список спеціалістів" className="m-10">
      <p className="mt-6">Такого спеціаліста не існує...</p>
    </NotFoundLayout>
  );
}
