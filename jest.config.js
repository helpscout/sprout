const jestConfig = require('kcd-scripts/jest')

console.log(jestConfig)
module.exports = Object.assign(jestConfig, {
  displayName: 'library',
})