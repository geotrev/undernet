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
  DATA_EXPANDED: "data-expanded",
  DATA_TARGET: "data-target",
  DATA_CONTENT: "data-content",
  DATA_TOGGLE_MULTIPLE: "data-toggle-multiple",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden",
  TABINDEX: "tabindex",
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
    // accordion event methods
    this._render = this._render.bind(this)
    this._handleSpaceKeyPress = this._handleSpaceKeyPress.bind(this)

    // all accordions
    this.accordionButtons = []
    this.accordionContentsAttr = ""
    this.accordionContents = []

    // active accordion
    this.activeContainer = {}
    this.activeButton = {}
    this.activeAccordionRowId = ""
    this.activeRowAttr = ""
    this.activeRow = ""
    this.activeContainerId = ""
    this.activeContainerAttr = ""
    this.activeContainer = {}
    this.activeContent = {}
    this.toggleExpandState = null
    this.toggleContentState = null
    this.toggleHiddenState = null
    this.allContentAttr = ""
  }

  // public

  /**
   * Add accessible attributes [data-accordion-button] and [data-accordion-content] elements
   * Begin listening to [data-accordion-button] elements
   */
  start() {
    this.accordionButtons = this._getElements(
      `[${selectors.ACCORDION_CONTAINER}] [${selectors.DATA_TARGET}]`,
    )

    this.accordionContentsAttr = `[${selectors.ACCORDION_CONTAINER}] [${selectors.DATA_CONTENT}]`
    this.accordionContents = this._getElements(this.accordionContentsAttr)

    this._getFocusableElements(this.accordionContentsAttr).forEach(element => {
      element.setAttribute(selectors.TABINDEX, "-1")
    })

    if (this.accordionButtons.length) {
      this.accordionButtons.forEach(button => {
        this._setupButton(button)
        button.addEventListener(events.CLICK, this._render)
        button.addEventListener(events.KEYDOWN, this._handleSpaceKeyPress)
      })
    }

    if (this.accordionContents.length) {
      this.accordionContents.forEach(content => {
        const contentRowAttr = this._getAccordionRowAttr(content.id)
        const contentRow = document.querySelector(contentRowAttr)
        const contentHiddenState = contentRow.getAttribute(selectors.DATA_EXPANDED)
        const toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true"
        content.setAttribute(selectors.ARIA_HIDDEN, toggleContentHiddenState)

        if (toggleContentHiddenState === "false") {
          this._getFocusableElements(`#${content.id}`).forEach(element => {
            element.setAttribute(selectors.TABINDEX, "0")
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
      button.removeEventListener(events.CLICK, this._render)
      button.removeEventListener(events.KEYDOWN, this._handleSpaceKeyPress)
    })
  }

  // private

  _setupButton(button) {
    const buttonId = button.getAttribute(selectors.DATA_TARGET)
    const accordionRowAttr = this._getAccordionRowAttr(buttonId)
    const accordionRow = document.querySelector(accordionRowAttr)
    const shouldContentExpand = accordionRow.getAttribute(selectors.DATA_EXPANDED)
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
   * @param {String} id - An id value associated with a given selectors.DATA_TARGET
   * @return {String}
   */
  _getAccordionRowAttr(id) {
    return `[${selectors.ACCORDION_ROW}='${id}']`
  }

  /**
   * Open accordion content associated with a [data-accordion-button] element.
   * @param {Object} event - The event object.
   */
  _render(event) {
    event.preventDefault()

    this.activeButton = event.target
    this.activeAccordionRowId = this.activeButton.getAttribute(selectors.DATA_TARGET)

    this.activeRowAttr = this._getAccordionRowAttr(this.activeAccordionRowId)
    this.activeRow = document.querySelector(this.activeRowAttr)
    this.activeContainerId = this.activeButton.getAttribute(selectors.DATA_PARENT)
    this.activeContainerAttr = `[${selectors.ACCORDION_CONTAINER}='${this.activeContainerId}']`
    this.activeContainer = document.querySelector(this.activeContainerAttr)

    this.activeContent = document.getElementById(this.activeAccordionRowId)

    const accordionContentHasAttr = this.activeContent.hasAttribute(selectors.DATA_CONTENT)
    if (!accordionContentHasAttr) {
      throw messages.MISSING_CONTENT
      return
    }

    const accordionButtonState = this.activeRow.getAttribute(selectors.DATA_EXPANDED)
    const accordionContentState = this.activeContent.getAttribute(selectors.DATA_CONTENT)

    this.toggleExpandState = accordionButtonState === "true" ? "false" : "true"
    this.toggleContentState = accordionContentState === "visible" ? "hidden" : "visible"
    this.toggleHiddenState = this.toggleExpandState === "false" ? "true" : "false"

    this._closeAllIfToggleable()
    this._toggleSelectedAccordion()
  }

  /**
   * If a keypress is the spacebar on a button, open its correlated content.
   * @param {Object} event - The event object.
   */
  _handleSpaceKeyPress(event) {
    if (event.which === keyCodes.SPACE) this._render(event)
  }

  /**
   * If toggling multiple rows at once isn't enabled, close all rows except the selected one.
   * This ensures the selected one can be closed if it's already open.
   */
  _closeAllIfToggleable() {
    if (this.activeContainer.hasAttribute(selectors.DATA_TOGGLE_MULTIPLE)) return
    this.allContentAttr = `${this.activeContainerAttr} [${selectors.DATA_CONTENT}]`
    const allRows = this._getElements(`${this.activeContainerAttr} [${selectors.DATA_EXPANDED}]`)
    const allContent = this._getElements(this.allContentAttr)
    const allButtons = this._getElements(`${this.activeContainerAttr} [${selectors.DATA_TARGET}]`)

    allContent.forEach(content => {
      if (!(content === this.activeContent)) content.style.maxHeight = null
    })

    this._getFocusableElements(this.allContentAttr).forEach(element => {
      element.setAttribute(selectors.TABINDEX, "-1")
    })

    this._toggleAttributeInCollection(allRows, selectors.DATA_EXPANDED, "true", "false")
    this._toggleAttributeInCollection(allButtons, selectors.ARIA_EXPANDED, "true", "false")
    this._toggleAttributeInCollection(allContent, selectors.ARIA_HIDDEN, "false", "true")
    this._toggleAttributeInCollection(allContent, selectors.DATA_CONTENT, "visible", "hidden")
  }

  /**
   * Toggle a [data-accordion-button]'s corresponding [data-accordion-content] element.
   */
  _toggleSelectedAccordion() {
    this.activeRow.setAttribute(selectors.DATA_EXPANDED, this.toggleExpandState)
    this.activeContent.setAttribute(selectors.DATA_CONTENT, this.toggleContentState)
    this.activeButton.setAttribute(selectors.ARIA_EXPANDED, this.toggleExpandState)
    this.activeContent.setAttribute(selectors.ARIA_HIDDEN, this.toggleHiddenState)

    const activeContentBlock = `#${this.activeAccordionRowId}`
    this._getFocusableElements(activeContentBlock).forEach(element => {
      const value = this.toggleExpandState === "true" ? "0" : "-1"
      element.setAttribute(selectors.TABINDEX, value)
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
  _toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
    elements.forEach(element => {
      if (element.hasAttribute(attributeName, currentValue)) {
        element.setAttribute(attributeName, newValue)
      }
    })
  }
}
