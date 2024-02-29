import { Edit, Toolbar, SaveButton } from 'react-admin';
import { useState } from 'react';
import { transformEventEditData } from '@admin/_utils/transformEventEditData';
import { EventFormEdit } from './EventForm';

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
    <Edit
      mutationMode="pessimistic"
      transform={(data, { previousData }) => transformEventEditData(data, selectedTags, previousData)}
    >
      <EventFormEdit setSelectedTags={setSelectedTags} toolbar={<ToolBar />} />
    </Edit>
  );
}
