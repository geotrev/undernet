import Utils, { getFocusableElements, dom } from "./utils"

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
    this._accordionButtons = dom.findAll(accordionButtonSelector)

    if (this._accordionButtons.length) {
      this._accordionButtons.forEach(instance => {
        this._setup(instance)
        instance.addEventListener(Events.CLICK, this._render)
      })
    }
  }

  stop() {
    this._accordionButtons.forEach(instance => {
      instance.removeEventListener(Events.CLICK, this._render)
    })
  }

  // private

  _setup(instance) {
    const buttonTargetId = dom.attr(instance, Selectors.DATA_TARGET)
    const accordionId = dom.attr(instance, Selectors.DATA_PARENT)
    const buttonContent = dom.find(`#${buttonTargetId}`)

    if (!accordionId) {
      throw new Error(Messages.NO_ACCORDION_ID_ERROR(buttonTargetId))
    }

    if (!buttonContent) {
      throw new Error(Messages.NO_CONTENT_ERROR(buttonTargetId))
    }

    const accordionRowAttr = this._getAccordionRowAttr(buttonTargetId)
    const accordionRow = dom.find(accordionRowAttr)

    if (!accordionRow) {
      throw new Error(Messages.NO_ROW_ERROR(buttonTargetId))
    }

    const buttonId = instance.id

    if (!buttonId) {
      throw new Error(Messages.NO_HEADER_ID_ERROR(accordionRowAttr))
    }

    const buttonContentChildren = getFocusableElements(`#${buttonContent.id}`)

    dom.attr(instance, Selectors.ARIA_CONTROLS, buttonTargetId)
    dom.attr(buttonContent, Selectors.ARIA_LABELLEDBY, buttonId)

    const contentShouldExpand = dom.attr(accordionRow, Selectors.DATA_VISIBLE)

    if (!contentShouldExpand) {
      throw new Error(Messages.NO_VISIBLE_ERROR(buttonTargetId))
    }

    if (contentShouldExpand === "true") {
      dom.css(buttonContent, "maxHeight", `${buttonContent.scrollHeight}px`)
      dom.attr(instance, Selectors.ARIA_EXPANDED, "true")
      dom.attr(buttonContent, Selectors.ARIA_HIDDEN, "false")

      buttonContentChildren.forEach(element => {
        dom.attr(element, Selectors.TABINDEX, "0")
      })
    } else {
      dom.attr(instance, Selectors.ARIA_EXPANDED, "false")
      dom.attr(buttonContent, Selectors.ARIA_HIDDEN, "true")

      buttonContentChildren.forEach(element => {
        dom.attr(element, Selectors.TABINDEX, "-1")
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

    const canExpandMultiple = dom.hasAttr(this._activeContainer, Selectors.DATA_TOGGLE_MULTIPLE)

    if (!canExpandMultiple) this._closeAllIfToggleable()

    this._toggleSelectedAccordion()

    this._activeRow = null
    this._activeButton = null
    this._activeContent = null
    this._activeContainer = null
  }

  _setActiveContent() {
    this._activeContent = dom.find(`#${this._activeAccordionRowId}`)
  }

  _setVisibleState() {
    const accordionButtonState = dom.attr(this._activeRow, Selectors.DATA_VISIBLE)
    this._nextButtonExpandState = accordionButtonState === "true" ? "false" : "true"
    this._nextContentHiddenState = this._nextButtonExpandState === "false" ? "true" : "false"
  }

  _setIds() {
    this._activeContainerId = dom.attr(this._activeButton, Selectors.DATA_PARENT)
    this._activeAccordionRowId = dom.attr(this._activeButton, Selectors.DATA_TARGET)
  }

  _setActiveContainer() {
    this._activeContainerAttr = `[${Selectors.DATA_ACCORDION}='${this._activeContainerId}']`
    this._activeContainer = dom.find(this._activeContainerAttr)
  }

  _setActiveRow() {
    this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId)
    this._activeRow = dom.find(this._activeRowAttr)
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
    const allContentAttr = `${this._activeContainerAttr} > [${Selectors.DATA_ACCORDION_ROW}] > [${
      Selectors.ARIA_HIDDEN
    }]`
    const allContent = dom.findAll(allContentAttr)
    const accordionButtonSelector = this._getAccordionButtonSelector(this._activeContainerAttr)
    const allButtons = dom.findAll(accordionButtonSelector)
    const allRows = dom.findAll(`${this._activeContainerAttr} > [${Selectors.DATA_ACCORDION_ROW}]`)

    allContent
      .filter(content => content !== this._activeContent)
      .forEach(content => dom.css(content, "maxHeight", null))

    getFocusableElements(allContentAttr).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    this._toggleAttributeInCollection(allRows, Selectors.DATA_VISIBLE, "false")
    this._toggleAttributeInCollection(allButtons, Selectors.ARIA_EXPANDED, "false")
    this._toggleAttributeInCollection(allContent, Selectors.ARIA_HIDDEN, "true")
  }

  _toggleSelectedAccordion() {
    dom.attr(this._activeRow, Selectors.DATA_VISIBLE, this._nextButtonExpandState)
    dom.attr(this._activeButton, Selectors.ARIA_EXPANDED, this._nextButtonExpandState)
    dom.attr(this._activeContent, Selectors.ARIA_HIDDEN, this._nextContentHiddenState)

    getFocusableElements(`#${this._activeAccordionRowId}`).forEach(element => {
      const value = this._nextButtonExpandState === "true" ? "0" : "-1"
      dom.attr(element, Selectors.TABINDEX, value)
    })

    if (dom.css(this._activeContent, "maxHeight")) {
      dom.css(this._activeContent, "maxHeight", null)
    } else {
      dom.css(this._activeContent, "maxHeight", `${this._activeContent.scrollHeight}px`)
    }
  }

  _toggleAttributeInCollection(elements, attributeName, newValue) {
    elements.forEach(element => dom.attr(element, attributeName, newValue))
  }
}
