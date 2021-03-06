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

const defaultValuesForType: { [Key in Type]: any } = {
  [Type.number]: 0,
  [Type.string]: '',
  [Type.boolean]: false,
  [Type.hex]: '#000000',
  [Type.filePath]: '',
  [Type.select]: 0,
  [Type.unknown]: undefined,
}

// Types for which a default value should be set on data as soon as it's displayed.
export const typeRequiresInitialization: { [Key in Type]: boolean } = {
  [Type.number]: false,
  [Type.string]: false,
  [Type.boolean]: true,
  [Type.hex]: false,
  [Type.filePath]: false,
  [Type.select]: true,
  [Type.unknown]: false,
}

export const defaultValueForSchema = (schema: Schema) => {
  const hasType = schemaHasType(schema)

  if (!hasType) {
    return undefined
  }

  const type = (schema as { type: Type }).type

  if (type === Type.select) {
    return schema.values[
      (schema as { default: number }).default ?? defaultValuesForType[type]
    ]
  }

  return defaultValuesForType[type]
}

export type SchemaValue = {
  type: Type
  valid?: (value: any) => boolean
  values?: string[]
  default?: any
}

export type SchemaObjectOrValue = { [key: string]: Schema } | SchemaValue

// Recursively defined object, either object with string keys or value descriptor.
export type Schema = SchemaObjectOrValue | Schema[]

export type OnChangeHandler = (data: Object) => void

export const schemaHasType = (schema: Schema) =>
  typeof schema === 'object' && (schema as { type?: Type }).type in Type
