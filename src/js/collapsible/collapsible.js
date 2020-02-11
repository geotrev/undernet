import { dom, log, startComponent, stopComponent, throttle } from "../helpers"

import { Selectors, CssProperties, CssValues, Events, Messages } from "./constants"

// COMPONENT_ROLE is described using `aria-controls` for the collapsible UI pattern.

/**
 * Class that instantiates or destroys all instances of collapsible components on a page.
 *
 * @module Collapsible
 */
export default class Collapsible {
  constructor() {
    // events
    this._handleClick = throttle(this._handleClick.bind(this), 300)
    this._handleTransitionEnd = this._handleTransitionEnd.bind(this)
    this._validate = this._validate.bind(this)
    this._teardown = this._teardown.bind(this)

    // all accordions
    this._components = []

    // active accordion
    this._activeCollapsible = {}
    this._activeTrigger = {}
    this._activeContent = {}
    this._activeId = ""
    this._nextAriaExpandedState = ""
    this._nextAriaHiddenState = ""
  }

  // public

  start(id) {
    startComponent({ id, attribute: Selectors.DATA_COLLAPSIBLE, thisArg: this })
  }

  stop(id) {
    stopComponent({
      id,
      attribute: Selectors.DATA_COLLAPSIBLE,
      thisArg: this,
      activeNodeKey: "_activeCollapsible",
    })
  }

  // private

  _validate(instance) {
    const { trigger, id } = this._getCollapsibleData(instance)

    if (!id) {
      log(Messages.NO_COLLAPSIBLE_ID_ERROR)
      return false
    }

    if (!trigger) {
      log(Messages.NO_TRIGGER_ERROR(id))
      return false
    }

    if (!trigger.id) {
      log(Messages.NO_TRIGGER_ID_ERROR(id))
      return false
    }

    const contentId = `#${id}`
    const content = dom.find(contentId, instance)

    if (!content) {
      log(Messages.NO_CONTENT_ERROR(id))
      return false
    }

    dom.setAttr(trigger, Selectors.ARIA_CONTROLS, id)
    dom.setAttr(content, Selectors.ARIA_LABELLEDBY, trigger.id)

    const contentIsVisible = dom.getAttr(instance, Selectors.DATA_VISIBLE) === "true"

    if (contentIsVisible) {
      dom.setAttr(instance, Selectors.DATA_VISIBLE, "true")
      dom.setAttr(trigger, Selectors.ARIA_EXPANDED, "true")
      dom.setAttr(content, Selectors.ARIA_HIDDEN, "false")
      dom.setStyle(content, CssProperties.HEIGHT, `${content.scrollHeight}px`)
      dom.setStyle(content, CssProperties.VISIBILITY, CssValues.VISIBLE)
    } else {
      dom.setAttr(instance, Selectors.DATA_VISIBLE, "false")
      dom.setAttr(trigger, Selectors.ARIA_EXPANDED, "false")
      dom.setAttr(content, Selectors.ARIA_HIDDEN, "true")
    }

    requestAnimationFrame(() => {
      dom.addClass(trigger, Selectors.TRIGGER_READY_CLASS)
      dom.addClass(content, Selectors.CONTENT_READY_CLASS)
    })

    trigger.addEventListener(Events.CLICK, this._handleClick)

    return true
  }

  _teardown(instance) {
    const { trigger } = this._getCollapsibleData(instance)
    trigger.removeEventListener(Events.CLICK, this._handleClick)
  }

  _handleClick(event) {
    event.preventDefault()

    this._activeTrigger = event.target

    this._setIds()
    this._setActiveCollapsible()
    this._setActiveContent()
    this._setNextVisibleState()
    this._toggleCollapsible()

    this._activeCollapsible = null
  }

  _handleTransitionEnd() {
    dom.setStyle(this._activeContent, CssProperties.HEIGHT, CssValues.AUTO)
    this._activeContent.removeEventListener(Events.TRANSITIONEND, this._handleTransitionEnd)
  }

  _toggleCollapsible() {
    dom.setAttr(this._activeCollapsible, Selectors.DATA_VISIBLE, this._nextAriaExpandedState)
    dom.setAttr(this._activeTrigger, Selectors.ARIA_EXPANDED, this._nextAriaExpandedState)
    dom.setAttr(this._activeContent, Selectors.ARIA_HIDDEN, this._nextAriaHiddenState)

    const fullHeightValue = `${this._activeContent.scrollHeight}px`

    if (dom.getAttr(this._activeCollapsible, Selectors.DATA_VISIBLE) === "false") {
      return this._expandPanel(fullHeightValue)
    }

    this._collapsePanel(fullHeightValue)
  }

  _collapsePanel(height) {
    dom.setStyle(this._activeContent, CssProperties.HEIGHT, height)
    dom.setStyle(this._activeContent, CssProperties.VISIBILITY, CssValues.VISIBLE)

    this._activeContent.addEventListener(Events.TRANSITIONEND, this._handleTransitionEnd)
  }

  _expandPanel(height) {
    return requestAnimationFrame(() => {
      dom.setStyle(this._activeContent, CssProperties.HEIGHT, height)

      requestAnimationFrame(() => {
        dom.setStyle(this._activeContent, CssProperties.HEIGHT, null)
        dom.setStyle(this._activeContent, CssProperties.VISIBILITY, CssValues.HIDDEN)
      })
    })
  }

  _getCollapsibleData(instance) {
    const id = dom.getAttr(instance, Selectors.DATA_COLLAPSIBLE)
    const trigger = dom.find(`[${Selectors.DATA_TARGET}='${id}']`, instance)

    return { id, trigger }
  }

  _setActiveContent() {
    this._activeContent = dom.find(`#${this._activeId}`)
  }

  _setNextVisibleState() {
    const currentVisibleState = dom.getAttr(this._activeCollapsible, Selectors.DATA_VISIBLE)
    this._nextAriaExpandedState = currentVisibleState === "true" ? "false" : "true"
    this._nextAriaHiddenState = currentVisibleState === "false" ? "false" : "true"
  }

  _setIds() {
    this._activeId = dom.getAttr(this._activeTrigger, Selectors.DATA_TARGET)
  }

  _setActiveCollapsible() {
    this._activeCollapsible = dom.find(`[${Selectors.DATA_COLLAPSIBLE}='${this._activeId}']`)
  }
}
