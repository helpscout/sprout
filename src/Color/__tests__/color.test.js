import Color from '../index'

describe('Construct', () => {
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
})

describe('toString', () => {
  test('Can generate hex string', () => {
    expect(new Color('#000').hex().toString()).toEqual('#000000')
    expect(new Color('black').hex().toString()).toEqual('#000000')
  })

  test('Can generate rgb string', () => {
    expect(new Color('#000').rgb().toString()).toEqual('rgb(0, 0, 0)')
    expect(new Color('black').rgb().toString()).toEqual('rgb(0, 0, 0)')
  })

  test('Can generate rgba string', () => {
    expect(new Color('#000').rgba().toString()).toEqual('rgba(0, 0, 0, 1)')
    expect(new Color('black').rgba().toString()).toEqual('rgba(0, 0, 0, 1)')
  })

  test('Can generate hsl string', () => {
    expect(new Color('#000').hsl().toString()).toEqual('hsl(0, 0, 0)')
    expect(new Color('black').hsl().toString()).toEqual('hsl(0, 0, 0)')
  })

  test('Can generate hsla string', () => {
    expect(new Color('#000').hsla().toString()).toEqual('hsla(0, 0, 0, 1)')
    expect(new Color('black').hsla().toString()).toEqual('hsla(0, 0, 0, 1)')
  })
})
