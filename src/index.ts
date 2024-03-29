import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {
  ParseOptions,
  ParsedQuery,
  StringifyOptions,
  parse,
  stringify
} from 'query-string';

export interface QueryStringResult {
  [0]: ParsedQuery;
  [1]: Dispatch<SetStateAction<Record<string, any>>>;
}

export default function useQueryString(
  location: Location,
  navigate: (path: string) => void,
  parseOptions?: ParseOptions,
  stringifyOptions?: StringifyOptions
): QueryStringResult {
  const isFirst = useRef(true);
  const [state, setState] = useState(parse(location.search, parseOptions));

  useEffect((): void => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      navigate(location.pathname + '?' + stringify(state, stringifyOptions));
    }
  }, [state]);

  const setQuery: typeof setState = (values): void => {
    const nextState = typeof values === 'function' ? values(state) : values;
    setState(
      (state): ParsedQuery => ({
        ...state,
        ...nextState
      })
    );
  };

  return [state, setQuery];
}
