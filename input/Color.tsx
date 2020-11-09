import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import { ColorPicker } from './ColorPicker'

const wrapper = {
  marginLeft: 10,
  padding: 10,
  backgroundColor: 'white',
  borderRadius: 5,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'black',
}

const color = (background: string) => ({
  display: 'inline-flex',
  position: 'relative' as 'relative', // Workaround for weird TS issue.
  cursor: 'pointer',
  backgroundColor: background,
  width: 25,
  height: 25,
  marginBottom: -8,
  marginRight: 5,
  borderRadius: 5,
  border: '1px solid black',
})

const close = {
  position: 'absolute' as 'absolute',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  top: -9,
  right: -9,
  cursor: 'pointer',
  background: 'white',
  width: 20,
  height: 20,
  borderRadius: 40,
  border: '1px solid black',
  boxShadow: '1px 1px 2px gray',
  outline: 'none',
}

const closeLine = (rotation: number) => ({
  position: 'absolute' as 'absolute',
  left: 4,
  display: 'flex',
  height: 2,
  width: 10,
  background: 'black',
  transform: `rotate(${rotation}deg)`,
})

const hideBorder = {
  position: 'absolute' as 'absolute',
  left: -2,
  bottom: -3,
  height: 12,
  width: 11,
  background: 'white',
}

const arrow = {
  width: 10,
  height: 10,
  marginLeft: 5,
  background: 'white',
  borderLeft: '1px solid black',
  borderBottom: '1px solid black',
  transform: 'rotate(45deg)',
}

interface TooltipProps {
  value: string
  onChange: (color: string) => void
  referenceElement: any
  open: boolean
  setOpen: (state: boolean) => void
}

const Tooltip = ({
  value,
  onChange,
  referenceElement,
  open,
  setOpen,
}: TooltipProps) => {
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const [currentValue, setCurrentValue] = useState(value)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: 'right',
  })

  return (
    <div
      ref={setPopperElement}
      style={{
        ...styles.popper,
        ...{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'inherit' : 'none',
          // Otherwise tooltip overlaid by number input switches in safari.
          zIndex: 1,
        },
      }}
      {...attributes.popper}
    >
      <div style={wrapper}>
        <ColorPicker value={currentValue} onChange={setCurrentValue} />
      </div>
      <div ref={setArrowElement} style={styles.arrow}>
        <div style={arrow} />
      </div>
      <button
        style={close}
        type="button"
        onClick={() => {
          setOpen(false)
          if (currentValue && currentValue !== value) {
            onChange(currentValue)
          }
        }}
        onKeyUp={(event) => {
          if (event.key === 'Escape') {
            setOpen(false)
            if (currentValue && currentValue !== value) {
              onChange(currentValue)
            }
          }
        }}
      >
        <span style={hideBorder} />
        <span style={closeLine(45)} />
        <span style={closeLine(-45)} />
      </button>
    </div>
  )
}

interface Props {
  value: string
  onChange: (color: string) => void
}

export const Color = ({ value, onChange }: Props) => {
  const [referenceElement, setReferenceElement] = useState(null)
  const [open, setOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)

  if (open && !initialized) {
    setInitialized(true)
  }

  return (
    <>
      <div
        ref={setReferenceElement}
        role="button"
        tabIndex={0}
        aria-label="Change color"
        onMouseEnter={() => setOpen(true)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            setOpen(!open)
          }
        }}
        onClick={() => setOpen(!open)}
        style={color(value)}
      />
      {initialized && (
        <Tooltip
          value={value}
          onChange={onChange}
          open={open}
          setOpen={setOpen}
          referenceElement={referenceElement}
        />
      )}
    </>
  )
}
