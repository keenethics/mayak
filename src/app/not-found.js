import React from 'react';
import { NotFoundLayout } from '@components/NotFoundLayout';

export default function NotFoundPage() {
  return (
    <NotFoundLayout className="m-10">
      <span>Error</span>
      <div className="text-h4 font-bold lg:text-h2">404</div>
      <span>Not found</span>
    </NotFoundLayout>
  );
}
