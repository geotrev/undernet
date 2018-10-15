"use strict"

const keyCodes = {
  SHIFT: 16,
  TAB: 9,
}

const selectors = {
  FOCUSABLE_SELECTOR: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
}

const events = {
  KEYDOWN: "keydown",
}

/**
 * Utility methods for DOM traversal and focus trapping.
 * @module Utils
 */
export default class Utils {
  constructor() {
    // bind events to Utils
    this.handleFocusTrap = this.handleFocusTrap.bind(this)
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
