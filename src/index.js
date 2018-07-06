// @flow
import cssColorNames from './data/cssColorNames.json'
import { isHex, isRGB, convertRGBStringToShape, hexToRgb } from './utils/color'
import { warn } from './utils/warn'

type RGBAValue = number | string

function getHexByColorName(name: string): ?string {
  const color = cssColorNames[name]
  if (!color) {
    warn(`${name} isn't a valid CSS color name.`)
  }

  return color
}

export function rgba(color: string = '', value: RGBAValue = 1): string {
  let rgb
  let colorValue
  let alpha = value

  if (isHex(color)) {
    rgb = hexToRgb(color)
  }
  else if (isRGB(color)) {
    rgb = convertRGBStringToShape(color)
  }
  else {
    let hexValue = getHexByColorName(color)
    if (!hexValue) {
      warn(`${color} isn't a valid color.`)
      rgb = hexToRgb('#000000')
    } else {
      rgb = hexToRgb(hexValue)
    }
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

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}