/**
 * Create and fire a keyboard event.
 * @param {String} name - Event name.
 * @param {Object} node - The node to dispatch the event against.
 */
export const simulateMouseEvent = (name, node = null) => {
  const event = new MouseEvent(name, {
    bubbles: true,
    relatedTarget: window,
  })

  return node ? node.dispatchEvent(event) : document.dispatchEvent(event)
}
