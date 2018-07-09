// @flow
export const isNumber = (o: ?number): boolean => typeof o === 'number'
export const isObject = (o: ?Object): boolean => typeof o === 'object'
export const isString = (o: ?string): boolean => typeof o === 'string'
export const isDefined = (o: ?any): boolean => o !== undefined
