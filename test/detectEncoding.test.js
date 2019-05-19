import detectEncoding from '../src/detectEncoding';
import {gsm7Chars, gsm7ExtendedChars} from '../src/utils';

const GSM7 = 'GSM-7';
const UCS2 = 'UCS-2';

// Test against standard GSM-7 chars
test('Standard character set to be GSM-7', () => {
  expect(detectEncoding(gsm7Chars)).toBe(GSM7);
});

// Test against extended GSM-7 chars
test('Extended character set to be GSM-7', () => {
  expect(detectEncoding(gsm7ExtendedChars)).toBe(GSM7);
});

test('"È" to be detected as USC-2 encoding.', () => {
  expect(detectEncoding('È')).toBe(UCS2);
});
