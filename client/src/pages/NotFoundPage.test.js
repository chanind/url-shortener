/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from './NotFoundPage';

it('Renders the not found page', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper.find('h2').text()).toBe(':(');
});
