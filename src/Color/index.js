// @flow
import type {AlphaValue, ColorValue, ColorModel, Shade} from '../typings/index'
import {darken, lighten, getColorShade} from '../utils/color'
import {
  getHexFromRGB,
  getHslFromRGB,
  getRGBFromColor,
  mixRGBAValues,
} from './utils'

type ColorClass = Object

type ColorMode = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'

const COLOR_MODE = {
  hex: 'hex',
  rgb: 'rgb',
  rgba: 'rgba',
  hsl: 'hsl',
  hsla: 'hsla',
}

class Color {
  _color: ColorModel
  _mode: ColorMode

  constructor(value: ColorValue) {
    this.setColor(value)
    this.setMode(COLOR_MODE.rgb)
  }

  setColor(value: ColorValue, alpha: ?AlphaValue = 1): ColorClass {
    const rgb = getRGBFromColor(value)
    const hsl = getHslFromRGB(rgb)
    const hex = getHexFromRGB(rgb)
    const shade = getColorShade(hex)
    const rgba = {...rgb, a: alpha}

    this._color = {
      hex,
      hsl,
      rgb,
      rgba,
      alpha,
      shade,
    }

    return this
  }

  setMode(mode: ColorMode) {
    this._mode = mode
  }

  getMode(): ColorMode {
    return this._mode
  }

  getColor(): ColorModel {
    return this._color
  }

  hex(): ColorClass {
    this.setMode(COLOR_MODE.hex)
    return this
  }

  hsl(): ColorClass {
    this.setMode(COLOR_MODE.hsl)
    return this
  }

  hsla(): ColorClass {
    this.setMode(COLOR_MODE.hsla)
    return this
  }

  rgb(): ColorClass {
    this.setMode(COLOR_MODE.rgb)
    return this
  }

  rgba(): ColorClass {
    this.setMode(COLOR_MODE.rgba)
    return this
  }

  alpha(value: AlphaValue): ColorClass {
    this._color.alpha = value

    return this
  }

  toString(): string {
    return colorInstanceToString(this)
  }

  darken(amount: number = 20): ColorClass {
    if (!amount) {
      return this
    }

    const colors = this.getColor()
    const hex = getHexFromRGB(colors.rgb)
    const newHex = darken(hex, amount)

    this.setColor(newHex, colors.alpha)

    return this
  }

  lighten(amount: number = 20): ColorClass {
    if (!amount) {
      return this
    }

    const colors = this.getColor()
    const hex = getHexFromRGB(colors.rgb)
    const newHex = lighten(hex, amount)

    this.setColor(newHex, colors.alpha)

    return this
  }

  mix(value: ColorValue, weight: number): ColorClass {
    const color1RGBA = this.getColor().rgba
    const color2RGBA = new Color(value).getColor().rgba
    const newHex = getHexFromRGB(mixRGBAValues(color1RGBA, color2RGBA, weight))

    this.setColor(newHex)

    return this
  }

  clone(): ColorClass {
    return new Color(this.hex())
  }

  shade(): Shade {
    return this.getColor().shade
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

export default Color
