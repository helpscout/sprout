import darken from '../darken'

test('Can darken a color to a specified value', () => {
  expect(darken('red', 20)).toEqual('#990000')
  expect(darken('#eee', 20)).toEqual('#bababa')
  expect(darken('#ff0000', 30)).toEqual('#660000')
  expect(darken('#dd0202', 37)).toEqual('#230000')
})

test('Can darken a color to a 0 value', () => {
  expect(darken('#fff', 0)).toEqual('#ffffff')
})
