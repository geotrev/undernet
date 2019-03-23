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
  constructor() {}

  // public

  start() {
    document.querySelectorAll("[data-tooltip]").forEach(instance => {
      const id = instance.getAttribute("data-tooltip")
      const trigger = instance.querySelector(`[data-parent="${id}"]`)
      const tooltip = document.getElementById(id)
      this._setupTooltip(trigger, tooltip, id)
    })
  }

  // private

  _setupTooltip(trigger, tooltip, id) {
    trigger.setAttribute("aria-describedby", id)
    tooltip.setAttribute("role", "tooltip")

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
    return tooltip.classList.contains("is-drop-left") || tooltip.classList.contains("is-drop-right")
  }

  _alignTooltip(trigger, tooltip, property) {
    const triggerLength = this._getComputedLength(trigger, property)
    const tooltipLength = this._getComputedLength(tooltip, property)
    const triggerIsLongest = triggerLength > tooltipLength

    const offset = triggerIsLongest 
      ? ((triggerLength - tooltipLength) / 2) 
      : ((tooltipLength - triggerLength) / -2)

    if (property === "height")
      tooltip.style.top = `${offset}px`
    else {
      tooltip.style.left = `${offset}px`
    }
  }
}
