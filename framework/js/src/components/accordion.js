"use strict"

import Utils from "../utils"

const keyCodes = {
  SPACE: 32,
}

const selectors = {
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_EXPANDED: "data-accordion-expanded",
  ACCORDION_BUTTON: "data-accordion-button",
  ACCORDION_CONTENT: "data-accordion-content",
  ACCORDION_MULTIPLE: "data-accordion-toggle-multiple",
}

const events = {
  CLICK: "click",
  FOCUS: "focus",
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
        button.setAttribute("role", "heading")

        const buttonExpandState =
          button.parentNode.getAttribute("data-accordion-expanded") === "true" ? "true" : "false"
        button.setAttribute("aria-expanded", buttonExpandState)

        button.addEventListener(events.CLICK, this.getAccordion)
      })
    }

    if (this.accordionContents.length) {
      this.accordionContents.forEach(content => {
        content.setAttribute("role", "region")

        const contentHiddenState =
          content.parentNode.getAttribute("data-accordion-expanded") === "true" ? "false" : "true"
        content.setAttribute("aria-hidden", contentHiddenState)
      })
    }
  }

  getAccordion(event) {
    event.preventDefault()
    this.expandAccordion(event)
  }

  expandAccordion(event) {
    const button = event.target
    const accordionRow = button.parentNode
    const container = button.parentNode.parentNode
    const accordionContent = button.nextElementSibling
    const containerId = container.getAttribute(selectors.ACCORDION_CONTAINER)
    const containerAttr = `[${selectors.ACCORDION_CONTAINER}='${containerId}']`
    const allAccordionRows = this.findElements(`${containerAttr} [${selectors.ACCORDION_EXPANDED}]`)
    const allAccordionContents = this.findElements(
      `${containerAttr} [${selectors.ACCORDION_CONTENT}]`,
    )

    const accordionButtonState = accordionRow.getAttribute(selectors.ACCORDION_EXPANDED)
    const accordionContentState = accordionContent.getAttribute(selectors.ACCORDION_CONTENT)
    const toggleExpandState = accordionButtonState === "true" ? "false" : "true"
    const toggleAccordionContentState = accordionContentState === "visible" ? "hidden" : "visible"
    const toggleHiddenState =
      accordionContent.getAttribute("aria-hidden") === "false" ? "true" : "false"

    if (!container.hasAttribute(selectors.ACCORDION_MULTIPLE)) {
      allAccordionRows.forEach(item => {
        if (item.hasAttribute(selectors.ACCORDION_EXPANDED, "true")) {
          item.setAttribute(selectors.ACCORDION_EXPANDED, "false")
        }
      })

      allAccordionContents.forEach(content => {
        if (content.hasAttribute(selectors.ACCORDION_CONTENT, "visible")) {
          content.setAttribute(selectors.ACCORDION_CONTENT, "hidden")
        }
      })
    }

    accordionRow.setAttribute(selectors.ACCORDION_EXPANDED, toggleExpandState)
    accordionContent.setAttribute(selectors.ACCORDION_CONTENT, toggleAccordionContentState)
    button.setAttribute("aria-expanded", toggleExpandState)
    accordionContent.setAttribute("aria-hidden", toggleHiddenState)
  }

  stop() {
    this.accordionButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.getAccordion)
    })
  }
}
