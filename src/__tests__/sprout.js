import { hello } from '../index'

test('Hello', () => {
  expect(hello()).toBeTruthy()
  expect(hello()).toBeTruthy()
})