import {
  getFocusableElements,
  dom,
  isBrowserEnv,
  getPageBaseFontSize,
  log,
  setComponents,
} from "../helpers"

import { Selectors, CssProperties, Events, Messages } from "./constants"

// COMPONENT_ROLE is described using `aria-controls` for the collapsible UI pattern.

/**
 * Class that instantiates or destroys all instances of collapsible components on a page.
 *
 * @module Collapsible
 */
export default class Collapsible {
  constructor() {
    // events
    this._handleClick = this._handleClick.bind(this)
    this._setCollapsibles = this._setCollapsibles.bind(this)
    this._setup = this._setup.bind(this)
    this._teardown = this._teardown.bind(this)

    // all accordions
    this._collapsibles = []
    this._collapsibleTriggers = []
    this._collapsibleScopes = new Map()

    // active accordion
    this._activeCollapsible = {}
    this._activeTrigger = {}
    this._activeContent = {}
    this._activeCollapsibleId = ""
    this._nextAriaExpandedState = ""
    this._nextAriaHiddenState = ""
  }

  // public

  /**
   * Starts component instances.
   *
   * @param {{ controlled: Boolean, onClick: Function }} options
   */
  start(scopeId, options = {}) {
    if (!isBrowserEnv) return

    const { controlled, onClick } = options
    const filterFn = elements => this._setCollapsibles(elements, controlled)

    setComponents({
      thisArg: this,
      scopeId,
      scopeKey: "_collapsibleScopes",
      componentAttribute: Selectors.DATA_COLLAPSIBLE,
      globalKey: "_collapsibles",
      errorMessage: Messages.NO_COLLAPSIBLE_ID_ERROR,
      filterFn,
    })

    this._handleClickFn = onClick || this._handleClick.bind(this)

    if (scopeId && this._collapsibleScopes.has(scopeId)) {
      this._collapsibleScopes.get(scopeId).elements.forEach(this._setup)
    } else if (this._collapsibles.length) {
      this._collapsibles.forEach(this._setup)
    }
  }

  stop(scopeId) {
    if (!isBrowserEnv) return

    if (scopeId && this._collapsibleScopes.has(scopeId)) {
      this._collapsibleScopes.get(scopeId).elements.forEach(this._teardown)
      this._collapsibleScopes.delete(scopeId)
    } else if (this._collapsibles.length) {
      this._collapsibles.forEach(this._teardown)
      this._collapsibles = []
    }
  }

  /**
   * Toggles the collapsible.
   *
   * @param {{ collapsible: Element, trigger: Element, content: Element, id: String, nextAriaExpandState: String, nextAriaHiddenState: String }} metadata
   */
  toggleCollapsible(metadata = {}) {
    const { collapsible, trigger, content, id, nextAriaExpandState, nextAriaHiddenState } = metadata

    const collapsibleId = id || this._activeCollapsibleId
    const collapsibleInstance = collapsible || this._activeCollapsible
    const triggerInstance = trigger || this._activeTrigger
    const contentInstance = content || this._activeContent
    const nextAriaExpandStateValue = nextAriaExpandState || this._nextAriaExpandedState
    const nextAriaHiddenStateValue = nextAriaHiddenState || this._nextAriaHiddenState

    dom.setAttr(collapsibleInstance, Selectors.DATA_VISIBLE, nextAriaExpandStateValue)
    dom.setAttr(triggerInstance, Selectors.ARIA_EXPANDED, nextAriaExpandStateValue)
    dom.setAttr(contentInstance, Selectors.ARIA_HIDDEN, nextAriaHiddenStateValue)

    getFocusableElements(`#${collapsibleId}`).forEach(element => {
      const value = nextAriaExpandStateValue === "true" ? "0" : "-1"
      dom.setAttr(element, Selectors.TABINDEX, value)
    })

    if (dom.getStyle(contentInstance, CssProperties.MAX_HEIGHT)) {
      dom.setStyle(contentInstance, CssProperties.MAX_HEIGHT, null)
    } else {
      dom.setStyle(
        contentInstance,
        CssProperties.MAX_HEIGHT,
        this._getFontSizeEm(contentInstance.scrollHeight)
      )
    }
  }

  // private

