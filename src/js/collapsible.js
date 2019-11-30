import { getFocusableElements, dom, isBrowserEnv, getPageBaseFontSize } from "./utils"

const Selectors = {
  // unique
  DATA_COLLAPSIBLE: "data-collapsible",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_LABELLEDBY: "aria-labelledby",
  TABINDEX: "tabindex",
}

const CssProperties = {
  MAX_HEIGHT: "maxHeight",
}

const Events = {
  CLICK: "click",
}

const Messages = {
  NO_COLLAPSIBLE_ID_ERROR:
    "Could not initialize collapsible; you must include a value for the 'data-collapsible' attribute.",
  NO_TRIGGER_ERROR: id =>
    `Could not find collapsible trigger with [data-target='${id}']; you can't have a collapsible without a trigger.`,
  NO_TRIGGER_ID_ERROR: id => `Could not find id on collapsible trigger with [data-target='${id}'].`,
  NO_CONTENT_ERROR: id =>
    `Could not find collapsible content with id '${id}'; you can't have a collapsible without content.`,
}

// COMPONENT_ROLE is described using `aria-controls` for the collapsible UI pattern.

/**
 * Class that instantiates or destroys all instances of collapsible components on a page.
 *
 * @module Collapsible
 */
export default class Collapsible {
  constructor() {
    // events
    this._setup = this._setup.bind(this)
    this._handleClick = this._handleClick.bind(this)

    // all accordions
    this._collapsibles = []
    this._collapsibleTriggers = []

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
  start(options = {}) {
    if (!isBrowserEnv) return
    const { controlled, onClick } = options

    this._setCollapsibles(controlled)
    this._handleClickFn = onClick || this._handleClick.bind(this)

    if (this._collapsibles.length) {
      this._collapsibles.forEach(this._setup)
    }
  }

  stop() {
    if (!isBrowserEnv) return

    this._collapsibleTriggers.forEach(trigger =>
      trigger.removeEventListener(Events.CLICK, this._handleClickFn)
    )
  }

  /**
   * Toggles the collapsible.
   *
   * @param {{ collapsible: Element, trigger: Element, content: Element, id: String, nextAriaExpandState: Boolean, nextAriaHiddenState: Boolean }} metadata
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
    const collapsibleId = dom.getAttr(instance, Selectors.DATA_COLLAPSIBLE)
    const collapseTriggerTargetAttr = this._getTargetAttr(collapsibleId)
    const collapsibleTrigger = dom.find(collapseTriggerTargetAttr, instance)
    const collapsibleContentId = `#${collapsibleId}`
    const collapsibleContent = dom.find(collapsibleContentId, instance)

    if (!collapsibleContent) {
      console.warning(Messages.NO_CONTENT_ERROR(collapsibleId))
      return
    }

    if (!collapsibleTrigger.id) {
      console.warning(Messages.NO_TRIGGER_ID_ERROR(collapsibleId))
      return
    }

    dom.setAttr(collapsibleTrigger, Selectors.ARIA_CONTROLS, collapsibleId)
    dom.setAttr(collapsibleContent, Selectors.ARIA_LABELLEDBY, collapsibleTrigger.id)

    const collapsibleContentFocusableChildren = getFocusableElements(collapsibleContentId)
    const contentShouldExpand = dom.getAttr(instance, Selectors.DATA_VISIBLE)

    if (contentShouldExpand === "false") {
      dom.setAttr(collapsibleTrigger, Selectors.ARIA_EXPANDED, "false")
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
      dom.setAttr(collapsibleTrigger, Selectors.ARIA_EXPANDED, "true")
      dom.setAttr(collapsibleContent, Selectors.ARIA_HIDDEN, "false")

      collapsibleContentFocusableChildren.forEach(element => {
        dom.setAttr(element, Selectors.TABINDEX, "0")
      })
    }

    this._collapsibleTriggers.push(collapsibleTrigger)
    collapsibleTrigger.addEventListener(Events.CLICK, this._handleClickFn)
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

  _setCollapsibles(controlled) {
    const allCollapsibles = dom.findAll(`[${Selectors.DATA_COLLAPSIBLE}]`)

    this._collapsibles = allCollapsibles.filter(instance => {
      const collapsibleId = dom.getAttr(instance, Selectors.DATA_COLLAPSIBLE)

      if (!collapsibleId) {
        console.warning(Messages.NO_COLLAPSIBLE_ID_ERROR)
        return false
      }

      const collapseTriggerTargetAttr = this._getTargetAttr(collapsibleId)
      const trigger = dom.find(collapseTriggerTargetAttr, instance)

      if (!trigger) {
        console.warning(Messages.NO_TRIGGER_ERROR(collapsibleId))
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
    return `${pixels / getPageBaseFontSize()}em`
  }
}
