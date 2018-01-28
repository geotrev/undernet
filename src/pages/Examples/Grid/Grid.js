import React from 'react';

import { ScrollUpOnMount } from 'helpers';
import { DemoSection } from 'components';

const Grid = () => {
  return (
    <DemoSection>
      <ScrollUpOnMount />
      <div className="small-section grid">
        <div className="row">
          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Grid
            </h3>
            <p>Resize to see columns change</p>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <div className="content"></div>
          </div>
          <div className="column">
            <div className="content"></div>
          </div>
          <div className="column">
            <div className="content"></div>
          </div>
          <div className="column">
            <div className="content"></div>
          </div>
          <div className="column">
            <div className="content"></div>
          </div>
        </div>
        <div className="row">
          <div className="xlarge-11 large-1 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-1 large-11 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-10 large-2 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-2 large-10 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-9 large-3 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-3 large-9 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-8 large-4 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-4 large-8 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-7 large-5 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-5 large-7 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-6 large-6 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
          <div className="xlarge-6 large-6 medium-3 small-4 xsmall-12 columns">
            <div className="content"></div>
          </div>
        </div>
      </div>

      <div className="small-section grid">
        <div className="row">
          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Grid Reordering
            </h3>
            <p>Resize to see colored blocks change</p>
          </div>
        </div>

        <div className="row">
          <div className="xsmall-4 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-4 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-4 columns small-order-1 medium-order-3 large-order-2">
            <div className="content red"></div>
          </div>
          <div className="xsmall-4 columns small-order-3 medium-order-2 large-order-1">
            <div className="content blue"></div>
          </div>
          <div className="xsmall-4 columns small-order-2 medium-order-1 large-order-3">
            <div className="content green"></div>
          </div>
          <div className="xsmall-4 columns">
            <div className="content"></div>
          </div>
        </div>
      </div>

      <div className="small-section grid">
        <div className="row">
          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Grid Offsets
            </h3>
          </div>
        </div>

        <div className="row">
          <div className="xsmall-1 xsmall-offset-11 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-2 xsmall-offset-10 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-3 xsmall-offset-9 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-4 xsmall-offset-8 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-5 xsmall-offset-7 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-6 xsmall-offset-6 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-7 xsmall-offset-5 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-8 xsmall-offset-4 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-9 xsmall-offset-3 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-10 xsmall-offset-2 columns">
            <div className="content"></div>
          </div>
          <div className="xsmall-11 xsmall-offset-1 columns">
            <div className="content"></div>
          </div>
          <div className="column">
            <div className="content"></div>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

export default Grid;
