import React, { Component } from "react"
import DemoSection from "../DemoSection/DemoSection"

import { HeaderText } from "components"
import Monolith from "getmonolith"

export default class Accordions extends Component {
  componentDidMount() {
    Monolith.accordions().start()
    Monolith.accordions().stop()
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
            <p>Toggle a single item in a menu.</p>
          </div>

          <div className="xsmall-12 columns">
            <div data-accordion="accordion-1">
              <div data-accordion-expanded="true">
                <h5 id="accordion-button-1">
                  <button
                    data-accordion-parent="accordion-1"
                    aria-controls="accordion-content-1"
                    data-accordion-button="accordion-content-1"
                  >
                    Accordion Button 1
                  </button>
                </h5>
                <div
                  id="accordion-content-1"
                  aria-labelledby="accordion-button-1"
                  data-accordion-content="visible"
                >
                  <p className="accordion-content">
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <h5 id="accordion-button-2">
                  <button
                    data-accordion-parent="accordion-1"
                    aria-controls="accordion-content-2"
                    data-accordion-button="accordion-content-2"
                  >
                    Accordion Button 2
                  </button>
                </h5>
                <div
                  id="accordion-content-2"
                  aria-labelledby="accordion-button-2"
                  data-accordion-content="hidden"
                >
                  <p className="accordion-content">
                    Nostrud enim qui ex sint incididunt aliquip ex laborum. Dolore velit Lorem
                    consectetur magna non eu incididunt ex irure cillum consequat nisi. Fugiat nisi
                    sunt amet adipisicing non sit ipsum ad pariatur do elit est officia magna. Enim
                    deserunt duis irure do cupidatat laboris nostrud sint nulla nulla.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <h5 id="accordion-button-3">
                  <button
                    data-accordion-parent="accordion-1"
                    aria-controls="accordion-content-3"
                    data-accordion-button="accordion-content-3"
                  >
                    Accordion Button 3
                  </button>
                </h5>
                <div
                  id="accordion-content-3"
                  aria-labelledby="accordion-button-3"
                  data-accordion-content="hidden"
                >
                  <p className="accordion-content">
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="xsmall-12 columns">
            <HeaderText>Multi-Item Accordion</HeaderText>
            <p>Expand and collapse any or all items in a menu.</p>
          </div>

          <div className="xsmall-12 columns">
            <div data-accordion="accordion-2" data-accordion-toggle-multiple>
              <div data-accordion-expanded="false">
                <h5 id="accordion-button-4">
                  <button
                    data-accordion-parent="accordion-2"
                    aria-controls="accordion-content-4"
                    data-accordion-button="accordion-content-4"
                  >
                    Accordion Button 4
                  </button>
                </h5>
                <div
                  id="accordion-content-4"
                  aria-labelledby="accordion-button-4"
                  data-accordion-content="hidden"
                >
                  <p className="accordion-content">
                    Nostrud enim qui ex sint incididunt aliquip ex laborum. Dolore velit Lorem
                    consectetur magna non eu incididunt ex irure cillum consequat nisi. Fugiat nisi
                    sunt amet adipisicing non sit ipsum ad pariatur do elit est officia magna. Enim
                    deserunt duis irure do cupidatat laboris nostrud sint nulla nulla.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <h5 id="accordion-button-5">
                  <button
                    data-accordion-parent="accordion-2"
                    aria-controls="accordion-content-5"
                    data-accordion-button="accordion-content-5"
                  >
                    Accordion Button 5
                  </button>
                </h5>
                <div
                  id="accordion-content-5"
                  aria-labelledby="accordion-button-5"
                  data-accordion-content="hidden"
                >
                  <p className="accordion-content">
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <h5 id="accordion-button-6">
                  <button
                    data-accordion-parent="accordion-2"
                    aria-controls="accordion-content-6"
                    data-accordion-button="accordion-content-6"
                  >
                    Accordion Button 6
                  </button>
                </h5>
                <div
                  id="accordion-content-6"
                  aria-labelledby="accordion-button-6"
                  data-accordion-content="hidden"
                >
                  <p className="accordion-content">
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
