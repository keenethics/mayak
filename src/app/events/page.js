'use client';

import React from 'react';
import { useListEvents } from '../_hooks/api/useEvent';
import EventCard from '../_components/Event/Card';

export default function Page() {
  const { data } = useListEvents();
  if (data) {
    return (
      <div>
        {data.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }
}
