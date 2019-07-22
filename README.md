# useQueryString

[![Build Status](https://travis-ci.com/trevorblades/use-query-string.svg)](https://travis-ci.com/trevorblades/use-query-string)

A React hook that serializes state into the URL query string

## Installation

```bash
npm install use-query-string
```

## Usage

```js
const [query, setQuery] = useQueryString(location, pushState);
```

Given a location object and a history updater function, this hook will return an array who's first element is ab object representing the current URL query string. The second element in the array is a function that serializes an object into the query string and updates the former `query` object.

## Example

```jsx
import React from 'react';
import useQueryString from '@trevorblades/use-query-string';

function ColorPicker() {
  const [{color}, setQuery] = useQueryString(
    window.location,
    path => history.pushState(null, document.title, path)
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
    props.location,
    navigate
  );

  // ...the rest of your page
}
```

### License

[MIT](./LICENSE)
