import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.scss';

import Hand from '../assets/waving-hand-sign.png';

export default class Home extends Component {
  render() {
    return (
      <h1>
        Hello, World! <img src={Hand} />
      </h1>
    );
  }
}
