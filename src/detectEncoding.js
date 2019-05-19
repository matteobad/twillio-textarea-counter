/**
 *
 *
 * @param {String} str
 * @return {String} encoding
 */
export function detectEncoding(str) {
  // eslint-disable-next-line max-len
  const regex = new RegExp('[^A-Za-z0-9 \r\n@£$¥!\"#$%&amp;\'\(\)*\+,_.\/:;&lt;=&gt;?^{}\\\[~\]]');
  return !str.match(regex) ? 'GSM-7' : 'UCS-2';
}

export default detectEncoding;
