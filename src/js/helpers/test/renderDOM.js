import { find } from "./find"

/**
 * Renders DOM instance to assert against. Returns function that, when called, returns the <body> element.
 *
 * @param {String} dom - The string to assign to JSDOM's document body.
 * @return {Function} - Function to call to get current instance of the document body.
 */
export const renderDOM = dom => {
  document.body.innerHTML = dom
  return find("body")
}
