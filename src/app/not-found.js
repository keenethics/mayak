import React from 'react';
import { NotFoundPageWrapper } from '@components';

export default function NotFoundPage() {
  return (
    <NotFoundPageWrapper>
      <span>Error</span>
      <div className="text-h4 font-bold lg:text-h2">404</div>
      <span>Not found</span>
    </NotFoundPageWrapper>
  );
}
