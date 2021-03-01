import React, { useState } from 'react'
import merge from 'deepmerge'
import { infer } from './infer'
import { Schema } from './types'
import { Level } from './markup/Level'
import { Context } from './context'

export { Type } from './types'

// Applies a change of the data on the path and notifies the user with the new data.
const handleChange = (
  data: Object,
  onChange: (data: any) => void,
  path: string[],
  value: any
) => {
  // Make the change on the data.
  path.reduce((accumulator, currentValue, currentIndex) => {
    if (
      typeof accumulator[currentValue] === 'object' &&
      currentIndex !== path.length - 1
    ) {
      return accumulator[currentValue]
    }

    accumulator[currentValue] = value
    return undefined
  }, data)

  onChange(data)
}

interface Props {
  data: Object
  onChange: (data: any) => void
  schema?: Schema
}

export const Konfi = ({ data, schema = infer(data), onChange }: Props) => {
  const [currentColorPicker, setCurrentColorPicker] = useState(null)
  // Create a copy of the data to avoid modifying user data.
  let localData = merge({}, data)

  return (
    <div className="konfi" style={{ fontFamily: 'monospace' }}>
      <p>{'{'}</p>
      <Context.Provider value={{ currentColorPicker, setCurrentColorPicker }}>
        <Level
          data={localData}
          schema={schema}
          onChange={handleChange.bind(null, localData, onChange)}
        />
      </Context.Provider>
      <p>{'}'}</p>
    </div>
  )
}
