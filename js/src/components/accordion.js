"use strict"

import Utils from "../utils"

const Selectors = {
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
  }

  // all accordions
  #accordionButtons = []
  #accordionContentsAttr = ""
  #accordionContents = []

  // active accordion
  #activeContainer = {}
  #activeButton = {}
  #activeAccordionRowId = ""
  #activeRowAttr = ""
  #activeRow = ""
  #activeContainerId = ""
  #activeContainerAttr = ""
  #activeContent = {}
  #activeButtonExpandState = ""
  #activeContentHiddenState = ""

  // public

  /**
   * Sets up accordion components and listens to buttons for events.
   * Begin listening to [data-accordion-button] elements
   */
  start() {
    this.#accordionButtons = this.getElements(
      `[${Selectors.ACCORDION_CONTAINER}] [${Selectors.DATA_TARGET}]`,
    )

    if (this.#accordionButtons.length) {
      this.#accordionButtons.forEach(button => {
        this.#setupAccordion(button)
        button.addEventListener(Events.CLICK, this.#render)
      })
    }
  }

  /**
   * Stop listening to accordion button events.
   */
  stop() {
    this.#accordionButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this.#render)
    })
  }

  // private

  /**
   * Add initial attributes to accordion elements.
   * @param {Element} button - A button element that triggers an accordion.
   */
  #setupAccordion(button) {
    const buttonId = button.getAttribute(Selectors.DATA_TARGET)

    if (!document.getElementById(buttonId)) {
      return console.error(Messages.NO_CONTENT_ERROR(buttonId))
    }

    const buttonContent = document.getElementById(buttonId)
    const accordionRowAttr = this.#getAccordionRowAttr(buttonId)

    if (!document.querySelector(accordionRowAttr)) {
      return console.error(Messages.NO_ROW_ERROR(buttonId))
    }

    const accordionRow = document.querySelector(accordionRowAttr)
    const buttonHeaderAttr = this.#getPossibleAccordionHeaderAttrs(accordionRowAttr)
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
   * Build a selector string to be passed into querySelectorAll() / _getElements()
   * @param {String} attr - A unique attribute.
   * @return {String} - String of possible header selectors
   */
  #getPossibleAccordionHeaderAttrs(attr) {
    return `${attr} h1, ${attr} h2, ${attr} h3, ${attr} h4, ${attr} h5, ${attr} h6`
  }

  /**
   * Return a unique accordion row attribute selector.
   * @param {String} id - An id value associated with a given Selectors.DATA_TARGET
   * @return {String} - A unique accordion row selector.
   */
  #getAccordionRowAttr(id) {
    return `[${Selectors.ACCORDION_ROW}='${id}']`
  }

  /**
   * Open accordion content associated with an accordion button.
   * @param {Object} event - The event object.
   */
  #render = event => {
    event.preventDefault()

    this.#activeButton = event.target
    this.#activeAccordionRowId = this.#activeButton.getAttribute(Selectors.DATA_TARGET)

    this.#activeRowAttr = this.#getAccordionRowAttr(this.#activeAccordionRowId)
    this.#activeRow = document.querySelector(this.#activeRowAttr)

    if (!this.#activeButton.getAttribute(Selectors.DATA_PARENT)) {
      return console.error(Messages.NO_PARENT_ERROR(this.#activeAccordionRowId))
    }

    this.#activeContainerId = this.#activeButton.getAttribute(Selectors.DATA_PARENT)
    this.#activeContainerAttr = `[${Selectors.ACCORDION_CONTAINER}='${this.#activeContainerId}']`

    if (!document.querySelector(this.#activeContainerAttr)) {
      return console.error(Messages.NO_ACCORDION_ERROR(this.#activeContainerId))
    }

    this.#activeContainer = document.querySelector(this.#activeContainerAttr)
    this.#activeContent = document.getElementById(this.#activeAccordionRowId)

    const accordionButtonState = this.#activeRow.getAttribute(Selectors.DATA_VISIBLE)

    this.#activeButtonExpandState = accordionButtonState === "true" ? "false" : "true"
    this.#activeContentHiddenState = this.#activeButtonExpandState === "false" ? "true" : "false"

    this.#closeAllIfToggleable()
    this.#toggleSelectedAccordion()
  }

  /**
   * If toggling multiple rows at once isn't enabled, close all rows except the selected one.
   * This ensures the selected one can be closed if it's already open.
   */
  #closeAllIfToggleable() {
    if (this.#activeContainer.hasAttribute(Selectors.DATA_TOGGLE_MULTIPLE)) return

    const allContentAttr = `${this.#activeContainerAttr} [${Selectors.ARIA_HIDDEN}]`
    const allRows = this.getElements(`${this.#activeContainerAttr} [${Selectors.DATA_VISIBLE}]`)
    const allContent = this.getElements(allContentAttr)
    const allButtons = this.getElements(`${this.#activeContainerAttr} [${Selectors.DATA_TARGET}]`)

    allContent.forEach(content => {
      if (!(content === this.#activeContent)) content.style.maxHeight = null
    })

    this.getFocusableElements(allContentAttr).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    this.#toggleAttributeInCollection(allRows, Selectors.DATA_VISIBLE, "true", "false")
    this.#toggleAttributeInCollection(allButtons, Selectors.ARIA_EXPANDED, "true", "false")
    this.#toggleAttributeInCollection(allContent, Selectors.ARIA_HIDDEN, "false", "true")
  }

  /**
   * Toggle the currently selected accordion button's content.
   */
  #toggleSelectedAccordion() {
    this.#activeRow.setAttribute(Selectors.DATA_VISIBLE, this.#activeButtonExpandState)
    this.#activeButton.setAttribute(Selectors.ARIA_EXPANDED, this.#activeButtonExpandState)
    this.#activeContent.setAttribute(Selectors.ARIA_HIDDEN, this.#activeContentHiddenState)

    const activeContentBlock = `#${this.#activeAccordionRowId}`
    this.getFocusableElements(activeContentBlock).forEach(element => {
      const value = this.#activeButtonExpandState === "true" ? "0" : "-1"
      element.setAttribute(Selectors.TABINDEX, value)
    })

    if (this.#activeContent.style.maxHeight) {
      this.#activeContent.style.maxHeight = null
    } else {
      this.#activeContent.style.maxHeight = `${this.#activeContent.scrollHeight}px`
    }
  }

  /**
   * Toggles a single attribute of a series of elements.
   * @param {Array} elements - An array of elements to be operated on.
   * @param {String} attributeName - An attribute to be changed.
   * @param {String} currentValue - The current value of attributeName
   * @param {String} newValue - The new value of attributeName
   */
  #toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
    elements.forEach(element => {
      if (element.hasAttribute(attributeName, currentValue)) {
        element.setAttribute(attributeName, newValue)
      }
    })
  }
}
