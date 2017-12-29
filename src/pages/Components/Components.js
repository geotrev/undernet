import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Components.scss';

import Overview from './Overview/Overview';

export const Components = () => {
  return (
    <div id="components">
      <Overview text="Woohoo, you did it." />
    </div>
  );
}
