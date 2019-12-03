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
  TABINDEX: "tabindex",
}

const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  BLUR: "blur",
}

/**
 * Check if window exists. If it doesn't, we're probably in a non-test node environment.
 */
export const isBrowserEnv = typeof window !== "undefined"

/**
 * Simple DOM manipulator methods. These aren't chainable.
 */
export const dom = {
  getAttr(element, attr) {
    return element.getAttribute(attr)
  },
  setAttr(element, attr, value) {
    element.setAttribute(attr, value)
  },
  removeAttr(element, attr) {
    element.removeAttribute(attr)
  },
  hasAttr(element, attr) {
    return element.hasAttribute(attr)
  },

  find(selector, parent = document) {
    return parent.querySelector(selector)
  },
  findAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)]
  },

  setStyle(element, property, value) {
    element.style[property] = value
  },
  getStyle(element, property) {
    return element.style[property]
  },

  addClass(element, ...classes) {
    element.classList.add(...classes)
  },
  removeClass(element, ...classes) {
    element.classList.remove(...classes)
  },
  hasClass(element, ...classes) {
    return classes.filter(givenClassName => element.classList.contains(givenClassName)).length > 0
  },
}

/**
 * Search for elements matching a given selector.
 *
 * ```js
 * const elements = getFocusableElements(".wrapper")
 * elements.forEach(element => element.classList.add("focusable"))
 * ```
 *
 * Use a custom pattern to select only specific elements:
 *
 * ```js
 * const elements = getFocusableElements(".wrapper", [".my-button"])
 * ```
 *
 * @param {String} element
 * @param {Array<String>} patterns - Optional pattern override. Defaults to common focusable selectors.
 * @returns {Array<Element>} Static array of HTML elements
 */
export const getFocusableElements = (element, patterns = Selectors.FOCUSABLE_TAGS) => {
  if (!element) {
    console.error("No `element` parameter given to `getFocusableElements`.")
    return
  }

  if (!Array.isArray(patterns)) {
    console.error(
      "Invalid data type given in second parameter for `getFocusableElements`, expected: Array."
    )
    return
  }

  const focusables = patterns
    .map(selector => `${element} ${selector}${Selectors.NOT_VISUALLY_HIDDEN_CLASS}`)
    .join(", ")

  return dom.findAll(focusables)
}

/**
 * Check if the current browser session is within an Apple device.
 *
 * ```js
 * if (iOSMobile) {
 *   console.log("This is on iOS!")
 * }
 * ```
 *
 * @returns {Boolean}
 */
export const iOSMobile = isBrowserEnv ? /(iphone|ipod|ipad)/i.test(navigator.userAgent) : false

/**
 * Create a focus trap instance.
 *
 * ```js
 * const focusTrap = createFocusTrap("#element-id")
 * focusTrap.start()
 * focusTrap.stop()
 * ```
 *
 * Pass an object in the second param to trap focus with up and down arrows.
 *
 * ```js
 * const focusTrap = createFocusTrap("#element-id", { useArrows: true })
 * focusTrap.start()
 * ```
 *
 * @param {String} container
 * @param {{ useArrows: Boolean, children: Array<Element> }} options - options object. Default: {}
 * @returns {{ start: Function, stop: Function }} - { start, stop }
 */
