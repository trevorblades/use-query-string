# useQueryString

[![Build Status](https://github.com/trevorblades/use-query-string/workflows/Node%20CI/badge.svg)](https://github.com/trevorblades/use-query-string/actions)

A React hook that serializes state into the URL query string

## Installation

```bash
$ npm install use-query-string
```

## Usage

Given a location object and a history updater function, this hook will return an array who's first element is an object representing the current URL query string. The second element in the array is a function that serializes an object into the query string and updates the former `query` object.

```js
import useQueryString from '@trevorblades/use-query-string';

const [query, setQuery] = useQueryString(location, updateQuery);
```

The first argument passed to the hook is a [`Location`](https://developer.mozilla.org/en-US/docs/Web/API/Location) object, and the second is a history-updating function with the following signature:

```ts
(path: string): void => {
  // update the browser history
}
```

## `parseOptions`

You can supply an optional third argument to this hook that gets passed along as options to the parser function. These allow you to do things like automatically convert values to numbers or booleans, where appropriate. See [the `query-string` docs](https://github.com/sindresorhus/query-string#parsestring-options) for all of the accepted options.

```js
const [query, setQuery] = useQueryString(
  location,
  navigate,
  {
    parseNumbers: true,
    parseBooleans: true
  }
);
```

## Example

In this example, you'll see a component using the query string to serialize some state about a selected color. The component uses the `location` object from the `window`, and a wrapper around 

```jsx
import React from 'react';
import useQueryString from '@trevorblades/use-query-string';

function updateHistory(path) {
  history.pushState(null, document.title, path);
}

function ColorPicker() {
  const [{color}, setQuery] = useQueryString(
    window.location,
    updateHistory
  );

  function handleColorChange(event) {
    setQuery({color: event.target.value});
  }

  return (
    <div>
      <p style={{color}}>Color is {color}</p>
      <select value={color} onChange={handleColorChange}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </select>
    </div>
  );
}
```

### Gatsby example

If you're using Gatsby, you could pass `props.location` and the `navigate` helper function from [Gatsby Link](https://www.gatsbyjs.org/docs/gatsby-link/) as arguments to the hook.

```js
// pages/index.js
import React from 'react';
import useQueryString from '@trevorblades/use-query-string';
import {navigate} from 'gatsby';

function IndexPage(props) {
  const [query, setQuery] = useQueryString(
    props.location, // pages are given a location object via props
    navigate
  );

  // ...the rest of your page
}
```

## License

[MIT](./LICENSE)
