/* eslint-env jest */
import useQueryString from '.';
import {act, renderHook} from '@testing-library/react-hooks';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

test('should update the query string', () => {
  const {result} = renderHook(() =>
    useQueryString(history.location, history.push)
  );

  act(() => {
    result.current[1]({foo: 'baz'});
  });

  expect(history.location.search).toBe('?foo=baz');
  expect(result.current[0].foo).toBe('baz');
});
