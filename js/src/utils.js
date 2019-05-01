const KeyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
}

const Selectors = {
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard",
  NOT_VISUALLY_HIDDEN_CLASS: ":not(.is-visually-hidden)",
}

const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
}

/**
 * Simple DOM manipulator methods. NOTE: These aren't chainable.
 */
export const dom = {
  attr: (element, attr, newValue) => {
    if (newValue === false) {
      return element.removeAttribute(attr)
    }

    if (typeof newValue === "string" || newValue === null) {
      return element.setAttribute(attr, newValue)
    }

    return element.getAttribute(attr)
  },
  hasAttr: (element, attr) => element.hasAttribute(attr),

  find: (selector, parent = document) => parent.querySelector(selector),
  findAll: (selector, parent = document) => [...parent.querySelectorAll(selector)],

  css: (element, property, value) => {
    if (typeof value === "string" || value === null) {
      return (element.style[property] = value)
    }

    return element.style[property]
  },

  addClass: (element, ...classes) => element.classList.add(...classes),
  removeClass: (element, ...classes) => element.classList.remove(...classes),
  hasClass: (element, ...classes) => {
    if (classes.length) {
      return classes.filter(cls => element.classList.contains(cls)).length
    }

    return element.classList.contains(classes[0])
  },
}

/**
 * Return an array literal of elements matching focusable elements within a given container.
 */
export const getFocusableElements = container => {
  const focusables = Selectors.FOCUSABLE_TAGS.map(
    element => `${container} ${element}${Selectors.NOT_VISUALLY_HIDDEN_CLASS}`
  ).join(", ")

  return dom.findAll(focusables)
}

/**
 * Check if the current browser session is within an Apple device.
 */
export const iOSMobile = /(iphone|ipod|ipad)/i.test(navigator.userAgent)

/**
 * Utility class to help with focus trapping and keyboard outline management.
 * Components extend from this method.
 */
export default class Utils {
  constructor() {
    // events
    this._listenForKeyboard = this._listenForKeyboard.bind(this)
    this._listenForClick = this._listenForClick.bind(this)
    this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this)
    this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this)

    // instance data
    this._focusContainerSelector = ""
    this._focusableChildren = []
    this._focusableFirstChild = {}
    this._focusableLastChild = {}
    this._listeningForKeydown = false
    this._trapFocusWithArrows = false
  }

  // public

  captureFocus(container, options) {
    this._focusContainerSelector = container
    this._focusableChildren = getFocusableElements(this._focusContainerSelector)
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

  releaseFocus() {
    if (this._trapFocusWithArrows) {
      document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows)
      this._trapFocusWithArrows = false
    } else {
      document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab)
    }
  }

  enableFocusOutline() {
    document.addEventListener(Events.KEYDOWN, this._listenForKeyboard)
  }

  disableFocusOutline() {
    if (this._listeningForKeydown) {
      document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard)
    } else {
      document.removeEventListener(Events.CLICK, this._listenForClick)
    }
  }

  // private

  _listenForKeyboard() {
    document.body.classList.add(Selectors.KEYBOARD_CLASS)
    document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard)
    document.addEventListener(Events.CLICK, this._listenForClick)
    this._listeningForKeydown = false
  }

  _listenForClick() {
    document.body.classList.remove(Selectors.KEYBOARD_CLASS)
    document.removeEventListener(Events.CLICK, this._listenForClick)
    document.addEventListener(Events.KEYDOWN, this._listenForKeyboard)
    this._listeningForKeydown = true
  }

  _handleFocusTrapWithTab(event) {
    const containerElement = dom.find(this._focusContainerSelector)
    const containerActive = document.activeElement === containerElement
    const firstActive = document.activeElement === this._focusableFirstChild
    const lastActive = document.activeElement === this._focusableLastChild
    const tabKey = event.which === KeyCodes.TAB
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const hasShift = shiftKey && tabKey
    const noShift = !shiftKey && tabKey

    if (hasShift && (firstActive || containerActive)) {
      event.preventDefault()
      this._focusableLastChild.focus()
    } else if (noShift && lastActive) {
      event.preventDefault()
      this._focusableFirstChild.focus()
    }
  }

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

  _focusNextChild() {
    for (let i = 0; i < this._focusableChildren.length; i++) {
      if (this._focusableChildren[i] === document.activeElement) {
        this._focusableChildren[i + 1].focus()
        break
      }
    }
  }

  _focusLastChild() {
    for (let i = 0; i < this._focusableChildren.length; i++) {
      if (this._focusableChildren[i] === document.activeElement) {
        this._focusableChildren[i - 1].focus()
        break
      }
    }
  }
}
