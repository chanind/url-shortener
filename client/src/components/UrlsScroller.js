/* @flow */

import * as React from 'react';
import {createPaginationContainer, graphql} from 'react-relay';
import type {RelayProp} from 'react-relay';
import InfiniteScroll from 'react-infinite-scroller';
import type {UrlsScroller_viewer} from './__generated__/UrlsScroller_viewer.graphql.js';
import Url from './Url';
import './UrlsScroller.css';

type Props = {
  relay: RelayProp,
  viewer: UrlsScroller_viewer,
};

const UrlsScroller = ({ relay, viewer }: Props) => (
  <div className='UrlsScroller'>
    <InfiniteScroll
      pageStart={1}
      loadMore={relay.loadMore}
      hasMore={relay.hasMore()}
      initialLoad={false}
      loader={<span key='loading'>Loading...</span>}
    >
      {viewer.allUrls.edges && viewer.allUrls.edges.length > 0 ? null : (
        <div>No URLs found!</div>
      )}
      {viewer.allUrls.edges && viewer.allUrls.edges.filter(Boolean).map(edge => edge.node && (
        <div className="UrlsScroller-url" key={edge.node.id}>
          <Url url={edge.node} />
        </div>
      ))}
    </InfiniteScroll>
  </div>
)

export default createPaginationContainer(
  UrlsScroller,
  {
    viewer: graphql`
      fragment UrlsScroller_viewer on Viewer
      @argumentDefinitions(
        count: {type: "Int", defaultValue: 25}
        cursor: {type: "String"}
      ) {
        allUrls(
          first: $count
          after: $cursor
        ) @connection(key: "UrlsScroller_allUrls") {
          edges {
            node {
              id
              ...Url_url
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps: (props) => props.viewer.allUrls,
    getVariables: (props, {count, cursor}) => ({count, cursor}),
    query: graphql`
      query UrlsScrollerQuery(
        $count: Int!
        $cursor: String
      ) {
        viewer: viewer {
          ...UrlsScroller_viewer @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  }
);
