'use client';

import { AppNotFound } from '@components';

export default function Error() {
  return (
    <AppNotFound href="/specialist" hrefText="Список спеціалістів" className="m-10">
      <p className="mt-6">Такого спеціаліста не існує...</p>
    </AppNotFound>
  );
}
