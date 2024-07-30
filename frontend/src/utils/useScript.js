import { useEffect } from 'react';

const useScript = function (url, onLoad) {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    script.onload = onLoad;
    script.onerror = () => console.error(`Error loading script from ${url}`);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
export default useScript;

export const fetchCountriesList = async () => {
  try {
    const response = await fetch('https://gist.github.com/mecha-artistix/380eb95aa9bd9fb06fe64a51094ebdbf.js');
    // const countriesList = await response.json();

    return response;
  } catch (error) {
    console.error('Error fetching countries list:', error);
    return [];
  }
};
