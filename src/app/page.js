'use client';

import React from 'react';
import EventCard from './_components/Event/Card';
import { useListEvents } from './_hooks/api/useEvent';
// Page metadata should contain
// title - gets formatted into "%s | Маяк", %s is replaced by title,
// description - short description of the page,

export default function Page() {
  const { data: events } = useListEvents();
  if (events) {
    return (
      <div>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }
}
