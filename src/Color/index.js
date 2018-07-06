// @flow
import type {
  ColorValue,
  ColorModel,
  HexColor,
  RGBShape,
  HSLShape,
} from '../typings/index'
import {getHexFromRGB, getHslFromRGB, getRGBFromColor} from './utils'

class Color {
  _color: ColorModel
  _model: any

  constructor(value: ColorValue) {
    const rgb = getRGBFromColor(value)
    const hsl = getHslFromRGB(rgb)
    const hex = getHexFromRGB(rgb)

    this._color = {
      hex,
      hsl,
      rgb,
    }
    this._model = rgb
  }

  hex(): HexColor {
    return this._color.hex
  }

  hsl(): HSLShape {
    return this._color.hsl
  }

  rgb(): RGBShape {
    return this._color.rgb
  }
}

export default Color
