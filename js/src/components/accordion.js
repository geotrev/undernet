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
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  DATA_TOGGLE_MULTIPLE: "data-toggle-multiple",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_LABELLEDBY: "aria-labelledby",
  TABINDEX: "tabindex",
}

const events = {
  CLICK: "click",
  KEYDOWN: "keydown",
}

const messages = {
  NO_VISIBLE_ERROR: id =>
    `Your accordion button with [data-target='${id}'] doesn't have a row with [data-visible='true|false']`,
  NO_ROW_ERROR: id =>
    `Your accordion button should be contained in an element with [data-accordion-row='${id}']`,
  NO_HEADER_ID_ERROR: id =>
    `Your accordion button with [data-target='${id}'] should be contained in a header element with a unique id.`,
  NO_PARENT_ERROR: id =>
    `Your accordion button with [data-target='${id}'] is missing its [data-parent] attribute - the accordion can't be opened.`,
  NO_CONTENT_ERROR: id =>
    `Your accordion button doesn't seem to have a content block - make sure your button's [data-target] and the content block's [id] value both equal ${id}`,
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
    this.activeContainer = null
    this.activeButton = null
    this.activeAccordionRowId = ""
    this.activeRowAttr = ""
    this.activeRow = ""
    this.activeContainerId = ""
    this.activeContainerAttr = ""
    this.activeContent = null
    this.activeButtonExpandState = ""
    this.activeContentHiddenState = ""
  }

  // public

  /**
   * Sets up accordion components and listens to buttons for events.
   * Begin listening to [data-accordion-button] elements
   */
  start() {
    this.accordionButtons = this._getElements(
      `[${selectors.ACCORDION_CONTAINER}] [${selectors.DATA_TARGET}]`,
    )

    if (this.accordionButtons.length) {
      this.accordionButtons.forEach(button => {
        this._setupAccordion(button)
        button.addEventListener(events.CLICK, this._render)
        button.addEventListener(events.KEYDOWN, this._handleSpaceKeyPress)
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

  /**
   * Add initial attributes to accordion elements.
   * @param {Element} button - A button element that triggers an accordion.
   */
  _setupAccordion(button) {
    const buttonId = button.getAttribute(selectors.DATA_TARGET)

    if (!document.getElementById(buttonId)) {
      return console.error(messages.NO_CONTENT_ERROR(buttonId))
    }

    const buttonContent = document.getElementById(buttonId)
    const accordionRowAttr = this._getAccordionRowAttr(buttonId)

    if (!document.querySelector(accordionRowAttr)) {
      return console.error(messages.NO_ROW_ERROR(buttonId))
    }

    const accordionRow = document.querySelector(accordionRowAttr)
    const buttonHeaderAttr = this._getPossibleAccordionHeaderAttrs(accordionRowAttr)
    const buttonHeader = this._getElements(buttonHeaderAttr)[0]

    if (!buttonHeader || !buttonHeader.id) {
      console.error(messages.NO_HEADER_ID_ERROR(buttonId))
    }

    const buttonContentChildren = this._getFocusableElements(`#${buttonContent.id}`)

    button.setAttribute(selectors.ARIA_CONTROLS, buttonId)
    buttonContent.setAttribute(selectors.ARIA_LABELLEDBY, buttonHeader.id)

    if (!accordionRow.getAttribute(selectors.DATA_VISIBLE)) {
      return console.error(messages.NO_VISIBLE_ERROR(buttonId))
    }

    const contentShouldExpand = accordionRow.getAttribute(selectors.DATA_VISIBLE)
    if (contentShouldExpand === "true") {
      buttonContent.style.maxHeight = `${buttonContent.scrollHeight}px`
      button.setAttribute(selectors.ARIA_EXPANDED, "true")
      buttonContent.setAttribute(selectors.ARIA_HIDDEN, "false")
      buttonContentChildren.forEach(element => {
        element.setAttribute(selectors.TABINDEX, "0")
      })
    } else {
      button.setAttribute(selectors.ARIA_EXPANDED, "false")
      buttonContent.setAttribute(selectors.ARIA_HIDDEN, "true")
      buttonContentChildren.forEach(element => {
        element.setAttribute(selectors.TABINDEX, "-1")
      })
    }
  }

  /**
   * Build a selector string to be passed into querySelectorAll() / _getElements()
   * @param {String} - A unique attribute.
   */
  _getPossibleAccordionHeaderAttrs(attr) {
    return `${attr} h1, ${attr} h2, ${attr} h3, ${attr} h4, ${attr} h5, ${attr} h6`
  }

  /**
   * Return a unique accordion row attribute selector.
   * @param {String} id - An id value associated with a given selectors.DATA_TARGET
   * @return {String}
   */
  _getAccordionRowAttr(id) {
    return `[${selectors.ACCORDION_ROW}='${id}']`
  }

  /**
   * Open accordion content associated with an accordion button.
   * @param {Object} event - The event object.
   */
  _render(event) {
    event.preventDefault()

    this.activeButton = event.target
    this.activeAccordionRowId = this.activeButton.getAttribute(selectors.DATA_TARGET)

    this.activeRowAttr = this._getAccordionRowAttr(this.activeAccordionRowId)
    this.activeRow = document.querySelector(this.activeRowAttr)

    if (!this.activeButton.getAttribute(selectors.DATA_PARENT)) {
      return console.error(messages.NO_PARENT_ERROR(this.activeAccordionRowId))
    }

    this.activeContainerId = this.activeButton.getAttribute(selectors.DATA_PARENT)
    this.activeContainerAttr = `[${selectors.ACCORDION_CONTAINER}='${this.activeContainerId}']`

    if (!document.querySelector(this.activeContainerAttr)) {
      return console.error(messages.NO_ACCORDION_ERROR(this.activeContainerId))
    }

    this.activeContainer = document.querySelector(this.activeContainerAttr)
    this.activeContent = document.getElementById(this.activeAccordionRowId)

    const accordionButtonState = this.activeRow.getAttribute(selectors.DATA_VISIBLE)

    this.activeButtonExpandState = accordionButtonState === "true" ? "false" : "true"
    this.activeContentHiddenState = this.activeButtonExpandState === "false" ? "true" : "false"

    this._closeAllIfToggleable()
    this._toggleSelectedAccordion()
  }

  /**
   * If a keypress is the spacebar on a button, open its accordion content.
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

    const allContentAttr = `${this.activeContainerAttr} [${selectors.ARIA_HIDDEN}]`
    const allRows = this._getElements(`${this.activeContainerAttr} [${selectors.DATA_VISIBLE}]`)
    const allContent = this._getElements(allContentAttr)
    const allButtons = this._getElements(`${this.activeContainerAttr} [${selectors.DATA_TARGET}]`)

    allContent.forEach(content => {
      if (!(content === this.activeContent)) content.style.maxHeight = null
    })

    this._getFocusableElements(allContentAttr).forEach(element => {
      element.setAttribute(selectors.TABINDEX, "-1")
    })

    this._toggleAttributeInCollection(allRows, selectors.DATA_VISIBLE, "true", "false")
    this._toggleAttributeInCollection(allButtons, selectors.ARIA_EXPANDED, "true", "false")
    this._toggleAttributeInCollection(allContent, selectors.ARIA_HIDDEN, "false", "true")
  }

  /**
   * Toggle the currently selected accordion button's content.
   */
  _toggleSelectedAccordion() {
    this.activeRow.setAttribute(selectors.DATA_VISIBLE, this.activeButtonExpandState)
    this.activeButton.setAttribute(selectors.ARIA_EXPANDED, this.activeButtonExpandState)
    this.activeContent.setAttribute(selectors.ARIA_HIDDEN, this.activeContentHiddenState)

    const activeContentBlock = `#${this.activeAccordionRowId}`
    this._getFocusableElements(activeContentBlock).forEach(element => {
      const value = this.activeButtonExpandState === "true" ? "0" : "-1"
      element.setAttribute(selectors.TABINDEX, value)
    })

    if (this.activeContent.style.maxHeight) {
      this.activeContent.style.maxHeight = null
    } else {
      this.activeContent.style.maxHeight = `${this.activeContent.scrollHeight}px`
    }
  }

  /**
   * Toggles a single attribute of a series of elements.
   */
  _toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
    elements.forEach(element => {
      if (element.hasAttribute(attributeName, currentValue)) {
        element.setAttribute(attributeName, newValue)
      }
    })
  }
}
