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
  const colorValue = new Color(color).rgba().alpha(getAlphaValue(value))

  return colorValue.toString()
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

  alpha = Math.min(1, Math.max(0, alpha))

  return alpha
}

export default rgba
