import React from 'react'
import { Schema, typeToString } from '../types'

// Multiple schemas possible.
export const SchemaChoice = ({
  schemas,
  data,
  onChange,
}: {
  schemas: Schema[]
  data: any
  onChange: (value: Schema) => void
}) => {
  if (!Array.isArray(schemas)) {
    return null
  }

  return (
    <select
      onChange={(event) => {
        const index = event.target.value
        onChange(schemas[index])
      }}
    >
      {schemas.map((schema: any, index) => (
        <option key={index} value={index}>
          {typeToString[schema.type]}
        </option>
      ))}
    </select>
  )
}
