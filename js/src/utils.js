"use strict"

const keyCodes = {
  SHIFT: 16,
  TAB: 9,
}

const selectors = {
  FOCUSABLE_SELECTOR: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  USING_KEYBOARD: "using-keyboard",
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
    this.handleFocusTrap = this.handleFocusTrap.bind(this)
    this.listenForKeyboard = this.listenForKeyboard.bind(this)
    this.listenForClick = this.listenForClick.bind(this)
  }

  /**
   * Because IE does not recognize NodeList.forEach(),
   * we use a cross-browser solution for returning an array of DOM nodes every time.
   * @param {String} element - A DOM node's class, attribute, etc., to search the document.
   * @return {Array}
   */
  getElements(element) {
    const nodeList = document.querySelectorAll(element)
    return Array.apply(null, nodeList)
  }

  /**
   * Begin listening to listenForKeyboard()
   */
  enableFocusOutline() {
    document.addEventListener(events.KEYDOWN, this.listenForKeyboard)
  }

  /**
   * When a key is pressed, detect if it's tab or shift keys and enable
   * focus outlines on currently focused element(s). Then, remove keydown listener
   * and add click listener on listenForClick().
   * @param {Object} event - Event (keypress).
   */
  listenForKeyboard(event) {
    const tabKey = event.which === keyCodes.TAB
    const shiftKey = event.which === keyCodes.SHIFT || event.shiftKey

    if (tabKey || shiftKey) {
      document.body.classList.add(selectors.USING_KEYBOARD)
      document.removeEventListener(events.KEYDOWN, this.listenForKeyboard)
      document.addEventListener(events.CLICK, this.listenForClick)
    }
  }

  /**
   * On click, remove selectors.USING_KEYBOARD and re-add keydown listener.
   * @param {Object} event - Event (keypress).
   */
  listenForClick(event) {
    document.body.classList.remove(selectors.USING_KEYBOARD)
    document.removeEventListener(events.CLICK, this.listenForClick)
    document.addEventListener(events.KEYDOWN, this.listenForKeyboard)
  }

  /**
   * Completely disable focus outline utility.
   */
  disableFocusOutline() {
    document.removeEventListener(events.KEYDOWN, this.listenForKeyboard)
    document.removeEventListener(events.CLICK, this.listenForKeyboard)
  }

  /**
   * Creates a string of element selector patterns using common elements.
   * @param {String} container - The enclosing container's class, attribute, etc.
   * @return {String}
   */
  getFocusableElements(container) {
    let focusables = []
    selectors.FOCUSABLE_TAGS.map(element =>
      focusables.push(`${container} ${element}${selectors.FOCUSABLE_SELECTOR}`),
    )
    return this.getElements(focusables.join(", "))
  }

  /**
   * Listens to the first and last elements matched from this.getFocusableElements()
   * @param {String} container - The container's class, attribute, etc.
   */
  captureFocus(container) {
    this.focusContainer = container
    const children = this.getFocusableElements(this.focusContainer)
    this.focusableFirstChild = children[0]
    this.focusableLastChild = children[children.length - 1]

    document.addEventListener(events.KEYDOWN, this.handleFocusTrap)
  }

  /**
   * Handles focus on first or last child in a container.
   * @param {Object} event - Event (keypress)
   */
  handleFocusTrap(event) {
    const active = document.activeElement
    const containerElement = document.querySelector(this.focusContainer)
    const containerActive = active === containerElement
    const firstActive = active === this.focusableFirstChild
    const lastActive = active === this.focusableLastChild
    const tabKey = event.which === keyCodes.TAB
    const shiftKey = event.which === keyCodes.SHIFT || event.shiftKey
    const hasShift = shiftKey && tabKey
    const noShift = !shiftKey && tabKey

    // Just in case the first or last child have changed -
    // recapture focus and continue trapping.
    this.releaseFocus()
    this.captureFocus(this.focusContainer)

    if (hasShift && (firstActive || containerActive)) {
      event.preventDefault()
      this.focusableLastChild.focus()
    } else if (noShift && lastActive) {
      event.preventDefault()
      this.focusableFirstChild.focus()
    }
  }

  /**
   * Stop trapping focus set in this.captureFocus()
   */
  releaseFocus() {
    document.removeEventListener(events.KEYDOWN, this.handleFocusTrap)
  }
}
