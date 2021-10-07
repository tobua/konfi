import { Type } from '../index'
import { infer } from '../infer'

test('Correctly infers schema for basic data.', () => {
  const data = {
    someValue: 5,
    nested: {
      anotherValue: 'test',
      deeplyNested: {
        oneMoreValue: 3.33,
      },
    },
  }

  const actualSchema = {
    someValue: {
      type: Type.number,
    },
    nested: {
      anotherValue: {
        type: Type.string,
      },
      deeplyNested: {
        oneMoreValue: {
          type: Type.number,
        },
      },
    },
  }

  const schema = infer(data) as any

  expect(schema).toBeDefined()
  expect(schema.someValue.type).toEqual(actualSchema.someValue.type)
  expect(schema.nested.anotherValue.type).toEqual(actualSchema.nested.anotherValue.type)
  expect(schema.nested.deeplyNested.oneMoreValue.type).toEqual(
    actualSchema.nested.deeplyNested.oneMoreValue.type
  )
})

test('Recognizes different color schemes.', () => {
  const data = {
    shortHex: '#F0F',
    longHex: '#FF00FF',
    noHex: 'FF00FF',
    wrongHex: '#FF00FF0',
    alsoWrongHex: '#F',
    betweenWrongHex: '#ABF0',
    nonHexCharacter: '#FAAZZE',
  }

  const actualSchema = {
    shortHex: {
      type: Type.hex,
    },
    longHex: {
      type: Type.hex,
    },
    noHex: {
      type: Type.string,
    },
    wrongHex: {
      type: Type.string,
    },
    alsoWrongHex: {
      type: Type.string,
    },
    nonHexCharacter: {
      type: Type.string,
    },
  }

  const schema = infer(data) as any

  expect(schema).toBeDefined()

  expect(schema.shortHex.type).toEqual(actualSchema.shortHex.type)
  expect(schema.longHex.type).toEqual(actualSchema.longHex.type)
  expect(schema.noHex.type).toEqual(actualSchema.noHex.type)
  expect(schema.wrongHex.type).toEqual(actualSchema.wrongHex.type)
  expect(schema.alsoWrongHex.type).toEqual(actualSchema.alsoWrongHex.type)
  expect(schema.nonHexCharacter.type).toEqual(actualSchema.nonHexCharacter.type)
})
