import { isBrowserEnv } from "./is-browser-env"
import { Selectors, Messages, KeyCodes, Events } from "./constants"
import { log } from "./log"
import { getFocusableElements } from "./dom"
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
  let focusTrapActive = false
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
    const containerElement = document.querySelector(selectorString)
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
      // Already active, exit
      if (focusTrapActive) return

      // Now active
      focusTrapActive = true

      // Handle focus listeners
      if (useArrows) {
        document.addEventListener(Events.KEYDOWN, handleFocusTrapWithArrows)
      } else {
        document.addEventListener(Events.KEYDOWN, handleFocusTrapWithTab)
      }
    },
    stop() {
      // Nothing to stop, exit
      if (!focusTrapActive) return

      // Now inactive
      focusTrapActive = false

      // Remove focus listeners
      if (useArrows) {
        document.removeEventListener(Events.KEYDOWN, handleFocusTrapWithArrows)
      } else {
        document.removeEventListener(Events.KEYDOWN, handleFocusTrapWithTab)
      }
    },
  }
}
