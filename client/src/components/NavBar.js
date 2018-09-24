/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'


const NavBar = () => (
  <div className='NavBar'>
    <div className='NavBar-inner'>
      <div className="NavBar-leftLinks">
        <Link className='NavBar-brandLink' to='/'>Url Shortener</Link>
      </div>
      <div className="NavBar-rightLinks">
        <Link className='NavBar-link' to='/urls'>All URLs</Link>
        <Link className='NavBar-link' to='/'>Create a URL</Link>
      </div>
    </div>
  </div>
);

export default NavBar;
