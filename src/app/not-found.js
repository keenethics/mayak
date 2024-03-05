import React from 'react';
import { AppNotFound } from '@components';

export default function NotFoundPage() {
  return (
    <AppNotFound className="m-10">
      <span>Error</span>
      <div className="text-h4 font-bold lg:text-h2">404</div>
      <span>Not found</span>
    </AppNotFound>
  );
}
