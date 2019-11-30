import { iOSMobile, dom, isBrowserEnv } from "./utils"

const KeyCodes = {
  ESCAPE: 27,
}

const Selectors = {
  // unique
  DATA_TOOLTIP: "data-tooltip",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  // accessibility
  ROLE: "role",
  ARIA_DESCRIBEDBY: "aria-describedby",
  // classes
  DROP_INLINE_START_CLASS: "is-drop-inline-start",
  DROP_INLINE_END_CLASS: "is-drop-inline-end",
}

const CssMetadata = {
  // properties
  HEIGHT: "height",
  WIDTH: "width",
  CURSOR: "cursor",
  TOP: "top",
  LEFT: "left",

  // values
  POINTER: "pointer",
  AUTO: "auto",
}

const Events = {
  CLICK: "click",
  MOUSEOVER: "mouseover",
  MOUSEOUT: "mouseout",
  FOCUS: "focus",
  BLUR: "blur",
  KEYDOWN: "keydown",
}

const Messages = {
  NO_ID_ERROR: "Could not find tooltip id.",
  NO_TRIGGER_ERROR: id => `Could not find a tooltip trigger with attribute [data-target='${id}'].`,
  NO_TOOLTIP_ERROR: id => `Could not find a tooltip with id '${id}'.`,
}

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

    // active tooltip
    this._activeTrigger = null
    this._activeTooltip = null

    // all tooltips
    this._allTooltips = []
  }

  // public

  start() {
    if (!isBrowserEnv) return

    this._allTooltips = dom.findAll(`[${Selectors.DATA_TOOLTIP}]`)
    this._allTooltips.forEach(this._setup)
  }

  stop() {
    if (!isBrowserEnv) return

    this._allTooltips.forEach(instance => {
      const id = dom.getAttr(instance, Selectors.DATA_TOOLTIP)
      const trigger = dom.find(this._getTrigger(id), instance)

      if (this._activeTooltip || this._activeTrigger) {
        this._handleClose()
      }

      trigger.removeEventListener(Events.MOUSEOVER, this._handleEvent)
      trigger.removeEventListener(Events.FOCUS, this._handleEvent)
    })
  }

  // private

  _setup(instance) {
    const tooltipId = dom.getAttr(instance, Selectors.DATA_TOOLTIP)

    if (!tooltipId) {
      console.warning(Messages.NO_ID_ERROR)
      return
    }

    const trigger = dom.find(this._getTrigger(tooltipId), instance)
    const tooltip = dom.find(`#${tooltipId}`, instance)

    if (!trigger) {
      console.warning(Messages.NO_TRIGGER_ERROR(tooltipId))
      return
    }

    if (!tooltip) {
      console.warning(Messages.NO_TOOLTIP_ERROR(tooltipId))
      return
    }

    dom.setAttr(trigger, Selectors.ARIA_DESCRIBEDBY, tooltipId)
    dom.setAttr(tooltip, Selectors.ROLE, COMPONENT_ROLE)

    trigger.addEventListener(Events.MOUSEOVER, this._handleEvent)
    trigger.addEventListener(Events.FOCUS, this._handleEvent)
  }

  _handleEvent(event) {
    if (this._activeTooltip || this._activeTrigger) this._handleClose()

    this._activeTrigger = event.target

    const tooltipId = this._activeTrigger.getAttribute(Selectors.DATA_TARGET)
    this._activeTooltip = document.getElementById(tooltipId)

    if (this._hasInlineClass()) {
      this._alignTooltip(CssMetadata.HEIGHT)
    } else {
      this._alignTooltip(CssMetadata.WIDTH)
    }

    this._setVisibleState()
    this._startCloseEvents()
  }

  _handleClose() {
    this._setHideState()
    this._startOpenEvents()

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

    if (iOSMobile) dom.setStyle(document.body, CssMetadata.CURSOR, CssMetadata.POINTER)
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose()
    }
  }

  _startOpenEvents() {
    this._activeTrigger.removeEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.removeEventListener(Events.BLUR, this._handleClose)
    this._activeTrigger.addEventListener(Events.MOUSEOVER, this._handleEvent)
    this._activeTrigger.addEventListener(Events.FOCUS, this._handleEvent)
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)

    if (iOSMobile) dom.setStyle(document.body, CssMetadata.CURSOR, CssMetadata.AUTO)
  }

  _alignTooltip(property) {
    const triggerSize = this._getSize(this._activeTrigger, property)
    const tooltipSize = this._getSize(this._activeTooltip, property)
    const triggerIsBigger = triggerSize > tooltipSize

    const offset = triggerIsBigger
      ? (triggerSize - tooltipSize) / 2
      : (tooltipSize - triggerSize) / -2

    if (property === CssMetadata.HEIGHT) {
      dom.setStyle(this._activeTooltip, CssMetadata.TOP, `${offset}px`)
    } else {
      dom.setStyle(this._activeTooltip, CssMetadata.LEFT, `${offset}px`)
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
