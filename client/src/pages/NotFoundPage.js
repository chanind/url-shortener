/* @flow */

import * as React from 'react';
import NavBar from '../components/NavBar';
import Main from '../components/Main';

const NotFoundPage = () => (
  <div className='NotFoundPage'>
    <NavBar />
    <Main>
      <h2>:(</h2>
      Not Found
    </Main>
  </div>
);

export default NotFoundPage;
