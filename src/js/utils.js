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
    "createFocusTrap must be given one or both of: first parameter (as selector string) and/or options.children (array of elements).",
  OPTION_USE_ARROWS_DATA_TYPE_ERROR:
    "Invalid data type given to options.useArrows for createFocusTrap. Expected: Boolean.",
  OPTION_MATCHERS_DATA_TYPE_ERROR:
    "Invalid data type given to options.matchers for createFocusTrap. Expected: Array.",
  OPTION_CHILDREN_DATA_TYPE_ERROR:
    "Invalid data type given to options.children for createFocusTrap. Expected: Array-Like.",
  NO_PARENT_FOUND_IN_SCOPE: id => `Element couldn't be found with selector string: '${id}'`,
  DUPLICATE_SCOPE_ERROR: id =>
    `You tried to start an Undernet component with scope '${id}', but that scope is already active.\n\nYou must call COMPONENT_NAME.stop(scopeSelector) first, then.`,
}

/**
 * Log a console message.
 *
 * @param {String} message
 * @param {String} type
 */
export const log = (message, type = "error") => console[type](message)

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
 * @param {String} selectorString - The selector string of the container element.
 * @param {Array<String>} matchers - Optional matchers override. Defaults to common focusable selectors.
 * @returns {Array<Element>} Static array of HTML elements
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

const isElementCollection = value => {
  if (!isBrowserEnv || !value.constructor) return false
  return value.constructor.name === "NodeList" || value.constructor.name === "HTMLCollection"
}

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
 * @param {{ useArrows: Boolean, children: (Array<Element>|NodeList), matchers: Array<String> }} options
 * @returns {{ start: Function, stop: Function }}
 */
export const createFocusTrap = (selectorString, options = {}) => {
  if (!isBrowserEnv) return
  const { useArrows = false, children = [], matchers = Selectors.FOCUSABLE_TAGS } = options

  if (!selectorString && !children.length) {
    log(Messages.NO_SELECTOR_STRING_OR_CHILDREN_ERROR)
    return
  }

  if (typeof useArrows !== "boolean") {
    log(Messages.OPTION_USE_ARROWS_DATA_TYPE_ERROR)
    return
  }

  if (!Array.isArray(matchers)) {
    log(Messages.OPTION_MATCHERS_DATA_TYPE_ERROR)
    return
  }

  if (!Array.isArray(children) && !isElementCollection(children)) {
    log(Messages.OPTION_CHILDREN_DATA_TYPE_ERROR)
    return
  }

  const focusableChildren = children.length
    ? children
    : getFocusableElements(selectorString, matchers)
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

/**
 * Filters an array of elements by if a given attribute has a value.
 *
 * @param {Array<Element>} elements
 * @param {String} attribute
 * @param {String} errorMessage
 */
const filterByAttrValue = (elements, attribute, error) => {
  return elements.filter(element => {
    const value = dom.getAttr(element, attribute)

    if (!value) {
      log(error)
      return false
    }

    return true
  })
}

/**
 * Options necessary to set a library of components on a class instance.
 *
 * @typedef {Object} SetComponentsOptions
 * @param {Object} options.thisArg
 * @param {String} options.scopeId
 * @param {String} options.scopeKey
 * @param {String} options.componentAttribute
 * @param {String} options.globalKey
 * @param {String} options.errorMessage
 * @param {Function=} options.filterFn
 */

/**
 * Assigns queried elements to a scope.
 *
 * @param {SetComponentsOptions} options
 */
const assignScope = (options = {}) => {
  const {
    thisArg,
    scopeId,
    scopeKey,
    componentAttribute,
    globalKey,
    errorMessage,
    filterFn,
  } = options

  const scope = thisArg[scopeKey].get(scopeId)

  // `globalKey` is used to separate components that extend
  // from others, such as Accordion extending Collapsible.
  if (!scope || (scope && scope.globalKey !== globalKey)) {
    const parent = dom.find(scopeId)

    if (!parent) {
      log(Messages.NO_PARENT_FOUND_IN_SCOPE(scopeId))
      return
    }

    let elements = dom.findAll(`[${componentAttribute}]`, parent)

    if (typeof filterFn === "function") {
      elements = filterFn(elements)
    } else {
      elements = filterByAttrValue(elements, componentAttribute, errorMessage)
    }

    if (!elements || !elements.length) return

    thisArg[scopeKey].set(scopeId, { elements, parent, globalKey })
  } else {
    log(Messages.DUPLICATE_SCOPE_ERROR(scopeId))
  }
}

/**
 * Assigns queried elements to the global scope.
 *
 * @param {SetComponentsOptions} options
 */
const assignGlobal = (options = {}) => {
  const { thisArg, scopeKey, componentAttribute, globalKey, errorMessage, filterFn } = options
  const scopes = thisArg[scopeKey]
  let elements = dom.findAll(`[${componentAttribute}]`)

  if (typeof filterFn === "function") elements = filterFn(elements)

  if (elements.length && scopes.size) {
    scopes.forEach(scope => {
      elements = elements.filter(component => {
        const componentId = dom.getAttr(component, componentAttribute)

        if (!componentId) {
          log(errorMessage)
          return false
        }

        return Boolean(!dom.find(`[${componentAttribute}='${componentId}']`, scope.parent))
      })
    })
  } else {
    elements = filterByAttrValue(elements, componentAttribute, errorMessage)
  }

  thisArg[globalKey] = elements
}

/**
 * Set either a scope or global component library on a class instance.
 *
 * @param {SetComponentsOptions} options
 */
export const setComponents = (options = {}) => {
  if (options.scopeId) {
    assignScope(options)
  } else {
    assignGlobal(options)
  }
}
