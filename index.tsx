import React, { useState } from 'react'
import merge from 'deepmerge'
import { infer } from './infer'
import { Schema, OnChangeHandler } from './types'
import { Level } from './markup/Level'
import { Context } from './context'

export { Type } from './types'

interface Props {
  data: Object
  onChange: OnChangeHandler
  schema?: Schema
}

export const Konfi = ({ data, schema = infer(data), onChange }: Props) => {
  const [currentColorPicker, setCurrentColorPicker] = useState(null)
  // Create a copy of the data to avoid modifying user data.
  let localData = merge({}, data)

  return (
    <div className="konfi" style={{ fontFamily: 'monospace' }}>
      <p>{'{'}</p>
      <Context.Provider
        value={{
          currentColorPicker,
          setCurrentColorPicker,
          onChange: onChange.bind(null, localData),
        }}
      >
        <Level data={localData} schema={schema} />
      </Context.Provider>
      <p>{'}'}</p>
    </div>
  )
}
