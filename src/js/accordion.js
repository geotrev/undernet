import Collapsible from "./collapsible"
import { dom } from "./utils"

const Selectors = {
  // unique
  DATA_ACCORDION: "data-accordion",
  DATA_COLLAPSIBLE: "data-collapsible",
  DATA_TOGGLE_MULTIPLE: "data-toggle-multiple",
  // common
  DATA_PARENT: "data-parent",
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  // accessibility
  ARIA_EXPANDED: "aria-expanded",
  ARIA_HIDDEN: "aria-hidden",
}

const Messages = {
  NO_ACCORDION_ID_ERROR:
    "Could not initialize accordion; you must include a value for the 'data-accordion' attribute.",
  NO_ACCORDION_ERROR: id => `Could not find element matching [data-accordion='${id}']`,
}

/**
 * Class that instantiates or destroys all instances of accordion components on a page.
 *
 * @module Accordion
 * @extends Collapsible
 */
export default class Accordion extends Collapsible {
  constructor() {
    super()

    // events
    this._handleClick = this._handleClick.bind(this)

    // all accordions
    this._accordions = []

    // active accordion
    this._activeAccordionId = ""
    this._activeAccordion = {}
    this._toggleMultipleEnabled = false
  }

  // public

  start() {
    this._accordions = dom.findAll(`[${Selectors.DATA_ACCORDION}]`)

    if (this._accordions) {
      super.start({ controlled: true, onClick: this._handleClick })
    }
  }

  // private

  _handleClick(event) {
    const activeTrigger = event.target

    super._handleClick(event)

    this._setActiveAccordionId(activeTrigger)

    if (!this._activeAccordionId) {
      console.warn(Messages.NO_ACCORDION_ID_ERROR)
      return
    }

    this._setActiveAccordion()

    if (!this._activeAccordion) {
      console.warn(Messages.NO_ACCORDION_ERROR(this._activeAccordionId))
      return
    }

    this._setToggleMultiple()

    this._closeAllCollapsibles(activeTrigger)
  }

  _closeAllCollapsibles(activeTrigger) {
    if (this._toggleMultipleEnabled) return

    const collapsibleTriggerAttr = `[${Selectors.DATA_ACCORDION}='${this._activeAccordionId}'] [${Selectors.DATA_PARENT}='${this._activeAccordionId}']`
    const openCollapsibles = dom
      .findAll(collapsibleTriggerAttr, this._activeAccordion)
      .filter(trigger => trigger !== activeTrigger && this._isExpanded(trigger))

    if (openCollapsibles.length && this._isExpanded(activeTrigger)) {
      openCollapsibles.forEach(this._closeCollapsible)
    }
  }

  _closeCollapsible(trigger) {
    const id = dom.getAttr(trigger, Selectors.DATA_TARGET)
    const collapsible = dom.find(`[${Selectors.DATA_COLLAPSIBLE}='${id}']`)
    const content = dom.find(`#${id}`, collapsible)
    const nextAriaExpandState = "false"
    const nextAriaHiddenState = "true"

    super.toggleCollapsible({
      id,
      collapsible,
      trigger,
      content,
      nextAriaExpandState,
      nextAriaHiddenState,
    })
  }

  _isExpanded(trigger) {
    const id = dom.getAttr(trigger, Selectors.DATA_TARGET)
    const collapsible = dom.find(
      `[${Selectors.DATA_ACCORDION}='${this._activeAccordionId}'] [${Selectors.DATA_COLLAPSIBLE}='${id}']`
    )

    return dom.getAttr(collapsible, Selectors.DATA_VISIBLE) === "true"
  }

  _setActiveAccordionId(trigger) {
    this._activeAccordionId = dom.getAttr(trigger, Selectors.DATA_PARENT)
  }

  _setActiveAccordion() {
    this._activeAccordion = dom.find(`[${Selectors.DATA_ACCORDION}='${this._activeAccordionId}']`)
  }

  _setToggleMultiple() {
    this._toggleMultipleEnabled = dom.hasAttr(this._activeAccordion, Selectors.DATA_TOGGLE_MULTIPLE)
  }
}
