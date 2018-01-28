import React from 'react';
import DemoSection from '../DemoSection/DemoSection';

import { HeaderText } from 'components';

const Type = () => {
  return (
    <DemoSection>
      <div className="small-section grid">
        <div className="row">
          <HeaderText>Headers</HeaderText>
        </div>

        <div className="row">
          <div className="xsmall-12 medium-6 columns">
            <h1>Header 1</h1>
          </div>
          <div className="xsmall-12 medium-6 columns">
            <h2>Header 2</h2>
          </div>
          <div className="xsmall-12 medium-6 columns">
            <h3>Header 3</h3>
          </div>
          <div className="xsmall-12 medium-6 columns">
            <h4>Header 4</h4>
          </div>
          <div className="xsmall-12 medium-6 columns">
            <h5>Header 5</h5>
          </div>
          <div className="xsmall-12 medium-6 columns">
            <h6>Header 6</h6>
          </div>
        </div>
      </div>

      <div className="small-section grid">
        <div className="row">
          <HeaderText> Paragraph & Inline Text </HeaderText>
        </div>

        <div className="row">
          <div className="xsmall-12 columns">
            <p><em>Smooth, thick and viscous on the palate,</em> with a full and robust body. <strong>For a moment,</strong> it's sweet and tropical, <code>then hops rush in and tear it all to shreds!</code> The lip-smacking hop profile roams all over the place, as a sticky pine and a slightly burnt resinous coating forms on the palate. Intensely spicy, with a big grape-fruity zest and a sugary, warming alcohol that smacks you upside the head for noticing it. Malt-wise, caramel and bread flavors clamor to be heard, but the hops entangle them and draw them back into the depths of the brew, where they die. Malt flavors are there, but they add sweetness and body versus anything distinct enough to challenge the hops.
            </p>
          </div>
        </div>
      </div>

      <div className="small-section grid">
        <div className="row">
          <HeaderText>Unordered & Ordered Lists</HeaderText>
        </div>

        <div className="row">
          <div className="xsmall-12 small-6 columns">
            <ul>
              <li>List Item</li>
              <li>List Item</li>
              <li>List Item</li>
            </ul>
          </div>
          <div className="xsmall-12 small-6 columns">
            <ol>
              <li>List Item</li>
              <li>List Item</li>
              <li>List Item</li>
            </ol>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

export default Type;
