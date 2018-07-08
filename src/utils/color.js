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

// Source
// https://css-tricks.com/snippets/javascript/lighten-darken-color/
/*eslint-disable */
export function lightenDarkenColor(color: HexColor, value: number): HexColor {
  /* istanbul ignore else */
  if (color[0] === '#') {
    color = color.slice(1)
  }

  /* istanbul ignore next */
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2]
  }

  const num = parseInt(color, 16)

  let r = (num >> 16) + value
  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + value
  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + value
  if (g > 255) g = 255
  else if (g < 0) g = 0

  return `#${`000000${(g | (b << 8) | (r << 16)).toString(16)}`.slice(-6)}`
}
/*eslint-enable */

export function lighten(hex: HexColor, value: number = 20): ?HexColor {
  if (!isHex(hex) || typeof value !== 'number') return null
  return lightenDarkenColor(hex, value * 2.55)
}

export function darken(hex: HexColor, value: number = 20): ?HexColor {
  if (!isHex(hex) || typeof value !== 'number') return null
  return lightenDarkenColor(hex, value * 2.55 * -1)
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
