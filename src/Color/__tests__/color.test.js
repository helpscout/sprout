import Color from '../index'

test('Generates initial color models, from hex', () => {
  expect(new Color('#000')._color.hex).toEqual('#000000')
  expect(new Color('#000')._color.rgb).toEqual({r: 0, g: 0, b: 0})
  expect(new Color('#000')._color.hsl).toEqual({h: 0, s: 0, l: 0})
})

test('Generates initial color models, from color name', () => {
  expect(new Color('black')._color.hex).toEqual('#000000')
  expect(new Color('black')._color.rgb).toEqual({r: 0, g: 0, b: 0})
  expect(new Color('black')._color.hsl).toEqual({h: 0, s: 0, l: 0})
})
