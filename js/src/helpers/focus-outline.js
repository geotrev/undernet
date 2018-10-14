"use strict"

const keyCodes = {
  SHIFT: 16,
  TAB: 9,
}

const selectors = {
  USING_KEYBOARD: "using-keyboard",
}

const events = {
  KEYDOWN: "keydown",
  CLICK: "click",
}

/**
 * FocusOutline helper class.
 * Slightly modified from David Gilbertson's article here: https://hackernoon.com/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
 * @module FocusOutline
 */
export default class FocusOutline {
  constructor() {
    this.listenForKeyboard = this.listenForKeyboard.bind(this)
    this.listenForClick = this.listenForClick.bind(this)
  }

  start() {
    document.addEventListener(events.KEYDOWN, this.listenForKeyboard)
  }

  listenForKeyboard(event) {
    const tabKey = event.which === keyCodes.TAB
    const shiftKey = event.which === keyCodes.SHIFT || event.shiftKey

    if (tabKey || shiftKey) {
      document.body.classList.add(selectors.USING_KEYBOARD)
      document.removeEventListener(events.KEYDOWN, this.listenForKeyboard)
      document.addEventListener(events.CLICK, this.listenForClick)
    }
  }

  listenForClick(event) {
    document.body.classList.remove(selectors.USING_KEYBOARD)
    document.removeEventListener(events.CLICK, this.listenForClick)
    document.addEventListener(events.KEYDOWN, this.listenForKeyboard)
  }

  stop() {
    document.removeEventListener(events.KEYDOWN, this.listenForKeyboard)
    document.removeEventListener(events.CLICK, this.listenForKeyboard)
  }
}
