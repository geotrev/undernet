import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

// favicons
import 'images/favicon.ico';
import 'images/favicon-32x32.png';
// apple touch icons
import 'images/apple-touch-icon-57x57.png';
import 'images/apple-touch-icon-60x60.png';
import 'images/apple-touch-icon-72x72.png';
import 'images/apple-touch-icon-76x76.png';
import 'images/apple-touch-icon-114x114.png';
import 'images/apple-touch-icon-120x120.png';
import 'images/apple-touch-icon-144x144.png';
import 'images/apple-touch-icon-152x152.png';
// microsoft icons
import 'images/mstile-70x70.png';
import 'images/mstile-144x144.png';
import 'images/mstile-150x150.png';
import 'images/mstile-310x150.png';
import 'images/mstile-310x310.png';

import { Nav, Footer } from 'components';
import { Home, Docs, Examples } from 'pages';

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
          <Route path='/examples/' component={ Examples } />
        </main>
        <footer>
          <Route path='/' component={ Footer } />
        </footer>
      </div>
    )
  }
}
