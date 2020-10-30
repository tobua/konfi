import { markup } from './markup'

export enum Type {
  number,
  string,
  boolean,
  hex,
}

type Value = {
  type: Type
  valid?: (value: any) => boolean
}

// Recursively defined object, either object with string keys or value descriptor.
export type Schema = { [key: string]: Schema } | Value

// <Konfi schema={schema} data={data} />
export const Konfi = ({ schema, data }: { schema: Schema; data: any }) => {
  return markup(schema, data)
}
