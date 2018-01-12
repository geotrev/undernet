import React, { Component } from 'react';
import './Nav.scss';

import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav-wrapper">
        <ul>
          <li> 
            <NavLink activeClassName="selected" exact to='/'>Home</NavLink> 
          </li>
          <li> 
            <NavLink activeClassName="selected" to='/docs'>Docs</NavLink> 
          </li>
        </ul>
      </nav>
    );
  }
}
