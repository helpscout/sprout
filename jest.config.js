const jestConfig = require('@helpscout/zero/jest')

const coverageList = [
  'src/**/*.{js,jsx}',
  '!src/typings/**/*.{js,jsx}',
  '!src/utils/env.{js,jsx}',
  '!src/utils/warn.{js,jsx}',
]

module.exports = Object.assign({}, jestConfig, {
  collectCoverageFrom: []
    .concat(jestConfig.collectCoverageFrom)
    .concat(coverageList),
})
