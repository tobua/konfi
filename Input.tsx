import React, { useState } from 'react'
import { Schema, Type } from './index'

export const Input = ({ schema, value }: { schema: Schema; value: any }) => {
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
      onChange={(event) => setValue(event.target.value)}
      type={type}
    />
  )
}
