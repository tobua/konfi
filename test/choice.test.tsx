import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { Konfi, Type } from '../index'

const getAllByTag = (tag: string, rendered: any) =>
  rendered.findAllByText(
    (_, element: HTMLElement) => element.tagName.toLowerCase() === tag
  )

test('Different schemas can be defined for a property.', async () => {
  const data = {
    someValue: 5,
  }

  const schema = {
    someValue: [
      {
        type: Type.number,
      },
      {
        type: Type.string,
      },
    ],
  }

  const onChangeMock = jest.fn()
  const Component = (
    <Konfi data={data} schema={schema} onChange={onChangeMock} />
  )

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const selectionInput = (
    await getAllByTag('select', rendered)
  )[0] as HTMLSelectElement

  const valueInput = (
    await getAllByTag('input', rendered)
  )[0] as HTMLInputElement

  expect(selectionInput.tagName.toLowerCase()).toEqual('select')
  // First option selected
  expect(selectionInput.value).toEqual('0')

  expect(valueInput.tagName.toLowerCase()).toEqual('input')
  expect(valueInput.value).toEqual('5')

  fireEvent.change(valueInput, { target: { value: 6 } })

  expect(onChangeMock.mock.calls.length).toBe(1)

  // Data was updated in onChange callback.
  expect(onChangeMock.mock.calls[0][0].someValue).toBe(6)

  // Data was updated in DOM input.
  expect(valueInput.value).toEqual('6')
})
