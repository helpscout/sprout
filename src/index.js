// @flow
import cssColorNames from './data/cssColorNames'
import { isHex, isRGB, convertRGBStringToShape, hexToRgb } from './utils/color'
import { warn } from './utils/warn'
import type {
  CSSColorName,
  HexColor,
  RGBAValue,
  RGBShape
} from './typings/index'

function getHexByColorName(name: CSSColorName): ?HexColor {
  const color = cssColorNames[name]
  if (!color) {
    warn(`${name} isn't a valid CSS color name.`)
  }

  return color
}

export function rgba(color: string = '', value: RGBAValue = 1): string {
  const fallbackRGB: RGBShape = {r: 0, g: 0, b: 0}
  let rgb: RGBShape = {r: 0, g: 0, b: 0}
  let alpha = value

  if (isHex(color)) {
    rgb = hexToRgb(color)
  }
  else if (isRGB(color)) {
    rgb = convertRGBStringToShape(color)
  }
  else {
    const hexValue = getHexByColorName(color)
    if (!hexValue) {
      warn(`${color} isn't a valid color.`)
    }

    rgb = hexToRgb(hexValue || '#000000')
  }

  // Type checking
  if (typeof alpha === 'string') {
    alpha = parseFloat(value)
  }
  if (typeof alpha !== 'number') {
    warn(`rgba: ${value} isn't a valid number.`)
    alpha = 1
  }

  // Min/Max value checking
  if (alpha > 1) {
    warn(`rgba: ${value} cannot be more than 1.`)
    alpha = 1
  }
  if (alpha < 0) {
    warn(`rgba: ${value} cannot be less than 0.`)
    alpha = 0
  }

  // Fallback to black
  if (!rgb) {
    rgb = fallbackRGB
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}