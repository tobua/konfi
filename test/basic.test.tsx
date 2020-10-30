import React from 'react'
import { create } from 'react-test-renderer'
import { Konfi, Type } from '..'

test('Generates proper layout.', () => {
  const data = {
    someValue: 5,
    nested: {
      anotherValue: 'test',
      deeplyNested: {
        oneMoreValue: 3.33,
      },
    },
  }

  const schema = {
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

  const markup = create(<Konfi schema={schema} data={data} />).toJSON()
  const expected = create(<div className="konfi">hello</div>).toJSON()

  expect(markup).toEqual(expected)
})
