import {gsm7ExtendedCharsRegex} from './utils';

/**
 * Count characters for an GSM-7 encoded string.
 *
 * @param {String} str
 * @return {Number} GSM-7 chars count
 */
export function countGSM7(str) {
  let total = str.length;
  total += ((str || '').match(gsm7ExtendedCharsRegex) || []).length;
  return total;
};

export default countGSM7;
