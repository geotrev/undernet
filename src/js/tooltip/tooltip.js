import { isiOSMobile, log, ComponentEngine } from "../helpers"
import { KeyCodes, Selectors, CssProperties, Events, Messages } from "./constants"

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
    ComponentEngine.start({ id, attribute: Selectors.DATA_TOOLTIP, thisArg: this })
  }

  stop(id) {
    ComponentEngine.stop({
      id,
      attribute: Selectors.DATA_TOOLTIP,
      thisArg: this,
      activeNodeKey: "_activeTooltip",
      cancelActiveFn: "_handleClose",
    })
  }

  // private

  _validate(instance) {
    const instanceId = instance.getAttribute(Selectors.DATA_TOOLTIP)

    if (!instanceId) {
      log(Messages.NO_ID_ERROR)
      return false
    }

    const trigger = instance.querySelector(this._getTrigger(instanceId))
    const tooltip = instance.querySelector(`#${instanceId}`)

    if (!trigger) {
      log(Messages.NO_TRIGGER_ERROR(instanceId))
      return false
    }

    if (!tooltip) {
      log(Messages.NO_TOOLTIP_ERROR(instanceId))
      return false
    }

    trigger.setAttribute(Selectors.ARIA_DESCRIBEDBY, instanceId)
    tooltip.setAttribute(Selectors.ROLE, COMPONENT_ROLE)

    trigger.addEventListener(Events.MOUSEOVER, this._handleEvent)
    trigger.addEventListener(Events.FOCUS, this._handleEvent)

    return true
  }

  _teardown(instance) {
    const id = instance.getAttribute(Selectors.DATA_TOOLTIP)
    const trigger = instance.querySelector(this._getTrigger(id))

    trigger.removeEventListener(Events.MOUSEOVER, this._handleEvent)
    trigger.removeEventListener(Events.FOCUS, this._handleEvent)
  }

  _handleEvent(event) {
    if (this._activeTooltip) this._handleClose()

    this._activeTrigger = event.target

    const id = this._activeTrigger.getAttribute(Selectors.DATA_TARGET)
    this._activeTooltip = document.querySelector(`[${Selectors.DATA_TOOLTIP}='${id}']`)
    this._activeTooltipBox = document.querySelector(`#${id}`)

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
    this._activeTooltipBox.setAttribute(Selectors.DATA_VISIBLE, "true")
  }

  _setHideState() {
    this._activeTooltipBox.setAttribute(Selectors.DATA_VISIBLE, "false")
  }

  _startCloseEvents() {
    this._activeTrigger.removeEventListener(Events.MOUSEOVER, this._handleEvent)
    this._activeTrigger.removeEventListener(Events.FOCUS, this._handleEvent)
    this._activeTrigger.addEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.addEventListener(Events.BLUR, this._handleClose)
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)

    if (isiOSMobile) document.body.classList.add(Selectors.OVERLAY_OPEN)
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

    if (isiOSMobile) document.body.classList.remove(Selectors.OVERLAY_OPEN)
  }

  _alignTooltip(property) {
    const triggerSize = this._getSize(this._activeTrigger, property)
    const tooltipSize = this._getSize(this._activeTooltipBox, property)
    const triggerIsBigger = triggerSize > tooltipSize

    const offset = triggerIsBigger
      ? (triggerSize - tooltipSize) / 2
      : (tooltipSize - triggerSize) / -2

    if (property === CssProperties.HEIGHT) {
      this._activeTooltipBox.style[CssProperties.TOP] = `${offset}px`
    } else {
      this._activeTooltipBox.style[CssProperties.LEFT] = `${offset}px`
    }
  }

  _getTrigger(id) {
    return `[${Selectors.DATA_TARGET}="${id}"]`
  }

  _getSize(element, property) {
    return Math.floor(element.getBoundingClientRect()[property])
  }

  _hasInlineClass() {
    const classList = this._activeTooltipBox.classList

    return (
      classList.contains(Selectors.DROP_INLINE_START_CLASS) ||
      classList.contains(Selectors.DROP_INLINE_END_CLASS)
    )
  }
}
