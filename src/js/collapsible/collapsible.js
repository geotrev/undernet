import { log, ComponentEngine, throttle } from "../helpers"

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
    ComponentEngine.start({ id, attribute: Selectors.DATA_COLLAPSIBLE, thisArg: this })
  }

  stop(id) {
    ComponentEngine.stop({
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
    const content = instance.querySelector(contentId)

    if (!content) {
      log(Messages.NO_CONTENT_ERROR(id))
      return false
    }

    trigger.setAttribute(Selectors.ARIA_CONTROLS, id)
    content.setAttribute(Selectors.ARIA_LABELLEDBY, trigger.id)

    const contentIsVisible = instance.getAttribute(Selectors.DATA_VISIBLE) === "true"

    if (contentIsVisible) {
      instance.setAttribute(Selectors.DATA_VISIBLE, "true")
      trigger.setAttribute(Selectors.ARIA_EXPANDED, "true")
      content.setAttribute(Selectors.ARIA_HIDDEN, "false")
      content.style[CssProperties.HEIGHT] = `${content.scrollHeight}px`
      content.style[CssProperties.VISIBILITY] = CssValues.VISIBLE
    } else {
      instance.setAttribute(Selectors.DATA_VISIBLE, "false")
      trigger.setAttribute(Selectors.ARIA_EXPANDED, "false")
      content.setAttribute(Selectors.ARIA_HIDDEN, "true")
    }

    requestAnimationFrame(() => {
      trigger.classList.add(Selectors.TRIGGER_READY_CLASS)
      content.classList.add(Selectors.CONTENT_READY_CLASS)
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
    this._activeContent.style[CssProperties.HEIGHT] = CssValues.AUTO
    this._activeContent.removeEventListener(Events.TRANSITIONEND, this._handleTransitionEnd)
  }

  _toggleCollapsible() {
    this._activeCollapsible.setAttribute(Selectors.DATA_VISIBLE, this._nextAriaExpandedState)
    this._activeTrigger.setAttribute(Selectors.ARIA_EXPANDED, this._nextAriaExpandedState)
    this._activeContent.setAttribute(Selectors.ARIA_HIDDEN, this._nextAriaHiddenState)

    const fullHeightValue = `${this._activeContent.scrollHeight}px`

    if (this._activeCollapsible.getAttribute(Selectors.DATA_VISIBLE) === "false") {
      return this._expandPanel(fullHeightValue)
    }

    this._collapsePanel(fullHeightValue)
  }

  _collapsePanel(height) {
    this._activeContent.style[CssProperties.HEIGHT] = height
    this._activeContent.style[CssProperties.VISIBILITY] = CssValues.VISIBLE

    this._activeContent.addEventListener(Events.TRANSITIONEND, this._handleTransitionEnd)
  }

  _expandPanel(height) {
    return requestAnimationFrame(() => {
      this._activeContent.style[CssProperties.HEIGHT] = height

      requestAnimationFrame(() => {
        this._activeContent.style[CssProperties.HEIGHT] = null
        this._activeContent.style[CssProperties.VISIBILITY] = CssValues.HIDDEN
      })
    })
  }

  _getCollapsibleData(instance) {
    const id = instance.getAttribute(Selectors.DATA_COLLAPSIBLE)
    const trigger = instance.querySelector(`[${Selectors.DATA_TARGET}='${id}']`)

    return { id, trigger }
  }

  _setActiveContent() {
    this._activeContent = this._activeCollapsible.querySelector(`#${this._activeId}`)
  }

  _setNextVisibleState() {
    const currentVisibleState = this._activeCollapsible.getAttribute(Selectors.DATA_VISIBLE)
    this._nextAriaExpandedState = currentVisibleState === "true" ? "false" : "true"
    this._nextAriaHiddenState = currentVisibleState === "false" ? "false" : "true"
  }

  _setIds() {
    this._activeId = this._activeTrigger.getAttribute(Selectors.DATA_TARGET)
  }

  _setActiveCollapsible() {
    this._activeCollapsible = document.querySelector(
      `[${Selectors.DATA_COLLAPSIBLE}='${this._activeId}']`
    )
  }
}
