# konfi

<img align="right" src="https://github.com/tobua/konfi/raw/master/logo.png" width="20%" alt="konfi" />

UI for Configuration Management.

- WYSIWYG editing of JSON objects
- Callback on edits
- Declarative or inferred schema

[![konfi Demo](https://img.shields.io/static/v1?label=konfi&message=Demo&color=brightgreen)](https://tobua.github.io/konfi)

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

## Schema

The following properties can be used to describe the values in further detail:

`type: Type.number | Type.string | Type.boolean | Type.hex | Type.filePath | Type.select`

Various types to describe what input to show and which standard validations to apply.

`valid: (value: any) => boolean`

A function indicating whether the current value is valid, otherwise the input will be shown in erroneous state and the change will not be propagated.

## Types

### select

```js
{
  type: Type.select,
  values: ['first', 'second', 'third']
}
```

### color

```js
{
  type: Type.hex
}
```

This will display the color with a color picker overlay to choose another HEX color.

## Upcoming Features

- Regex Validation
- generate new data with immer patches
