/* @flow */

import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../environment';
import NavBar from '../components/NavBar';
import Main from '../components/Main';
import UrlsScroller from '../components/UrlsScroller';
import './UrlsPage.css';

const UrlsPage_viewerQuery = graphql`
  query UrlsPage_viewerQuery {
    viewer {
      ...UrlsScroller_viewer
    }
  }
`


const UrlsPage = () => (
  <QueryRenderer
    environment={environment}
    query={UrlsPage_viewerQuery}
    render={({error, props}) => {
      if (error) {
        return <div><h2>:(</h2>{error.message}</div>
      }
      if (!props || !props.viewer) {
        return <div>Loading...</div>;
      }
      return (
        <div className="UrlsPage">
          <NavBar />
          <Main>
            <div className="UrlsPage-main">
              <h2>Recent URLs</h2>
              <UrlsScroller viewer={props.viewer} />
            </div>
          </Main>
        </div>
      );
    }}
  />
);

export default UrlsPage;
