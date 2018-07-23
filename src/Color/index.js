// @flow
import type {
  AlphaValue,
  ColorValue,
  ColorModel,
  ColorMode,
  Shade,
} from '../typings/index'
import {getColorShade} from '../utils/color'
import {
  COLOR_MODE,
  colorInstanceToString,
  getHexFromRGB,
  getHexFromHSL,
  getHslFromRGB,
  getRGBFromColor,
  mixRGBAValues,
} from './utils'

type ColorClass = Object

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
    const hsl = colors.hsl
    hsl.l = hsl.l - amount / 100
    const newHex = getHexFromHSL(hsl)

    this.setColor(newHex, colors.alpha)

    return this
  }

  lighten(amount: number = 20): ColorClass {
    if (!amount) {
      return this
    }

    const colors = this.getColor()
    const hsl = colors.hsl
    hsl.l = hsl.l + amount / 100
    const newHex = getHexFromHSL(hsl)

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

  shade(): Shade {
    return this.getColor().shade
  }
}

export default Color
