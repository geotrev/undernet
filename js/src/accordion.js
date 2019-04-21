import Utils, { getFocusableElements, nodeListToArray } from "./utils"

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
    `Could not find accordion row with [data-visible] attribute associated with [data-target='${id}'].`,
  NO_ROW_ERROR: id => `Could not find [data-accordion-row] associated with [data-target='${id}'].`,
  NO_HEADER_ID_ERROR: attr => `Could not find an id on your header associated with ${attr}.`,
  NO_ACCORDION_ID_ERROR: id =>
    `Could not find [data-accordion] attribute associated with [data-target='${id}'].`,
  NO_CONTENT_ERROR: id =>
    `Could not find accordion content block with id '${id}'; should match trigger with [data-target='${id}'].`,
}

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
    this._headers = ["h1", "h2", "h3", "h4", "h5", "h6"]
  }

  // public

  start() {
    const accordionButtonSelector = this._getAccordionButtonSelector(
      `[${Selectors.DATA_ACCORDION}]`
    )
    this._accordionButtons = nodeListToArray(accordionButtonSelector)

    if (this._accordionButtons.length) {
      this._accordionButtons.forEach(button => {
        this._setupAccordion(button)
        button.addEventListener(Events.CLICK, this._render)
      })
    }
  }

  stop() {
    this._accordionButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this._render)
    })
  }

  // private

  _setupAccordion(button) {
    const buttonId = button.getAttribute(Selectors.DATA_TARGET)
    const accordionId = button.getAttribute(Selectors.DATA_PARENT)
    const buttonContent = document.getElementById(buttonId)

    if (!accordionId) {
      throw new Error(Messages.NO_ACCORDION_ID_ERROR(buttonId))
    }

    if (!buttonContent) {
      throw new Error(Messages.NO_CONTENT_ERROR(buttonId))
    }

    const accordionRowAttr = this._getAccordionRowAttr(buttonId)
    const accordionRow = document.querySelector(accordionRowAttr)

    if (!accordionRow) {
      throw new Error(Messages.NO_ROW_ERROR(buttonId))
    }

    const buttonHeaderSelector = this._headers.join(", ")
    const buttonHeader = accordionRow.querySelector(buttonHeaderSelector)

    if (!buttonHeader.id) {
      throw new Error(Messages.NO_HEADER_ID_ERROR(accordionRowAttr))
    }

    const buttonContentChildren = getFocusableElements(`#${buttonContent.id}`)

    button.setAttribute(Selectors.ARIA_CONTROLS, buttonId)
    buttonContent.setAttribute(Selectors.ARIA_LABELLEDBY, buttonHeader.id)

    const contentShouldExpand = accordionRow.getAttribute(Selectors.DATA_VISIBLE)

    if (!contentShouldExpand) {
      throw new Error(Messages.NO_VISIBLE_ERROR(buttonId))
    }

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

  _render(event) {
    event.preventDefault()

    this._activeButton = event.target

    this._setIds()
    this._setActiveRow()
    this._setActiveContainer()
    this._setActiveContent()
    this._setVisibleState()

    const canExpandMultiple = this._activeContainer.hasAttribute(Selectors.DATA_TOGGLE_MULTIPLE)

    if (!canExpandMultiple) this._closeAllIfToggleable()

    this._toggleSelectedAccordion()

    this._activeRow = null
    this._activeButton = null
    this._activeContent = null
    this._activeContainer = null
  }

  _setActiveContent() {
    this._activeContent = document.getElementById(this._activeAccordionRowId)
  }

  _setVisibleState() {
    const accordionButtonState = this._activeRow.getAttribute(Selectors.DATA_VISIBLE)
    this._nextButtonExpandState = accordionButtonState === "true" ? "false" : "true"
    this._nextContentHiddenState = this._nextButtonExpandState === "false" ? "true" : "false"
  }

  _setIds() {
    this._activeContainerId = this._activeButton.getAttribute(Selectors.DATA_PARENT)
    this._activeAccordionRowId = this._activeButton.getAttribute(Selectors.DATA_TARGET)
  }

  _setActiveContainer() {
    this._activeContainerAttr = `[${Selectors.DATA_ACCORDION}='${this._activeContainerId}']`
    this._activeContainer = document.querySelector(this._activeContainerAttr)
  }

  _setActiveRow() {
    this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId)
    this._activeRow = document.querySelector(this._activeRowAttr)
  }

  _getAccordionButtonSelector(attr) {
    return this._headers
      .map(header => {
        return `${attr} > [${Selectors.DATA_ACCORDION_ROW}] > ${header} [${Selectors.DATA_TARGET}]`
      })
      .join(", ")
  }

  _getAccordionRowAttr(id) {
    return `[${Selectors.DATA_ACCORDION_ROW}='${id}']`
  }

  _closeAllIfToggleable() {
    // prettier-ignore
    const allContentAttr = `${this._activeContainerAttr} > [${Selectors.DATA_ACCORDION_ROW}] > [${Selectors.ARIA_HIDDEN}]`
    const accordionButtonSelector = this._getAccordionButtonSelector(this._activeContainerAttr)
    const allButtons = nodeListToArray(accordionButtonSelector)
    const allContent = nodeListToArray(allContentAttr)

    // prettier-ignore
    const allRows = nodeListToArray(`${this._activeContainerAttr} > [${Selectors.DATA_ACCORDION_ROW}]`)

    allContent
      .filter(content => content !== this._activeContent)
      .forEach(content => (content.style.maxHeight = null))

    getFocusableElements(allContentAttr).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    this._toggleAttributeInCollection(allRows, Selectors.DATA_VISIBLE, "false")
    this._toggleAttributeInCollection(allButtons, Selectors.ARIA_EXPANDED, "false")
    this._toggleAttributeInCollection(allContent, Selectors.ARIA_HIDDEN, "true")
  }

  _toggleSelectedAccordion() {
    this._activeRow.setAttribute(Selectors.DATA_VISIBLE, this._nextButtonExpandState)
    this._activeButton.setAttribute(Selectors.ARIA_EXPANDED, this._nextButtonExpandState)
    this._activeContent.setAttribute(Selectors.ARIA_HIDDEN, this._nextContentHiddenState)

    getFocusableElements(`#${this._activeAccordionRowId}`).forEach(element => {
      const value = this._nextButtonExpandState === "true" ? "0" : "-1"
      element.setAttribute(Selectors.TABINDEX, value)
    })

    if (this._activeContent.style.maxHeight) {
      this._activeContent.style.maxHeight = null
    } else {
      this._activeContent.style.maxHeight = `${this._activeContent.scrollHeight}px`
    }
  }

  _toggleAttributeInCollection(elements, attributeName, newValue) {
    elements.forEach(element => element.setAttribute(attributeName, newValue))
  }
}
