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

type Value = {
  type: Type
  valid?: (value: any) => boolean
  values?: string[]
}

// Recursively defined object, either object with string keys or value descriptor.
export type Schema = { [key: string]: Schema } | Value | Schema[]
