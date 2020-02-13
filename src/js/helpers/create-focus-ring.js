import { Events, Selectors } from "./constants"
import { isBrowserEnv } from "./is-browser-env"

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
