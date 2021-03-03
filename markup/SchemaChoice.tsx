import React from 'react'
import { inferTypeFromValue } from '../infer'
import {
  Schema,
  typeToString,
  defaultValueForType,
  SchemaValue,
} from '../types'
import * as styles from './styles'

export const getDataForObjectSchema = (data: any, schema: Schema) => {
  if (typeof data === 'object') {
    return data
  }

  const result = {}

  Object.keys(schema).forEach((property) => {
    result[property] = defaultValueForType[schema[property].type]
  })

  return result
}

export const getInitialSchemaFromData = (
  schemas: SchemaValue | Schema[],
  data: any
): SchemaValue => {
  if (!Array.isArray(schemas)) {
    return schemas
  }

  const type = inferTypeFromValue(data)

  // Fallback to first schema if no match found.
  let match = schemas[0] as SchemaValue

  schemas.map((schema: any) => {
    if (schema.type === type) {
      match = schema
    }
  })

  return match
}

export const getDataForChosenSchema = (schema: SchemaValue, data: any) => {
  const inferredType = inferTypeFromValue(data)

  // Data empty if types don't match, but kept until user change
  // in case the user switches the schema back to a match.
  if (schema.type !== inferredType) {
    return defaultValueForType[schema.type]
  }

  return data
}

interface Props {
  schemas: SchemaValue | Schema[]
  onChange: (value: SchemaValue) => void
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
      style={styles.spaceRight}
    >
      {schemas.map((schema: any, index) => (
        <option key={index} value={index}>
          {schema.type ? typeToString[schema.type] : 'Object'}
        </option>
      ))}
    </select>
  )
}
