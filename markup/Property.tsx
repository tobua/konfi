import React, { ReactNode, useState, useContext } from 'react'
import { Input } from './input/Input'
import { SchemaChoice, getInitialSchemaFromData, getDataForObjectSchema } from './SchemaChoice'
import { Schema, SchemaValue } from '../types'
import * as styles from './styles'
import { Level } from './Level'
import { Context } from '../context'

const Wrapper = ({ property, children }: { property: string; children: ReactNode }) => (
  <div style={styles.propertyWrapper}>
    {property}: {children}
  </div>
)

const isNestedData = (data: any) => typeof data === 'object'

interface Props {
  property: string
  isLastKey: boolean
  schema: Schema
  getData: () => any
  setData: (value: any) => void
  indentation?: number
}

export const Property = ({ property, isLastKey, schema, getData, setData, indentation }: Props) => {
  let data = getData()
  // Currently selected schema, if there are several available.
  const [currentSchema, setSchema] = useState(getInitialSchemaFromData(schema, data))
  const { onChange } = useContext(Context)

  data = getDataForObjectSchema(data, currentSchema)
  const nested = isNestedData(data)

  // Keep locally stored data up-to-date with displayed structure.
  // Ensures that setData on lower levels won't fail.
  if (typeof data === 'object') {
    setData(data)
  }

  return (
    <Wrapper property={property}>
      <SchemaChoice
        schemas={schema}
        onChange={(value: SchemaValue) => {
          setSchema(value)
          setData(getDataForObjectSchema(data, value))
          onChange()
        }}
      />
      {nested && '{'}
      {nested ? (
        <Level data={data} schema={currentSchema} indentation={indentation + 1} />
      ) : (
        <Input
          schema={currentSchema as SchemaValue}
          value={data}
          onChange={(value: any) => {
            setData(value)
            // Notify user of change.
            onChange()
          }}
        />
      )}
      {nested && <p>{`}${!isLastKey ? ',' : ''}`}</p>}
    </Wrapper>
  )
}
