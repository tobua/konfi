import React, { useState } from 'react'
import { render } from 'react-dom'
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
  arrow: [
    {
      type: Type.boolean,
    },
    {
      type: Type.string,
    },
    // {
    //   position: {
    //     type: Type.select,
    //     values: ['center', 'start', 'end'],
    //   },
    //   url: {
    //     type: Type.string,
    //   },
    //   markup: {
    //     type: Type.string,
    //   },
    // },
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
    </div>
  )
}

// Create copy to make sure setState will update (immutability will come later).
const onChange = (data: any) => updateComponentData({ ...data })

render(
  <div style={{ fontFamily: 'sans-serif', maxWidth: '75vw', margin: '0 auto' }}>
    <header style={{ display: 'flex' }}>
      <h1>konfi Demo</h1>
      <nav
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <a href="https://www.npmjs.com/package/konfi">
          <img style={{ width: 30, marginLeft: 10 }} src="npm.svg" />
        </a>
        <a href="https://github.com/tobua/konfi">
          <img style={{ width: 30, marginLeft: 10 }} src="github.png" />
        </a>
      </nav>
    </header>
    <Konfi data={data} schema={schema} onChange={onChange} />
    <Result />
  </div>,
  document.body
)
