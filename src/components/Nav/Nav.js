import React, { Component } from 'react';
import './Nav.scss';

import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav-wrapper">
        <ul>
          <li> 
            <NavLink exact to='/'>Home</NavLink> 
          </li>
          <li>
            <ul>
              <li> 
                <a href='https://www.twitter.com/monolithcss'>Twitter</a> 
              </li>
              <li>
                <a href='https://www.github.com/geotrev/monolith'>Github</a> 
              </li>
              <li> 
                <NavLink activeClassName="selected" to='/docs'>Docs</NavLink> 
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}
