import React from 'react';

import { ScrollUpOnMount } from 'helpers';
import { Button, DemoSection } from 'components';

const Buttons = () => {
  return (
    <DemoSection>
      <ScrollUpOnMount />
      <div className="small-section grid">
        <div className="row">
          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Button Sizes
            </h3>
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="small">Small Button</Button>
            <Button href="#0" className="small button">Small Link Button</Button>
            <input className="small" type="button" value="Small Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button>Default Button</Button>
            <Button href="#0" className="button">Default Link Button</Button>
            <input type="button" value="Default Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="medium">Medium Button</Button>
            <Button href="#0" className="medium button">Medium Link Button</Button>
            <input className="medium" type="button" value="Medium Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="large">Large Button</Button>
            <Button href="#0" className="large button">Large Link Button</Button>
            <input className="large" type="button" value="Large Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="huge">Huge Button</Button>
            <Button href="#0" className="huge button">Huge Link Button</Button>
            <input className="huge" type="button" value="Huge Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Disabled State
            </h3>
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button disabled>Disabled Button</Button>
            <Button href="#0" className="disabled button">Disabled Link Button (visual only)</Button>
            <input disabled className="disabled" type="submit" value="Disabled Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Wide (block) Buttons
            </h3>
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="wide">Wide Button</Button>
            <Button href="#0" className="wide button">Wide Link Button</Button>
            <input className="wide" type="button" value="Wide Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Primary, Secondary, and Tertiary Buttons
            </h3>
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="primary">Primary Button</Button>
            <Button href="#0" className="primary button">Primary Link Button</Button>
            <input className="primary" type="button" value="Primary Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="secondary">Secondary Button</Button>
            <Button href="#0" className="secondary button">Secondary Link Button</Button>
            <input className="secondary" type="button" value="Secondary Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="tertiary">Tertiary Button</Button>
            <Button href="#0" className="tertiary button">Tertiary Link Button</Button>
            <input className="tertiary" type="button" value="Tertiary Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Status Buttons
            </h3>
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="warning">Warning Button</Button>
            <Button href="#0" className="warning button">Warning Link Button</Button>
            <input className="warning" type="button" value="Warning Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="success">Success Button</Button>
            <Button href="#0" className="success button">Success Link Button</Button>
            <input className="success" type="button" value="Success Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="destroy">Destroy Button</Button>
            <Button href="#0" className="destroy button">Destroy Link Button</Button>
            <input className="destroy" type="button" value="Destroy Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button className="notice">Notice Button</Button>
            <Button href="#0" className="notice button">Notice Link Button</Button>
            <input className="notice" type="button" value="Notice Input Button" />
          </div>

          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Inverted Buttons
            </h3>
          </div>

          <div className="xsmall-12 collapsed columns">
            <div className="xsmall-12 columns invert-block">
              <Button className="inverted">Inverted Button</Button>
              <Button href="#0" className="inverted button">Inverted Link Button</Button>
              <input className="inverted" type="button" value="Inverted Input Button" />
            </div>

            <div className="xsmall-12 columns invert-block">
              <Button className="inverted-outline">Inverted Outline Button</Button>
              <Button href="#0" className="inverted-outline button">Inverted Outline Link Button</Button>
              <input className="inverted-outline" type="button" value="Inverted Outline Input Button" />
            </div>
          </div>

          <div className="xsmall-12 collapsed columns">
            <h3 className="section-header">
              Links
            </h3>
          </div>

          <div className="xsmall-12 collapsed columns">
            <Button href="#0">This is a link!</Button>
          </div>

        </div>
      </div>
    </DemoSection>
  );
}

export default Buttons;
