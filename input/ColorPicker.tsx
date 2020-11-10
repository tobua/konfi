import React, { useRef, useState } from 'react'
import useMouse from '@react-hook/mouse-position'
import hexToRgb from 'hex-rgb'
import rgbHex from 'rgb-hex'
import contrast from 'font-color-contrast'
import * as styles from './styles'

const board = (selectedColor: string, mouseDown: boolean) => ({
  display: 'flex',
  position: 'relative' as 'relative',
  cursor: mouseDown ? 'none' : 'inherit',
  height: 100,
  backgroundColor: selectedColor,
  backgroundImage: `linear-gradient(to right, transparent 0%, #FFFFFF 100%)`,
  outline: 'none',
})

const boardOverlay = {
  position: 'absolute' as 'absolute',
  backgroundImage: `linear-gradient(to top, #000000 0%, transparent 100%)`,
  width: '100%',
  height: '100%',
}

const boardHandle = (
  background: string,
  x: number,
  y: number,
  mouseDown: boolean
) => ({
  position: 'absolute' as 'absolute',
  cursor: mouseDown ? 'none' : 'pointer',
  top: y - 6,
  left: x - 6,
  width: 8,
  height: 8,
  border: '2px solid white',
  boxShadow: '1px 1px 2px gray',
  borderRadius: 14,
  background,
})

const rangeWrapper = {
  marginTop: 10,
  marginBottom: 10,
  position: 'relative' as 'relative',
  height: 10,
}

const rangeBackgroundWrapper = {
  display: 'flex',
  flexDirection: 'row' as 'row',
}

const rangeBackground = (from: string, to: string) => ({
  width: 'calc(100% / 6)',
  height: 10,
  backgroundImage: `linear-gradient(to right, ${from} 0%, ${to} 100%)`,
})

const rangeInput = {
  position: 'absolute' as 'absolute',
  width: '100%',
  top: -5,
  left: -2,
  appearance: 'none' as 'none',
  outline: 'none',
  background: 'none',
}

const rangeThumbCrossBrowserStyles = (color: string) => `
border: 2px solid #FFFFFF;
box-shadow: 1px 1px 3px gray;
border-radius: 32px;
cursor: pointer;
background: ${color};
height: 16px;
width: 16px;
`

const rangeThumbStyles = (color: string) => `
.colua__range {
  -webkit-appearance: none;
}

/* combining below selectors will not work. */
.colua__range::-webkit-slider-thumb {
${rangeThumbCrossBrowserStyles(color)}
  -webkit-appearance: none; /* Required for Safari */
  appearance: none;
}

.colua__range::-moz-range-thumb {
${rangeThumbCrossBrowserStyles(color)}
  height: 14px;
  width: 14px;
}

.colua__range::-ms-thumb {
${rangeThumbCrossBrowserStyles(color)}
}
`

const popularWrapper = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  flexWrap: 'wrap' as 'wrap',
  marginTop: 10,
}

const popular = (background: string) => ({
  position: 'relative' as 'relative',
  width: '10%',
  height: 0,
  paddingBottom: '10%',
  backgroundColor: background,
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
})

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

const whitenByPercentage = (
  red: number,
  green: number,
  blue: number,
  percentage: number
) => ({
  red: red + (255 - red) * percentage,
  green: green + (255 - green) * percentage,
  blue: blue + (255 - blue) * percentage,
})

const blackenByPercentage = (
  red: number,
  green: number,
  blue: number,
  percentage: number
) => ({
  red: red - red * percentage,
  green: green - green * percentage,
  blue: blue - blue * percentage,
})

const calculateHandleColor = (
  color: string,
  handleX: number,
  handleY: number,
  width: number,
  height: number
) => {
  let rgbColor: { red: number; green: number; blue: number } = hexToRgb(color)
  // Fully to the right will add 100% white.
  const whitePercentage = handleX / width
  // Fully at the bottom will add (or remove) 100% black.
  const blackPercentage = handleY / height

  rgbColor = whitenByPercentage(
    rgbColor.red,
    rgbColor.green,
    rgbColor.blue,
    whitePercentage
  )

  rgbColor = blackenByPercentage(
    rgbColor.red,
    rgbColor.green,
    rgbColor.blue,
    blackPercentage
  )

  return `#${rgbHex(rgbColor.red, rgbColor.green, rgbColor.blue).toUpperCase()}`
}

