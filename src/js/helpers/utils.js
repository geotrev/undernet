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

const Messages = {
  NO_SELECTOR_STRING_OR_CHILDREN_ERROR:
    "createFocusTrap must be given one or both of: first parameter (as selector string)" +
    " and/or options.children (array of elements).",
  OPTION_MATCHERS_DATA_TYPE_ERROR:
    "Invalid data type given to options.matchers for createFocusTrap. Expected: Array.",
  INCORRECT_MATCHER_TYPE_ERROR: type =>
    `Invalid matcher given to options.matchers for createFocusTrap. Expected: String. Recieved: ${type}.`,
  NO_MATCHER_LENGTH_ERROR:
    "Invalid value given to options.matchers for createFocusTrap; value must be an array with at least one selector string",
}

/**
 * Log a console message.
 * @param {String} message
 * @param {String} type
 */
export const log = (message, type = "error") => console[type](message)

/**
 * Check if window exists. If it doesn't, we're probably in a non-test node environment.
 */
export const isBrowserEnv = typeof window !== "undefined"

/**
 * Simple throttle utility. It is leading but not trailing.
 * @param {*} callback - function to throttle
 * @param {number} limit - time to throttle by in milliseconds
 */
export function throttle(callback, limit) {
  let timeout = false

  function clear() {
    timeout = false
  }

  return function() {
    if (timeout) return

    callback.apply(this, arguments)
    timeout = true
    setTimeout(clear, limit)
  }
}

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
    return Array.apply(null, parent.querySelectorAll(selector))
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
 * @param {String} selectorString - The selector string of the container element.
 * @param {String[]} matchers - Optional matchers override. Defaults to common focusable selectors.
 * @returns {Element[]} Static array of HTML elements
 */
export const getFocusableElements = (selectorString, matchers = Selectors.FOCUSABLE_TAGS) => {
  const focusables = matchers
    .map(selector => `${selectorString} ${selector}${Selectors.NOT_VISUALLY_HIDDEN_CLASS}`)
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
 * Factory function that creates focus trap helpers.
 *
 * ```js
 * const focusTrap = createFocusTrap("#element-id")
 * focusTrap.start()
 * focusTrap.stop()
 * ```
 *
 * Pass an object in the second param to use other helpers for arrow trapping, custom children, and custom matchers.
 *
 * ```js
 * const focusTrap = createFocusTrap("#element-id", {
 *    useArrows: true,
 *    children: [],
 *    matchers: ['a', 'button', '.my-cool-element']
 * })
 * focusTrap.start()
 * ```
 *
 * @param {String} selectorString
 * @param {{ useArrows, children: (NodeList|Element[]), matchers: String[] }} options - useArrows is coerced to true/false.
 * @returns {{ start: Function, stop: Function }}
 */
export const createFocusTrap = (selectorString, options = {}) => {
  if (!isBrowserEnv) return
  const { useArrows, children, matchers = Selectors.FOCUSABLE_TAGS } = options

  if (!selectorString && !children.length) {
    log(Messages.NO_SELECTOR_STRING_OR_CHILDREN_ERROR)
    return
  }

  if (!Array.isArray(matchers)) {
    log(Messages.OPTION_MATCHERS_DATA_TYPE_ERROR)
    return
  } else if (matchers.length) {
    let hasBadMatcher = false

    matchers.forEach(matcher => {
      const type = typeof matcher
      if (type !== "string") {
        log(Messages.INCORRECT_MATCHER_TYPE_ERROR(type))
        hasBadMatcher = true
      }
    })

    if (hasBadMatcher) return
  } else if (!matchers.length) {
    log(Messages.NO_MATCHER_LENGTH_ERROR)
    return
  }

  const focusableChildren =
    children && children.length ? children : getFocusableElements(selectorString, matchers)
  const focusableFirstChild = focusableChildren[0]
  const focusableLastChild = focusableChildren[focusableChildren.length - 1]

  const handleFocusTrapWithTab = event => {
    const containerElement = dom.find(selectorString)
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
 * Factory function that creates focus ring helpers.
 *
 * ```js
 * const focusRing = createFocusRing()
 * focusRing.start()
 * focusRing.stop()
 * ```
 *
 * @returns {{ start: Function, stop: Function }}
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
 * Focus a single element one time and teardown when unfocused.
 * @param {HTMLElement} element
 */
export const focusOnce = element => {
  const handleBlur = ({ target }) => {
    dom.removeAttr(target, Selectors.TABINDEX)
    target.removeEventListener(Events.BLUR, handleBlur)
  }

  dom.setAttr(element, Selectors.TABINDEX, "-1")
  element.focus()
  element.addEventListener(Events.BLUR, handleBlur)
}

/**
 * Check if a value is type "string".
 * @param {*} value
 * @returns {boolean}
 */
const isString = value => typeof value === "string"

/**
 * Check if a value is type "function".
 * @param {*} value
 * @returns {boolean}
 */
const isFunction = value => typeof value === "function"

/**
 * Initialize an Undernet component globally or by id.
 * @param {Object} metadata
 * @property {string} id
 * @property {string} attribute
 * @property {Object} thisArg
 */
export const startComponent = (metadata = {}) => {
  if (!isBrowserEnv) return

  const { id, attribute, thisArg } = metadata

  if (id && isString(id)) {
    const instance = dom.find(`[${attribute}='${id}']`)
    if (!instance) return

    const validComponent = [instance].filter(thisArg._validate)[0]
    if (!validComponent) return

    thisArg._components.push(validComponent)
  } else if (!id && !thisArg._components.length) {
    const instances = dom.findAll(`[${attribute}]`)
    if (!instances.length) return

    const validComponents = instances.filter(thisArg._validate)
    thisArg._components = thisArg._components.concat(validComponents)
  } else {
    // attempted to .start() when .stop() wasn't run,
    // OR tried to instantiate a component that's already active.
  }
}

/**
 * Teardown an Undernet component globally or by id.
 * @param {Object} metadata
 * @property {string} id
 * @property {string} attribute
 * @property {Object} thisArg
 * @property {string} activeNodeKey
 * @property {*=} cancelActiveFn
 */
export const stopComponent = (metadata = {}) => {
  if (!isBrowserEnv) return

  const { id, attribute, thisArg, activeNodeKey, cancelActiveFn } = metadata

  if (id && isString(id)) {
    let targetIndex
    const instance = thisArg._components.filter((activeInstance, index) => {
      if (dom.getAttr(activeInstance, attribute) !== id) return false
      targetIndex = index
      return true
    })[0]

    if (!instance) return

    if (thisArg[activeNodeKey] && instance === thisArg[activeNodeKey] && isFunction(cancelActiveFn))
      thisArg[cancelActiveFn]()

    thisArg._teardown(instance)
    thisArg._components.splice(targetIndex, 1)
  } else if (!id && thisArg._components.length) {
    if (thisArg[activeNodeKey] && isFunction(cancelActiveFn)) thisArg[cancelActiveFn]()

    thisArg._components.forEach(thisArg._teardown)
    thisArg._components = []
  }
}
