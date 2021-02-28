import React, { useState } from 'react'
import { Type } from '../types'
import { Input } from '../input/Input'
import { SchemaChoice } from './SchemaChoice'

const getInitialSchemaFromData = (schemas, data) => {
  if (!Array.isArray(schemas)) {
    return schemas
  }

  // TODO Infer schema from data

  return schemas[0]
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
  const isEditable =
    currentSchema &&
    typeof currentSchema.type === 'number' &&
    currentSchema.type in Type

  // TODO

  return (
    <div style={{ margin: '10px 0' }}>
      {property}:{' '}
      <SchemaChoice schemas={schema} data={data} onChange={setCurrentSchema} />
      {nested ? (
        '{'
      ) : (
        <>
          {isEditable ? (
            <Input
              schema={currentSchema}
              value={data}
              onChange={(value: any) => onChange(path, value)}
            />
          ) : (
            data
          )}
        </>
      )}
    </div>
  )
}
