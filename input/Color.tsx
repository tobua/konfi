import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import useHover from '@react-hook/hover'
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
})

const arrow = {
  width: 10,
  height: 10,
  marginLeft: 5,
  background: 'white',
  borderLeft: '1px solid black',
  borderBottom: '1px solid black',
  transform: 'rotate(45deg)',
}

interface Props {
  value: string
  onChange: (color: string) => void
}

export const Color = ({ value, onChange }: Props) => {
  const [referenceElement, setReferenceElement] = useState(null)
  const hovering = useHover(referenceElement)
  const [popperElement, setPopperElement] = useState(null)
  const hoveringTooltip = useHover(popperElement)
  const [arrowElement, setArrowElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: 'right',
  })

  return (
    <>
      <div ref={setReferenceElement} style={color(value)} />
      <div
        ref={setPopperElement}
        style={{
          ...styles.popper,
          ...{
            opacity: hovering || hoveringTooltip ? 1 : 0,
            pointerEvents: hovering || hoveringTooltip ? 'inherit' : 'none',
          },
        }}
        {...attributes.popper}
      >
        <div style={wrapper}>
          <ColorPicker value={value} onChange={onChange} />
        </div>
        <div ref={setArrowElement} style={styles.arrow}>
          <div style={arrow} />
        </div>
      </div>
    </>
  )
}
