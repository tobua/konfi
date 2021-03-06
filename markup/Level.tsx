import React from 'react'
import { Schema } from '../types'
import { Property } from './Property'
import * as styles from './styles'

interface Props {
  data: Object
  schema: Schema
  indentation?: number
}

// Recursively render current object level.
export const Level = ({ data, schema, indentation = 1 }: Props) => {
  const dataKeys = Object.keys(data)

  return (
    <div style={styles.objectIndentation}>
      {dataKeys.map((property, index) => {
        const currentSchema = schema[property]

        return (
          <Property
            key={`${property}_${index}`}
            property={property}
            isLastKey={index === dataKeys.length - 1}
            schema={currentSchema}
            getData={() => data[property]}
            setData={(value: any) => {
              data[property] = value
            }}
            indentation={indentation}
          />
        )
      })}
    </div>
  )
}
