import { Edit, Toolbar, SaveButton } from 'react-admin';
import { EventFormEdit } from './EventForm';
import { useState } from 'react';
import { transformEventData } from '@admin/_utils/transformEventData';

// this toolbar with always enabled save button is needed
// because react-admin edit doesn't react to CreatableSelect changes
function ToolBar() {
  return (
    <Toolbar>
      <SaveButton alwaysEnable />
    </Toolbar>
  );
}

export function EventEdit() {
  const [selectedTags, setSelectedTags] = useState(null);
  return (
    <Edit mutationMode="pessimistic" transform={data => transformEventData(data, selectedTags)}>
      <EventFormEdit setSelectedTags={setSelectedTags} toolbar={<ToolBar />} />
    </Edit>
  );
}
