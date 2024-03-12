export function parseDate(date) {
  const dateObj = new Date(date);
  const day = dateObj.toLocaleDateString('uk-UA', { weekday: 'long' });
  const month = dateObj.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
  const time = dateObj.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  return { day, month, time };
}
