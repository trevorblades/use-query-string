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
    result.current[1]({foo: 'baz'});
  });

  expect(history.location.search).toBe('?foo=baz');
  expect(result.current[0].foo).toBe('baz');
});
