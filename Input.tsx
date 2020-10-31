import React, { useState } from 'react'
import { Schema, Type } from './types'

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

  if (schema.type === Type.number) {
    type = 'number'
  }

  if (schema.type === Type.boolean) {
    type = 'checkbox'
  }

  return (
    <input
      value={currentValue}
      onChange={(event) => {
        let value: any = event.target.value

        if (schema.type === Type.number) {
          value = Number(value)
        }

        setValue(value)
        onChange(value)
      }}
      type={type}
    />
  )
}
