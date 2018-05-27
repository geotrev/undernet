"use strict"

import Utils from "../utils"

const keyCodes = {
  SPACE: 32,
}

const selectors = {
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_ITEM: "data-accordion-item",
  ACCORDION_BUTTON: "data-accordion-button",
  ACCORDION_CONTENT: "data-accordion-content",
}

const events = {
  CLICK: "click",
}

const messages = {
  MISSING_ACCORDION_CONTENT: "You have an accordion button that is missing it's content block.",
  MISSING_ACCORDION_BUTTONS:
    "You have an accordion component with no [data-accordion-button] children.",
}

export default class Accordion extends Utils {
  constructor() {
    super()
    this.accordionContainers = this.findElements(`[${selectors.ACCORDION_CONTAINER}]`)
    this.accordionButtons = this.findElements(`[${selectors.ACCORDION_BUTTON}]`)
    this.accordionContents = this.findElements(`[${selectors.ACCORDION_CONTENT}]`)

    // bind events to calss
    this.getAccordion = this.getAccordion.bind(this)
  }

  start() {
    if (this.accordionButtons.length) {
      this.accordionButtons.forEach(button => {
        button.addEventListener(events.CLICK, this.getAccordion)
      })
    }
  }

  getAccordion(event) {
    event.preventDefault()
    this.expandAccordion(event)
  }

  expandAccordion(event) {
    const button = event.target
    const container = button.parentNode.parentNode
    const content = button.nextElementSibling

    let allContents = this.findElements(`#${container.id} [${selectors.ACCORDION_CONTENT}]`)

    allContents.forEach(content => {
      if (content.classList.contains("is-block")) {
        content.classList.remove("is-block")
      }
    })

    content.classList.toggle("is-block")
  }

  stop() {
    this.accordionButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.getAccordion)
    })
  }
}
