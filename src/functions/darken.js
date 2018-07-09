import type {HexColor} from '../typings/index'
import Color from '../Color/index'

/**
 * Darkens a color.
 * @param {string} color The color to adjust.
 * @param {number} amount The amount to darken.
 * @returns {string} The newly adjusted hex color.
 */
function darken(color: HexColor, amount: number): HexColor {
  return new Color(color)
    .darken(amount)
    .hex()
    .toString()
}

export default darken
