/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathArray = path.split(".");
    
  return getter = (obj) => {
    let tempObj = obj;

    for (const key of pathArray) {
      if (tempObj && tempObj.hasOwnProperty(key)) {
        tempObj = tempObj[key];
      } else {
        return undefined;
      }
    }
    return tempObj;
  };
}
