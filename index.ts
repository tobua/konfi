import { markup } from './markup'
import { infer } from './infer'
import { Schema } from './types'

export { Type } from './types'

export const Konfi = ({
  data,
  schema = infer(data),
  onChange,
}: {
  data: any
  onChange: (data: any) => void
  schema?: Schema
}) => {
  const handleChange = (path: string[], value: any) => {
    // Make the change on the data.
    path.reduce((accumulator, currentValue, currentIndex) => {
      if (
        typeof accumulator[currentValue] === 'object' &&
        currentIndex !== path.length - 1
      ) {
        return accumulator[currentValue]
      }

      accumulator[currentValue] = value
      return undefined
    }, data)

    onChange(data)
  }
  return markup(data, handleChange, schema)
}
