/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathArray = path.split(".");
    
  return getter = (obj) => {
    let result = obj;
    
    for (const key of pathArray) {
      if (typeof result === 'object' && Object.hasOwn(result, key)) {
        result = result[key];
      } else {
        return;
      }
    }
    return result;
  };
}