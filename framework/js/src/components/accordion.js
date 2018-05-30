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
  KEYDOWN: "keydown",
}

const messages = {
  MISSING_ACCORDION_CONTENT:
    "You have an accordion button that is missing its content block or its [data-accordion-content] attribute.",
  MISSING_ACCORDION_BUTTONS:
    "You have an accordion component with no [data-accordion-button] children.",
}

export default class Accordion extends Utils {
  constructor() {
    super()
    this.accordionContainers = this.getElements(`[${selectors.ACCORDION_CONTAINER}]`)
    this.accordionButtons = this.getElements(`[${selectors.ACCORDION_BUTTON}]`)
    this.accordionContents = this.getElements(`[${selectors.ACCORDION_CONTENT}]`)
    this.activeContainer = null

    // bind events to calss
    this.getAccordion = this.getAccordion.bind(this)
    this.handleSpaceKeyPress = this.handleSpaceKeyPress.bind(this)
  }

  start() {
    if (this.accordionButtons.length) {
      this.accordionButtons.forEach(button => {
        button.setAttribute("role", "heading")

        const buttonExpandState =
          button.parentNode.getAttribute("data-accordion-expanded") === "true" ? "true" : "false"
        button.setAttribute("aria-expanded", buttonExpandState)

        button.addEventListener(events.CLICK, this.getAccordion)
        button.addEventListener(events.KEYDOWN, this.handleSpaceKeyPress)
      })
    }

    if (this.accordionContents.length) {
      this.accordionContents.forEach(content => {
        content.setAttribute("role", "region")
        const contentHiddenState = content.parentNode.getAttribute("data-accordion-expanded")
        const toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true"
        content.setAttribute("aria-hidden", toggleContentHiddenState)
      })
    }
  }

  stop() {
    this.accordionButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.getAccordion)
      button.removeEventListener(events.KEYDOWN, this.handleSpaceKeyPress)
    })
  }

  getAccordion(event) {
    event.preventDefault()
    this.renderAccordionContent(event)
  }

  renderAccordionContent(event) {
    this.activeButton = event.target
    this.activeRow = this.activeButton.parentNode
    this.activeContainer = this.activeRow.parentNode
    this.activeContent = this.activeButton.nextElementSibling
    const accordionContentHasAttr = this.activeContent.hasAttribute(selectors.ACCORDION_CONTENT)

    if (!accordionContentHasAttr) {
      throw messages.MISSING_ACCORDION_CONTENT
      return
    }

    const accordionButtonState = this.activeRow.getAttribute(selectors.ACCORDION_EXPANDED)
    const accordionContentState = this.activeContent.getAttribute(selectors.ACCORDION_CONTENT)
    const accordionContentAriaHiddenState = this.activeContent.getAttribute("aria-hidden")

    this.toggleExpandState = accordionButtonState === "true" ? "false" : "true"
    this.toggleContentState = accordionContentState === "visible" ? "hidden" : "visible"
    this.toggleHiddenState = this.toggleExpandState === "false" ? "true" : "false"

    this.closeAllIfToggleable()
    this.toggleSelectedAccordionRow()
  }

  handleSpaceKeyPress(event) {
    if (event.which === keyCodes.SPACE) this.getAccordion(event)
  }

  closeAllIfToggleable() {
    if (this.activeContainer.hasAttribute(selectors.ACCORDION_MULTIPLE)) return

    const containerId = this.activeContainer.getAttribute(selectors.ACCORDION_CONTAINER)
    const containerAttr = `[${selectors.ACCORDION_CONTAINER}='${containerId}']`
    const allContentsAttr = `${containerAttr} [${selectors.ACCORDION_CONTENT}]`
    const allRows = this.getElements(`${containerAttr} [${selectors.ACCORDION_EXPANDED}]`)
    const allContent = this.getElements(allContentsAttr)
    const allButtons = this.getElements(`${containerAttr} [${selectors.ACCORDION_BUTTON}]`)

    this.toggleAttributeInCollection(allRows, selectors.ACCORDION_EXPANDED, "true", "false")
    this.toggleAttributeInCollection(allButtons, "aria-expanded", "true", "false")
    this.toggleAttributeInCollection(allContent, "aria-hidden", "false", "true")
    this.toggleAttributeInCollection(allContent, selectors.ACCORDION_CONTENT, "visible", "hidden")
  }

  toggleSelectedAccordionRow() {
    this.activeRow.setAttribute(selectors.ACCORDION_EXPANDED, this.toggleExpandState)
    this.activeContent.setAttribute(selectors.ACCORDION_CONTENT, this.toggleContentState)
    this.activeButton.setAttribute("aria-expanded", this.toggleExpandState)
    this.activeContent.setAttribute("aria-hidden", this.toggleHiddenState)
  }

  toggleAttributeInCollection(elements, selector, firstAttr, secondAttr) {
    elements.forEach(element => {
      if (element.hasAttribute(selector, firstAttr)) {
        element.setAttribute(selector, secondAttr)
      }
    })
  }
}
