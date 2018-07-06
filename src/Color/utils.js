// @flow
import cssColorNames from '../data/cssColorNames.json'
import {isNumber, isString} from '../utils/is'
import {warn} from '../utils/warn'
import type {
  ColorValue,
  CSSColorName,
  HexColor,
  HSLShape,
  RGBAValue,
  RGBShape,
} from '../typings/index'
import {
  isHex,
  isRGB,
  convertRGBStringToShape,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
} from '../utils/color'

const fallbackRGB: RGBShape = {r: 0, g: 0, b: 0}

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
export function getRGBFromColor(color: ColorValue): RGBShape {
  let rgb: RGBShape = {r: 0, g: 0, b: 0}

  if (isHex(color)) {
    rgb = hexToRgb(color)
  } else if (isRGB(color)) {
    rgb = convertRGBStringToShape(color)
  } else {
    const hexValue = getHexByColorName(color)
    if (!hexValue) {
      warn(`${color} isn't a valid color.`)
    }

    rgb = hexToRgb(hexValue || '#000000')
  }

  return rgb || fallbackRGB
}

/**
 * Checks the provided RGB shape and fallsback to default (black) if invalid.
 * @param {Object} rgb The RGB shape (maybe).
 * @returns {Object} The RGB shape.
 */
export function safeGetRGBShape(rgb: RGBShape): RGBShape {
  let rgbShape = rgb
  if (!isRGB(rgb)) {
    warn(`${rgb} isn't a valid RGB value.`)
    rgbShape = fallbackRGB
  }

  return rgbShape
}

/**
 * Converts a RGB data shape to a hex color.
 * @param {Object} rgb The RGB data shape.
 * @returns {string} The hex color.
 */
export function getHexFromRGB(rgb: RGBShape): HexColor {
  const {r, g, b} = safeGetRGBShape(rgb)

  return rgbToHex(r, g, b)
}

/**
 * Converts a RGB data shape to HSL.
 * @param {Object} rgb The RGB data shape.
 * @returns {Object} The HSL data shape.
 */
export function getHslFromRGB(rgb: RGBShape): HSLShape {
  const {r, g, b} = safeGetRGBShape(rgb)

  return rgbToHsl(r, g, b)
}
