/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

const LOCALE = ['ru', 'en'];
const OPTIONS = {caseFirst: 'upper'};

const ascendingSorting = (arr) => arr.sort((a, b) => a.localeCompare(b, LOCALE, OPTIONS));
const descendingSorting = (arr) => arr.sort((a, b) => b.localeCompare(a, LOCALE, OPTIONS));

export function sortStrings(arr, param = 'asc') {
  const newArray = [...arr];

  return param === 'asc' ? ascendingSorting(newArray) : descendingSorting(newArray);

}
