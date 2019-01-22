"use strict"

import Utils from "../utils"

const Selectors = {
  // unique
  DATA_ACCORDION: "data-accordion",
  DATA_ACCORDION_ROW: "data-accordion-row",
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

const Events = {
  CLICK: "click",
  KEYDOWN: "keydown",
}

const Messages = {
  NO_VISIBLE_ERROR: id =>
    `Could not find parent with [data-visible] attribute associated with [data-target='${id}'].`,
  NO_ROW_ERROR: id => `Could not find [data-accordion-row] associated with ${id}.`,
  NO_HEADER_ID_ERROR: id => `Could not find header tag associated with [data-target='${id}'].`,
  NO_PARENT_ERROR: id => `Could not find [data-parent] associated with [data-target='${id}'].`,
  NO_CONTENT_ERROR: id =>
    `Could not find accordion content block with [id] ${id} associated with [data-target='${id}'].`,
}

/**
 * Accordion component class.
 * @module Accordion
 * @requires Utils
 */
export default class Accordion extends Utils {
  constructor() {
    super()

    // events
    this._render = this._render.bind(this)

    // all accordions
    this._accordionButtons = []
    this._accordionContentsAttr = ""
    this._accordionContents = []

    // active accordion
    this._activeContainer = {}
    this._activeButton = {}
    this._activeAccordionRowId = ""
    this._activeRowAttr = ""
    this._activeRow = ""
    this._activeContainerId = ""
    this._activeContainerAttr = ""
    this._activeContent = {}
    this._activeButtonExpandState = ""
    this._activeContentHiddenState = ""

    // other data
    this._headerLevels = [1, 2, 3, 4, 5, 6]
  }

  // public

  /**
   * Sets up accordion components and listens to buttons for events.
   * Begin listening to [data-accordion-button] elements
   */
  start() {
    const accordionButtonSelector = this._getPossibleAccordionButtonAttrs(
      `[${Selectors.DATA_ACCORDION}]`,
    )
    this._accordionButtons = this.getElements(accordionButtonSelector)

    if (this._accordionButtons.length) {
      this._accordionButtons.forEach(button => {
        this._setupAccordion(button)
        button.addEventListener(Events.CLICK, this._render)
      })
    }
  }

  /**
   * Stop listening to accordion button events.
   */
  stop() {
    this._accordionButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this._render)
    })
  }

  // private

  /**
   * Add initial attributes to accordion elements.
   * @param {Element} button - A button element that triggers an accordion.
   */
  _setupAccordion(button) {
    const buttonId = button.getAttribute(Selectors.DATA_TARGET)

    if (!document.getElementById(buttonId)) {
      return console.error(Messages.NO_CONTENT_ERROR(buttonId))
    }

    const buttonContent = document.getElementById(buttonId)
    const accordionRowAttr = this._getAccordionRowAttr(buttonId)

    if (!document.querySelector(accordionRowAttr)) {
      return console.error(Messages.NO_ROW_ERROR(buttonId))
    }

    const accordionRow = document.querySelector(accordionRowAttr)
    const buttonHeaderAttr = this._getPossibleAccordionHeaderAttrs(accordionRowAttr)
    const buttonHeader = this.getElements(buttonHeaderAttr)[0]

    if (!buttonHeader || !buttonHeader.id) {
      console.error(Messages.NO_HEADER_ID_ERROR(buttonId))
    }

    const buttonContentChildren = this.getFocusableElements(`#${buttonContent.id}`)

    button.setAttribute(Selectors.ARIA_CONTROLS, buttonId)
    buttonContent.setAttribute(Selectors.ARIA_LABELLEDBY, buttonHeader.id)

    if (!accordionRow.getAttribute(Selectors.DATA_VISIBLE)) {
      return console.error(Messages.NO_VISIBLE_ERROR(buttonId))
    }

    const contentShouldExpand = accordionRow.getAttribute(Selectors.DATA_VISIBLE)
    if (contentShouldExpand === "true") {
      buttonContent.style.maxHeight = `${buttonContent.scrollHeight}px`
      button.setAttribute(Selectors.ARIA_EXPANDED, "true")
      buttonContent.setAttribute(Selectors.ARIA_HIDDEN, "false")
      buttonContentChildren.forEach(element => {
        element.setAttribute(Selectors.TABINDEX, "0")
      })
    } else {
      button.setAttribute(Selectors.ARIA_EXPANDED, "false")
      buttonContent.setAttribute(Selectors.ARIA_HIDDEN, "true")
      buttonContentChildren.forEach(element => {
        element.setAttribute(Selectors.TABINDEX, "-1")
      })
    }
  }

  /**
   * Build a selector string to match possible accordion buttons
   * @param {String} attr - A unique attribute
   * @return {String} - String of possible button selectors
   */
  _getPossibleAccordionButtonAttrs(attr) {
    return this._headerLevels
      .map(
        num => `${attr} > [${Selectors.DATA_ACCORDION_ROW}] > h${num} [${Selectors.DATA_TARGET}]`,
      )
      .join(", ")
  }

  /**
   * Build a selector string to match possible accordion headers
   * @param {String} attr - A unique attribute
   * @return {String} - String of possible header selectors
   */
  _getPossibleAccordionHeaderAttrs(attr) {
    return this._headerLevels.map(num => `${attr} > h${num}`).join(", ")
  }

  /**
   * Build a unique accordion row attribute selector.
   * @param {String} id - An id value associated with a given Selectors.DATA_TARGET
   * @return {String} - A unique accordion row selector
   */
  _getAccordionRowAttr(id) {
    return `[${Selectors.DATA_ACCORDION_ROW}='${id}']`
  }

  /**
   * Open accordion content associated with an accordion button.
   * @param {Object} event - The event object
   */
  _render(event) {
    event.preventDefault()

    this._activeButton = event.target
    this._activeAccordionRowId = this._activeButton.getAttribute(Selectors.DATA_TARGET)

    this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId)
    this._activeRow = document.querySelector(this._activeRowAttr)

    if (!this._activeButton.getAttribute(Selectors.DATA_PARENT)) {
      return console.error(Messages.NO_PARENT_ERROR(this._activeAccordionRowId))
    }

    this._activeContainerId = this._activeButton.getAttribute(Selectors.DATA_PARENT)
    this._activeContainerAttr = `[${Selectors.DATA_ACCORDION}='${this._activeContainerId}']`

    if (!document.querySelector(this._activeContainerAttr)) {
      return console.error(Messages.NO_ACCORDION_ERROR(this._activeContainerId))
    }

    this._activeContainer = document.querySelector(this._activeContainerAttr)
    this._activeContent = document.getElementById(this._activeAccordionRowId)

    const accordionButtonState = this._activeRow.getAttribute(Selectors.DATA_VISIBLE)

    this._activeButtonExpandState = accordionButtonState === "true" ? "false" : "true"
    this._activeContentHiddenState = this._activeButtonExpandState === "false" ? "true" : "false"

    this._closeAllIfToggleable()
    this._toggleSelectedAccordion()
  }

  /**
   * If toggling multiple rows at once isn't enabled, close all rows except the selected one.
   * This ensures the selected one can be closed if it's already open.
   */
  _closeAllIfToggleable() {
    if (this._activeContainer.hasAttribute(Selectors.DATA_TOGGLE_MULTIPLE)) return

    const allContentAttr = `${this._activeContainerAttr} [${Selectors.ARIA_HIDDEN}]`
    const allRows = this.getElements(`${this._activeContainerAttr} [${Selectors.DATA_VISIBLE}]`)
    const allContent = this.getElements(allContentAttr)

    const accordionButtonSelector = this._getPossibleAccordionButtonAttrs(this._activeContainerAttr)
    const allButtons = this.getElements(accordionButtonSelector)

    allContent.forEach(content => {
      if (content !== this._activeContent) content.style.maxHeight = null
    })

    this.getFocusableElements(allContentAttr).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    this._toggleAttributeInCollection(allRows, Selectors.DATA_VISIBLE, "true", "false")
    this._toggleAttributeInCollection(allButtons, Selectors.ARIA_EXPANDED, "true", "false")
    this._toggleAttributeInCollection(allContent, Selectors.ARIA_HIDDEN, "false", "true")
  }

  /**
   * Toggle the currently selected accordion button's content.
   */
  _toggleSelectedAccordion() {
    this._activeRow.setAttribute(Selectors.DATA_VISIBLE, this._activeButtonExpandState)
    this._activeButton.setAttribute(Selectors.ARIA_EXPANDED, this._activeButtonExpandState)
    this._activeContent.setAttribute(Selectors.ARIA_HIDDEN, this._activeContentHiddenState)

    const activeContentBlock = `#${this._activeAccordionRowId}`
    this.getFocusableElements(activeContentBlock).forEach(element => {
      const value = this._activeButtonExpandState === "true" ? "0" : "-1"
      element.setAttribute(Selectors.TABINDEX, value)
    })

    if (this._activeContent.style.maxHeight) {
      this._activeContent.style.maxHeight = null
    } else {
      this._activeContent.style.maxHeight = `${this._activeContent.scrollHeight}px`
    }
  }

  /**
   * Toggles a single attribute of a series of elements.
   * @param {Array} elements - An array of elements to be operated on.
   * @param {String} attributeName - An attribute to be changed.
   * @param {String} currentValue - The current value of attributeName
   * @param {String} newValue - The new value of attributeName
   */
  _toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
    elements.forEach(element => {
      if (element.hasAttribute(attributeName, currentValue)) {
        element.setAttribute(attributeName, newValue)
      }
    })
  }
}
