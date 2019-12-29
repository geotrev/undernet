import { iOSMobile, dom, isBrowserEnv, log, setComponents } from "../helpers"
import { KeyCodes, Selectors, CssProperties, CssValues, Events, Messages } from "./constants"

const COMPONENT_ROLE = "tooltip"

/**
 * Class that instantiates or destroys all instances of tooltip components on a page.
 *
 * @module Tooltip
 */
export default class Tooltip {
  constructor() {
    this._handleEvent = this._handleEvent.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._setup = this._setup.bind(this)
    this._teardown = this._teardown.bind(this)

    // all tooltips
    this._tooltips = []
    this._scopes = new Map()

    // active tooltip
    this._activeTrigger = null
    this._activeTooltip = null
  }

  // public

  start(scopeId) {
    if (!isBrowserEnv) return

    setComponents({
      thisArg: this,
      scopeId,
      scopeKey: "_scopes",
      componentAttribute: Selectors.DATA_TOOLTIP,
      globalKey: "_tooltips",
      errorMessage: Messages.NO_ID_ERROR,
    })

    if (scopeId && this._scopes.has(scopeId)) {
      this._scopes.get(scopeId).elements.forEach(this._setup)
    } else if (this._tooltips.length) {
      this._tooltips.forEach(this._setup)
    }
  }

  stop(scopeId) {
    if (!isBrowserEnv) return

    if (scopeId && this._scopes.has(scopeId)) {
      const { elements } = this._scopes.get(scopeId)

      elements.forEach(instance => {
        const id = dom.getAttr(instance, Selectors.DATA_TOOLTIP)
        const tooltip = dom.find(`#${id}`)

        if (!tooltip) {
          log(Messages.NO_TOOLTIP_ERROR(id))
          return
        }

        if (dom.getAttr(tooltip, Selectors.DATA_VISIBLE) !== "true") return

        this._handleClose()
      })

      elements.forEach(this._teardown)
      this._scopes.delete(scopeId)
    } else if (this._tooltips.length) {
      if (this._activeTooltip) this._handleClose()

      this._tooltips.forEach(this._teardown)
      this._tooltips = []
    }
  }

  // private

  _setup(instance) {
    const tooltipId = dom.getAttr(instance, Selectors.DATA_TOOLTIP)

    if (!tooltipId) {
      log(Messages.NO_ID_ERROR)
      return
    }

    const trigger = dom.find(this._getTrigger(tooltipId), instance)
    const tooltip = dom.find(`#${tooltipId}`, instance)

    if (!trigger) {
      log(Messages.NO_TRIGGER_ERROR(tooltipId))
      return
    }

    if (!tooltip) {
      log(Messages.NO_TOOLTIP_ERROR(tooltipId))
      return
    }

    dom.setAttr(trigger, Selectors.ARIA_DESCRIBEDBY, tooltipId)
    dom.setAttr(tooltip, Selectors.ROLE, COMPONENT_ROLE)

    trigger.addEventListener(Events.MOUSEOVER, this._handleEvent)
    trigger.addEventListener(Events.FOCUS, this._handleEvent)
  }

  _teardown(instance) {
    const id = dom.getAttr(instance, Selectors.DATA_TOOLTIP)
    const trigger = dom.find(this._getTrigger(id), instance)

    trigger.removeEventListener(Events.MOUSEOVER, this._handleEvent)
    trigger.removeEventListener(Events.FOCUS, this._handleEvent)
  }

  _handleEvent(event) {
    if (this._activeTooltip || this._activeTrigger) this._handleClose()

    this._activeTrigger = event.target

    const tooltipId = this._activeTrigger.getAttribute(Selectors.DATA_TARGET)
    this._activeTooltip = document.getElementById(tooltipId)

    if (this._hasInlineClass()) {
      this._alignTooltip(CssProperties.HEIGHT)
    } else {
      this._alignTooltip(CssProperties.WIDTH)
    }

    this._setVisibleState()
    this._startCloseEvents()
  }

  _handleClose() {
    if (this._activeTooltip) this._setHideState()

    this._startOpenEvents()
    this._resetProperties()
  }

  _resetProperties() {
    this._activeTrigger = null
    this._activeTooltip = null
  }

  _setVisibleState() {
    dom.setAttr(this._activeTooltip, Selectors.DATA_VISIBLE, "true")
  }

  _setHideState() {
    dom.setAttr(this._activeTooltip, Selectors.DATA_VISIBLE, "false")
  }

  _startCloseEvents() {
    this._activeTrigger.removeEventListener(Events.MOUSEOVER, this._handleEvent)
    this._activeTrigger.removeEventListener(Events.FOCUS, this._handleEvent)
    this._activeTrigger.addEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.addEventListener(Events.BLUR, this._handleClose)
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)

    if (iOSMobile) dom.setStyle(document.body, CssProperties.CURSOR, CssValues.POINTER)
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose()
    }
  }

  _startOpenEvents() {
    if (!this._activeTrigger) return

    this._activeTrigger.removeEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.removeEventListener(Events.BLUR, this._handleClose)
    this._activeTrigger.addEventListener(Events.MOUSEOVER, this._handleEvent)
    this._activeTrigger.addEventListener(Events.FOCUS, this._handleEvent)
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)

    if (iOSMobile) dom.setStyle(document.body, CssProperties.CURSOR, CssValues.AUTO)
  }

  _alignTooltip(property) {
    const triggerSize = this._getSize(this._activeTrigger, property)
    const tooltipSize = this._getSize(this._activeTooltip, property)
    const triggerIsBigger = triggerSize > tooltipSize

    const offset = triggerIsBigger
      ? (triggerSize - tooltipSize) / 2
      : (tooltipSize - triggerSize) / -2

    if (property === CssProperties.HEIGHT) {
      dom.setStyle(this._activeTooltip, CssProperties.TOP, `${offset}px`)
    } else {
      dom.setStyle(this._activeTooltip, CssProperties.LEFT, `${offset}px`)
    }
  }

  _getTrigger(id) {
    return `[${Selectors.DATA_TARGET}="${id}"]`
  }

  _getSize(element, property) {
    return Math.floor(element.getBoundingClientRect()[property])
  }

  _hasInlineClass() {
    return dom.hasClass(
      this._activeTooltip,
      Selectors.DROP_INLINE_START_CLASS,
      Selectors.DROP_INLINE_END_CLASS
    )
  }
}
