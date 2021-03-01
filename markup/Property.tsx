import React, { useState } from 'react'
import { Input } from '../input/Input'
import { SchemaChoice } from './SchemaChoice'
import { inferTypeFromValue } from '../infer'

const getInitialSchemaFromData = (schemas, data) => {
  if (!Array.isArray(schemas)) {
    return schemas
  }

  const type = inferTypeFromValue(data)

  // Fallback to first schema if no match found.
  let match = schemas[0]

  schemas.map((schema) => {
    if (schema.type === type) {
      match = schema
    }
  })

  return match
}

export const Property = ({
  property,
  schema,
  data,
  onChange,
  nested,
  path,
}) => {
  // Currently selected schema, if there are several available.
  const [currentSchema, setCurrentSchema] = useState(
    getInitialSchemaFromData(schema, data)
  )

  // TODO remove data on set current schema if no match

  return (
    <div style={{ margin: '10px 0' }}>
      {property}:{' '}
      <SchemaChoice schemas={schema} data={data} onChange={setCurrentSchema} />
      {nested ? (
        '{'
      ) : (
        <Input
          schema={currentSchema}
          value={data}
          onChange={(value: any) => onChange(path, value)}
        />
      )}
    </div>
  )
}
