// TODO: Fill out KeyCodes, Selectors, Events, and Messages
// TODO: Add tests

const KeyCodes = {}
const Selectors = {}
const Events = {}
const Messages = {
  // no tooltip id, can't create tooltip
}

/**
 * Tooltip component class.
 * @module Tooltip
 */
export default class Tooltip {
  constructor() {
    // this._isTouchPlatform = /(silk|android|pixel|iphone|ipod)/i.test(navigator.userAgent)
    this._isTouchDevice = /(iphone|ipod|ipad|android|iemobile|windows)/i.test(navigator.userAgent)
    this._iosMobile = /(iphone|ipod|ipad)/i.test(navigator.userAgent)

    // events
    this._render = this._render.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleOffTooltipTouch = this._handleOffTooltipTouch.bind(this)

    // active tooltip (touch devices only)
    this._allTooltipTriggers = []
    this._activeTrigger = {}
    this._activeTooltipId = ""
    this._activeTooltip = {}
    this._tooltipIsActive = false
  }

  // public

  start() {
    this._allTooltipTriggers = document.querySelectorAll("[data-tooltip]")

    this._allTooltipTriggers.forEach(element => {
      const id = element.getAttribute("data-tooltip")
      const trigger = element.querySelector(`[data-target="${id}"]`)
      const tooltip = document.getElementById(id)
      this._setupTooltip(trigger, tooltip, id)
    })
  }

  stop() {
    if (this._isTouchDevice) {
      this._allTooltipTriggers.forEach(element => {
        element.removeEventListener("click", this._render)
      })
    }
  }

  // private

  _render(event) {
    event.preventDefault()

    if (this._tooltipIsActive) {
      this._handleClose(event)
    }

    this._activeTrigger = event.target
    this._activeTooltipId = this._activeTrigger.getAttribute("data-target")
    this._activeTooltip = document.getElementById(this._activeTooltipId)
    this._activeTooltip.setAttribute("data-visible", "true")

    this._activeTooltip.removeEventListener("click", this._render)
    this._activeTooltip.addEventListener("click", this._handleClose)
    document.addEventListener("click", this._handleOffTooltipTouch)

    if (this._iosMobile) {
      document.body.style.cursor = "pointer"
    }
  }

  _handleClose(event) {
    event.preventDefault()

    this._activeTooltip.setAttribute("data-visible", "false")
    this._activeTooltip.removeEventListener("click", this._handleClose)
    this._activeTooltip.addEventListener("click", this._render)
    document.removeEventListener("click", this._handleOffTooltipTouch)

    if (this._iosMobile) {
      document.body.style.cursor = "auto"
    }

    this._activeTrigger = null
    this._activeTooltip = null
    this._tooltipIsActive = false
  }

  _handleOffTooltipTouch(event) {
    if (event.target !== this._activeTrigger) {
      this._handleClose(event)
    }
  }

  _setupTooltip(trigger, tooltip, id) {
    trigger.setAttribute("aria-describedby", id)
    tooltip.setAttribute("role", "tooltip")

    if (this._isTouchDevice) {
      trigger.addEventListener("click", this._render)
    }

    if (this._isLeftOrRight(tooltip)) {
      this._alignTooltip(trigger, tooltip, "height")
    } else {
      this._alignTooltip(trigger, tooltip, "width")
    }
  }

  _getComputedLength(element, property) {
    return parseInt(window.getComputedStyle(element)[property].slice(0, -2))
  }

  _isLeftOrRight(tooltip) {
    const classes = tooltip.classList
    return classes.contains("is-drop-left") || classes.contains("is-drop-right")
  }

  _alignTooltip(trigger, tooltip, property) {
    const triggerLength = this._getComputedLength(trigger, property)
    const tooltipLength = this._getComputedLength(tooltip, property)
    const triggerIsLongest = triggerLength > tooltipLength

    const offset = triggerIsLongest
      ? (triggerLength - tooltipLength) / 2
      : (tooltipLength - triggerLength) / -2

    if (property === "height") {
      tooltip.style.top = `${offset}px`
    } else {
      tooltip.style.left = `${offset}px`
    }
  }
}
