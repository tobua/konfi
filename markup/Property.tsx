import React, { ReactNode, useState } from 'react'
import { Input } from './input/Input'
import {
  SchemaChoice,
  getInitialSchemaFromData,
  getDataForChosenSchema,
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

interface Props {
  property: string
  schema: Schema
  data: any
  onChange: PathChangeHandler
  nested: boolean
  path: string[]
  indentation?: number
}

export const Property = ({
  property,
  schema,
  data,
  onChange,
  nested,
  path,
  indentation,
}: Props) => {
  if (nested) {
    return <Wrapper property={property}>{'{'}</Wrapper>
  }

  const nonNestedSchema = schema as Schema[] | SchemaValue

  // Currently selected schema, if there are several available.
  const [currentSchema, setCurrentSchema] = useState(
    getInitialSchemaFromData(nonNestedSchema, data)
  )

  return (
    <Wrapper property={property}>
      <SchemaChoice schemas={nonNestedSchema} onChange={setCurrentSchema} />
      {!(currentSchema.type in Type) ? (
        <>
          {console.log('recurs', currentSchema)}
          <Level
            data={getDataForObjectSchema(data, currentSchema)}
            schema={currentSchema}
            onChange={onChange}
            path={path}
            indentation={indentation + 1}
          />
        </>
      ) : (
        <Input
          schema={currentSchema as SchemaValue}
          value={getDataForChosenSchema(currentSchema, data)}
          onChange={(value: any) => onChange(path, value)}
        />
      )}
    </Wrapper>
  )
}
