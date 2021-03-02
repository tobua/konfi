export enum Type {
  number,
  string,
  boolean,
  hex,
  filePath,
  select,
  unknown,
}

export const typeToString: { [Key in Type]: string } = {
  [Type.number]: 'Number',
  [Type.string]: 'Text',
  [Type.boolean]: 'true/false',
  [Type.hex]: 'Color',
  [Type.filePath]: 'File Path',
  [Type.select]: 'Selection',
  [Type.unknown]: 'Unknown',
}

export const defaultValueForType: { [Key in Type]: any } = {
  [Type.number]: 0,
  [Type.string]: '',
  [Type.boolean]: false,
  [Type.hex]: '#000000',
  [Type.filePath]: '',
  [Type.select]: 0,
  [Type.unknown]: undefined,
}

type Value = {
  type: Type
  valid?: (value: any) => boolean
  values?: string[]
}

// Recursively defined object, either object with string keys or value descriptor.
export type Schema = { [key: string]: Schema } | Value | Schema[]

export type PathChangeHandler = (path: string[], value: any) => void
