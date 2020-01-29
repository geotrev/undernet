import {
  getFocusableElements,
  dom,
  getPageBaseFontSize,
  log,
  startComponent,
  stopComponent,
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
    this._setup = this._setup.bind(this)
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

  _setup(instance) {
    const { trigger, id } = this._getCollapsibleData(instance)

    if (!id) {
      log(Messages.NO_COLLAPSIBLE_ID_ERROR)
      return false
    }

    if (!trigger) {
      log(Messages.NO_TRIGGER_ERROR(id))
      return false
    }

    const collapsibleContentId = `#${id}`
    const collapsibleContent = dom.find(collapsibleContentId, instance)

    if (!collapsibleContent) {
      log(Messages.NO_CONTENT_ERROR(id))
      return false
    }

    if (!trigger.id) {
      log(Messages.NO_TRIGGER_ID_ERROR(id))
      return false
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
    this._activeTrigger = null
    this._activeContent = null
  }

  _toggleCollapsible() {
    dom.setAttr(this._activeCollapsible, Selectors.DATA_VISIBLE, this._nextAriaExpandedState)
    dom.setAttr(this._activeTrigger, Selectors.ARIA_EXPANDED, this._nextAriaExpandedState)
    dom.setAttr(this._activeContent, Selectors.ARIA_HIDDEN, this._nextAriaHiddenState)

    getFocusableElements(`#${this._activeId}`).forEach(element => {
      const value = this._nextAriaExpandedState === "true" ? "0" : "-1"
      dom.setAttr(element, Selectors.TABINDEX, value)
    })

    if (dom.getStyle(this._activeContent, CssProperties.MAX_HEIGHT)) {
      dom.setStyle(this._activeContent, CssProperties.MAX_HEIGHT, null)
    } else {
      dom.setStyle(
        this._activeContent,
        CssProperties.MAX_HEIGHT,
        this._getFontSizeEm(this._activeContent.scrollHeight)
      )
    }
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

  _getFontSizeEm(pixels) {
    return `${pixels / getPageBaseFontSize()}rem`
  }
}
