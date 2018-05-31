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
            <div data-accordion="accordion-1">
              <div data-accordion-expanded="true">
                <a href="#" id="accordion-button-1" data-accordion-button>
                  Accordion Button 1
                </a>
                <div aria-labelledby="accordion-button-1" data-accordion-content="visible">
                  <p>
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <a href="#" id="accordion-button-2" data-accordion-button>
                  Accordion Button 2
                </a>
                <div aria-labelledby="accordion-button-2" data-accordion-content="hidden">
                  <p>
                    Nostrud enim qui ex sint incididunt aliquip ex laborum. Dolore velit Lorem
                    consectetur magna non eu incididunt ex irure cillum consequat nisi. Fugiat nisi
                    sunt amet adipisicing non sit ipsum ad pariatur do elit est officia magna. Enim
                    deserunt duis irure do cupidatat laboris nostrud sint nulla nulla.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <a href="#" id="accordion-button-3" data-accordion-button>
                  Accordion Button 3
                </a>
                <div aria-labelledby="accordion-button-3" data-accordion-content="hidden">
                  <p>
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="xsmall-12 columns">
            <p>Expand multiple rows at once.</p>

            <div data-accordion="accordion-2" data-accordion-toggle-multiple>
              <div data-accordion-expanded="false">
                <a href="#" id="accordion-button-4" data-accordion-button>
                  Accordion Button 4
                </a>
                <div aria-labelledby="accordion-button-4" data-accordion-content="hidden">
                  <p>
                    Nostrud enim qui ex sint incididunt aliquip ex laborum. Dolore velit Lorem
                    consectetur magna non eu incididunt ex irure cillum consequat nisi. Fugiat nisi
                    sunt amet adipisicing non sit ipsum ad pariatur do elit est officia magna. Enim
                    deserunt duis irure do cupidatat laboris nostrud sint nulla nulla.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <a href="#" id="accordion-button-5" data-accordion-button>
                  Accordion Button 5
                </a>
                <div aria-labelledby="accordion-button-5" data-accordion-content="hidden">
                  <p>
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <a href="#" id="accordion-button-6" data-accordion-button>
                  Accordion Button 6
                </a>
                <div aria-labelledby="accordion-button-6" data-accordion-content="hidden">
                  <p>
                    Nostrud enim qui ex sint incididunt aliquip ex laborum. Dolore velit Lorem
                    consectetur magna non eu incididunt ex irure cillum consequat nisi. Fugiat nisi
                    sunt amet adipisicing non sit ipsum ad pariatur do elit est officia magna. Enim
                    deserunt duis irure do cupidatat laboris nostrud sint nulla nulla.
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
