import React, { useState } from 'react'
import { Type, Schema } from './types'
import { Input } from './input/Input'
import { Context } from './context'

const isNested = (data: any) =>
  !data || typeof data !== 'object' || Array.isArray(data)

// Recursively render current object level.
const Level = ({
  data,
  schema,
  onChange,
  path = [],
  indentation = 1,
}: {
  data: any
  schema: Schema
  onChange: (path: string[], value: any) => void
  path?: string[]
  indentation?: number
}) => {
  // Recursion ending condition.
  if (isNested(data)) {
    return null
  }

  const keys = Object.keys(data)

  return (
    <div style={{ marginLeft: 20 }}>
      {keys.map((key, index) => {
        const current = data[key]
        const nested = isNested(current)
        const currentSchema = schema[key]
        const isLast = index === keys.length - 1
        const hasSchema =
          currentSchema &&
          typeof currentSchema.type === 'number' &&
          currentSchema.type in Type

        return (
          <div key={`${key}_${index}`}>
            <div style={{ margin: '10px 0' }}>
              {key}:{' '}
              {nested ? (
                <>
                  {hasSchema ? (
                    <Input
                      schema={currentSchema}
                      value={current}
                      onChange={(value: any) => onChange([...path, key], value)}
                    />
                  ) : (
                    data[key]
                  )}
                </>
              ) : (
                '{'
              )}
            </div>
            <Level
              data={data[key]}
              schema={schema[key]}
              onChange={onChange}
              path={[...path, key]}
              indentation={indentation + 1}
            />
            {nested ? null : <p>{`}${!isLast ? ',' : ''}`}</p>}
          </div>
        )
      })}
    </div>
  )
}

export const markup = (
  data: any,
  onChange: (path: string[], value: any) => void,
  schema: Schema
) => {
  const [currentColorPicker, setCurrentColorPicker] = useState(null)

  return (
    <div className="konfi" style={{ fontFamily: 'monospace' }}>
      <p>{'{'}</p>
      <Context.Provider value={{ currentColorPicker, setCurrentColorPicker }}>
        <Level data={data} schema={schema} onChange={onChange} />
      </Context.Provider>
      <p>{'}'}</p>
    </div>
  )
}
