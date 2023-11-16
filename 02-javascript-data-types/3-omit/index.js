/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const newFields = [...fields];
  let tempObj = {};
    
  for (const [key, value] of Object.entries(obj)) {
    if (!newFields.includes(key)) {
      tempObj[key] = value;
    }
  }
  return Object.assign({}, tempObj);
};
