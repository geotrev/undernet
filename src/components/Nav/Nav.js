import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Nav.scss';

import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <nav className="intro-wrapper nav">
        <ul className="nav-list">
          <li className="nav-item"> 
            <NavLink activeClassName="selected" exact to='/'>Home</NavLink> 
          </li>
          <li className="nav-item"> 
            <NavLink activeClassName="selected" to='/components'>Components</NavLink> 
          </li>
        </ul>
      </nav>
    );
  }
}
