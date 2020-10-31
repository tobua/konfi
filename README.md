<p align="center">
  <img src="https://github.com/tobua/konfi/raw/master/logo.png" alt="konfi">
</p>

# konfi

UI for Configuration Management.

## Installation & Usage

```
npm i konfi
```

```jsx
import React from 'react'
import { render } from 'react-dom'
import { Konfi, Type } from 'konfi'

const data = {
  someValue: 5,
  anotherValue: 'red',
}

// The schema is optional and in most cases can be inferred from the data.
const schema = {
  someValue: {
    type: Type.number,
  },
  anotherValue: {
    type: Type.string,
  },
}

const onChange = (data: any) => console.log('new configuration', data)

render(
  <div>
    <Konfi schema={schema} data={data} onChange={onChange} />
  </div>,
  document.body
)
```

## Upcoming Features

- Colorpicker
- Regex Validation
- Validation
- generate new data with immer patches
