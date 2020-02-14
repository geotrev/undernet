import { Events, Selectors } from "./constants"

/**
 * Focus a single element one time and teardown when unfocused.
 * @param {HTMLElement} element
 */
export const focusOnce = element => {
  const handleBlur = ({ target }) => {
    target.removeAttribute(Selectors.TABINDEX)
    target.removeEventListener(Events.BLUR, handleBlur)
  }

  element.setAttribute(Selectors.TABINDEX, "-1")
  element.focus()
  element.addEventListener(Events.BLUR, handleBlur)
}
