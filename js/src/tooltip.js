// TODO: Add tests

import { iOSMobile } from "./utils"

const Selectors = {
  DATA_TOOLTIP: "data-tooltip",
  DATA_TARGET: "data-target",
  ROLE: "role",
  ARIA_DESCRIBEDBY: "aria-describedby",
  DROP_LEFT_CLASS: "is-drop-left",
  DROP_RIGHT_CLASS: "is-drop-right",
}

const Events = {
  CLICK: "click",
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

  _setCursorPointer(event) {
    event.preventDefault()
    event.stopPropagation()
    document.body.addEventListener(Events.CLICK, this._setCursorAuto)
    document.body.style.cursor = "pointer"
  }

  _setCursorAuto(event) {
    event.preventDefault()
    document.body.removeEventListener(Events.CLICK, this._setCursorAuto)
    document.body.style.cursor = "auto"
  }

  _setupTooltip(trigger, tooltip, id) {
    trigger.setAttribute(Selectors.ARIA_DESCRIBEDBY, id)
    tooltip.setAttribute(Selectors.ROLE, "tooltip")

    if (iOSMobile) {
      trigger.addEventListener(Events.CLICK, this._setCursorPointer)
    }

    if (this._isLeftOrRight(tooltip)) {
      this._alignTooltip(trigger, tooltip, "height")
    } else {
      this._alignTooltip(trigger, tooltip, "width")
    }
  }

  _getTargetAttr(id) {
    return `[${Selectors.DATA_TARGET}="${id}"]`
  }

  _getComputedLength(element, property) {
    return parseInt(window.getComputedStyle(element)[property].slice(0, -2))
  }

  _isLeftOrRight(tooltip) {
    const classes = tooltip.classList
    return classes.contains(Selectors.DROP_LEFT_CLASS) || classes.contains(Selectors.DROP_RIGHT_CLASS)
  }
}
