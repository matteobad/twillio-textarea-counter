import detectEncoding from '../src/detectEncoding';
import {gsm7Chars, gsm7ExtendedChars} from '../src/utils';

const GSM7 = 'GSM-7';
const UCS2 = 'UCS-2';

// Tests against standard GSM-7 chars
describe('Standard GSM-7 character set tests', () => {
  test('Standard GSM-7 set should contain 128 characters.', () => {
    expect(gsm7Chars.length).toBe(128);
  });

  [...gsm7Chars].forEach((c) => {
    test(`Character: ${c} should be GSM-7`, () => {
      expect(detectEncoding(c)).toBe(GSM7);
    });
  });
});

// Tests against extended GSM-7 chars
describe('Extended GSM-7 character set tests', () => {
  test('Extended GSM-7 set should contain 9 characters.', () => {
    expect(gsm7ExtendedChars.length).toBe(9);
  });

  [...gsm7ExtendedChars].forEach((c) => {
    test(`Character: ${c} should be GSM-7.`, () => {
      expect(detectEncoding(c)).toBe(GSM7);
    });
  });
});

// Tests against non GSM-7 Extended chars
describe('Unicode character tests', () => {
  test('Character: È should be USC-2.', () => {
    expect(detectEncoding('È')).toBe(UCS2);
  });
});
