import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import '../public/favicon.ico';

import { Nav } from 'components';
import { Home, About } from 'pages';

export default class App extends Component {
  render() {
    return (
      <div id="site">
        <header>
          <Route path='/' component={ Nav } />
        </header>
        <main>
          <Route exact path='/' component={ Home } />
          <Route exact path='/about' component={ About } />
        </main>
      </div>
    )
  }
}
