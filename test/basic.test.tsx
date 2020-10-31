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

  const onChangeMock = jest.fn()
  const Component = (
    <Konfi data={data} schema={schema} onChange={onChangeMock} />
  )

  const markup = create(Component)
  const instance = markup.root
  const flat = markup.toJSON()

  expect(flat).toBeDefined()
  expect(flat.type).toEqual('div')
  expect(flat.props.className).toEqual('konfi')

  expect(onChangeMock.mock.calls.length).toBe(0)

  // Input for someValue is available.
  const inputSomeValue = flat.children[1].children[0].children[0].children[3]

  expect(inputSomeValue.type).toEqual('input')
  expect(inputSomeValue.props.value).toEqual(5)
  expect(inputSomeValue.props.type).toEqual('number')

  const firstInputInstance = instance.findAllByType('input')[0]

  expect(firstInputInstance.type).toEqual('input')
})
