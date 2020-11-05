export enum Type {
  number,
  string,
  boolean,
  hex,
  filePath,
  select,
}

type Value = {
  type: Type
  valid?: (value: any) => boolean
}

// Recursively defined object, either object with string keys or value descriptor.
export type Schema = { [key: string]: Schema } | Value
