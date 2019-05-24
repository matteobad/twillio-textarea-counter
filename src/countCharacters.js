/**
 * Count characters for a given string based on a specified
 * character encoding.
 *
 * @param {String} str
 * @param {String} encoding
 * @return {Number} GSM-7 chars count
 */
export function countCharacters(str, encoding) {
  if (encoding === 'UCS-2') return str.length;
  let total = str.length;
  total += ((str || '').match(/[|^{}[~\]\\\u20AC]/gm) || []).length;
  return total;
};

export default countCharacters;
