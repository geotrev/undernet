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
  MOUSEENTER: "onmouseenter",
  MOUSELEAVE: "onmouseleave",
  FOCUS: "focus",
  BLUR: "blur",
  KEYDOWN: "keydown",
}

const Messages = {
  NO_ID_ERROR: "Could not find an tooltip trigger associated with your element. Make sure your `data-tooltip` and `data-target` attributes have matching values.",
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
    this._setCursorPointer = this._setCursorPointer.bind(this)
    this._setCursorAuto = this._setCursorAuto.bind(this)

    // active tooltip (touch devices only)
    this._allTooltipTriggers = []
  }

  // public

  start() {
    this._allTooltipTriggers = document.querySelectorAll(`[${Selectors.DATA_TOOLTIP}]`)

    this._allTooltipTriggers.forEach(element => {
      const id = element.getAttribute(Selectors.DATA_TOOLTIP)

      let trigger
      if (!element.querySelector(this._getTargetAttr(id))) {
        return console.error(Messages.NO_ID_ERROR)
      } else {
        trigger = element.querySelector(this._getTargetAttr(id))
      }

      const tooltip = document.getElementById(id)
      this._setupTooltip(trigger, tooltip, id)
    })
  }

  stop() {
    if (iOSMobile) {
      this._allTooltipTriggers.forEach(element => {
        element.removeEventListener(Events.CLICK, this._setCursorPointer)
      })
    }
  }

  // private

  _render(event) {
    event.preventDefault()

    // if (iOSMobile && event.type === Events.CLICK) {
    //   event.stopPropagation()
    //   document.body.addEventListener(Events.CLICK, this._setCursorAuto)
    //   document.body.style.cursor = "pointer"
    // }

    if (this._activeTooltip) {
      this._handleClose(event)
    }

    this._activeTrigger = event.target
    this._activeTooltipId = trigger.getAttribute(Selectors.DATA_TARGET)
    this._activeTooltip = document.getElementById(tooltipId)
    
    if (this._isLeftOrRight()) {
      this._alignTooltip("height")
    } else {
      this._alignTooltip("width")
    }

    this._showTooltip()
    this._listenForClose()
  }

  _handleClose(event) {
    event.preventDefault()

    this._hideTooltip()

    // if (iOSMobile) {
    //   document.body.removeEventListener(Events.CLICK, this._setCursorAuto)
    //   document.body.style.cursor = "auto"
    // }
  
    this._activeTrigger = null
    this._activeTooltipId = null
    this._activeTooltip = null
    
    this._listenForOpen()
  }

  _handleEscapeKeyPress(event) {
    event.preventDefault()
    if (event.which === Events.ESCAPE) this._handleClose(event)
  }

  _showTooltip() {
    this._activeTooltip.setAttribute(Selectors.DATA_VISIBLE, "true")
  }

  _hideTooltip() {
    this._activeTooltip.setAttribute(Selectors.DATA_VISIBLE, "false")
  }

  _listenForClose() {
    this._activeTrigger.removeEventListener(Events.MOUSEENTER, this._render)
    this._activeTrigger.removeEventListener(Events.FOCUS, this._render)
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    this._activeTrigger.addEventListener(Events.MOUSELEAVE, this._handleClose)
    this._activeTrigger.addEventListener(Events.BLUR, this._handleClose)
  }

  _listenForOpen() {
    this._activeTrigger.removeEventListener(Events.MOUSELEAVE, this._render)
    this._activeTrigger.removeEventListener(Events.BLUR, this._render)
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    this._activeTrigger.addEventListener(Events.MOUSEENTER, this._handleClose)
    this._activeTrigger.addEventListener(Events.FOCUS, this._handleClose)
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

  _setCursorPointer(event) {
    event.preventDefault()
    event.stopPropagation()
    document.body.addEventListener(Events.CLICK, this._setCursorAuto)
    document.body.style.cursor = "pointer"
  }

  _setupTooltip(trigger, tooltip, id) {
    trigger.setAttribute(Selectors.ARIA_DESCRIBEDBY, id)
    tooltip.setAttribute(Selectors.ROLE, "tooltip")

    // if (iOSMobile) {
    //   trigger.addEventListener(Events.CLICK, this._render)
    // }

    trigger.addEventListener(Events.MOUSEENTER, this._render)
    trigger.addEventListener(Events.FOCUS, this._render)
  }

  _getTargetAttr(id) {
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
