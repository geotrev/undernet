import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

import { Nav, Footer } from 'components';
import { Home, Docs, Examples } from 'pages';

// favicons
import 'assets/icons/favicon.ico';
import 'assets/icons/favicon-32x32.png';
// apple touch icons
import 'assets/icons/apple-touch-icon-57x57.png';
import 'assets/icons/apple-touch-icon-60x60.png';
import 'assets/icons/apple-touch-icon-72x72.png';
import 'assets/icons/apple-touch-icon-76x76.png';
import 'assets/icons/apple-touch-icon-114x114.png';
import 'assets/icons/apple-touch-icon-120x120.png';
import 'assets/icons/apple-touch-icon-144x144.png';
import 'assets/icons/apple-touch-icon-152x152.png';
// microsoft icons
import 'assets/icons/mstile-70x70.png';
import 'assets/icons/mstile-144x144.png';
import 'assets/icons/mstile-150x150.png';
import 'assets/icons/mstile-310x150.png';
import 'assets/icons/mstile-310x310.png';
// pwa icons
import 'assets/icons/icon-96x96.png';
import 'assets/icons/icon-128x128.png';
import 'assets/icons/icon-192x192.png';
import 'assets/icons/icon-384x384.png';
import 'assets/icons/icon-512x512.png';

export default class App extends Component {
  render() {
    return (
      <div id="site">
        <header>
          <Nav />
        </header>
        <main>
          <Route exact path='/' component={ Home } />
          <Route path='/docs' component={ Docs } />
          <Route path='/examples/' component={ Examples } />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    )
  }
}
