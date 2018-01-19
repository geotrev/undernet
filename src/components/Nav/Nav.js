import React from 'react';
import './Nav.scss';

import Logo from '../../assets/images/mono-logo.png'
import { Github, Twitter } from 'react-feather';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-wrapper fluid grid">
      <ul className="row collapsed">
        <li className="small-6 xsmall-12 columns">
          <NavLink exact to='/'><img height="30px" width="auto" src={Logo} alt="Monolith CSS logo"/></NavLink>
        </li>
        <li className="small-6 xsmall-12 columns">
          <ul className="row">
            <li>
              <a className="has-feather" href='https://www.twitter.com/monolithcss'>
                <Twitter />
              </a> </li>
            <li>
              <a className="has-feather" href='https://www.github.com/geotrev/monolith'>
                <Github />
              </a>
            </li>
            <li>
              <NavLink activeClassName="selected" to='/docs/overview'>
                Docs
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
