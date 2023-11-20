/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr = []) {
  let tempArray = [];
  //   if (!(arr instanceof Array)) {
  //     return tempArray; 
  //   }
  for (const elem of arr) {
    if (!tempArray.includes(elem)) {
      tempArray.push(elem);
    }
  }
  return tempArray;
}


export const uniq2 = (arr) => Array.isArray(arr) ? arr.reduce((acc, item) => {
  if (!acc.includes(item)) {
    acc.push(item);
  }
  return acc;
}, []) : [] ;

export const uniq3 = (arr = []) => Array.from(new Set(arr));