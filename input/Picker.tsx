import React, { useRef, useState } from 'react'
import useHover from '@react-hook/hover'
import useMouse from '@react-hook/mouse-position'
import * as styles from './styles'

const popularColors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#9E9E9E', // Gray
  '#795548', // Brown
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

const rgbSliderHex = [
  '#FF0000',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#FF00FF',
  '#FF0000',
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

const Board = ({ color }: { color: string }) => {
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const target = useRef<HTMLDivElement>(null)
  const mouse = useMouse(target)
  const [mouseDown, setMouseDown] = useState(false)

  const width = target.current?.offsetWidth
  const height = target.current?.offsetHeight

  let handleX = lastPosition.x
  let handleY = lastPosition.y

  if (mouseDown) {
    handleX = mouse.x
    handleY = mouse.y

    // User leaves window while mouse is pressed down.
    if (handleX > width || handleY > height || handleX < 0 || handleY < 0) {
      setLastPosition({ x: mouse.x, y: mouse.y })
      setMouseDown(false)
      return null
    }
  }

  return (
    <>
      <div
        ref={target}
        role="button"
        tabIndex={0}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => {
          setLastPosition({ x: mouse.x, y: mouse.y })
          setMouseDown(false)
        }}
        style={styles.picker.board(color)}
      >
        <div style={styles.picker.boardOverlay} />
        <div style={styles.picker.boardHandle(color, handleX, handleY)} />
      </div>
    </>
  )
}

interface Props {
  value: string
  onChange: (color: string) => void
}

export const Picker = ({ value, onChange }: Props) => {
  const [currentColor, setCurrentColor] = useState(value)
  const target = useRef(null)
  const hovering = useHover(target)
  const [sliderValue, setSliderValue] = useState(0)

  return (
    <>
      <div ref={target} style={styles.color(value)}>
        <div style={styles.picker.wrapper(true)}>
          <Board color={currentColor} />
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
            /* combining below selectors will not work. */
            .range::-webkit-slider-thumb {
              border: 2px solid #FFFFFF;
              box-shadow: 1px 1px 3px gray;
              height: 16px;
              width: 16px;
              border-radius: 32px;
              background: ${sliderValueToRGB(sliderValue)};
              cursor: pointer;
              -webkit-appearance: none;
            }

            .range::-moz-range-thumb {
              /* TODO */
            }

            .range::-ms-thumb {
              /* TODO */
            }
          `,
            }}
          />

          <div style={styles.picker.rangeWrapper}>
            <div style={styles.picker.rangeBackgroundWrapper}>
              {rgbSliderHex.slice(0, -1).map((current, index) => (
                <div
                  key={index}
                  style={styles.picker.rangeBackground(
                    current,
                    rgbSliderHex[index + 1]
                  )}
                />
              ))}
            </div>
            <input
              className="range"
              style={styles.picker.rangeInput}
              type="range"
              value={sliderValue}
              min="0"
              max="1530"
              onChange={(event) => {
                const targetValue = Number(event.target.value)

                setSliderValue(targetValue)
                setCurrentColor(sliderValueToRGB(targetValue))
              }}
            />
          </div>
          <input
            style={styles.input({ hasError: false })}
            type="string"
            value={currentColor}
            onChange={(event) => setCurrentColor(event.target.value)}
          />
          <div style={styles.picker.popularWrapper}>
            {popularColors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Select ${color} color`}
                style={styles.picker.popular(color)}
                onClick={() => setCurrentColor(color)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
