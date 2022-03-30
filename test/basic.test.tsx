import React, { useState } from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, act } from '@testing-library/react'
import { Konfi, Type } from '../index'

const getAllByTag = (tag: string, rendered: any) =>
  rendered.findAllByText((_, element: HTMLElement) => element.tagName.toLowerCase() === tag)

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
  const Component = <Konfi data={data} schema={schema} onChange={onChangeMock} />

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const firstInput = (await getAllByTag('input', rendered))[0] as HTMLInputElement

  expect(firstInput.tagName.toLowerCase()).toEqual('input')
  expect(firstInput.value).toEqual('5')

  fireEvent.change(firstInput, { target: { value: 6 } })

  expect(onChangeMock.mock.calls.length).toBe(1)

  // Data was updated in onChange callback.
  expect(onChangeMock.mock.calls[0][0].someValue).toBe(6)

  // Data was updated in DOM input.
  expect(firstInput.value).toEqual('6')
})

test("Input data isn't modified.", async () => {
  const data = {
    colors: {
      primary: 'a',
      secondary: 'b',
      tertiary: 'c',
    },
  }

  const onChangeMock = jest.fn()
  const Component = <Konfi data={data} onChange={onChangeMock} />

  const rendered = render(Component)

  const inputs = await getAllByTag('input', rendered)

  const primaryInput = inputs[0] as HTMLInputElement
  const secondaryInput = inputs[1] as HTMLInputElement

  expect(primaryInput.tagName.toLowerCase()).toEqual('input')
  expect(primaryInput.value).toEqual('a')

  expect(secondaryInput.tagName.toLowerCase()).toEqual('input')
  expect(secondaryInput.value).toEqual('b')

  expect(onChangeMock.mock.calls.length).toBe(0)

  fireEvent.change(primaryInput, { target: { value: 'd' } })

  expect(onChangeMock.mock.calls.length).toBe(1)

  const firstChangeData = onChangeMock.mock.calls[0][0].colors

  expect(firstChangeData.primary).toEqual('d')
  expect(firstChangeData.secondary).toEqual('b')
  expect(firstChangeData.tertiary).toEqual('c')

  fireEvent.change(secondaryInput, { target: { value: 'e' } })

  expect(onChangeMock.mock.calls.length).toBe(2)

  const secondChangeData = onChangeMock.mock.calls[1][0].colors

  expect(secondChangeData.primary).toEqual('d')
  expect(secondChangeData.secondary).toEqual('e')
  expect(secondChangeData.tertiary).toEqual('c')

  // data hasn't been modified.
  expect(data.colors.primary).toEqual('a')
  expect(data.colors.secondary).toEqual('b')
  expect(data.colors.tertiary).toEqual('c')

  // DOM is up to date.
  expect(primaryInput.value).toEqual('d')
  expect(secondaryInput.value).toEqual('e')
})

test('Markup adapts on new props data.', async () => {
  const data = {
    colors: {
      primary: 'a',
      secondary: 'b',
    },
  }

  let setData

  const onChangeMock = jest.fn()

  function Component() {
    const [myData, setDataHandler] = useState(data)

    setData = setDataHandler

    return <Konfi data={myData} onChange={onChangeMock} />
  }

  const rendered = render(<Component />)

  const inputs = await getAllByTag('input', rendered)

  const primaryInput = inputs[0] as HTMLInputElement
  const secondaryInput = inputs[1] as HTMLInputElement

  expect(primaryInput.tagName.toLowerCase()).toEqual('input')
  expect(primaryInput.value).toEqual('a')

  expect(secondaryInput.tagName.toLowerCase()).toEqual('input')
  expect(secondaryInput.value).toEqual('b')

  expect(onChangeMock.mock.calls.length).toBe(0)

  fireEvent.change(primaryInput, { target: { value: 'd' } })

  expect(onChangeMock.mock.calls.length).toBe(1)

  const firstChangeData = onChangeMock.mock.calls[0][0].colors

  expect(firstChangeData.primary).toEqual('d')
  expect(firstChangeData.secondary).toEqual('b')

  act(() => {
    setData({
      colors: {
        primary: 'g',
        secondary: 'b',
      },
    })
  })

  expect(primaryInput.value).toEqual('g')
})
