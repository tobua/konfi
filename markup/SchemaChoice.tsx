import React from 'react'
import { inferTypeFromValue } from '../infer'
import {
  Schema,
  typeToString,
  SchemaValue,
  SchemaObjectOrValue,
  Type,
  defaultValuesForType,
} from '../types'
import * as styles from './styles'

const schemaHasType = (schema: Schema) =>
  typeof schema === 'object' && (schema as { type?: Type }).type in Type

const defaultValueForSchema = (schema: Schema) => {
  const hasType = schemaHasType(schema)

  if (!hasType) {
    return undefined
  }

  const typedSchema = schema as { type: Type; default?: number }
  const { type } = typedSchema

  if (type === Type.select) {
    return schema.values[typedSchema.default ?? defaultValuesForType[type]]
  }

  return typedSchema.default ?? defaultValuesForType[type]
}

export const getDataForObjectSchema = (data: any, schema: Schema) => {
  const hasType = schemaHasType(schema)
  const dataIsObject = typeof data === 'object'
  const inferredDataType = inferTypeFromValue(data)

  // Data and schema match, return.
  if (dataIsObject && !hasType) {
    return data
  }

  const { type } = schema as { type: Type }

  // Wrong data for schema, prefill with default value for type.
  if (dataIsObject && hasType) {
    return defaultValueForSchema(schema)
  }

  // Inferred data type and defined schema type match.
  if (inferredDataType === type) {
    return data
  }

  if (hasType) {
    return defaultValueForSchema(schema)
  }

  // Non object data for object schema, create object with defaults
  // matching the schema.
  const result = {}

  Object.keys(schema).forEach((property) => {
    const propertySchema = schema[property]
    // Recursive call to ensure nested object schemas created as well.
    result[property] = getDataForObjectSchema(undefined, propertySchema)
  })

  return result
}

export const getInitialSchemaFromData = (schemas: Schema, data: any): SchemaObjectOrValue => {
  if (!Array.isArray(schemas)) {
    return schemas
  }

  const type = inferTypeFromValue(data)

  // Fallback to first schema if no match found.
  return schemas.find((schema: any) => schema.type === type)?.[0] ?? (schemas[0] as SchemaValue)
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
          {schema.type in Type ? typeToString[schema.type] : 'Object'}
        </option>
      ))}
    </select>
  )
}
