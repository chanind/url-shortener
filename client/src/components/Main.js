/* @flow */

import React from 'react';
import type { Node } from 'react';
import './Main.css'

type Props = {
  children: Node,
};

const Main = ({ children }: Props) => (
  <div className='Main'>
    {children}
  </div>
);

export default Main;
