type HexColor = string
type HSLValue = number | string
type RGBValue = number | string
type RGBAValue = number | string

type RGBShape = {
  r: RGBValue,
  g: RGBValue,
  b: RGBValue
}

type HSLShape = {
  h: HSLValue,
  s: HSLValue,
  l: HSLValue
}

type Shade =
| 'lightest'
| 'light'
| 'dark'
| 'darkest'