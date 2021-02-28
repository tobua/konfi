import React from 'react'
import merge from 'deepmerge'
import { infer } from './infer'
import { Schema } from './types'
import { Wrapper } from './markup/Wrapper'

export { Type } from './types'

export const Konfi = ({
  data,
  schema = infer(data),
  onChange,
}: {
  data: any
  onChange: (data: any) => void
  schema?: Schema
}) => {
  // No need for useState as no rerender required.
  let currentData = data
  const handleChange = (path: string[], value: any) => {
    const result = merge({}, currentData)
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
    }, result)

    onChange(result)

    currentData = result
  }

  return <Wrapper data={currentData} schema={schema} onChange={handleChange} />
}
