import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import hand from './assets/waving-hand-sign.png';

const App = () => {
  return (
    <h1>
      Hello, World!
      <img src={hand} />
    </h1>
  );
}

ReactDOM.render( <App />, document.getElementById('root') );
