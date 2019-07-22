import querystring from 'querystring';
import {useState} from 'react';

export default function useQueryString(location, navigate) {
  const [state, setState] = useState(
    querystring.parse(location.search.slice(1))
  );

  function setQuery(values) {
    const newQuery = {
      ...state,
      ...values
    };

    setState(newQuery);
    navigate(location.pathname + '?' + querystring.stringify(newQuery));
  }

  return [state, setQuery];
}
