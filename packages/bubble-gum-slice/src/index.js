import set from '../../bubble-gum-set/src';
import get from '../../bubble-gum-get/src';

/**
 * Slice the object generating a new object
 *
 * @alias module:bubble-gum-tools.slice
 * @example
 *
 * ```javascript
 *
 * const slice = require('bubble-gum-tools').slice;
 *
 * const target = {
 *   root: { foo: 'bar' },
 *   arr: [[['baz']]],
 * };
 *
 * const sliced1 = slice(target, [{
 *   path: ['root', 'foo']
 * }]);
 * console.log(sliced1); // => { root: { foo: 'bar' } }
 *
 * const sliced2 = slice(target, [{
 *   path: ['root', 'foo'],
 *   newPath: ['bar'],
 * }]);
 * console.log(sliced2); // => { bar: 'bar' }
 *
 * const sliced3 = slice(target, [{
 *   path: ['root', 'foo'],
 *   newPath: [0],
 * }]);
 * console.log(sliced3); // => { '0': 'bar' }
 *
 * const sliced4 = slice(target, [{
 *   path: ['arr', 0, 0, 0],
 *   newPath: ['baz'],
 * }, {
 *   path: ['root', 'foo'],
 *   newPath: ['bar'],
 * }]);
 * console.log(sliced4); // => { baz: 'baz', bar: 'bar' }
 *
 * ```
 *
 * @param {Object|Array} target - object target
 * @param {Array.Object} config - Array with the configuration of the slice function
 * @param {Array} config[].path - Array path to the property to be sliced
 * @param {Array} config[].newPath - Array path to the property in the new object if it is undefined, it will have the same value as the config[].path
 * @return {Object} splitObject - Object with new values
 */
export default function slice(target, config) {
  return config.reduce((splitObject, { path, newPath }) => {
    const property = get(target, path);
    if (property === undefined) {
      return splitObject;
    }
    set(splitObject, (newPath || path), property);
    return splitObject;
  }, {});
};
