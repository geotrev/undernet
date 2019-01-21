"use strict"

const KeyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
}

const Selectors = {
  NOT_VISUALLY_HIDDEN: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard",
}

const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
}

/**
 * Utility methods for DOM traversal and focus trapping.
 * @module Utils
 */
export default class Utils {
  constructor() {
    // events
    this._listenForKeyboard = this._listenForKeyboard.bind(this)
    this._listenForClick = this._listenForClick.bind(this)
    this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this)
    this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this)

    this._focusContainerSelector = ""
    this._focusableChildren = []
    this._focusableFirstChild = {}
    this._focusableLastChild = {}
    this._listeningForKeydown = false
    this._trapFocusWithArrows = false
  }

  // public

  /**
   * Listens to the first and last elements matched from this.getFocusableElements()
   * @param {String} container - The container's class, attribute, etc.
   * @param {Object} options - Optional has hof options.
   */
  captureFocus(container, options) {
    this._focusContainerSelector = container
    this._focusableChildren = this.getFocusableElements(this._focusContainerSelector)
    this._focusableFirstChild = this._focusableChildren[0]
    this._focusableLastChild = this._focusableChildren[this._focusableChildren.length - 1]

    if (options) {
      if (options.useArrows) {
        this._trapFocusWithArrows = options.useArrows || this._trapFocusWithArrows
        document.addEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows)
      }
    } else {
      document.addEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab)
    }
  }

  /**
   * Stop trapping focus set in this.captureFocus()
   */
  releaseFocus() {
    if (this._trapFocusWithArrows) {
      document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows)
      this._trapFocusWithArrows = false
    } else {
      document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab)
    }
  }

  /**
   * Begin listening to _listenForKeyboard()
   */
  enableFocusOutline() {
    document.addEventListener(Events.KEYDOWN, this._listenForKeyboard)
  }

  /**
   * Completely disable focus outline utility.
   */
  disableFocusOutline() {
    if (this._listeningForKeydown) {
      document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard)
    } else {
      document.removeEventListener(Events.CLICK, this._listenForClick)
    }
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
    const focusables = Selectors.FOCUSABLE_TAGS.map(element => {
      return `${container} ${element}${Selectors.NOT_VISUALLY_HIDDEN}`
    })

    return this.getElements(focusables.join(", "))
  }

  // private

  /**
   * When a key is pressed, detect if it's tab or shift keys and enable
   * focus outlines on currently focused element(s). Then, remove keydown listener
   * and add click listener on _listenForClick().
   * @param {Object} event - Event (keypress).
   */
  _listenForKeyboard(event) {
    const tabKey = event.which === KeyCodes.TAB
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const arrowUp = event.which === KeyCodes.ARROW_UP
    const arrowDown = event.which === KeyCodes.ARROW_DOWN

    if (tabKey || shiftKey || arrowUp || arrowDown) {
      document.body.classList.add(Selectors.KEYBOARD_CLASS)
      document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard)
      document.addEventListener(Events.CLICK, this._listenForClick)
      this._listeningForKeydown = false
    }
  }

  /**
   * On click, remove Selectors.KEYBOARD_CLASS and re-add keydown listener.
   * @param {Object} event - Event (keypress).
   */
  _listenForClick(event) {
    document.body.classList.remove(Selectors.KEYBOARD_CLASS)
    document.removeEventListener(Events.CLICK, this._listenForClick)
    document.addEventListener(Events.KEYDOWN, this._listenForKeyboard)
    this._listeningForKeydown = true
  }

  /**
   * Handles focus on first or last child in a container, using tab and tab+shift keys.
   * @param {Object} event - Event (keypress)
   */
  _handleFocusTrapWithTab(event) {
    const containerElement = document.querySelector(this._focusContainerSelector)
    const containerActive = document.activeElement === containerElement
    const firstActive = document.activeElement === this._focusableFirstChild
    const lastActive = document.activeElement === this._focusableLastChild
    const tabKey = event.which === KeyCodes.TAB
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const hasShift = shiftKey && tabKey
    const noShift = !shiftKey && tabKey

    if (shiftKey && tabKey && (firstActive || containerActive)) {
      event.preventDefault()
      this._focusableLastChild.focus()
    } else if (!shiftKey && tabKey && lastActive) {
      event.preventDefault()
      this._focusableFirstChild.focus()
    }
  }

  /**
   * Handles focus on the first, last, next, or previous child in a container, using up and down arrow keys.
   * @param {Object} event - Event (keypress)
   */
  _handleFocusTrapWithArrows(event) {
    const firstActive = document.activeElement === this._focusableFirstChild
    const lastActive = document.activeElement === this._focusableLastChild
    const arrowUp = event.which === KeyCodes.ARROW_UP
    const arrowDown = event.which === KeyCodes.ARROW_DOWN

    if (arrowUp || arrowDown) {
      event.preventDefault()

      if (firstActive && arrowUp) {
        this._focusableLastChild.focus()
      } else if (lastActive && arrowDown) {
        this._focusableFirstChild.focus()
      } else if (arrowDown) {
        this._focusNextChild()
      } else if (arrowUp) {
        this._focusLastChild()
      }
    }
  }

  /**
   * Focus the next child in this._focusableChildren.
   */
  _focusNextChild() {
    for (let i = 0; i < this._focusableChildren.length; i++) {
      if (this._focusableChildren[i] === document.activeElement) {
        this._focusableChildren[i + 1].focus()
        break
      }
    }
  }

  /**
   * Focus the previous child in this._focusableChildren.
   */
  _focusLastChild() {
    for (let i = 0; i < this._focusableChildren.length; i++) {
      if (this._focusableChildren[i] === document.activeElement) {
        this._focusableChildren[i - 1].focus()
        break
      }
    }
  }
}
