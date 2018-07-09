import lighten from '../lighten'

test('Can lighten a color to a specified value', () => {
  expect(lighten('red', 20)).toEqual('#ff6565')
  expect(lighten('black', 20)).toEqual('#333333')
  expect(lighten('#ff0000', 30)).toEqual('#ff9999')
  expect(lighten('#dd0202', 37)).toEqual('#fe9f9f')
})

test('Can lighten a color to a 0 value', () => {
  expect(lighten('#000', 0)).toEqual('#000000')
})
