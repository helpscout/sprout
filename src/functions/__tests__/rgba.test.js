import rgba from '../rgba'

describe('rgba', () => {
  test('Converts color names to rgb', () => {
    expect(rgba('black')).toEqual('rgba(0, 0, 0, 1)')
    expect(rgba('white')).toEqual('rgba(255, 255, 255, 1)')
    expect(rgba('yellow')).toEqual('rgba(255, 255, 0, 1)')
    expect(rgba('dodgerblue')).toEqual('rgba(30, 144, 255, 1)')
  })

  test('Converts hex to rgb', () => {
    expect(rgba('#000000')).toEqual('rgba(0, 0, 0, 1)')
    expect(rgba('#ffffff')).toEqual('rgba(255, 255, 255, 1)')
    expect(rgba('#ff9900')).toEqual('rgba(255, 153, 0, 1)')
    expect(rgba('#00ff00')).toEqual('rgba(0, 255, 0, 1)')
  })

  test('Accpets rgb values', () => {
    expect(rgba('0,0,0')).toEqual('rgba(0, 0, 0, 1)')
    expect(rgba('255, 255, 255')).toEqual('rgba(255, 255, 255, 1)')
    expect(rgba('255, 153, 0')).toEqual('rgba(255, 153, 0, 1)')
    expect(rgba('0, 255,0')).toEqual('rgba(0, 255, 0, 1)')
  })

  test('Adds alpha value (number)', () => {
    expect(rgba('black', 0.5)).toEqual('rgba(0, 0, 0, 0.5)')
    expect(rgba('black', 0.21)).toEqual('rgba(0, 0, 0, 0.21)')
    expect(rgba('white', 0.21)).toEqual('rgba(255, 255, 255, 0.21)')
    expect(rgba('white', 0)).toEqual('rgba(255, 255, 255, 0)')
  })

  test('Adds alpha value (string)', () => {
    expect(rgba('black', '0.5')).toEqual('rgba(0, 0, 0, 0.5)')
    expect(rgba('black', '0.21')).toEqual('rgba(0, 0, 0, 0.21)')
    expect(rgba('white', '0.21')).toEqual('rgba(255, 255, 255, 0.21)')
    expect(rgba('white', '0')).toEqual('rgba(255, 255, 255, 0)')
  })

  test('Corrects alpha values over 1', () => {
    expect(rgba('black', 1)).toEqual('rgba(0, 0, 0, 1)')
    expect(rgba('black', 1.2)).toEqual('rgba(0, 0, 0, 1)')
    expect(rgba('black', 21)).toEqual('rgba(0, 0, 0, 1)')
  })

  test('Corrects alpha values under 0', () => {
    expect(rgba('black', 0)).toEqual('rgba(0, 0, 0, 0)')
    expect(rgba('black', -0.23)).toEqual('rgba(0, 0, 0, 0)')
    expect(rgba('black', -10)).toEqual('rgba(0, 0, 0, 0)')
  })

  test('Falls back to black', () => {
    expect(rgba()).toEqual('rgba(0, 0, 0, 1)')
  })
})
