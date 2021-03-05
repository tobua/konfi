import React from 'react'
import { inferTypeFromValue } from '../infer'
import {
  Schema,
  typeToString,
  defaultValueForType,
  SchemaValue,
  SchemaObjectOrValue,
  schemaHasType,
  Type,
} from '../types'
import * as styles from './styles'

export const getDataForObjectSchema = (data: any, schema: Schema) => {
  const hasType = schemaHasType(schema)
  const dataIsObject = typeof data === 'object'
  const inferredDataType = inferTypeFromValue(data)

  // Data and schema match, return.
  if (dataIsObject && !hasType) {
    return data
  }

  const type = (schema as { type: Type }).type

  // Wrong data for schema, prefill with default value for type.
  if (dataIsObject && hasType) {
    return defaultValueForType[type]
  }

  // Inferred data type and defined schema type match.
  if (inferredDataType === type) {
    return data
  }

  if (hasType) {
    return defaultValueForType[type]
  }

  // Non object data for object schema, create object with defaults
  // matching the schema.
  const result = {}

  Object.keys(schema).forEach((property) => {
    result[property] = defaultValueForType[schema[property].type]
  })

  return result
}

export const getInitialSchemaFromData = (
  schemas: Schema,
  data: any
): SchemaObjectOrValue => {
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

interface Props {
  schemas: Schema
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
