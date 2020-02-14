import { Selectors } from "./constants"

/**
 * Run a `querySelectorAll` but convert the result to an array literal for IE11 compat.
 * @param {string} selector
 * @param {HTMLElement} parent
 */
export const queryAll = (selector, parent = document) => {
  return Array.apply(null, parent.querySelectorAll(selector))
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

  return queryAll(focusables)
}
