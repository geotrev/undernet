import { iOSMobile, dom, log, startComponent, stopComponent } from "../helpers"
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
    this._validate = this._validate.bind(this)
    this._teardown = this._teardown.bind(this)

    // all tooltips
    this._components = []

    // active tooltip
    this._activeTrigger = null
    this._activeTooltipBox = null
  }

  // public

  start(id) {
    startComponent({ id, attribute: Selectors.DATA_TOOLTIP, thisArg: this })
  }

  stop(id) {
    stopComponent({
      id,
      attribute: Selectors.DATA_TOOLTIP,
      thisArg: this,
      activeNodeKey: "_activeTooltip",
      cancelActiveFn: "_handleClose",
    })
  }

  // private

  _validate(instance) {
    const instanceId = dom.getAttr(instance, Selectors.DATA_TOOLTIP)

    if (!instanceId) {
      log(Messages.NO_ID_ERROR)
      return false
    }

    const trigger = dom.find(this._getTrigger(instanceId), instance)
    const tooltip = dom.find(`#${instanceId}`, instance)

    if (!trigger) {
      log(Messages.NO_TRIGGER_ERROR(instanceId))
      return false
    }

    if (!tooltip) {
      log(Messages.NO_TOOLTIP_ERROR(instanceId))
      return false
    }

    dom.setAttr(trigger, Selectors.ARIA_DESCRIBEDBY, instanceId)
    dom.setAttr(tooltip, Selectors.ROLE, COMPONENT_ROLE)

    trigger.addEventListener(Events.MOUSEOVER, this._handleEvent)
    trigger.addEventListener(Events.FOCUS, this._handleEvent)

    return true
  }

  _teardown(instance) {
    const id = dom.getAttr(instance, Selectors.DATA_TOOLTIP)
    const trigger = dom.find(this._getTrigger(id), instance)

    trigger.removeEventListener(Events.MOUSEOVER, this._handleEvent)
    trigger.removeEventListener(Events.FOCUS, this._handleEvent)
  }

  _handleEvent(event) {
    if (this._activeTooltipBox || this._activeTrigger) this._handleClose()

    this._activeTrigger = event.target

    const id = this._activeTrigger.getAttribute(Selectors.DATA_TARGET)
    this._activeTooltip = dom.find(`[${Selectors.DATA_TOOLTIP}='${id}']`)
    this._activeTooltipBox = document.getElementById(id)

    if (this._hasInlineClass()) {
      this._alignTooltip(CssProperties.HEIGHT)
    } else {
      this._alignTooltip(CssProperties.WIDTH)
    }

    this._setVisibleState()
    this._startCloseEvents()
  }

  _handleClose() {
    if (this._activeTooltipBox) this._setHideState()

    this._startOpenEvents()
    this._resetProperties()
  }

  _resetProperties() {
    this._activeTooltip = null
    this._activeTrigger = null
    this._activeTooltipBox = null
  }

  _setVisibleState() {
    dom.setAttr(this._activeTooltipBox, Selectors.DATA_VISIBLE, "true")
  }

  _setHideState() {
    dom.setAttr(this._activeTooltipBox, Selectors.DATA_VISIBLE, "false")
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
    const tooltipSize = this._getSize(this._activeTooltipBox, property)
    const triggerIsBigger = triggerSize > tooltipSize

    const offset = triggerIsBigger
      ? (triggerSize - tooltipSize) / 2
      : (tooltipSize - triggerSize) / -2

    if (property === CssProperties.HEIGHT) {
      dom.setStyle(this._activeTooltipBox, CssProperties.TOP, `${offset}px`)
    } else {
      dom.setStyle(this._activeTooltipBox, CssProperties.LEFT, `${offset}px`)
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
      this._activeTooltipBox,
      Selectors.DROP_INLINE_START_CLASS,
      Selectors.DROP_INLINE_END_CLASS
    )
  }
}
