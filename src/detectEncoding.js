/**
 * Detect if Character or String is either:
 * GSM-7 encoded;
 * UCS-2 encoded;
 *
 * @param {String} str
 * @return {String} encoding
 */
export function detectEncoding(str) {
  // eslint-disable-next-line max-len
  const regex = new RegExp('^[A-Za-z0-9 \\r\\n@£$¥èéùìòÇØøÅå\u001B\u00A4\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!<>\"#$%&amp;\'()*+,\-./:;&lt;=&gt;?¡ÄÖÑÜ§¿äöñüà^{}\\\\\\[~\\]|\u20AC]*$');
  return !str.match(regex) ? 'UCS-2' : 'GSM-7';
}

export default detectEncoding;
