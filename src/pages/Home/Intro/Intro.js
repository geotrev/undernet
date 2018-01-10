import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Intro.scss';

export default class Intro extends Component {
  render() {
    return (
      <div className="intro-wrapper row">
        <div className="column">
          <h1>Hello there!</h1>
          <p>{this.props.greeting}</p>
        </div>
      </div>
    );
  }
}
