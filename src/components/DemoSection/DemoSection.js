import React, { Component } from 'react';
import './DemoSection.scss';

export default class DemoSection extends Component {
  getHeaderId() {
    return this.props.header.split(" ").join("_").toLowerCase();
  }

  render() {
    return (
      <div className="demo-section-wrapper small-section grid">
        <div className="row">
          <div className="xsmall-12 columns">
            <h3 id={this.getHeaderId()} className="section-header">
              {this.props.header}
            </h3>
          </div>
        </div>

        <div className="row">
          <div className="column">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
