"use strict"

const keyCodes = {
  SHIFT: 16,
  TAB: 9,
}

const selectors = {
  KEYBOARD: "using-keyboard",
}

const events = {
  KEYDOWN: "keydown",
  CLICK: "click",
}

/**
 * Helper component class.
 * @module FocusOutline
 */
export default class FocusOutline {
  constructor() {
    this.listenForKeyboard = this.listenForKeyboard.bind(this)
  }

  start() {
    document.addEventListener(events.KEYDOWN, this.listenForKeyboard)
    document.addEventListener(events.CLICK, this.listenForKeyboard)
  }

  listenForKeyboard(event) {
    const tabKey = event.which === keyCodes.TAB
    const shiftKey = event.which === keyCodes.SHIFT || event.shiftKey

    if (tabKey || shiftKey) {
      event.preventDefault()
      document.body.classList.add(selectors.KEYBOARD)
    } else {
      event.preventDefault()
      document.body.classList.remove(selectors.KEYBOARD)
    }
  }

  stop() {
    document.removeEventListener(events.KEYDOWN, this.listenForKeyboard)
    document.removeEventListener(events.CLICK, this.listenForKeyboard)
  }
}
