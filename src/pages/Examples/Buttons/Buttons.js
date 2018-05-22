import React from "react"
import DemoSection from "../DemoSection/DemoSection"

import { Button, HeaderText } from "components"

const Buttons = () => {
  return (
    <DemoSection id="buttons-demo">
      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Button Sizes</HeaderText>
        </div>

        <div className="xsmall-12 columns">
          <Button className="small">Small Button</Button>
        </div>

        <div className="xsmall-12 columns">
          <Button>Default Button</Button>
        </div>

        <div className="xsmall-12 columns">
          <Button className="medium">Medium Button</Button>
        </div>

        <div className="xsmall-12 columns">
          <Button className="large">Large Button</Button>
        </div>

        <div className="xsmall-12 columns">
          <Button className="huge">Huge Button</Button>
        </div>
      </div>

      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Disabled State</HeaderText>
        </div>
        <div className="xsmall-12 columns">
          <Button disabled>Disabled Button</Button>
        </div>
      </div>

      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Wide (block) Button</HeaderText>
        </div>
        <div className="xsmall-12 columns">
          <Button className="wide">Wide Button</Button>
        </div>
      </div>

      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Primary, Secondary, and Tertiary Buttons</HeaderText>
        </div>
        <div className="xsmall-12 columns">
          <Button className="primary">Primary Button</Button>
        </div>

        <div className="xsmall-12 columns">
          <Button className="secondary">Secondary Button</Button>
        </div>

        <div className="xsmall-12 columns">
          <Button className="tertiary">Tertiary Button</Button>
        </div>
      </div>

      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Status Buttons</HeaderText>
        </div>

        <div className="xsmall-12 columns">
          <Button className="warning">Warning Button</Button>
        </div>

        <div className="xsmall-12 columns">
          <Button className="success">Success Button</Button>
        </div>

        <div className="xsmall-12 columns">
          <Button className="destroy">Destroy Button</Button>
        </div>

        <div className="xsmall-12 columns">
          <Button className="notice">Notice Button</Button>
        </div>
      </div>

      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Inverted Buttons</HeaderText>
        </div>

        <div className="xsmall-12 columns">
          <div className="xsmall-12 columns invert-block">
            <Button className="inverted">Inverted Button</Button>
          </div>

          <div className="xsmall-12 columns invert-block">
            <Button className="inverted-outline">Inverted Outline Button</Button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Links</HeaderText>
        </div>

        <div className="xsmall-12 columns">
          <Button href="#0">This is a link!</Button>
        </div>
      </div>
    </DemoSection>
  )
}

export default Buttons
