/* @flow */

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import type {Url_url} from './__generated__/Url_url.graphql';
import {getShortUrl} from '../lib/urlUtils';
import './Url.css'

type Props = {
  url: Url_url,
}

const Url = ({ url }: Props) => (
  <div className='Url'>
    <div className='Url-shortLink'>
      <div className='Url-label'>Short link:</div>
      <a href={`/info/${url.identifier}`}>{getShortUrl(url.identifier)}</a>
    </div>
    <div className='Url-destination'>
      <div className='Url-label'>Destination:</div>
      <a href={url.destination} target='_blank'>{url.destination}</a>
    </div>
  </div>
);


export default createFragmentContainer(
  Url,
  {
    url: graphql`
      fragment Url_url on Url {
        id
        destination
        identifier
      }
    `,
  }
);
