// @flow
import cssColorNames from '../data/cssColorNames.json'
import {isNumber, isString} from '../utils/is'
import {warn} from '../utils/warn'
import type {
  ColorMode,
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
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from '../utils/color'

const fallbackRGB: RGBShape = {r: 0, g: 0, b: 0}

export const COLOR_MODE: ColorMode = {
  hex: 'hex',
  rgb: 'rgb',
  rgba: 'rgba',
  hsl: 'hsl',
  hsla: 'hsla',
}

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
 * Converts a RGB data shape to a hex color.
 * @param {Object} hsl The RGB data shape.
 * @returns {string} The hex color.
 */
export function getHexFromHSL(hsl: HSLShape): HexColor {
  const {h, s, l} = hsl

  return getHexFromRGB(hslToRgb(h, s, l))
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

/**
 * Combines 2 color (RGBA) values together.
 * Source:
 * https://github.com/Qix-/color/blob/master/index.js#L366
 *
 * @param {Object} rgb1 The first RGBA shape.
 * @param {Object} rgb2 The second RGBA shape.
 * @param {number} weight The amount of the 2nd color to use during mixing.
 * @returns {Object} The mixed RGBA value
 */
export function mixRGBAValues(
  rgb1: RGBShape,
  rgb2: RGBShape,
  weight: number = 0.5,
): RGBShape {
  const color1 = safeGetRGBShape(rgb1)
  const color2 = safeGetRGBShape(rgb2)

  const w = 2 * weight - 1
  const a = color1.a - color2.a

  const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
  const w2 = 1 - w1

  return {
    r: w1 * color1.r + w2 * color2.r,
    g: w1 * color1.g + w2 * color2.g,
    b: w1 * color1.b + w2 * color2.b,
    a: color1.a * weight + color2.a * (1 - weight),
  }
}

/**
 * Generates the CSS color string value.
 *
 * @param {Object} colorInstance The color class instance.
 * @returns {string} The CSS color string value.
 */
export function colorInstanceToString(colorInstance: Object): string {
  const color = colorInstance.getColor()
  const mode = colorInstance.getMode()

  switch (mode) {
    case COLOR_MODE.hex:
      return color.hex

    case COLOR_MODE.rgb:
      return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`

    case COLOR_MODE.rgba:
      return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${
        color.alpha
      })`

    case COLOR_MODE.hsl:
      return `hsl(${color.hsl.h}, ${color.hsl.s}, ${color.hsl.l})`

    case COLOR_MODE.hsla:
      return `hsla(${color.hsl.h}, ${color.hsl.s}, ${color.hsl.l}, ${
        color.alpha
      })`

    default:
      return color.hex
  }
}
