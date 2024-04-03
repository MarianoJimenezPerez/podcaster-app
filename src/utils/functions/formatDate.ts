export const formatDate = (inputDate: string): string => {
  const dateObj = new Date(inputDate);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // +1 add because the month start at index 0
  const year = dateObj.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
