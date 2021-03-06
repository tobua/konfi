import React, { useState } from 'react'
import { render } from 'react-dom'
import { Exmpl } from 'exmpl'
import { Konfi, Type } from 'konfi'

const data = {
  padding: 10,
  age: 16,
  mode: 'dark',
  toggle: false,
  background: '#BADA55',
  styles: {
    borderWidth: 2,
    borderColor: '#000000',
  },
  obj: {
    hello: 'world',
    again: 3,
  },
  arrow: true,
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
  styles: {
    borderWidth: {
      type: Type.number,
    },
    borderColor: {
      type: Type.hex,
    },
  },
  obj: [
    {
      hello: {
        type: Type.string,
      },
      again: {
        type: Type.number,
      },
    },
    {
      type: Type.string,
    },
  ],
  arrow: [
    {
      type: Type.boolean,
    },
    {
      type: Type.string,
    },
    {
      type: Type.number,
    },
    {
      type: Type.boolean,
    },
    {
      position: {
        type: Type.select,
        values: ['center', 'start', 'end'],
      },
      url: {
        type: Type.string,
      },
      markup: {
        type: Type.string,
      },
    },
  ],
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
        borderWidth: configuration.styles.borderWidth,
        borderColor: configuration.styles.borderColor,
        borderStyle: 'solid',
      }}
    >
      <h2>Result</h2>
      <p>Adapt configuration above to see changes reflected here.</p>
      <p>Age: {configuration.age}</p>
      <p>{configuration.arrow ? 'Has' : 'No'} arrow.</p>
    </div>
  )
}

// Create copy to make sure setState will update (immutability will come later).
const onChange = (data: any) => updateComponentData({ ...data })

render(
  <Exmpl title="konfi Demo" npm="konfi" github="tobua/konfi">
    <Konfi data={data} schema={schema} onChange={onChange} />
    <Result />
  </Exmpl>,
  document.body
)
