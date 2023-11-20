/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
// export function createGetter(path) {
//   const pathArray = path.split(".");
    
//   return getter = (obj) => {

//     for (const key of pathArray) {
//       if (obj && obj.hasOwnProperty(key)) {
//         obj = obj[key];
//       } else {
//         return;
//       }
//     }
//     return obj;
//   };
// }

export function createGetter(path) {
  const a = path.split(".");
  return function (o) {
    return a.reduce((o, k) => (o && k ? o[k] : undefined), o);
  };
}