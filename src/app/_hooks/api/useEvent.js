import ky from 'ky';
import { useQuery } from '@tanstack/react-query';

const eventKey = 'event';

async function listEvents() {
  return ky('/api/event').json();
}

export const useListEvents = () =>
  useQuery({
    queryKey: [eventKey],
    queryFn: listEvents,
  });
