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
    this._iosMobile = /(iphone|ipod|ipad)/i.test(navigator.userAgent)

    // events
    this._render = this._render.bind(this)
    this._handleClose = this._handleClose.bind(this)

    // active tooltip (touch devices only)
    this._allTooltipTriggers = []
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
    if (this._iosMobile) {
      this._allTooltipTriggers.forEach(element => {
        element.removeEventListener("click", this._render)
      })
    }
  }

  // private

  _render(event) {
    event.preventDefault()
    document.body.style.cursor = "pointer"
    document.body.addEventListener("click", this._handleClose)
  }

  _handleClose(event) {
    event.preventDefault()
    document.body.style.cursor = "auto"
    document.body.removeEventListener("click", this._handleClose)
  }

  _setupTooltip(trigger, tooltip, id) {
    trigger.setAttribute("aria-describedby", id)
    tooltip.setAttribute("role", "tooltip")

    if (this._iosMobile) {
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
