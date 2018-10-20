"use strict"

const keyCodes = {
  SHIFT: 16,
  TAB: 9,
}

const selectors = {
  FOCUSABLE_SELECTOR: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard",
}

const events = {
  KEYDOWN: "keydown",
  CLICK: "click",
}

/**
 * Utility methods for DOM traversal and focus trapping.
 * @module Utils
 */
export default class Utils {
  constructor() {
    this._handleFocusTrap = this._handleFocusTrap.bind(this)
    this._listenForKeyboard = this._listenForKeyboard.bind(this)
    this._listenForClick = this._listenForClick.bind(this)
  }

  // public

  /**
   * Listens to the first and last elements matched from this._getFocusableElements()
   * @param {String} container - The container's class, attribute, etc.
   */
  captureFocus(container) {
    this.focusContainerSelector = container
    const children = this._getFocusableElements(this.focusContainerSelector)
    this.focusableFirstChild = children[0]
    this.focusableLastChild = children[children.length - 1]

    document.addEventListener(events.KEYDOWN, this._handleFocusTrap)
  }

  /**
   * Stop trapping focus set in this.captureFocus()
   */
  releaseFocus() {
    document.removeEventListener(events.KEYDOWN, this._handleFocusTrap)
  }

  /**
   * Begin listening to _listenForKeyboard()
   */
  enableFocusOutline() {
    document.addEventListener(events.KEYDOWN, this._listenForKeyboard)
  }

  /**
   * Completely disable focus outline utility.
   */
  disableFocusOutline() {
    document.removeEventListener(events.KEYDOWN, this._listenForKeyboard)
    document.removeEventListener(events.CLICK, this.__listenForClick)
  }

  // private

  /**
   * When a key is pressed, detect if it's tab or shift keys and enable
   * focus outlines on currently focused element(s). Then, remove keydown listener
   * and add click listener on _listenForClick().
   * @param {Object} event - Event (keypress).
   */
  _listenForKeyboard(event) {
    const tabKey = event.which === keyCodes.TAB
    const shiftKey = event.which === keyCodes.SHIFT || event.shiftKey

    if (tabKey || shiftKey) {
      document.body.classList.add(selectors.KEYBOARD_CLASS)
      document.removeEventListener(events.KEYDOWN, this._listenForKeyboard)
      document.addEventListener(events.CLICK, this._listenForClick)
    }
  }

  /**
   * On click, remove selectors.KEYBOARD_CLASS and re-add keydown listener.
   * @param {Object} event - Event (keypress).
   */
  _listenForClick(event) {
    document.body.classList.remove(selectors.KEYBOARD_CLASS)
    document.removeEventListener(events.CLICK, this._listenForClick)
    document.addEventListener(events.KEYDOWN, this._listenForKeyboard)
  }

  /**
   * Because IE does not recognize NodeList.forEach(),
   * we use a cross-browser solution for returning an array of DOM nodes every time.
   * @param {String} element - A DOM node's class, attribute, etc., to search the document.
   * @return {Array}
   */
  _getElements(element) {
    const nodeList = document.querySelectorAll(element)
    return Array.apply(null, nodeList)
  }

  /**
   * Creates a string of element selector patterns using common elements.
   * @param {String} container - The enclosing container's class, attribute, etc.
   * @return {String}
   */
  _getFocusableElements(container) {
    let focusables = []
    selectors.FOCUSABLE_TAGS.map(element =>
      focusables.push(`${container} ${element}${selectors.FOCUSABLE_SELECTOR}`),
    )
    return this._getElements(focusables.join(", "))
  }

  /**
   * Handles focus on first or last child in a container.
   * @param {Object} event - Event (keypress)
   */
  _handleFocusTrap(event) {
    const activeElement = document.activeElement
    const containerElement = document.querySelector(this.focusContainerSelector)
    const containerActive = activeElement === containerElement
    const firstActive = activeElement === this.focusableFirstChild
    const lastActive = activeElement === this.focusableLastChild
    const tabKey = event.which === keyCodes.TAB
    const shiftKey = event.which === keyCodes.SHIFT || event.shiftKey
    const hasShift = shiftKey && tabKey
    const noShift = !shiftKey && tabKey

    // Just in case the first or last child have changed -
    // recapture focus and continue trapping.
    this.releaseFocus()
    this.captureFocus(this.focusContainerSelector)

    if (hasShift && (firstActive || containerActive)) {
      event.preventDefault()
      this.focusableLastChild.focus()
    } else if (noShift && lastActive) {
      event.preventDefault()
      this.focusableFirstChild.focus()
    }
  }
}
