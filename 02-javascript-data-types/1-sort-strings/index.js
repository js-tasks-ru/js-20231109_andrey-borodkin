/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

const LOCALE = ['ru', 'en'];
const OPTIONS = {caseFirst: 'upper'};

const sortAsc = (a, b) => a.localeCompare(b, LOCALE, OPTIONS);
const sortDesc = (a, b) => b.localeCompare(a, LOCALE, OPTIONS);

export function sortStrings(arr, param = 'asc') {

  return [...arr].sort(param === 'asc' ? sortAsc : sortDesc);
}
