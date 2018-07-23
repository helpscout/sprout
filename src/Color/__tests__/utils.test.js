import Color from '../index'
import {colorInstanceToString} from '../utils'

describe('colorInstanceToString', () => {
  test('Can retrieve an rgba string', () => {
    const c = new Color('#000')
    c.setMode('rgba')

    expect(colorInstanceToString(c)).toEqual('rgba(0, 0, 0, 1)')
  })

  test('Mode: Falls back to HEX if invalid mode', () => {
    const c = new Color('#000')
    c.setMode('nope')

    expect(colorInstanceToString(c)).toEqual('#000000')
  })
})
