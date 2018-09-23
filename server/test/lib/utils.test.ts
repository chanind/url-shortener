import { describe, it } from 'mocha';
import { expect } from 'chai';
import { numToSafeAlphaNum } from '../../src/lib/utils';

describe('numToSafeAlphaNum', () => {
  it('turns a number into an alphanum string', () => {
    expect(numToSafeAlphaNum(133)).to.equal('MH');
    expect(numToSafeAlphaNum(99239)).to.equal('T3MJ');
    expect(numToSafeAlphaNum(2)).to.equal('D');
  });
});
