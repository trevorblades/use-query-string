# useQueryString

A React hook that serializes state into the URL query string

```js
import React from 'react';
import useQueryString from '@trevorblades/use-query-string';

function ColorPicker() {
  const [{color}, setQuery] = useQueryString(
    window.location,
    history.pushState
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
