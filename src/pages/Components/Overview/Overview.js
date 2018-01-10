import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Overview.scss';

import { Article } from 'components';
import md from 'articles/Home.md';

export default class Overview extends Component {
  render() {
    return (
      <div className="overview-wrapper row">
        <div class="column">
          <Article>{md}</Article>
        </div>
      </div>
    );
  }
}
