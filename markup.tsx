import React from 'react'
import { Schema } from './index'

const isNested = (data: any) =>
  !data || typeof data !== 'object' || Array.isArray(data)

// Recursively render current object level.
const Level = ({
  data,
  indentation = 1,
}: {
  data: any
  indentation?: number
}) => {
  // Recursion ending condition.
  if (isNested(data)) {
    return null
  }

  return (
    <div style={{ marginLeft: indentation * 20 }}>
      {Object.keys(data).map((key) => {
        const next = data[key]
        const nested = isNested(next)
        return (
          <div key={key}>
            <p>
              {key}: {nested ? data[key] : '{'}
            </p>
            <Level data={data[key]} indentation={indentation + 1} />
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
      <Level data={data} />
      <p>{'}'}</p>
    </div>
  )
}
