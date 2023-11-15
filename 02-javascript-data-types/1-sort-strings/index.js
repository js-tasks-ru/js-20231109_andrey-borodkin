/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let newArray = [...arr];
  const locale = ['ru', 'en'];
  const options = {caseFirst: 'upper'};

  const ascendingSorting = (arr) => arr.sort((a, b) => a.localeCompare(b, locale, options));
  const descendingSorting = (arr) => arr.sort((a, b) => b.localeCompare(a, locale, options));
  
  return param === 'asc' ? ascendingSorting(newArray) : descendingSorting(newArray);

}
