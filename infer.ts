import { Schema, Type } from './types'

export const inferTypeFromValue = (value: any) => {
  if (typeof value === 'number') {
    return Type.number
  }

  if (typeof value === 'string') {
    if (value.match(/^#[0-9a-fA-F]{3,6}$/g)) {
      return Type.hex
    }
    return Type.string
  }

  if (typeof value === 'boolean') {
    return Type.boolean
  }

  return Type.unknown
}

const iterateProperties = (data: any, result = {}) => {
  Object.keys(data).forEach((key) => {
    result[key] = {}

    if (typeof data[key] === 'object') {
      // Further properties, annotate recursively.
      result[key] = {}
      iterateProperties(data[key], result[key])
    } else {
      // Infer type.
      result[key].type = inferTypeFromValue(data[key])
    }
  })

  return result
}

// Infer schema from data provided.
export const infer = (data: any): Schema => iterateProperties(data)
