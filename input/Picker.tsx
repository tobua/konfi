import React, { useRef, useState } from 'react'
import useHover from '@react-hook/hover'
import * as styles from './styles'

const popularColors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#9E9E9E', // Gray
  '#F44336', // Red
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#673AB7', // Deep Purple
  '#3F51B5', // Indigo
  '#2196F3', // Blue
  '#03A9F4', // Light Blue
  '#00BCD4', // Cyan
  '#009688', // Teal
  '#4CAF50', // Green
  '#8BC34A', // Light Green
  '#CDDC39', // Lime
  '#FFEB3B', // Yellow
  '#FFC107', // Amber
  '#FF9800', // Orange
  '#FF5722', // Deep Orange
  '#795548', // Brown
]

const rgbSlider = [
  [255, 0, 0], // Red
  [255, 255, 0], // Yellow
  [0, 255, 0], // Green
  [0, 255, 255], // Cyan
  [0, 0, 255], // Blue
  [255, 0, 255], // Magenta
  [255, 0, 0], // Red
]

const indexToChange = (slideIndex: number) => {
  const modulo = slideIndex % 3

  if (modulo === 1) {
    return 0
  }

  if (modulo === 0) {
    return 1
  }

  return 2
}

const operationByIndex = (slideIndex: number) =>
  slideIndex % 2 === 0
    ? (a: number, b: number) => a + b
    : (a: number, b: number) => a - b

const toHex = (value: number) => {
  const result = value.toString(16).toUpperCase()

  if (result.length === 1) {
    return `0${result}`
  }

  return result
}

const sliderValueToRGB = (value: number) => {
  const index = Math.floor(value / 255)
  const remainder = value % 255
  const slide = [...rgbSlider[index]]

  const changeIndex = indexToChange(index)
  const changeValue = slide[indexToChange(index)]
  slide[changeIndex] = operationByIndex(index)(changeValue, remainder)

  return `#${toHex(slide[0])}${toHex(slide[1])}${toHex(slide[2])}`
}

export const Picker = ({ value, onChange }) => {
  const target = useRef(null)
  const hovering = useHover(target)
  const [slider, setSlider] = useState(0)

  return (
    <>
      <div ref={target} style={styles.color(value)}>
        <div style={styles.picker.wrapper(hovering)}>
          <div style={styles.picker.board(sliderValueToRGB(slider))}>
            <div style={styles.picker.boardOverlay} />
          </div>
          <input
            type="range"
            value={slider}
            min="0"
            max="1530"
            onChange={(event) => setSlider(Number(event.target.value))}
          />
          <input
            style={styles.input({ hasError: false })}
            type="string"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          <div style={styles.picker.popularWrapper}>
            {popularColors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Select ${color} color`}
                style={styles.picker.popular(color)}
                onClick={() => onChange(color)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
