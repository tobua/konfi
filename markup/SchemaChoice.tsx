import React from 'react'
import { inferTypeFromValue } from '../infer'
import { Schema, typeToString, defaultValueForType } from '../types'

export const getInitialSchemaFromData = (schemas: Schema, data: any) => {
  if (!Array.isArray(schemas)) {
    return schemas
  }

  const type = inferTypeFromValue(data)

  // Fallback to first schema if no match found.
  let match = schemas[0]

  schemas.map((schema: any) => {
    if (schema.type === type) {
      match = schema
    }
  })

  return match
}

export const getDataForChosenSchema = (schema: any, data: any) => {
  const inferredType = inferTypeFromValue(data)

  // Data empty if types don't match, but kept until user change
  // in case the user switches the schema back to a match.
  if (schema.type !== inferredType) {
    return defaultValueForType[schema.type]
  }

  return data
}

interface Props {
  schemas: Schema
  onChange: (value: Schema) => void
}

// Multiple schemas possible.
export const SchemaChoice = ({ schemas, onChange }: Props) => {
  if (!Array.isArray(schemas)) {
    return null
  }

  return (
    <select
      onChange={(event) => {
        const index = event.target.value
        onChange(schemas[index])
      }}
      style={{ marginRight: 10 }}
    >
      {schemas.map((schema: any, index) => (
        <option key={index} value={index}>
          {typeToString[schema.type]}
        </option>
      ))}
    </select>
  )
}