// Return x and y between 0 and max values provided.
const ensureInBounds = (x: number, y: number, maxX: number, maxY: number) => {
  let resultX = x
  let resultY = y

  if (x > maxX) {
    resultX = maxX
  }

  if (x < 0) {
    resultX = 0
  }

  if (y > maxY) {
    resultY = maxY
  }

  if (y < 0) {
    resultY = 0
  }

  return [resultX, resultY]
}

// Store last mouse position on every render, in case the mouse leaves the tracked window this is
// used as a fallback.
let lastMousePosition = { x: 0, y: 0 }

const Board = ({
  boardRef,
  lastPosition,
  setLastPosition,
  boardColor,
  setColor,
  width,
  height,
}: {
  boardRef: React.MutableRefObject<HTMLDivElement>
  lastPosition: { x: number; y: number }
  setLastPosition: React.Dispatch<any>
  boardColor: string
  setColor: (color: string) => void
  width: number
  height: number
}) => {
  const mouse = useMouse(boardRef)

  let handleX = lastPosition.x
  let handleY = lastPosition.y

  if (mouse.isDown && mouse.x && mouse.y) {
    // User leaves window while mouse is pressed down.
    // Let mouse outside, but still match cursor position inside the board.
    ;[handleX, handleY] = ensureInBounds(mouse.x, mouse.y, width, height)

    lastMousePosition = { x: handleX, y: handleY }
  } else {
    handleX = lastMousePosition.x
    handleY = lastMousePosition.y
  }

  const handleColor = calculateHandleColor(
    boardColor,
    handleX,
    handleY,
    width,
    height
  )

  return (
    <div
      ref={boardRef}
      role="button"
      tabIndex={0}
      onMouseUp={() => {
        const [nextHandleX, nextHandleY] = ensureInBounds(
          mouse.x,
          mouse.y,
          width,
          height
        )

        setLastPosition({ x: nextHandleX, y: nextHandleY })
        setColor(handleColor)
      }}
      style={board(boardColor, mouse.isDown)}
    >
      <div style={boardOverlay} />
      <div style={boardHandle(handleColor, handleX, handleY, mouse.isDown)} />
    </div>
  )
}

interface Props {
  value: string
  onChange: (color: string) => void
}

export const ColorPicker = ({ value, onChange }: Props) => {
  const boardRef = useRef<HTMLDivElement>(null)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [boardColor, setBoardColor] = useState(value)
  const [sliderValue, setSliderValue] = useState(0)

  const width = boardRef.current?.offsetWidth
  const height = boardRef.current?.offsetHeight

  return (
    <>
      <Board
        boardRef={boardRef}
        lastPosition={lastPosition}
        setLastPosition={setLastPosition}
        boardColor={boardColor}
        setColor={onChange}
        width={width}
        height={height}
      />
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: rangeThumbStyles(sliderValueToRGB(sliderValue)),
        }}
      />
      <div style={rangeWrapper}>
        <div style={rangeBackgroundWrapper}>
          {rgbSliderHex.slice(0, -1).map((current, index) => (
            <div
              key={index}
              style={rangeBackground(current, rgbSliderHex[index + 1])}
            />
          ))}
        </div>
        <input
          className="colua__range"
          style={rangeInput}
          type="range"
          value={sliderValue}
          min="0"
          max="1530"
          onChange={(event) => {
            const targetValue = Number(event.target.value)

            setSliderValue(targetValue)
            setBoardColor(sliderValueToRGB(targetValue))
          }}
        />
      </div>
      <input
        style={{
          ...styles.input({ hasError: false }),
          width: 'calc(100% - 10px)',
          background: value,
          color: contrast(value),
        }}
        type="string"
        value={value}
        onChange={(event) => setBoardColor(event.target.value)}
      />
      <div style={popularWrapper}>
        {popularColors.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Select ${color} color`}
            style={popular(color)}
            onClick={() => {
              const boardMatchedColor = calculateHandleColor(
                color,
                lastPosition.x,
                lastPosition.y,
                width,
                height
              )
              setBoardColor(color)
              onChange(boardMatchedColor)
            }}
          />
        ))}
      </div>
    </>
  )
}
