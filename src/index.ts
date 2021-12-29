import {
  ParseOptions,
  ParsedQuery,
  StringifyOptions,
  parse,
  stringify
} from 'query-string';
import {useState} from 'react';

export interface QueryStringResult {
  [0]: ParsedQuery;
  [1]: (values: object) => void;
}

interface QueryStringOptions {
  parseOptions?: ParseOptions;
  stringifyOptions?: StringifyOptions;
}

export default function useQueryString(
  initialState?: ParsedQuery,
  options: QueryStringOptions = {}
): QueryStringResult {
  const {parseOptions, stringifyOptions} = options;
  const [state, setState] = useState(
    initialState || parse(location.search, parseOptions)
  );

  function setQuery(values: object): void {
    const query = {
      ...state,
      ...values
    };

    setState(query);

    history.pushState(
      {},
      '',
      location.pathname + '?' + stringify(query, stringifyOptions)
    );
  }

  return [state, setQuery];
}
