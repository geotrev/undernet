import { iOSMobile, dom } from "./utils"

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

  start() {
    this._allTooltips = dom.findAll(`[${Selectors.DATA_TOOLTIP}]`)

    this._allTooltips.forEach(instance => {
      this._setup(instance)
    })
  }

  stop() {
    this._allTooltips.forEach(instance => {
      const id = dom.attr(instance, Selectors.DATA_TOOLTIP)
      const trigger = dom.find(this._getTrigger(id), instance)

      if (this._activeTooltip || this._activeTrigger) {
        this._handleClose()
      }

      trigger.removeEventListener(Events.MOUSEOVER, this._render)
      trigger.removeEventListener(Events.FOCUS, this._render)
    })
  }

  // private

  _setup(instance) {
    const tooltipId = dom.attr(instance, Selectors.DATA_TOOLTIP)

    if (!tooltipId) {
      throw new Error(Messages.NO_ID_ERROR)
    }

    const trigger = dom.find(this._getTrigger(tooltipId), instance)
    const tooltip = dom.find(`#${tooltipId}`, instance)

    if (!trigger) {
      throw new Error(Messages.NO_TRIGGER_ERROR(tooltipId))
    }

    if (!tooltip) {
      throw new Error(Messages.NO_TOOLTIP_ERROR(tooltipId))
    }

    dom.attr(trigger, Selectors.ARIA_DESCRIBEDBY, tooltipId)
    dom.attr(tooltip, Selectors.ROLE, "tooltip")
    trigger.addEventListener(Events.MOUSEOVER, this._render)
    trigger.addEventListener(Events.FOCUS, this._render)
  }

  _render(event) {
    this._activeTrigger = event.target

    const tooltipId = this._activeTrigger.getAttribute(Selectors.DATA_TARGET)
    this._activeTooltip = document.getElementById(tooltipId)

    if (this._isLeftOrRight()) {
      this._alignTooltip("height")
    } else {
      this._alignTooltip("width")
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
    dom.attr(this._activeTooltip, Selectors.DATA_VISIBLE, "true")
  }

  _setHideState() {
    dom.attr(this._activeTooltip, Selectors.DATA_VISIBLE, "false")
  }

  _startCloseEvents() {
    this._activeTrigger.removeEventListener(Events.MOUSEOVER, this._render)
    this._activeTrigger.removeEventListener(Events.FOCUS, this._render)
    this._activeTrigger.addEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.addEventListener(Events.BLUR, this._handleClose)
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)

    if (iOSMobile) {
      dom.css(document.body, "cursor", "pointer")
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose()
    }
  }

  _startOpenEvents() {
    this._activeTrigger.removeEventListener(Events.MOUSEOUT, this._handleClose)
    this._activeTrigger.removeEventListener(Events.BLUR, this._handleClose)
    this._activeTrigger.addEventListener(Events.MOUSEOVER, this._render)
    this._activeTrigger.addEventListener(Events.FOCUS, this._render)
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)

    if (iOSMobile) dom.css(document.body, "cursor", "auto")
  }

  _alignTooltip(property) {
    const triggerSize = this._getSize(this._activeTrigger, property)
    const tooltipSize = this._getSize(this._activeTooltip, property)
    const triggerIsBigger = triggerSize > tooltipSize

    const offset = triggerIsBigger
      ? (triggerSize - tooltipSize) / 2
      : (tooltipSize - triggerSize) / -2

    if (property === "height") {
      dom.css(this._activeTooltip, "top", `${offset}px`)
    } else {
      dom.css(this._activeTooltip, "left", `${offset}px`)
    }
  }

  _getTrigger(id) {
    return `[${Selectors.DATA_TARGET}="${id}"]`
  }

  _getSize(element, property) {
    return Math.floor(element.getBoundingClientRect()[property])
  }

  _isLeftOrRight() {
    return dom.hasClass(this._activeTooltip, Selectors.DROP_LEFT_CLASS, Selectors.DROP_RIGHT_CLASS)
  }
}
