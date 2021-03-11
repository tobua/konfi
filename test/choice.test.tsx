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

test('Switching between object and regular schemas.', async () => {
  const data = {
    someValue: {
      hello: 'world',
      hallo: 'again',
    },
  }

  const schema = {
    someValue: [
      {
        hello: {
          type: Type.string,
        },
        hallo: {
          type: Type.string,
        },
      },
      {
        type: Type.string,
      },
      {
        type: Type.number,
      },
    ],
  }

  const onChangeMock = jest.fn()
  const Component = (
    <Konfi data={data} schema={schema} onChange={onChangeMock} />
  )

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const selectionInputs = (await getAllByTag(
    'select',
    rendered
  )) as HTMLSelectElement[]

  expect(selectionInputs.length).toEqual(1)

  const selectionInput = selectionInputs[0]

  let valueInputs = (await getAllByTag('input', rendered)) as HTMLInputElement[]

  expect(valueInputs.length).toEqual(2)

  const helloInput = valueInputs[0]
  const halloInput = valueInputs[1]

  expect(helloInput.getAttribute('type')).toEqual('text')
  expect(halloInput.getAttribute('type')).toEqual('text')

  // Switch to string schema.
  fireEvent.change(selectionInput, { target: { value: 1 } })

  valueInputs = (await getAllByTag('input', rendered)) as HTMLInputElement[]

  expect(valueInputs.length).toEqual(1)

  let stringInput = valueInputs[0]

  expect(stringInput.getAttribute('type')).toEqual('text')

  // Edit input.
  fireEvent.change(stringInput, { target: { value: 'texting' } })

  expect(onChangeMock.mock.calls.length).toBe(2)
  expect(onChangeMock.mock.calls[1][0].someValue).toEqual('texting')

  // Back and forth selection switch won't keep input data intact.
  fireEvent.change(selectionInput, { target: { value: 2 } })
  fireEvent.change(selectionInput, { target: { value: 1 } })

  valueInputs = (await getAllByTag('input', rendered)) as HTMLInputElement[]
  stringInput = valueInputs[0]

  expect(stringInput.value).toEqual('')

  // Switch to number schema.
  fireEvent.change(selectionInput, { target: { value: 2 } })

  valueInputs = (await getAllByTag('input', rendered)) as HTMLInputElement[]

  expect(valueInputs.length).toEqual(1)

  const numberInput = valueInputs[0]

  expect(numberInput.getAttribute('type')).toEqual('number')

  // Edit input.
  fireEvent.change(numberInput, { target: { value: 7 } })

  expect(onChangeMock.mock.calls.length).toBe(6)
  expect(onChangeMock.mock.calls[5][0].someValue).toEqual(7)
})

test('Defaults applied and onChange called when switching schema.', async () => {
  const data = {
    click: true,
  }

  const schema = {
    click: [
      {
        type: Type.boolean,
      },
      {
        denominator: {
          type: Type.number,
          default: 2,
        },
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

  let valueInput = (await getAllByTag('input', rendered))[0] as HTMLInputElement

  expect(valueInput.checked).toEqual(true)

  expect(onChangeMock.mock.calls.length).toBe(0)

  fireEvent.change(selectionInput, { target: { value: 1 } })

  // Schema selection is propagated out.
  expect(onChangeMock.mock.calls.length).toBe(1)
  expect(onChangeMock.mock.calls[0][0].click.denominator).toBe(2)

  valueInput = (await getAllByTag('input', rendered))[0] as HTMLInputElement

  // Defined default from schema applied.
  expect(valueInput.value).toEqual('2')

  fireEvent.change(selectionInput, { target: { value: 0 } })

  // Schema selection is propagated out.
  expect(onChangeMock.mock.calls.length).toBe(2)
  expect(onChangeMock.mock.calls[1][0].click).toBe(false)

  valueInput = (await getAllByTag('input', rendered))[0] as HTMLInputElement

  // Defined default from schema applied.
  expect(valueInput.checked).toEqual(false)
})
