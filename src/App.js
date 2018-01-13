import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import '../public/favicon.ico';

import { Nav } from 'components';
import { Home, Docs } from 'pages';

export default class App extends Component {
  render() {
    return (
      <div id="site">
        <header>
          <Route path='/' component={ Nav } />
        </header>
        <main>
          <Route exact path='/' component={ Home } />
          <Route path='/docs' component={ Docs } />
        </main>
      </div>
    )
  }
}
