import padStart from 'lodash.padstart';
import random from 'lodash.random';
import { createModel } from './base';
import { numToSafeAlphaNum } from '../lib/utils';

const Url = createModel('Url', {
  tableName: 'urls',
  generateIdentifier() {
    if (!this.id) throw new Error('Must have an ID before creating an identifier');
    const identifierSuffix = padStart(random(0, 999).toString(), 3, '0');
    const identifierNum = parseInt(this.id.toString() + identifierSuffix, 10);
    this.set('identifier', numToSafeAlphaNum(identifierNum));
  },
});

export default Url;
