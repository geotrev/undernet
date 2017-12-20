import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './FeatureImage.scss';

import Hand from '../../../assets/waving-hand-sign.png';

export default class FeatureImage extends Component {
  render() {
    return <span><img src={Hand} /></span>;
  }
}
