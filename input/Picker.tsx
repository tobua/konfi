import React, { useRef } from 'react'
import useHover from '@react-hook/hover'
import * as styles from './styles'

const rgbSlider = [
  [255, 0, 0], // Red
  [255, 255, 0], // Yellow
  [0, 255, 0], // Green
  [0, 255, 255], // Cyan
  [0, 0, 255], // Blue
  [255, 0, 255], // Magenta
  [255, 0, 0], // Red
]

export const Picker = ({ value, onChange }) => {
  const target = useRef(null)
  const hovering = useHover(target)

  return (
    <>
      <div ref={target} style={styles.color(value)}>
        <div style={styles.picker.wrapper(hovering)}>
          <div style={styles.picker.board} />
          <p>slider</p>
          <input
            style={styles.input({ hasError: false })}
            type="string"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          <p>predefined colors</p>
        </div>
      </div>
    </>
  )
}
