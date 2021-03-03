import React, { useEffect, useState } from 'react'
import { SchemaValue, Type } from '../../types'
import { Color } from './Color'
import * as styles from '../styles'

export const Input = ({
  schema,
  value,
  onChange,
}: {
  schema: SchemaValue
  value: any
  onChange: (value: any) => void
}) => {
  if (!(schema.type in Type) || schema.type === Type.unknown) {
    return value
  }

  const [currentValue, setValue] = useState(value)

  // Update value on outside change.
  useEffect(() => {
    setValue(value)
  }, [value])

  let type = 'string'
  let hasError = false

  if (schema.type === Type.number) {
    type = 'number'
  }

  if (schema.type === Type.boolean) {
    type = 'checkbox'
  }

  if (schema.valid && typeof schema.valid === 'function') {
    hasError = !schema.valid(currentValue)
  }

  if (schema.type === Type.select) {
    return (
      <select
        onChange={(event) => {
          const changedValue = event.target.value

          setValue(changedValue)
          onChange(changedValue)
        }}
      >
        {(schema.values as string[]).map((selectValue) => (
          <option key={selectValue} value={selectValue}>
            {selectValue}
          </option>
        ))}
      </select>
    )
  }

  if (schema.type === Type.boolean) {
    return (
      <input
        checked={currentValue}
        type="checkbox"
        onChange={(event) => {
          const changedValue = event.target.checked

          setValue(changedValue)
          onChange(changedValue)
        }}
      />
    )
  }

  if (schema.type === Type.hex) {
    return (
      <Color
        value={currentValue}
        onChange={(changedValue) => {
          setValue(changedValue)
          onChange(changedValue)
        }}
      />
    )
  }

  return (
    <input
      style={styles.input({ hasError })}
      value={currentValue}
      onChange={(event) => {
        let changedValue: any = event.target.value

        if (schema.type === Type.number) {
          changedValue = Number(changedValue)
        }

        setValue(changedValue)
        // Only update if value is valid.
        if (
          !schema.valid ||
          typeof schema.valid !== 'function' ||
          schema.valid(changedValue)
        ) {
          onChange(changedValue)
        }
      }}
      type={type}
    />
  )
}
