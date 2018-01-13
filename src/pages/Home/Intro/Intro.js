import React, { Component } from 'react';
import './Intro.scss';

export default class Intro extends Component {
  render() {
    return (
      <div className="intro-wrapper row">
        <div className="column">
          <h1>The core of your text front-end project.</h1>
          <p>{this.props.greeting}</p>
        </div>
      </div>
    );
  }
}
