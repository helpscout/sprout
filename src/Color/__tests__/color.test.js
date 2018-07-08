import Color from '../index'

// Controls for hex values for functions like lighten/darken/mix etc…
// come from:
// https://www.sassmeister.com/

describe('Construct', () => {
  test('Generates initial color models, from hex', () => {
    expect(new Color('#000').getColor().hex).toEqual('#000000')
    expect(new Color('#000').getColor().rgb).toEqual({r: 0, g: 0, b: 0})
    expect(new Color('#000').getColor().hsl).toEqual({h: 0, s: 0, l: 0})
  })

  test('Generates initial color models, from color name', () => {
    expect(new Color('black').getColor().hex).toEqual('#000000')
    expect(new Color('black').getColor().rgb).toEqual({r: 0, g: 0, b: 0})
    expect(new Color('black').getColor().hsl).toEqual({h: 0, s: 0, l: 0})
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

describe('Lighten', () => {
  test('Can lighten a color to a specified value', () => {
    expect(
      new Color('#000')
        .lighten(20)
        .hex()
        .toString(),
    ).toEqual('#333333')
    expect(
      new Color('black')
        .lighten(20)
        .hex()
        .toString(),
    ).toEqual('#333333')
    expect(
      new Color('#000')
        .lighten(10)
        .rgb()
        .toString(),
    ).toEqual('rgb(25, 25, 25)')
  })

  test('Can lighten a color to a 0 value', () => {
    expect(
      new Color('#000')
        .lighten(0)
        .hex()
        .toString(),
    ).toEqual('#000000')
    expect(
      new Color('black')
        .lighten(0)
        .hex()
        .toString(),
    ).toEqual('#000000')
  })
})

describe('Darken', () => {
  test('Can darken a color to a specified value', () => {
    expect(
      new Color('#fff')
        .darken(20)
        .hex()
        .toString(),
    ).toEqual('#cccccc')
    expect(
      new Color('white')
        .darken(20)
        .hex()
        .toString(),
    ).toEqual('#cccccc')
    expect(
      new Color('#fff')
        .darken(10)
        .rgb()
        .toString(),
    ).toEqual('rgb(229, 229, 229)')
  })

  test('Can darken a color to a 0 value', () => {
    expect(
      new Color('#fff')
        .darken(0)
        .hex()
        .toString(),
    ).toEqual('#ffffff')
    expect(
      new Color('white')
        .darken(0)
        .hex()
        .toString(),
    ).toEqual('#ffffff')
  })
})

describe('Shade', () => {
  test('Returns darkest for darkest shades', () => {
    expect(new Color('#000').shade()).toEqual('darkest')
    expect(new Color('#111').shade()).toEqual('darkest')
    expect(new Color('#103010').shade()).toEqual('darkest')
  })
})

describe('Mix', () => {
  test('Can mix using color names', () => {
    expect(
      new Color('red')
        .mix('yellow')
        .hex()
        .toString(),
    ).toEqual('#ff8000')
    expect(
      new Color('dodgerblue')
        .mix('yellow')
        .hex()
        .toString(),
    ).toEqual('#8fc880')
    expect(
      new Color('black')
        .mix('white')
        .hex()
        .toString(),
    ).toEqual('#808080')
    expect(
      new Color('red')
        .mix('white')
        .hex()
        .toString(),
    ).toEqual('#ff8080')
  })

  test('Can mix with weight values', () => {
    expect(
      new Color('red')
        .mix('white', 0)
        .hex()
        .toString(),
    ).toEqual('#ffffff')
    expect(
      new Color('red')
        .mix('white', 0.1)
        .hex()
        .toString(),
    ).toEqual('#ffe6e6')
    expect(
      new Color('red')
        .mix('white', 0.2)
        .hex()
        .toString(),
    ).toEqual('#ffcccc')
    expect(
      new Color('red')
        .mix('white', 0.3)
        .hex()
        .toString(),
    ).toEqual('#ffb3b3')
    expect(
      new Color('red')
        .mix('white', 0.5)
        .hex()
        .toString(),
    ).toEqual('#ff8080')
    expect(
      new Color('red')
        .mix('white', 0.87)
        .hex()
        .toString(),
    ).toEqual('#ff2121')
    expect(
      new Color('red')
        .mix('white', 0.99)
        .hex()
        .toString(),
    ).toEqual('#ff0303')
  })
})
