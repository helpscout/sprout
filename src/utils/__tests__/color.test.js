import {getAlphaValue} from '../color'

describe('getAlphaValue', () => {
  test('Auto-fixes non-numerical values', () => {
    expect(getAlphaValue('nope')).toBe(1)
    expect(getAlphaValue({})).toBe(1)
    expect(getAlphaValue(undefined)).toBe(1)
    expect(getAlphaValue([])).toBe(1)
  })

  test('Can handle 0 values', () => {
    expect(getAlphaValue(0)).toBe(0)
  })

  test('Can handle float values', () => {
    expect(getAlphaValue(0.1)).toBe(0.1)
    expect(getAlphaValue(0.153)).toBe(0.153)
  })
})
