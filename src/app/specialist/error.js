'use client';

import { NotFoundPageWrapper } from '@components';

export default function Error() {
  return (
    <NotFoundPageWrapper href="/specialist" hrefText="Повернутися до списку спеціалістів">
      <p className="mt-6">Такого спеціаліста не існує...</p>
    </NotFoundPageWrapper>
  );
}
