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
  NO_TOOLTIP_ERROR: id => `Could not find a tooltip with id of ${id}.`,
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

    // active tooltip
    this._activeTrigger = null
    this._activeTooltip = null

    // all tooltips
    this._allTooltips = []
  }

  // public

  /**
   * Begin listening to tooltips.
   */
  start() {
    this._allTooltips = document.querySelectorAll(`[${Selectors.DATA_TOOLTIP}]`)

    this._allTooltips.forEach(instance => {
      this._setupTooltip(instance)
    })
  }

  /**
   * Stop listening to tooltips.
   */
  stop() {
    this._allTooltips.forEach(instance => {
      const id = instance.getAttribute(Selectors.DATA_TOOLTIP)
      const trigger = instance.querySelector(this._getTrigger(id))

      trigger.removeEventListener(Events.MOUSEOVER, this._render)
      trigger.removeEventListener(Events.FOCUS, this._render)
    })
  }

  // private

  /**
   * Render a tooltip.
   * @param {Object} event - The event object
   */
  _render(event) {
    this._activeTrigger = event.target
    const tooltipId = this._activeTrigger.getAttribute(Selectors.DATA_TARGET)
    this._activeTooltip = document.getElementById(tooltipId)

    // align tooltip to its trigger
    // -> if the trigger is on the left or right side, use height
    // -> else use width
    if (this._isLeftOrRight()) {
      this._alignTooltip("height")
    } else {
      this._alignTooltip("width")
    }

    this._showTooltip()
    this._listenForClose()
  }

  /**
   * Close a tooltip.
   */
  _handleClose() {
    this._hideTooltip()
    this._listenForOpen()

    this._activeTrigger = null
    this._activeTooltip = null
  }

  /**
   * Add data-visible attribute to currently active tooltip.
   */
  _showTooltip() {
    this._activeTooltip.setAttribute(Selectors.DATA_VISIBLE, "true")
  }

  /**
   * Remove data-visible attribute from currently active tooltip.
   */
  _hideTooltip() {
    this._activeTooltip.setAttribute(Selectors.DATA_VISIBLE, "false")
  }

  /**
   * Stop listening for render events, and start listening to close events.
   */
  _listenForClose() {
    this._activeTrigger.removeEventListener(Events.MOUSEOVER, this._render)
    this._activeTrigger.removeEventListener(Events.FOCUS, this._render)
    this._activeTrigger.addEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.addEventListener(Events.BLUR, this._handleClose)
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)

    if (iOSMobile) {
      document.body.style.cursor = "pointer"
    }
  }

  /**
   * Close a tooltip with the escape key.
   * @param {Object} event - The event object
   */
  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose()
    }
  }

  /**
   * Stop listening to close events, start listening for render events.
   */
  _listenForOpen() {
    this._activeTrigger.removeEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.removeEventListener(Events.BLUR, this._handleClose)
    this._activeTrigger.addEventListener(Events.MOUSEOVER, this._render)
    this._activeTrigger.addEventListener(Events.FOCUS, this._render)
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)

    if (iOSMobile) {
      document.body.style.cursor = "auto"
    }
  }

  /**
   * Aligns a tooltip vertically or horizontally.
   * @param {String} property - String specifying "height" or "width"
   */
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

  /**
   * Setup a tooltip and trigger with appropriate event listeners and attributes.
   * @param {Object} instance - A tooltip instance
   */
  _setupTooltip(instance) {
    const id = instance.getAttribute(Selectors.DATA_TOOLTIP)
    const trigger = instance.querySelector(this._getTrigger(id))
    const tooltip = document.getElementById(id)

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

    trigger.addEventListener(Events.MOUSEOVER, this._render)
    trigger.addEventListener(Events.FOCUS, this._render)
  }

  /**
   * Get an attribute selector string.
   * @param {String} id - A unique tooltip id
   * @return {String}
   */
  _getTrigger(id) {
    return `[${Selectors.DATA_TARGET}="${id}"]`
  }

  /**
   * Render a tooltip.
   * @param {Object} element - A tooltip element
   * @param {String} property - The "height" or "width" property.
   * @return {Number}
   */
  _getComputedLength(element, property) {
    return parseInt(window.getComputedStyle(element)[property].slice(0, -2))
  }

  /**
   * Determine if a tooltip is rendering on the left or right.
   * @return {Boolean}
   */
  _isLeftOrRight() {
    const classes = this._activeTooltip.classList
    return (
      classes.contains(Selectors.DROP_LEFT_CLASS) || classes.contains(Selectors.DROP_RIGHT_CLASS)
    )
  }
}
