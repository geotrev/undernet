"use strict"

const keyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
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
    this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this)
    this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this)
    this._listenForKeyboard = this._listenForKeyboard.bind(this)
    this._listenForClick = this._listenForClick.bind(this)
  }

  // public

  /**
   * Listens to the first and last elements matched from this._getFocusableElements()
   * @param {String} container - The container's class, attribute, etc.
   */

  captureFocus(container, options) {
    this.focusContainerSelector = container
    this.focusableChildren = this._getFocusableElements(this.focusContainerSelector)
    this.focusableFirstChild = this.focusableChildren[0]
    this.focusableLastChild = this.focusableChildren[this.focusableChildren.length - 1]

    if (options.useArrows) {
      document.addEventListener(events.KEYDOWN, this._handleFocusTrapWithArrows)
    } else {
      document.addEventListener(events.KEYDOWN, this._handleFocusTrapWithTab)
    }
  }

  /**
   * Stop trapping focus set in this.captureFocus()
   */
  releaseFocus() {
    document.removeEventListener(events.KEYDOWN, this._handleFocusTrapWithTab)
    document.removeEventListener(events.KEYDOWN, this._handleFocusTrapWithArrows)
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
   * Handles focus on first or last child in a container, using tab and tab+shift keys
   * @param {Object} event - Event (keypress)
   */
  _handleFocusTrapWithArrows(event) {
    const activeElement = document.activeElement
    const containerElement = document.querySelector(this.focusContainerSelector)
    const containerActive = activeElement === containerElement
    const firstActive = activeElement === this.focusableFirstChild
    const lastActive = activeElement === this.focusableLastChild
    const arrowUp = event.which === keyCodes.ARROW_UP
    const arrowDown = event.which === keyCodes.ARROW_DOWN

    // Just in case the first or last child have changed -
    // recapture focus and continue trapping.
    this.releaseFocus()
    this.captureFocus(this.focusContainerSelector, { useArrows: true })

    if (arrowUp || arrowDown) {
      event.preventDefault()

      if (firstActive && arrowUp) {
        this.focusableLastChild.focus()
      } else if (lastActive && arrowDown) {
        this.focusableFirstChild.focus()
      } else if (arrowDown) {
        this._focusNextChild()
      } else if (arrowUp) {
        this._focusLastChild()
      }
    }
  }

  _focusNextChild() {
    console.log(document.activeElement)
    this.focusableChildren.forEach((child, i) => {
      if (child === document.activeElement) {
        this.focusableChildren[i + 1].focus()
      }
    })
  }

  _focusLastChild() {
    console.log(document.activeElement)
    this.focusableChildren.forEach((child, i) => {
      if (child === document.activeElement) {
        this.focusableChildren[i - 1].focus()
      }
    })
  }

  /**
   * Handles focus on first or last child in a container, using tab and tab+shift keys
   * @param {Object} event - Event (keypress)
   */
  _handleFocusTrapWithTab(event) {
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
