import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Article } from 'components';
import md from 'articles/Download.md';

export default class Download extends Component {
  render() {
    return (
      <div className="download-wrapper row">
        <div class="column">
          <Article>{md}</Article>
        </div>
      </div>
    );
  }
}
