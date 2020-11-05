import React, { useState } from 'react'
import { Schema, Type } from './types'

const inputStyles = ({ hasError }: { hasError: boolean }) => ({
  borderRadius: 5,
  paddingTop: 2,
  paddingRight: 2,
  paddingBottom: 2,
  paddingLeft: 5,
  borderWidth: 1,
  borderColor: hasError ? 'red' : 'black',
  color: hasError ? 'red' : 'black',
})

export const Input = ({
  schema,
  value,
  onChange,
}: {
  schema: Schema
  value: any
  onChange: (value: any) => void
}) => {
  const [currentValue, setValue] = useState(value)
  let type = 'string'
  let hasError = false

  if (schema.type === Type.number) {
    type = 'number'
  }

  if (schema.type === Type.boolean) {
    type = 'checkbox'
  }

  if (schema.valid && typeof schema.valid === 'function') {
    hasError = !schema.valid(currentValue)
  }

  return (
    <input
      style={inputStyles({ hasError })}
      value={currentValue}
      onChange={(event) => {
        let changedValue: any = event.target.value

        if (schema.type === Type.number) {
          changedValue = Number(changedValue)
        }

        setValue(changedValue)
        // Only update if value is valid.
        if (
          !schema.valid ||
          typeof schema.valid !== 'function' ||
          schema.valid(changedValue)
        ) {
          onChange(changedValue)
        }
      }}
      type={type}
    />
  )
}
