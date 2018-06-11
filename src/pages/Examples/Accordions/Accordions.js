import React, { Component } from "react"
import DemoSection from "../DemoSection/DemoSection"

import { HeaderText } from "components"
import Undernet from "undernet"

export default class Accordions extends Component {
  componentDidMount() {
    Undernet.accordions.start()
  }

  componentWillUnmount() {
    Undernet.accordions.stop()
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
            <div data-accordion="accordion1">
              <div data-accordion-expanded="true">
                <h5 id="button1">
                  <button
                    data-accordion-parent="accordion1"
                    aria-controls="content1"
                    data-accordion-button="content1"
                  >
                    Accordion Button 1
                  </button>
                </h5>
                <div id="content1" aria-labelledby="button1" data-accordion-content="visible">
                  <p className="accordion-content">
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <h5 id="button2">
                  <button
                    data-accordion-parent="accordion1"
                    aria-controls="content2"
                    data-accordion-button="content2"
                  >
                    Accordion Button 2
                  </button>
                </h5>
                <div id="content2" aria-labelledby="button2" data-accordion-content="hidden">
                  <p className="accordion-content">
                    Nostrud enim qui ex sint incididunt aliquip ex laborum. Dolore velit Lorem
                    consectetur magna non eu incididunt ex irure cillum consequat nisi. Fugiat nisi
                    sunt amet adipisicing non sit ipsum ad pariatur do elit est officia magna. Enim
                    deserunt duis irure do cupidatat laboris nostrud sint nulla nulla.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <h5 id="button3">
                  <button
                    data-accordion-parent="accordion1"
                    aria-controls="content3"
                    data-accordion-button="content3"
                  >
                    Accordion Button 3
                  </button>
                </h5>
                <div id="content3" aria-labelledby="button3" data-accordion-content="hidden">
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
                <h5 id="button4">
                  <button
                    data-accordion-parent="accordion-2"
                    aria-controls="content4"
                    data-accordion-button="content4"
                  >
                    Accordion Button 4
                  </button>
                </h5>
                <div id="content4" aria-labelledby="button4" data-accordion-content="hidden">
                  <p className="accordion-content">
                    Nostrud enim qui ex sint incididunt aliquip ex laborum. Dolore velit Lorem
                    consectetur magna non eu incididunt ex irure cillum consequat nisi. Fugiat nisi
                    sunt amet adipisicing non sit ipsum ad pariatur do elit est officia magna. Enim
                    deserunt duis irure do cupidatat laboris nostrud sint nulla nulla.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <h5 id="button5">
                  <button
                    data-accordion-parent="accordion-2"
                    aria-controls="content5"
                    data-accordion-button="content5"
                  >
                    Accordion Button 5
                  </button>
                </h5>
                <div id="content5" aria-labelledby="button5" data-accordion-content="hidden">
                  <p className="accordion-content">
                    Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
                    ipsum ut voluptate.
                  </p>
                </div>
              </div>
              <div data-accordion-expanded="false">
                <h5 id="button6">
                  <button
                    data-accordion-parent="accordion-2"
                    aria-controls="content6"
                    data-accordion-button="content6"
                  >
                    Accordion Button 6
                  </button>
                </h5>
                <div id="content6" aria-labelledby="button6" data-accordion-content="hidden">
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
