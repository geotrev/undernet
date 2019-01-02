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
  #focusContainerSelector = ""
  #focusableChildren = []
  #focusableFirstChild = {}
  #focusableLastChild = {}
  #listeningForKeydown = false
  #trapFocusWithArrows = false

  // public

  /**
   * Listens to the first and last elements matched from this.getFocusableElements()
   * @param {String} container - The container's class, attribute, etc.
   * @param {Object} options - Optional has hof options.
   */
  captureFocus(container, options) {
    this.#focusContainerSelector = container
    this.#focusableChildren = this.getFocusableElements(this.#focusContainerSelector)
    this.#focusableFirstChild = this.#focusableChildren[0]
    this.#focusableLastChild = this.#focusableChildren[this.#focusableChildren.length - 1]

    if (options) {
      if (options.useArrows) {
        this.#trapFocusWithArrows = options.useArrows || this.#trapFocusWithArrows
        document.addEventListener(Events.KEYDOWN, this.#handleFocusTrapWithArrows)
      }
    } else {
      document.addEventListener(Events.KEYDOWN, this.#handleFocusTrapWithTab)
    }
  }

  /**
   * Stop trapping focus set in this.captureFocus()
   */
  releaseFocus() {
    if (this.#trapFocusWithArrows) {
      document.removeEventListener(Events.KEYDOWN, this.#handleFocusTrapWithArrows)
      this.#trapFocusWithArrows = false
    } else {
      document.removeEventListener(Events.KEYDOWN, this.#handleFocusTrapWithTab)
    }
  }

  /**
   * Begin listening to #listenForKeyboard()
   */
  enableFocusOutline() {
    document.addEventListener(Events.KEYDOWN, this.#listenForKeyboard)
  }

  /**
   * Completely disable focus outline utility.
   */
  disableFocusOutline() {
    if (this.#listeningForKeydown) {
      document.removeEventListener(Events.KEYDOWN, this.#listenForKeyboard)
    } else {
      document.removeEventListener(Events.CLICK, this.#listenForClick)
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
   * and add click listener on #listenForClick().
   * @param {Object} event - Event (keypress).
   */
  #listenForKeyboard = event => {
    const tabKey = event.which === KeyCodes.TAB
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const arrowUp = event.which === KeyCodes.ARROW_UP
    const arrowDown = event.which === KeyCodes.ARROW_DOWN

    if (tabKey || shiftKey || arrowUp || arrowDown) {
      document.body.classList.add(Selectors.KEYBOARD_CLASS)
      document.removeEventListener(Events.KEYDOWN, this.#listenForKeyboard)
      document.addEventListener(Events.CLICK, this.#listenForClick)
      this.#listeningForKeydown = false
    }
  }

  /**
   * On click, remove Selectors.KEYBOARD_CLASS and re-add keydown listener.
   * @param {Object} event - Event (keypress).
   */
  #listenForClick = event => {
    document.body.classList.remove(Selectors.KEYBOARD_CLASS)
    document.removeEventListener(Events.CLICK, this.#listenForClick)
    document.addEventListener(Events.KEYDOWN, this.#listenForKeyboard)
    this.#listeningForKeydown = true
  }

  /**
   * Handles focus on first or last child in a container, using tab and tab+shift keys.
   * @param {Object} event - Event (keypress)
   */
  #handleFocusTrapWithTab = event => {
    const containerElement = document.querySelector(this.#focusContainerSelector)
    const containerActive = document.activeElement === containerElement
    const firstActive = document.activeElement === this.#focusableFirstChild
    const lastActive = document.activeElement === this.#focusableLastChild
    const tabKey = event.which === KeyCodes.TAB
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const hasShift = shiftKey && tabKey
    const noShift = !shiftKey && tabKey

    if (shiftKey && tabKey && (firstActive || containerActive)) {
      event.preventDefault()
      this.#focusableLastChild.focus()
    } else if (!shiftKey && tabKey && lastActive) {
      event.preventDefault()
      this.#focusableFirstChild.focus()
    }
  }

  /**
   * Handles focus on the first, last, next, or previous child in a container, using up and down arrow keys.
   * @param {Object} event - Event (keypress)
   */
  #handleFocusTrapWithArrows = event => {
    const firstActive = document.activeElement === this.#focusableFirstChild
    const lastActive = document.activeElement === this.#focusableLastChild
    const arrowUp = event.which === KeyCodes.ARROW_UP
    const arrowDown = event.which === KeyCodes.ARROW_DOWN

    if (arrowUp || arrowDown) {
      event.preventDefault()

      if (firstActive && arrowUp) {
        this.#focusableLastChild.focus()
      } else if (lastActive && arrowDown) {
        this.#focusableFirstChild.focus()
      } else if (arrowDown) {
        this.#focusNextChild()
      } else if (arrowUp) {
        this.#focusLastChild()
      }
    }
  }

  /**
   * Focus the next child in this.#focusableChildren.
   */
  #focusNextChild() {
    for (let i = 0; i < this.#focusableChildren.length; i++) {
      if (this.#focusableChildren[i] === document.activeElement) {
        this.#focusableChildren[i + 1].focus()
        break
      }
    }
  }

  /**
   * Focus the previous child in this.#focusableChildren.
   */
  #focusLastChild() {
    for (let i = 0; i < this.#focusableChildren.length; i++) {
      if (this.#focusableChildren[i] === document.activeElement) {
        this.#focusableChildren[i - 1].focus()
        break
      }
    }
  }
}
