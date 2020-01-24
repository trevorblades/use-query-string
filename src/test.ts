/* eslint-env jest */
import useQueryString, {QueryStringResult} from '.';
import {act, renderHook} from '@testing-library/react-hooks';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

test('should update the query string', (): void => {
  const {result} = renderHook(
    (): QueryStringResult => useQueryString(history.location, history.push)
  );

  act((): void => {
    result.current[1]({foo: 'bar'});
  });

  expect(history.location.search).toBe('?foo=bar');
  expect(result.current[0].foo).toBe('bar');
});

test('does not clobber existing params', (): void => {
  const {result} = renderHook(
    (): QueryStringResult => useQueryString(history.location, history.push)
  );

  act((): void => {
    result.current[1]({baz: 123});
  });

  expect(history.location.search).toBe('?baz=123&foo=bar');
  expect(result.current[0].baz).toBe(123);
});
