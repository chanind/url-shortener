/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';
import {MemoryRouter} from 'react-router';
import {resetRelayEnvironment, sleep} from '../testHelpers';
import InfoPage from './InfoPage';

it('Shows info about a redirect', async () => {
  resetRelayEnvironment(() => Promise.resolve({
    data: {
      viewer: {
        urlByIdentifier: {
          id: '1234',
          identifier: 'ABC',
          destination: 'http://google.com',
          createdAt: 1234,
        }
      },
    },
  }));
  const wrapper = mount(
    <MemoryRouter>
      <InfoPage match={{params: {identifier: 'ABC'}}} />
    </MemoryRouter>
  );
  await sleep(10);
  wrapper.update();
  expect(wrapper.text()).toContain('http://localhost:3001/ABC');
  expect(wrapper.text()).toContain('http://google.com');
});
