import React, { ReactNode, useState } from 'react'
import { Input } from './input/Input'
import {
  SchemaChoice,
  getInitialSchemaFromData,
  getDataForObjectSchema,
} from './SchemaChoice'
import { Schema, PathChangeHandler, SchemaValue, Type } from '../types'
import * as styles from './styles'
import { Level } from './Level'

const Wrapper = ({
  property,
  children,
}: {
  property: string
  children: ReactNode
}) => (
  <div style={styles.propertyWrapper}>
    {property}: {children}
  </div>
)

const isNestedData = (data: any) => typeof data === 'object'

interface Props {
  property: string
  isLastKey: boolean
  schema: Schema
  data: any
  onChange: PathChangeHandler
  path: string[]
  indentation?: number
}

export const Property = ({
  property,
  isLastKey,
  schema,
  data,
  onChange,
  path,
  indentation,
}: Props) => {
  // Currently selected schema, if there are several available.
  const [currentSchema, setSchema] = useState(
    getInitialSchemaFromData(schema, data)
  )

  data = getDataForObjectSchema(data, currentSchema)
  const nested = isNestedData(data)

  return (
    <Wrapper property={property}>
      <SchemaChoice schemas={schema} onChange={setSchema} />
      {nested && '{'}
      {nested ? (
        <Level
          data={data}
          schema={currentSchema}
          onChange={onChange}
          path={path}
          indentation={indentation + 1}
        />
      ) : (
        <Input
          schema={currentSchema as SchemaValue}
          value={data}
          onChange={(value: any) => onChange(path, value)}
        />
      )}
      {nested && <p>{`}${!isLastKey ? ',' : ''}`}</p>}
    </Wrapper>
  )
}
