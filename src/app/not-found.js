import React from 'react';
import { NotFound404 } from '@components';

export default function NotFoundPage() {
  return (
    <NotFound404 className="m-10">
      <span>Error</span>
      <div className="text-h4 font-bold lg:text-h2">404</div>
      <span>Not found</span>
    </NotFound404>
  );
}
