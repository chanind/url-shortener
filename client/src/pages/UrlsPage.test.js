/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';
import {MemoryRouter} from 'react-router';
import {resetRelayEnvironment, sleep} from '../testHelpers';
import UrlsPage from './UrlsPage';

it('Shows a list of all urls', async () => {
  resetRelayEnvironment(() => Promise.resolve({
    data: {
      viewer: {
        allUrls: {
          edges: [
            {
              node: {
                id: '2',
                identifier: 'ABC',
                destination: 'http://google.com',
                createdAt: 1234,
                __typename: 'Url',
              },
              cursor: 'adfdsfs',
            },
            {
              node: {
                id: '1',
                identifier: 'ZZZ',
                destination: 'http://baidu.com',
                createdAt: 1234,
                __typename: 'Url',
              },
              cursor: 'sdfdsfs',
            },
          ],
          pageInfo: {
            endCursor: 'sdfdsfs',
            hasNextPage: false,
          }
        },
      },
    },
  }));
  const wrapper = mount(
    <MemoryRouter>
      <UrlsPage />
    </MemoryRouter>
  );
  await sleep(10);
  wrapper.update();
  expect(wrapper.find('.Url')).toHaveLength(2);
  expect(wrapper.text()).toContain('http://google.com');
  expect(wrapper.text()).toContain('http://localhost:3001/ABC');
  expect(wrapper.text()).toContain('http://baidu.com');
  expect(wrapper.text()).toContain('http://localhost:3001/ZZZ');
});
