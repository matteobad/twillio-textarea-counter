import {gsm7CharsRegex} from './utils';

/**
 * Detect if Character or String is either:
 * GSM-7 encoded;
 * UCS-2 encoded;
 *
 * @param {String} str
 * @return {String} encoding
 */
export function detectEncoding(str) {
  return !str.match(gsm7CharsRegex) ? 'UCS-2' : 'GSM-7';
}

export default detectEncoding;
