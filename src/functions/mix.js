import type {HexColor} from '../typings/index'
import Color from '../Color/index'

/**
 * Mixes two (hex) colors together.
 * @param {string} color1 The first color.
 * @param {string} color2 The second color.
 * @param {number} weight The amount to mix the second color into the first.
 * @returns {string} The newly mixed hex color.
 */
function mix(
  color1: HexColor,
  color2: HexColor,
  weight: number = 0.5,
): HexColor {
  return new Color(color1)
    .mix(color2, weight)
    .hex()
    .toString()
}

export default mix
