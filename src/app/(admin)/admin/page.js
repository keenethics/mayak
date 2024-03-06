import React from 'react';
import dynamic from 'next/dynamic';

const AdminApp = dynamic(() => import('./AdminApp'), {
  ssr: false,
});

export default function Page() {
  return <AdminApp />;
}
