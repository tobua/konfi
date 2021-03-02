import React, { useState } from 'react'
import { Input } from '../input/Input'
import {
  SchemaChoice,
  getInitialSchemaFromData,
  getDataForChosenSchema,
} from './SchemaChoice'
import { Schema, PathChangeHandler } from '../types'

interface Props {
  property: string
  schema: Schema
  data: any
  onChange: PathChangeHandler
  nested: boolean
  path: string[]
}

export const Property = ({
  property,
  schema,
  data,
  onChange,
  nested,
  path,
}: Props) => {
  // Currently selected schema, if there are several available.
  const [currentSchema, setCurrentSchema] = useState(
    getInitialSchemaFromData(schema, data)
  )

  // TODO remove data on set current schema if no match

  return (
    <div style={{ margin: '10px 0' }}>
      {property}: <SchemaChoice schemas={schema} onChange={setCurrentSchema} />
      {nested ? (
        '{'
      ) : (
        <Input
          schema={currentSchema}
          value={getDataForChosenSchema(currentSchema, data)}
          onChange={(value: any) => onChange(path, value)}
        />
      )}
    </div>
  )
}
