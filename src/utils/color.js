/*eslint complexity: ["error", 15]*/

// @flow
import type {HexColor, HSLShape, RGBShape, Shade} from '../typings/index'
import {isDefined, isNumber, isObject, isString} from './is'

export function isHex(value: HexColor): boolean {
  return isString(value) && value.indexOf('#') === 0
}

export function isRGB(value: any): boolean {
  if (isString(value)) {
    return !!getRGBValuesFromString(value)
  }
  if (isObject(value)) {
    return !!(isDefined(value.r) && isDefined(value.g) && isDefined(value.b))
  }
  return false
}

export function getRGBValuesFromString(string: string): ?Object {
  if (!isString(string)) return null

  const values = string.split(',').map(v => v.trim())

  if (values.length !== 3) return null

  return {
    r: values[0],
    g: values[1],
    b: values[2],
  }
}

export function convertRGBStringToShape(string: string): Object {
  const values = getRGBValuesFromString(string)

  if (!values) {
    // Fallback to black
    return {
      r: 0,
      g: 0,
      b: 0,
    }
  }

  return values
}

const lightThreshold = 0.61
const optimalTextColorValues = {
  r: 129,
  g: 522,
  b: 49,
}

// Source
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

export function componentToHex(c: number | string): string {
  if (!c || typeof c !== 'number') return '00'
  const hex = Math.round(c).toString(16)
  /* istanbul ignore next */
  return hex.length === 1 ? `0${hex}` : hex
}

export function hexToRgb(hex: string): ?RGBShape {
  if (!isHex(hex)) return null
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  /* istanbul ignore next */
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export function rgbToHex(r: number, g: number, b: number): HexColor {
  if (!isNumber(r) || !isNumber(g) || !isNumber(b)) {
    return '#000000'
  }

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export function hexToHsl(hex: string): ?HSLShape {
  if (!isHex(hex)) return null

  const rgb = hexToRgb(hex)
  if (!rgb) return null

  return rgbToHsl(rgb.r, rgb.g, rgb.b)
}

export function optimalTextColor(
  backgroundHex: string,
  propValues: Object = optimalTextColorValues,
): ?string {
  if (!isHex(backgroundHex)) return null
  // Defaults from original formula:
  // r: 299
  // g: 587
  // b: 114
  const defaultPropValues = optimalTextColorValues
  const {r, g, b} = Object.assign({}, defaultPropValues, propValues)
  const backgroundRgb = hexToRgb(backgroundHex)

  if (!backgroundRgb) {
    return 'black'
  }

  const shade = Math.round(
    (backgroundRgb.r * r + backgroundRgb.g * g + backgroundRgb.b * b) / 1000,
  )

  return shade >= 128 ? 'black' : 'white'
}

export function rgbToHsl(red: number, green: number, blue: number): HSLShape {
  if (!isNumber(red) || !isNumber(green) || !isNumber(blue)) {
    return {
      h: 0,
      s: 0,
      l: 0,
    }
  }

  const r = red / 255
  const g = green / 255
  const b = blue / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h, s
  const l = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    /* istanbul ignore next */
    /*eslint-disable */
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    /*eslint-enable */
    // $FlowFixMe
    h /= 6
  }

  /*eslint-disable */
  return {
    h: h % 1 !== 0 ? Math.round(h * 1e2) / 1e2 : h,
    s: s % 1 !== 0 ? Math.round(s * 1e2) / 1e2 : s,
    l: l % 1 !== 0 ? Math.round(l * 1e2) / 1e2 : l,
  }
  /*eslint-enable */
}

/**
 * Converts a hue to an RGB value.
 * Source:
 * https://github.com/micro-js/hsl-to-rgb/blob/master/lib/index.js
 *
 * @param {number} p P value.
 * @param {number} q Q value.
 * @param {number} t T value.
 * @returns {number} RBB value.
 */
export function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6

  return p
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @returns {Object}          The RGB representation
 */
export function hslToRgb(h: number, s: number, l: number): RGBShape {
  h /= 360

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  const r = Math.floor(hueToRgb(p, q, h + 1 / 3) * 255)
  const g = Math.floor(hueToRgb(p, q, h) * 255)
  const b = Math.floor(hueToRgb(p, q, h - 1 / 3) * 255)

  return {
    r: Math.max(0, Math.min(r, 255)),
    g: Math.max(0, Math.min(g, 255)),
    b: Math.max(0, Math.min(b, 255)),
  }
}

export function getColorShade(
  hex: HexColor,
  propValues: RGBShape = optimalTextColorValues,
): ?Shade {
  if (!isHex(hex)) return null

  const hsl = hexToHsl(hex)
  if (!hsl) return null

  const l = hsl.l
  const isDarkText = optimalTextColor(hex, propValues) === 'black'

  if (l >= 0.9) {
    return 'lightest'
  } else if (l >= lightThreshold) {
    return isDarkText ? 'light' : 'dark'
  } else if (l >= 0.16) {
    return isDarkText ? 'light' : 'dark'
  } else {
    return 'darkest'
  }
}
