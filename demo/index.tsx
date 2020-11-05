import React, { useState } from 'react'
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

let updateComponentData

const Result = () => {
  const [data, setData] = useState(null)

  updateComponentData = setData

  console.log('onChange', data)

  if (!data) {
    return <div>Initial</div>
  }

  return (
    <div>
      <p>{data.age}</p>
      <p>{data.select}</p>
    </div>
  )
}

const onChange = (data: any) => updateComponentData(data)

render(
  <div style={{ fontFamily: 'sans-serif' }}>
    <h1>konfi Demo</h1>
    <Konfi data={data} schema={schema} onChange={onChange} />
    <Result />
  </div>,
  document.body
)
