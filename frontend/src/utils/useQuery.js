// useQuery.js

import { useLocation } from 'react-router-dom';

/**
 * Custom hook to get query parameters from the URL.
 * @returns {URLSearchParams} URLSearchParams object containing query parameters.
 */
function useQuery() {
  // Use useLocation hook to access the current location object
  // and get the search property which contains the query parameters.
  return new URLSearchParams(useLocation().search);
}

export default useQuery;