export const createFocusTrap = (container, options = {}) => {
  if (!isBrowserEnv) return

  const { useArrows, children } = options
  const focusableChildren = children || getFocusableElements(container)
  const focusableFirstChild = focusableChildren[0]
  const focusableLastChild = focusableChildren[focusableChildren.length - 1]

  const focusNextChild = () => {
    for (let i = 0; i < focusableChildren.length; i++) {
      if (focusableChildren[i] === document.activeElement) {
        focusableChildren[i + 1].focus()
        break
      }
    }
  }

  const focusLastChild = () => {
    for (let i = 0; i < focusableChildren.length; i++) {
      if (focusableChildren[i] === document.activeElement) {
        focusableChildren[i - 1].focus()
        break
      }
    }
  }

  const handleFocusTrapWithTab = event => {
    const containerElement = dom.find(container)
    const containerActive = document.activeElement === containerElement
    const firstActive = document.activeElement === focusableFirstChild
    const lastActive = document.activeElement === focusableLastChild

    if (!containerActive && !firstActive && !lastActive) return

    const tabKey = event.which === KeyCodes.TAB
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const hasShift = shiftKey && tabKey
    const noShift = !shiftKey && tabKey

    if (hasShift && (firstActive || containerActive)) {
      event.preventDefault()
      focusableLastChild.focus()
    } else if (noShift && lastActive) {
      event.preventDefault()
      focusableFirstChild.focus()
    }
  }

  const handleFocusTrapWithArrows = event => {
    const firstActive = document.activeElement === focusableFirstChild
    const lastActive = document.activeElement === focusableLastChild
    const arrowUp = event.which === KeyCodes.ARROW_UP
    const arrowDown = event.which === KeyCodes.ARROW_DOWN

    if (arrowUp || arrowDown) {
      event.preventDefault()

      if (firstActive && arrowUp) {
        focusableLastChild.focus()
      } else if (lastActive && arrowDown) {
        focusableFirstChild.focus()
      } else if (arrowDown) {
        focusNextChild()
      } else if (arrowUp) {
        focusLastChild()
      }
    }
  }

  return {
    start() {
      if (useArrows) {
        document.addEventListener(Events.KEYDOWN, handleFocusTrapWithArrows)
      } else {
        document.addEventListener(Events.KEYDOWN, handleFocusTrapWithTab)
      }
    },
    stop() {
      if (useArrows) {
        document.removeEventListener(Events.KEYDOWN, handleFocusTrapWithArrows)
      } else {
        document.removeEventListener(Events.KEYDOWN, handleFocusTrapWithTab)
      }
    },
  }
}

/**
 * Create a focus ring instance.
 *
 * ```js
 * const focusRing = createFocusRing()
 * focusRing.start()
 * focusRing.stop()
 * ```
 *
 * @returns {{ start: Function, stop: Function }} - { start: fn, stop: fn }
 */
export const createFocusRing = () => {
  if (!isBrowserEnv) return

  let listeningForKeydown

  const listenForKeyboard = () => {
    document.body.classList.add(Selectors.KEYBOARD_CLASS)
    document.removeEventListener(Events.KEYDOWN, listenForKeyboard)
    // eslint-disable-next-line no-use-before-define
    document.addEventListener(Events.CLICK, listenForClick)
    listeningForKeydown = false
  }

  const listenForClick = () => {
    document.body.classList.remove(Selectors.KEYBOARD_CLASS)
    document.removeEventListener(Events.CLICK, listenForClick)
    document.addEventListener(Events.KEYDOWN, listenForKeyboard)
    listeningForKeydown = true
  }

  return {
    start() {
      document.addEventListener(Events.KEYDOWN, listenForKeyboard)
    },
    stop() {
      if (listeningForKeydown) {
        document.removeEventListener(Events.KEYDOWN, listenForKeyboard)
      } else {
        document.body.classList.remove(Selectors.KEYBOARD_CLASS)
        document.removeEventListener(Events.CLICK, listenForClick)
      }
    },
  }
}

/**
 * Get the computed font-size of the page body as a number.
 *
 * ```js
 * const size = getPageBaseFontSize()
 * element.style.lineHeight = `${size * 2}px`
 * ```
 *
 * @returns {Number}
 */
export const getPageBaseFontSize = () => {
  if (!isBrowserEnv) return

  const BODY_TAG = "body"
  const FONT_SIZE_PROPERTY = "font-size"
  const PX_SUBSTRING = "px"
  const FONT_SIZE_VALUE_FALLBACK = 16

  const body = dom.find(BODY_TAG)
  const computedFontSize = window.getComputedStyle(body).getPropertyValue(FONT_SIZE_PROPERTY)
  let bodySize = FONT_SIZE_VALUE_FALLBACK

  if (computedFontSize) {
    const indexOfPx = computedFontSize.indexOf(PX_SUBSTRING)
    bodySize = parseFloat(computedFontSize.slice(0, indexOfPx))
  }

  return bodySize
}

export const focusOnce = element => {
  const handleBlur = ({ target }) => {
    dom.removeAttr(target, Selectors.TABINDEX)
    target.removeEventListener(Events.BLUR, handleBlur)
  }

  dom.setAttr(element, Selectors.TABINDEX, "-1")
  element.focus()
  element.addEventListener(Events.BLUR, handleBlur)
}
