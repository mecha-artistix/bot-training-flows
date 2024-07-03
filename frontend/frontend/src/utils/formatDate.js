// utils/formatDate.js

/**
 * Format a date string to dd/mm/yyyy
 * @param {string} dateString - The date string to format
 * @returns {string} - The formatted date string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
