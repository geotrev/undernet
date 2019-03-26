// TODO: Add tests

import { iOSMobile } from "./utils"

const KeyCodes = {
  ESCAPE: 27,
}

const Selectors = {
  DATA_TOOLTIP: "data-tooltip",
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  ROLE: "role",
  ARIA_DESCRIBEDBY: "aria-describedby",
  DROP_LEFT_CLASS: "is-drop-left",
  DROP_RIGHT_CLASS: "is-drop-right",
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
  NO_ID_ERROR: "Could not find your tooltip's id.",
  NO_TRIGGER_ERROR: id => `Could not find a tooltip trigger with id of ${id}.`,
  NO_TOOLTIP_ERROR: id => `Could not find a tooltip with id of ${id}.`
}

/**
 * Tooltip component class.
 * @module Tooltip
 */
export default class Tooltip {
  constructor() {
    // events
    this._render = this._render.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)

    // active tooltip (touch devices only)
    this._allTooltipTriggers = []
  }

  // public

  start() {
    this._allTooltipTriggers = document.querySelectorAll(`[${Selectors.DATA_TOOLTIP}]`)

    this._allTooltipTriggers.forEach(instance => {
      this._setupTooltip(instance)
    })
  }

  stop() {
    this._allTooltipTriggers.forEach(element => {
      const id = element.getAttribute(Selectors.DATA_TOOLTIP)
      const trigger = element.querySelector(this._getTrigger(id))

      // if (iOSMobile) {
      //   element.removeEventListener(Events.CLICK, this._render)
      // }

      element.removeEventListener(Events.MOUSEOVER, this._render)
      element.removeEventListener(Events.FOCUS, this._render)
    })
  }

  // private

  _render(event) {
    if (this._activeTooltip) {
      this._handleClose(event)
    }

    // if (iOSMobile && event.type === Events.CLICK) {
    //   event.preventDefault()
    //   event.stopPropagation()
    // }

    this._activeTrigger = event.target
    this._activeTooltipId = this._activeTrigger.getAttribute(Selectors.DATA_TARGET)
    this._activeTooltip = document.getElementById(this._activeTooltipId)
    
    if (this._isLeftOrRight()) {
      this._alignTooltip("height")
    } else {
      this._alignTooltip("width")
    }

    this._showTooltip()
    this._listenForClose()
  }

  _handleClose(event) {
    this._hideTooltip()
  
    this._listenForOpen()

    this._activeTrigger = null
    this._activeTooltipId = null
    this._activeTooltip = null
  }

  _handleEscapeKeyPress(event) {
    if (event.which === Events.ESCAPE) this._handleClose(event)
  }

  _showTooltip() {
    this._activeTooltip.setAttribute(Selectors.DATA_VISIBLE, "true")
  }

  _hideTooltip() {
    this._activeTooltip.setAttribute(Selectors.DATA_VISIBLE, "false")
  }

  _listenForClose() {
    this._activeTrigger.removeEventListener(Events.MOUSEOVER, this._render)
    this._activeTrigger.removeEventListener(Events.FOCUS, this._render)
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    this._activeTrigger.addEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.addEventListener(Events.BLUR, this._handleClose)

    // if (iOSMobile) {
    //   document.body.addEventListener(Events.CLICK, this._handleClose)
    //   document.body.style.cursor = "pointer"
    // }
  }

  _listenForOpen() {
    this._activeTrigger.removeEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.removeEventListener(Events.BLUR, this._handleClose)
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    this._activeTrigger.addEventListener(Events.MOUSEOVER, this._render)
    this._activeTrigger.addEventListener(Events.FOCUS, this._render)

    // if (iOSMobile) {
    //   document.body.removeEventListener(Events.CLICK, this._render)
    //   document.body.style.cursor = "auto"
    // }
  }

  _alignTooltip(property) {
    const triggerLength = this._getComputedLength(this._activeTrigger, property)
    const tooltipLength = this._getComputedLength(this._activeTooltip, property)
    const triggerIsLongest = triggerLength > tooltipLength

    const offset = triggerIsLongest
      ? (triggerLength - tooltipLength) / 2
      : (tooltipLength - triggerLength) / -2

    if (property === "height") {
      this._activeTooltip.style.top = `${offset}px`
    } else {
      this._activeTooltip.style.left = `${offset}px`
    }
  }

  _setupTooltip(instance) {
    let id = instance.getAttribute(Selectors.DATA_TOOLTIP)
    let trigger = instance.querySelector(this._getTrigger(id))
    let tooltip = document.getElementById(id)

    if (!id) {
      return console.error(Messages.NO_ID_ERROR)
    }

    if (!trigger) {
      return console.error(Messages.NO_TRIGGER_ERROR(id))
    }

    if (!tooltip) {
      return console.error(Messages.NO_TOOLTIP_ERROR(id))
    }

    trigger.setAttribute(Selectors.ARIA_DESCRIBEDBY, id)
    tooltip.setAttribute(Selectors.ROLE, "tooltip")

    // if (iOSMobile) {
    //   trigger.addEventListener(Events.CLICK, this._render)
    // }

    trigger.addEventListener(Events.MOUSEOVER, this._render)
    trigger.addEventListener(Events.FOCUS, this._render)
  }

  _getTrigger(id) {
    return `[${Selectors.DATA_TARGET}="${id}"]`
  }

  _getComputedLength(element, property) {
    return parseInt(window.getComputedStyle(element)[property].slice(0, -2))
  }

  _isLeftOrRight() {
    const classes = this._activeTooltip.classList
    return classes.contains(Selectors.DROP_LEFT_CLASS) || classes.contains(Selectors.DROP_RIGHT_CLASS)
  }
}
