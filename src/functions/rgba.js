// @flow
import {isNumber, isString} from '../utils/is'
import {getAlphaValue} from '../utils/color'
import {warn} from '../utils/warn'
import Color from '../Color/index'
import type {AlphaValue} from '../typings/index'

/**
 * JS implementation of Sass' rgba() function.
 * @param {string} color The color.
 * @param {number | string} value The alpha value.
 * @returns {string} CSS compatible rgba() value.
 */
function rgba(color: string = '#000', value: AlphaValue = 1): string {
  const colorValue = new Color(color).rgba().alpha(getAlphaValue(value))

  return colorValue.toString()
}

export default rgba
