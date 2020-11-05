import React from 'react'
import { render } from 'react-dom'
import { Konfi, Type } from 'konfi'

const data = {
  someValue: 5,
  age: 16,
  select: 'first',
  toggle: false,
  nested: {
    anotherValue: 'test',
    deeplyNested: {
      oneMoreValue: 3.33,
    },
  },
}

const schema = {
  someValue: {
    type: Type.number,
  },
  age: {
    type: Type.number,
    // Adults only.
    valid: (value: number) => value >= 18,
  },
  select: {
    type: Type.select,
    values: ['first', 'second', 'third'],
  },
  toggle: {
    type: Type.boolean,
  },
  nested: {
    anotherValue: {
      type: Type.string,
    },
    deeplyNested: {
      oneMoreValue: {
        type: Type.number,
      },
    },
  },
}

const onChange = (data: any) => console.log('onChange', data)

render(
  <div>
    <Konfi data={data} schema={schema} onChange={onChange} />
  </div>,
  document.body
)
