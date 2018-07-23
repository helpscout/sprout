export type ColorValue = string
export type HexColor = string
export type HSLValue = number | string
export type RGBValue = number | string
export type AlphaValue = number | string

export type RGBShape = {
  r: RGBValue,
  g: RGBValue,
  b: RGBValue,
}

export type HSLShape = {
  h: HSLValue,
  s: HSLValue,
  l: HSLValue,
}

export type Shade = 'lightest' | 'light' | 'dark' | 'darkest'

export type ColorModel = {
  hex: HexColor,
  hsl: HSLShape,
  rgb: RGBShape,
  alpha: AlphaValue,
}

type ColorMode = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'
