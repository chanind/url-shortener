/* @flow */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {resetRelayEnvironment} from './testHelpers';

configure({ adapter: new Adapter() });

beforeEach(() => {
  resetRelayEnvironment();
});
