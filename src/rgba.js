// @flow
import cssColorNames from './data/cssColorNames.json'
import { isHex, isRGB, convertRGBStringToShape, hexToRgb } from './utils/color'
import { isNumber, isString } from './utils/is'
import { warn } from './utils/warn'
import type {
  CSSColorName,
  HexColor,
  RGBAValue,
  RGBShape
} from './typings/index'

/**
 * Returns a hex from a standard CSS color name.
 * @param {string} name The CSS color name.
 * @returns {?string} The hex code.
 */
export function getHexByColorName(name: CSSColorName): ?HexColor {
  const color = cssColorNames[name]
  if (!color) {
    warn(`${name} isn't a valid CSS color name.`)
  }

  return color
}

/**
 * Parses and returns a valid alpha value.
 * @param {string | number} value The alpha value.
 * @returns {number} A valid alpha value.
 */
export function getAlphaValue(value: RGBAValue = 1): RGBAValue {
  let alpha = value
  // Type checking
  if (isString(alpha)) {
    alpha = parseFloat(value)
  }
  if (!isNumber(alpha)) {
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

  return alpha
}

/**
 * Parses and retrieves the r,g,b values (as a shape) from a color.
 * @param {string} color The color to parse.
 * @returns {Object} Object shape with r,g,b values.
 */
export function getRGBFromColor(color: string): RGBShape {
  const fallbackRGB: RGBShape = {r: 0, g: 0, b: 0}
  let rgb: RGBShape = {r: 0, g: 0, b: 0}

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

  return rgb || fallbackRGB
}

/**
 * JS implementation of Sass' rgba() function.
 * @param {string} color The color.
 * @param {number | string} value The alpha value.
 * @returns {string} CSS compatible rgba() value.
 */
export function rgba(color: string = '', value: RGBAValue = 1): string {
  const rgb = getRGBFromColor(color)
  const alpha = getAlphaValue(value)

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

export default rgba
