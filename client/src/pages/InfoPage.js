/* @flow */

import * as React from 'react';
import { Match } from 'react-router-dom';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../environment';
import NavBar from '../components/NavBar';
import Main from '../components/Main';
import './InfoPage.css';

type Props = {
  match: Match,
};

const infoPage_urlQuery = graphql`
  query InfoPage_urlQuery($identifier: String!) {
    viewer {
      urlByIdentifier(identifier: $identifier) {
        id
        destination
        createdAt
      }
    }
  }
`;

const InfoPage = ({ match }: Props) => (
  <div className='InfoPage'>
    <NavBar />
    <Main>
      <div className='InfoPage-main'>
        <QueryRenderer
          environment={environment}
          query={infoPage_urlQuery}
          variables={{ identifier: match.params.identifier }}
          render={({error, props}) => {
            if (error) return <div><h2>:(</h2>{error.message}</div>;
            if (!props) return <span>Loading...</span>;
            if (props && !props.viewer && !props.viewer.userByIdentifier) {
              return <h2>Could not find a URL with that identifier</h2>;
            }
            const { destination } = props.viewer.urlByIdentifier;
            return (
              <React.Fragment>
                <h1 className='InfoPage-shortUrl'>
                  <div className='InfoPage-label'>Short URL:</div>
                  http://{process.env.REACT_APP_API_HOST || ''}/{match.params.identifier}
                </h1>
                <div className='InfoPage-destination'>
                  <div className='InfoPage-label'>Destination:</div>
                  <a href={destination} target='_blank'>{destination}</a>
                </div>
              </React.Fragment>
            )
          }}
        />
      </div>
    </Main>
  </div>
)

export default InfoPage;
