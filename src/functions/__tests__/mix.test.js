import mix from '../mix'

describe('Mix', () => {
  test('Can mix using color names', () => {
    expect(mix('red', 'yellow')).toEqual('#ff8000')
    expect(mix('dodgerblue', 'yellow')).toEqual('#8fc880')
    expect(mix('black', 'white')).toEqual('#808080')
    expect(mix('red', 'white')).toEqual('#ff8080')
  })

  test('Can mix with weight values', () => {
    expect(mix('red', 'white', 0)).toEqual('#ffffff')
    expect(mix('red', 'white', 0.1)).toEqual('#ffe6e6')
    expect(mix('red', 'white', 0.2)).toEqual('#ffcccc')
    expect(mix('red', 'white', 0.3)).toEqual('#ffb3b3')
    expect(mix('red', 'white', 0.5)).toEqual('#ff8080')
    expect(mix('red', 'white', 0.87)).toEqual('#ff2121')
    expect(mix('red', 'white', 0.99)).toEqual('#ff0303')
  })
})
