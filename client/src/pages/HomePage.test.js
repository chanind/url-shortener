/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';
import {resetRelayEnvironment, sleep} from '../testHelpers';
import HomePage from './HomePage';

it('Renders the homepage', () => {
  const wrapper = shallow(<HomePage.WrappedComponent />);
  expect(wrapper.find('.HomePage-header')).toHaveLength(1);
});

it('Creates URLs on the server', async () => {
  const pushHistory = jest.fn();
  const wrapper = shallow(<HomePage.WrappedComponent history={{push: pushHistory}} />);
  resetRelayEnvironment(() => Promise.resolve({
    data: {
      createUrl: {
        url: {
          id: '1234',
          identifier: 'AAA',
          destination: 'http://google.com',
          createdAt: 1234,
        },
      },
    },
  }));
  wrapper.find('.HomePage-shortenInput').simulate('change', {target: {value: 'http://google.com'}});
  wrapper.find('form').simulate('submit');
  await sleep(10);
  expect(pushHistory).toHaveBeenCalledWith('/info/AAA');
});
