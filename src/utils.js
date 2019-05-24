// Standard Latin Characters
const standardLatinChars = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];

// Numbers
const numbersChars = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

// Punctuation
const punctuationChars = [
  '!', '#', ' ', '"', '%', '&', '\'', '(', ')', '*', ',', '.', '?',
  '+', '-', '/', ';', ':', '<', '=', '>', '¡', '¿', '_', '@',
];

// Currency
const currencyChars = [
  '$', '£', '¥', '\u00A4', // [UNTYPED] CURRENCY SIGN
];

// Accented Characters
const accentedChars = [
  'è', 'é', 'ù', 'ì', 'ò', 'Ç', 'Ø', 'ø', 'Æ', 'æ', 'ß', 'É', 'Å',
  'å', 'Ä', 'Ö', 'Ñ', 'Ü', '§', 'ä', 'ö', 'ñ', 'ü', 'à',
];

// Greek Characters
const greekChars = [
  '\u0394', // GREEK CAPITAL LETTER DELTA
  '\u03A6', // GREEK CAPITAL LETTER PHI
  '\u0393', // GREEK CAPITAL LETTER GAMMA
  '\u039B', // GREEK CAPITAL LETTER LAMBDA
  '\u03A9', // GREEK CAPITAL LETTER OMEGA
  '\u03A0', // GREEK CAPITAL LETTER PI
  '\u03A8', // GREEK CAPITAL LETTER PSI
  '\u03A3', // GREEK CAPITAL LETTER SIGMA
  '\u0398', // GREEK CAPITAL LETTER OMEGA
  '\u039E', // GREEK CAPITAL LETTER XI
];

// Other Miscellaneous Characters
const miscellaneousChars = [
  '\u001B', // ESCAPE
  '\n', // NEW LINE or LINE FEED
  '\r', // CARRIAGE RETURN
];

// GSM-7 extended char set
const extended = [
  '|', '^', '€', '{', '}', '[', ']', '\\', '~',
];

export const encodingLimits = {
  'GSM-7': {single: 160, multi: 153},
  'UCS-2': {single: 70, multi: 67},
};

// eslint-disable-next-line max-len
export const gsm7Chars = standardLatinChars.join('') + numbersChars.join('') + punctuationChars.join('') + currencyChars.join('') + accentedChars.join('') + greekChars.join('') + miscellaneousChars.join('');
// eslint-disable-next-line max-len
export const gsm7CharsRegex = RegExp('^[A-Za-z0-9 \\r\\n@£$¥èéùìòÇØøÅå\u001B\u00A4\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!<>\"#$%&amp;\'()*+,\-./:;&lt;=&gt;?¡ÄÖÑÜ§¿äöñüà^{}\\\\\\[~\\]|\u20AC]*$');

export const gsm7ExtendedChars = extended.join('');
export const gsm7ExtendedCharsRegex = RegExp('[|^{}[~\]\\\u20AC]', 'gm');
