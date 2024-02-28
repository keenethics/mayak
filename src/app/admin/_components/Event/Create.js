import { Create } from 'react-admin';
import { useState } from 'react';
import { transformEventData } from '@admin/_utils/transformEventData';
import { EventForm } from './EventForm';

export function EventCreate() {
  const [selectedTags, setSelectedTags] = useState(null);
  return (
    <Create mutationMode="pessimistic" transform={data => transformEventData(data, selectedTags)}>
      <EventForm setSelectedTags={setSelectedTags} />
    </Create>
  );
}
