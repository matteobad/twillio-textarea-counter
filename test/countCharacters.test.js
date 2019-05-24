import countCharacters from '../src/countCharacters';

const GSM7 = 'GSM-7';
// const UCS2 = 'UCS-2';

const testSentences = [
  {phrase: '', lenght: 0, encoding: GSM7},
  {phrase: 'Hello World!', lenght: 12, encoding: GSM7},
  {phrase: '[Extended]', lenght: 12, encoding: GSM7},
  {phrase: 'Standard', lenght: 8, encoding: GSM7},
  {phrase: '{ops} € boom', lenght: 15, encoding: GSM7},
];

// Tests against standard GSM-7 strings.
describe('Standard GSM-7 encoded strings tests', () => {
  testSentences.forEach((obj) => {
    test(`String: '${obj.phrase}' should be '${obj.lenght}'`, () => {
      expect(countCharacters(obj.phrase, obj.encoding)).toBe(obj.lenght);
    });
  });
});
