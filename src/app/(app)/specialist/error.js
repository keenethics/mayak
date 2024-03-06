'use client';

import { NotFound404 } from '@components';

export default function Error() {
  return (
    <NotFound404 href="/specialist" hrefText="Список спеціалістів" className="m-10">
      <p className="mt-6">Такого спеціаліста не існує...</p>
    </NotFound404>
  );
}
