import { Type } from '..'
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
  expect(schema.nested.anotherValue.type).toEqual(
    actualSchema.nested.anotherValue.type
  )
  expect(schema.nested.deeplyNested.oneMoreValue.type).toEqual(
    actualSchema.nested.deeplyNested.oneMoreValue.type
  )
})
