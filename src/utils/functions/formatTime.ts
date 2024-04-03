export const formatTime = (seconds: number): string => {
  const date = new Date(seconds * 1000); // get milisecs
  return date.toLocaleString('en-US', { minute: '2-digit', second: '2-digit', timeZone: 'UTC' });
};
