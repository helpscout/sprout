import type {HexColor} from '../typings/index'
import Color from '../Color/index'

/**
 * Lightens a color.
 * @param {string} color The color to adjust.
 * @param {number} amount The amount to lighten.
 * @returns {string} The newly adjusted hex color.
 */
function lighten(color: HexColor, amount: number): HexColor {
  return new Color(color)
    .lighten(amount)
    .hex()
    .toString()
}

export default lighten
