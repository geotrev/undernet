"use strict"

import Utils from "../utils"

const keyCodes = {
  SPACE: 32,
}

const selectors = {
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_ROW: "data-accordion-row",
  EXPANDED: "data-expanded",
  TARGET: "data-target",
  VISIBLE: "data-visible",
  TOGGLE_MULTIPLE: "data-toggle-multiple",
  PARENT: "data-parent",
  ARIA_EXPANDED: "aria-expanded",
  ARIA_HIDDEN: "aria-hidden",
}

const events = {
  CLICK: "click",
  KEYDOWN: "keydown",
}

const messages = {
  MISSING_VISIBLE:
    "You have an accordion button that is missing its content block or its [data-accordion-content] attribute.",
}

/**
 * Accordion component class.
 * @module Accordion
 * @requires Utils
 */
export default class Accordion extends Utils {
  constructor() {
    super()
    this.accordionButtons = null
    this.accordionContents = null
    this.activeContainer = null

    // bind events to class
    this.renderAccordionContent = this.renderAccordionContent.bind(this)
    this.handleSpaceKeyPress = this.handleSpaceKeyPress.bind(this)
  }

  /**
   * Add accessible attributes [data-accordion-button] and [data-accordion-content] elements
   * Begin listening to [data-accordion-button] elements
   */
  start() {
    this.accordionButtons = this.getElements(`[${selectors.TARGET}]`)
    this.accordionContents = this.getElements(`[${selectors.VISIBLE}]`)

    if (this.accordionButtons.length) {
      this.accordionButtons.forEach(button => {
        this.setupButton(button)
        button.addEventListener(events.CLICK, this.renderAccordionContent)
        button.addEventListener(events.KEYDOWN, this.handleSpaceKeyPress)
      })
    }

    if (this.accordionContents.length) {
      this.accordionContents.forEach(content => {
        const contentRowAttr = this.getAccordionRowAttr(content.id)
        const contentRow = document.querySelector(contentRowAttr)
        const contentHiddenState = contentRow.getAttribute(selectors.EXPANDED)
        const toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true"
        content.setAttribute(selectors.ARIA_HIDDEN, toggleContentHiddenState)
      })
    }
  }

  /**
   * Stop listening to accordion buttons.
   */
  stop() {
    this.accordionButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.renderAccordionContent)
      button.removeEventListener(events.KEYDOWN, this.handleSpaceKeyPress)
    })
  }

  setupButton(button) {
    const buttonId = button.getAttribute(selectors.TARGET)
    const accordionRowAttr = this.getAccordionRowAttr(buttonId)
    const accordionRow = document.querySelector(accordionRowAttr)
    const shouldContentExpand = accordionRow.getAttribute(selectors.EXPANDED)
    const buttonContent = document.getElementById(buttonId)

    if (shouldContentExpand === "true") {
      buttonContent.style.maxHeight = `${buttonContent.scrollHeight}px`
      button.setAttribute(selectors.ARIA_EXPANDED, "true")
    } else {
      button.setAttribute(selectors.ARIA_EXPANDED, "false")
    }
  }

  /**
   * Return a selector that targets `selectors.ACCORDION_ROW` with value of the id.
   * @param {String} id - An id value associated with a given selectors.TARGET
   * @return {String}
   */
  getAccordionRowAttr(id) {
    return `[${selectors.ACCORDION_ROW}='${id}']`
  }

  /**
   * Open accordion content associated with a [data-accordion-button] element.
   * @param {Object} event - The event object.
   */
  renderAccordionContent(event) {
    event.preventDefault()

    this.activeButton = event.target
    const activeAccordionRow = this.activeButton.getAttribute(selectors.TARGET)

    this.activeRowAttr = this.getAccordionRowAttr(activeAccordionRow)
    this.activeRow = document.querySelector(this.activeRowAttr)
    this.activeContainerId = this.activeButton.getAttribute(selectors.PARENT)
    this.activeContainerAttr = `[${selectors.ACCORDION_CONTAINER}='${this.activeContainerId}']`
    this.activeContainer = document.querySelector(this.activeContainerAttr)

    this.activeContent = document.getElementById(activeAccordionRow)

    const accordionContentHasAttr = this.activeContent.hasAttribute(selectors.VISIBLE)
    if (!accordionContentHasAttr) {
      throw messages.MISSING_VISIBLE
      return
    }

    const accordionButtonState = this.activeRow.getAttribute(selectors.EXPANDED)
    const accordionContentState = this.activeContent.getAttribute(selectors.VISIBLE)

    this.toggleExpandState = accordionButtonState === "true" ? "false" : "true"
    this.toggleContentState = accordionContentState === "true" ? "false" : "true"
    this.toggleHiddenState = this.toggleExpandState === "false" ? "true" : "false"

    this.closeAllIfToggleable()
    this.toggleSelectedAccordion()
  }

  /**
   * If a keypress is the spacebar on a button, open its correlated content.
   * @param {Object} event - The event object.
   */
  handleSpaceKeyPress(event) {
    if (event.which === keyCodes.SPACE) this.renderAccordionContent(event)
  }

  /**
   * If toggling multiple rows at once isn't enabled, close all rows except the selected one.
   * This ensures the selected one can be closed if it's already open.
   */
  closeAllIfToggleable() {
    if (this.activeContainer.hasAttribute(selectors.TOGGLE_MULTIPLE)) return

    const allRows = this.getElements(`${this.activeContainerAttr} [${selectors.EXPANDED}]`)

    const allContent = this.getElements(`${this.activeContainerAttr} [${selectors.VISIBLE}]`)

    const allButtons = this.getElements(`${this.activeContainerAttr} [${selectors.TARGET}]`)

    allContent.forEach(content => {
      if (!(content === this.activeContent)) content.style.maxHeight = null
    })

    this.toggleAttributeInCollection(allRows, selectors.EXPANDED, "true", "false")
    this.toggleAttributeInCollection(allButtons, selectors.ARIA_EXPANDED, "true", "false")
    this.toggleAttributeInCollection(allContent, selectors.ARIA_HIDDEN, "false", "true")
    this.toggleAttributeInCollection(allContent, selectors.VISIBLE, "true", "false")
  }

  /**
   * Toggle a [data-accordion-button]'s related [data-accordion-content] element.
   */
  toggleSelectedAccordion() {
    this.activeRow.setAttribute(selectors.EXPANDED, this.toggleExpandState)
    this.activeContent.setAttribute(selectors.VISIBLE, this.toggleContentState)
    this.activeButton.setAttribute(selectors.ARIA_EXPANDED, this.toggleExpandState)
    this.activeContent.setAttribute(selectors.ARIA_HIDDEN, this.toggleHiddenState)

    this.activeContent.style.maxHeight
      ? (this.activeContent.style.maxHeight = null)
      : (this.activeContent.style.maxHeight = `${this.activeContent.scrollHeight}px`)
  }

  /**
   * Toggles a single attribute of a series of elements within a parent.
   */
  toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
    elements.forEach(element => {
      if (element.hasAttribute(attributeName, currentValue)) {
        element.setAttribute(attributeName, newValue)
      }
    })
  }
}
