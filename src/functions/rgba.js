// @flow
import {isNumber, isString} from '../utils/is'
import {warn} from '../utils/warn'
import Color from '../Color/index'
import type {AlphaValue} from '../typings/index'

/**
 * JS implementation of Sass' rgba() function.
 * @param {string} color The color.
 * @param {number | string} value The alpha value.
 * @returns {string} CSS compatible rgba() value.
 */
function rgba(color: string = '', value: AlphaValue = 1): string {
  const rgb = new Color(color).rgb()
  const alpha = getAlphaValue(value)

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

/**
 * Parses and returns a valid alpha value.
 * @param {string | number} value The alpha value.
 * @returns {number} A valid alpha value.
 */
export function getAlphaValue(value: AlphaValue = 1): AlphaValue {
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

export default rgba
