import ky from 'ky';

export const allEvents = async ({ month, take, lastCursor }) => {
  const queryParams = new URLSearchParams({ take, lastCursor, month }).toString();
  return await ky(`/api/event?${queryParams}`).json();
};
