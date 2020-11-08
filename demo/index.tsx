import React, { useState } from 'react'
import { render } from 'react-dom'
import { Konfi, Type } from 'konfi'

const data = {
  padding: 10,
  age: 16,
  mode: 'dark',
  toggle: false,
  background: '#BADA55',
  nested: {
    anotherValue: 'test',
    deeplyNested: {
      oneMoreValue: 3.33,
    },
  },
}

const schema = {
  padding: {
    type: Type.number,
  },
  age: {
    type: Type.number,
    // Adults only.
    valid: (value: number) => value >= 18,
  },
  mode: {
    type: Type.select,
    values: ['dark', 'light'],
  },
  toggle: {
    type: Type.boolean,
  },
  background: {
    type: Type.hex,
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

let updateComponentData: React.Dispatch<any>

const Result = () => {
  const [configuration, setData] = useState(data)

  updateComponentData = setData

  if (!configuration) {
    return null
  }

  return (
    <div
      style={{
        backgroundColor: configuration.background,
        padding: configuration.padding,
        color: configuration.mode === 'dark' ? 'black' : 'white',
        borderRadius: 10,
      }}
    >
      <p>Adapt configuration above to see changes.</p>
      <p>{configuration.age}</p>
    </div>
  )
}

// Create copy to make sure setState will update (immutability will come later).
const onChange = (data: any) => updateComponentData({ ...data })

render(
  <div style={{ fontFamily: 'sans-serif' }}>
    <h1>konfi Demo</h1>
    <Konfi data={data} schema={schema} onChange={onChange} />
    <Result />
  </div>,
  document.body
)
