/**
 * Create and fire a keyboard event.
 * @param {Number} which - The key code to simulate.
 * @param {Boolean} shiftKey - Whether shift key should be used.
 * @param {Element} node - The element to fire the event on.
 */
export const simulateKeyboardEvent = (which, shiftKey = false, node = null) => {
  const event = new KeyboardEvent("keydown", {
    which,
    shiftKey,
    keyCode: which,
    bubbles: true,
  })

  return node ? node.dispatchEvent(event) : document.dispatchEvent(event)
}
