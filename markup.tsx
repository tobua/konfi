import React from 'react'
import { Schema, Type } from './index'
import { Input } from './Input'

const isNested = (data: any) =>
  !data || typeof data !== 'object' || Array.isArray(data)

// Recursively render current object level.
const Level = ({
  data,
  schema,
  indentation = 1,
}: {
  data: any
  schema: Schema
  indentation?: number
}) => {
  // Recursion ending condition.
  if (isNested(data)) {
    return null
  }

  return (
    <div style={{ marginLeft: 20 }}>
      {Object.keys(data).map((key) => {
        const current = data[key]
        const nested = isNested(current)
        const currentSchema = schema[key]
        const hasSchema =
          typeof currentSchema.type === 'number' && currentSchema.type in Type

        return (
          <div key={key}>
            <p>
              {key}:{' '}
              {nested ? (
                <>
                  {hasSchema ? (
                    <Input schema={currentSchema} value={current} />
                  ) : (
                    data[key]
                  )}
                </>
              ) : (
                '{'
              )}
            </p>
            <Level
              data={data[key]}
              schema={schema[key]}
              indentation={indentation + 1}
            />
            <p>{nested ? '' : '}'}</p>
          </div>
        )
      })}
    </div>
  )
}

export const markup = (schema: Schema, data: any) => {
  return (
    <div className="konfi" style={{ fontFamily: 'monospace' }}>
      <p>{'{'}</p>
      <Level data={data} schema={schema} />
      <p>{'}'}</p>
    </div>
  )
}
