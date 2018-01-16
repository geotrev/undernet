import React from 'react';
import './Nav.scss';

import { Github, Twitter } from 'react-feather';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-wrapper">
      <ul>
        <li className="left">
          <NavLink exact to='/'>Home</NavLink>
        </li>
        <li className="right">
          <ul>
            <li>
              <a className="has-feather" href='https://www.twitter.com/monolithcss'>
                <Twitter />
              </a>
            </li>
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
