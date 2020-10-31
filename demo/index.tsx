import React from 'react'
import { render } from 'react-dom'
import { Konfi, Type } from 'konfi'

const data = {
  someValue: 5,
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
