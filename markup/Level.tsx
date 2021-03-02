import React from 'react'
import { Schema, PathChangeHandler } from '../types'
import { Property } from './Property'

const isNested = (data: any) => typeof data === 'object'

// Recursively render current object level.
export const Level = ({
  data,
  schema,
  onChange,
  path = [],
  indentation = 1,
}: {
  data: any
  schema: Schema
  onChange: PathChangeHandler
  path?: string[]
  indentation?: number
}) => {
  // Recursion ending condition.
  if (!isNested(data)) {
    return null
  }

  const keys = Object.keys(data)

  return (
    <div style={{ marginLeft: 20 }}>
      {keys.map((property, index) => {
        const currentData = data[property]
        const currentSchema = schema[property]
        const currentPath = [...path, property]
        const nested = isNested(currentData)
        const isLast = index === keys.length - 1

        return (
          <div key={`${property}_${index}`}>
            <Property
              property={property}
              schema={currentSchema}
              data={currentData}
              onChange={onChange}
              nested={nested}
              path={currentPath}
            />
            <Level
              data={currentData}
              schema={currentSchema}
              onChange={onChange}
              path={currentPath}
              indentation={indentation + 1}
            />
            {nested ? <p>{`}${!isLast ? ',' : ''}`}</p> : null}
          </div>
        )
      })}
    </div>
  )
}
