"use strict"

import Utils from "../utils"

const keyCodes = {
  SPACE: 32,
}

const selectors = {
  // unique
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_ROW: "data-accordion-row",
  // common
  EXPANDED: "data-expanded",
  TARGET: "data-target",
  CONTENT: "data-content",
  TOGGLE_MULTIPLE: "data-toggle-multiple",
  PARENT: "data-parent",
  // accessibility
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden",
  TAB_INDEX: "tabindex",
}

const events = {
  CLICK: "click",
  KEYDOWN: "keydown",
}

const messages = {
  MISSING_CONTENT:
    "You have an accordion button that is missing its [data-content] attribute, and has a matching id to the button's [data-target] attribute's value.",
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
    this.accordionButtons = this.getElements(
      `[${selectors.ACCORDION_CONTAINER}] [${selectors.TARGET}]`,
    )

    this.accordionContentsAttr = `[${selectors.ACCORDION_CONTAINER}] [${selectors.CONTENT}]`
    this.accordionContents = this.getElements(this.accordionContentsAttr)

    this.getFocusableElements(this.accordionContentsAttr).forEach(element => {
      element.setAttribute(selectors.TAB_INDEX, "-1")
    })

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

        if (toggleContentHiddenState === "false") {
          this.getFocusableElements(`#${content.id}`).forEach(element => {
            element.setAttribute(selectors.TAB_INDEX, "0")
          })
        }
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

    button.setAttribute(selectors.ARIA_CONTROLS, buttonId)

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
    this.activeAccordionRowId = this.activeButton.getAttribute(selectors.TARGET)

    this.activeRowAttr = this.getAccordionRowAttr(this.activeAccordionRowId)
    this.activeRow = document.querySelector(this.activeRowAttr)
    this.activeContainerId = this.activeButton.getAttribute(selectors.PARENT)
    this.activeContainerAttr = `[${selectors.ACCORDION_CONTAINER}='${this.activeContainerId}']`
    this.activeContainer = document.querySelector(this.activeContainerAttr)

    this.activeContent = document.getElementById(this.activeAccordionRowId)

    const accordionContentHasAttr = this.activeContent.hasAttribute(selectors.CONTENT)
    if (!accordionContentHasAttr) {
      throw messages.MISSING_CONTENT
      return
    }

    const accordionButtonState = this.activeRow.getAttribute(selectors.EXPANDED)
    const accordionContentState = this.activeContent.getAttribute(selectors.CONTENT)

    this.toggleExpandState = accordionButtonState === "true" ? "false" : "true"
    this.toggleContentState = accordionContentState === "visible" ? "hidden" : "visible"
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
    this.allContentAttr = `${this.activeContainerAttr} [${selectors.CONTENT}]`
    const allRows = this.getElements(`${this.activeContainerAttr} [${selectors.EXPANDED}]`)
    const allContent = this.getElements(this.allContentAttr)
    const allButtons = this.getElements(`${this.activeContainerAttr} [${selectors.TARGET}]`)

    allContent.forEach(content => {
      if (!(content === this.activeContent)) content.style.maxHeight = null
    })

    this.getFocusableElements(this.allContentAttr).forEach(element => {
      element.setAttribute(selectors.TAB_INDEX, "-1")
    })

    this.toggleAttributeInCollection(allRows, selectors.EXPANDED, "true", "false")
    this.toggleAttributeInCollection(allButtons, selectors.ARIA_EXPANDED, "true", "false")
    this.toggleAttributeInCollection(allContent, selectors.ARIA_HIDDEN, "false", "true")
    this.toggleAttributeInCollection(allContent, selectors.CONTENT, "visible", "hidden")
  }

  /**
   * Toggle a [data-accordion-button]'s corresponding [data-accordion-content] element.
   */
  toggleSelectedAccordion() {
    this.activeRow.setAttribute(selectors.EXPANDED, this.toggleExpandState)
    this.activeContent.setAttribute(selectors.CONTENT, this.toggleContentState)
    this.activeButton.setAttribute(selectors.ARIA_EXPANDED, this.toggleExpandState)
    this.activeContent.setAttribute(selectors.ARIA_HIDDEN, this.toggleHiddenState)

    const activeContentBlock = `#${this.activeAccordionRowId}`
    this.getFocusableElements(activeContentBlock).forEach(element => {
      const value = this.toggleExpandState === "true" ? "0" : "-1"
      element.setAttribute(selectors.TAB_INDEX, value)
    })

    if (this.activeContent.style.maxHeight) {
      this.activeContent.style.maxHeight = null
    } else {
      this.activeContent.style.maxHeight = `${this.activeContent.scrollHeight}px`
    }
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
