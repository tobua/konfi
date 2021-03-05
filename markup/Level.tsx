import React from 'react'
import { Schema, PathChangeHandler } from '../types'
import { Property } from './Property'
import * as styles from './styles'

interface Props {
  data: Object
  schema: Schema
  onChange: PathChangeHandler
  path?: string[]
  indentation?: number
}

// Recursively render current object level.
export const Level = ({
  data,
  schema,
  onChange,
  path = [],
  indentation = 1,
}: Props) => {
  const dataKeys = Object.keys(data)

  return (
    <div style={styles.objectIndentation}>
      {dataKeys.map((property, index) => {
        const currentData = data[property]
        const currentSchema = schema[property]
        const currentPath = [...path, property]

        return (
          <Property
            key={`${property}_${index}`}
            property={property}
            isLastKey={index === dataKeys.length - 1}
            schema={currentSchema}
            data={currentData}
            onChange={onChange}
            path={currentPath}
            indentation={indentation}
          />
        )
      })}
    </div>
  )
}
