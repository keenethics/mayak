import { Create } from 'react-admin';
import { useState } from 'react';
import { transformEventCreateData } from '@admin/_utils/transformEventCreateData';
import { EventForm } from './EventForm';

export function EventCreate() {
  const [selectedTags, setSelectedTags] = useState(null);
  return (
    <Create transform={data => transformEventCreateData(data, selectedTags)}>
      <EventForm setSelectedTags={setSelectedTags} />
    </Create>
  );
}
