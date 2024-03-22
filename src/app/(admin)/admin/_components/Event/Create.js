import { Create } from 'react-admin';
import { useState } from 'react';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { transformEventCreateData } from '@admin/_utils/transformEventCreateData';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { EventForm } from './EventForm';

export function EventCreate() {
  const [selectedTags, setSelectedTags] = useState(null);
  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.created,
    redirectPath: `/${RESOURCES.event}`,
  });
  return (
    <Create
      title="Додавання нової події"
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      transform={data => transformEventCreateData(data, selectedTags)}
    >
      <EventForm setSelectedTags={setSelectedTags} />
    </Create>
  );
}
