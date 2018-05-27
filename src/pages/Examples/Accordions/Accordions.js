import React, { Component } from "react"
import DemoSection from "../DemoSection/DemoSection"

import { HeaderText } from "components"
import Monolith from "getmonolith"

export default class Accordions extends Component {
  componentDidMount() {
    Monolith.accordions().start()
  }

  componentWillUnmount() {
    Monolith.accordions().stop()
  }

  render() {
    return (
      <DemoSection id="modals-demo">
        <div className="row">
          <div className="xsmall-12 columns">
            <HeaderText>Accordion Menu</HeaderText>
            <p>Expand and collapse items in a menu.</p>
          </div>

          <div className="xsmall-12 columns">
            <div data-accordion id="accordion-1">
              <div data-accordion-item>
                <a href="#" data-accordion-button>
                  Accordion Button 1
                </a>
                <div data-accordion-content>
                  <p>
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-item>
                <a href="#" data-accordion-button>
                  Accordion Button 2
                </a>
                <div data-accordion-content>
                  <p>
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-item>
                <a href="#" data-accordion-button>
                  Accordion Button 3
                </a>
                <div data-accordion-content>
                  <p>
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="xsmall-12 columns">
            <div data-accordion id="accordion-2">
              <div data-accordion-item>
                <a href="#" data-accordion-button>
                  Accordion Button 1
                </a>
                <div data-accordion-content>
                  <p>
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-item>
                <a href="#" data-accordion-button>
                  Accordion Button 2
                </a>
                <div data-accordion-content>
                  <p>
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-item>
                <a href="#" data-accordion-button>
                  Accordion Button 3
                </a>
                <div data-accordion-content>
                  <p>
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DemoSection>
    )
  }
}