  _setup(instance) {
    const { trigger, id } = this._getCollapsibleData(instance)
    const collapsibleContentId = `#${id}`
    const collapsibleContent = dom.find(collapsibleContentId, instance)

    if (!collapsibleContent) {
      log(Messages.NO_CONTENT_ERROR(id))
      return
    }

    if (!trigger.id) {
      log(Messages.NO_TRIGGER_ID_ERROR(id))
      return
    }

    dom.setAttr(trigger, Selectors.ARIA_CONTROLS, id)
    dom.setAttr(collapsibleContent, Selectors.ARIA_LABELLEDBY, trigger.id)

    const collapsibleContentFocusableChildren = getFocusableElements(collapsibleContentId)
    const contentShouldExpand = dom.getAttr(instance, Selectors.DATA_VISIBLE)

    if (contentShouldExpand === "false") {
      dom.setAttr(trigger, Selectors.ARIA_EXPANDED, "false")
      dom.setAttr(collapsibleContent, Selectors.ARIA_HIDDEN, "true")

      collapsibleContentFocusableChildren.forEach(element => {
        dom.setAttr(element, Selectors.TABINDEX, "-1")
      })
    } else {
      dom.setAttr(instance, Selectors.DATA_VISIBLE, "true")
      dom.setStyle(
        collapsibleContent,
        CssProperties.MAX_HEIGHT,
        this._getFontSizeEm(collapsibleContent.scrollHeight)
      )
      dom.setAttr(trigger, Selectors.ARIA_EXPANDED, "true")
      dom.setAttr(collapsibleContent, Selectors.ARIA_HIDDEN, "false")

      collapsibleContentFocusableChildren.forEach(element => {
        dom.setAttr(element, Selectors.TABINDEX, "0")
      })
    }

    this._collapsibleTriggers.push(trigger)
    trigger.addEventListener(Events.CLICK, this._handleClickFn)
  }

  _teardown(instance) {
    const { trigger } = this._getCollapsibleData(instance)
    trigger.removeEventListener(Events.CLICK, this._handleClickFn)
  }

  _handleClick(event) {
    event.preventDefault()

    this._activeTrigger = event.target

    this._setIds()
    this._setActiveCollapsible()
    this._setActiveContent()
    this._setNextVisibleState()
    this.toggleCollapsible()

    this._activeCollapsible = null
    this._activeTrigger = null
    this._activeContent = null
  }

  _getCollapsibleData(instance) {
    const id = dom.getAttr(instance, Selectors.DATA_COLLAPSIBLE)
    const collapsibleTriggerTargetAttr = this._getTargetAttr(id)
    const trigger = dom.find(collapsibleTriggerTargetAttr, instance)

    return { id, trigger }
  }

  _setCollapsibles(elements, controlled) {
    return elements.filter(instance => {
      const id = dom.getAttr(instance, Selectors.DATA_COLLAPSIBLE)

      if (!id) {
        log(Messages.NO_COLLAPSIBLE_ID_ERROR)
        return false
      }

      const collapsibleTriggerTargetAttr = this._getTargetAttr(id)
      const trigger = dom.find(collapsibleTriggerTargetAttr, instance)

      if (!trigger) {
        log(Messages.NO_TRIGGER_ERROR(id))
        return false
      }

      if (controlled) {
        return dom.hasAttr(trigger, Selectors.DATA_PARENT)
      }

      return !dom.hasAttr(trigger, Selectors.DATA_PARENT)
    })
  }

  _setActiveContent() {
    this._activeContent = dom.find(`#${this._activeCollapsibleId}`)
  }

  _setNextVisibleState() {
    const currentVisibleState = dom.getAttr(this._activeCollapsible, Selectors.DATA_VISIBLE)
    this._nextAriaExpandedState = currentVisibleState === "true" ? "false" : "true"
    this._nextAriaHiddenState = currentVisibleState === "false" ? "false" : "true"
  }

  _setIds() {
    this._activeCollapsibleId = dom.getAttr(this._activeTrigger, Selectors.DATA_TARGET)
  }

  _setActiveCollapsible() {
    this._activeCollapsible = dom.find(
      `[${Selectors.DATA_COLLAPSIBLE}='${this._activeCollapsibleId}']`
    )
  }

  _getTargetAttr(id) {
    return `[${Selectors.DATA_TARGET}='${id}']`
  }

  _getFontSizeEm(pixels) {
    return `${pixels / getPageBaseFontSize()}rem`
  }
}
