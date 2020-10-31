import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { Konfi, Type } from '../dist'

test('Renders input and updates data on input change.', async () => {
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

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const getAllByTag = (tag: string) => {
    return rendered.findAllByText((content, element) => {
      return element.tagName.toLowerCase() === tag
    })
  }

  expect(rendered.queryByText('someValue')).toBeDefined()

  let firstInput = (await getAllByTag('input'))[0] as HTMLInputElement

  expect(firstInput.tagName.toLowerCase()).toEqual('input')
  expect(firstInput.value).toEqual('5')

  fireEvent.change(firstInput, { target: { value: 6 } })

  expect(onChangeMock.mock.calls.length).toBe(1)

  // Data was updated in onChange callback.
  expect(onChangeMock.mock.calls[0][0].someValue).toBe(6)

  // Data was updated in DOM input.
  firstInput = (await getAllByTag('input'))[0] as HTMLInputElement
  expect(firstInput.value).toEqual('6')
})
