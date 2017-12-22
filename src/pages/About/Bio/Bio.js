import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Bio.scss';

export default class Bio extends Component {
  render() {
    return (
      <div className="bio-wrapper">
        <h1>You found an About page!</h1>
        <p>{this.props.text}</p>
      </div>
    );
  }
}
