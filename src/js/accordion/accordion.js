import Collapsible from "../collapsible"
import { dom, createFocusTrap, isBrowserEnv, setComponents, log } from "../helpers"
import { Selectors, Messages } from "./constants"

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
    this._setFocusTraps = this._setFocusTraps.bind(this)

    // all accordions
    this._accordions = []
    this._focusTraps = []
    this._accordionScopes = new Map()

    // active accordion
    this._activeAccordionId = ""
    this._activeAccordion = {}
    this._toggleMultipleEnabled = false
  }

  // public

  start(scopeId) {
    if (!isBrowserEnv) return

    const options = { controlled: true, onClick: this._handleClick }

    setComponents({
      thisArg: this,
      scopeId,
      scopeKey: "_accordionScopes",
      componentAttribute: Selectors.DATA_ACCORDION,
      globalKey: "_accordions",
      errorMessage: Messages.NO_ACCORDION_ID_ERROR,
    })

    super.start(scopeId, options)

    if (scopeId && this._accordionScopes.has(scopeId)) {
      this._accordionScopes.get(scopeId).elements.forEach(this._setFocusTraps)
    } else if (this._accordions.length) {
      this._accordions.forEach(this._setFocusTraps)
    }
  }

  stop(scopeId) {
    if (!isBrowserEnv) return

    if (scopeId && this._accordionScopes.has(scopeId)) {
      this._accordionScopes.get(scopeId).elements.forEach(instance => {
        super.stop(scopeId)
        this._unsetFocusTraps(instance)
      })

      this._accordionScopes.delete(scopeId)
    } else if (this._accordions.length) {
      this._accordions.forEach(instance => {
        super.stop(scopeId)
        this._unsetFocusTraps(instance)
      })

      this._accordions = []
    }
  }

  // private

  _unsetFocusTraps(instance) {
    const id = dom.getAttr(instance, Selectors.DATA_ACCORDION)

    if (this._focusTraps[id]) this._focusTraps[id].stop()
  }

  _setFocusTraps(instance) {
    const id = dom.getAttr(instance, Selectors.DATA_ACCORDION)

    if (!id) {
      log(Messages.NO_ACCORDION_ID_ERROR)
      return
    }

    const triggers = dom.findAll(`[${Selectors.DATA_PARENT}='${id}']`, instance)
    const collapsibles = dom.findAll(`[${Selectors.DATA_COLLAPSIBLE}]`, instance)

    if (triggers.length !== collapsibles.length) {
      log(
        Messages.TRIGGERS_TO_COLLAPSIBLES_LENGTH_WARNING(id, triggers.length, collapsibles.length),
        "warn"
      )
    }

    this._focusTraps[id] = createFocusTrap(null, {
      children: triggers,
      useArrows: true,
    })

    this._focusTraps[id].start()
  }

  _handleClick(event) {
    const activeTrigger = event.target

    super._handleClick(event)
    this._setActiveAccordionId(activeTrigger)

    if (!this._activeAccordionId) {
      log(Messages.NO_ACCORDION_ID_ERROR)
      return
    }

    this._setActiveAccordion()

    if (!this._activeAccordion) {
      log(Messages.NO_ACCORDION_ERROR(this._activeAccordionId))
      return
    }

    this._setToggleMultiple()
    this._closeAllCollapsibles(activeTrigger)
  }

  _closeAllCollapsibles(activeTrigger) {
    if (this._toggleMultipleEnabled) return

    const openCollapsibles = dom
      .findAll(`[${Selectors.DATA_PARENT}='${this._activeAccordionId}']`, this._activeAccordion)
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
