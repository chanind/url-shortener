const alphaNumChars = 'BCDFGHJKMNPQRSTVWXY356789';
// turns the number into a compact string that can't contain bad words or ambiguous chars
export const numToSafeAlphaNum = (num: number) => {
  const base = alphaNumChars.length;
  let remainder = num;
  let result = '';
  while (remainder > base) {
    result += alphaNumChars[remainder % base];
    remainder = Math.floor(remainder / base);
  }
  result += alphaNumChars[remainder];
  return result;
};
