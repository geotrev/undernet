/**
 * Create and fire a keyboard event.
 * @param {String} name - Event name.
 * @param {Object} node - The node to dispatch the event against.
 * @param {Boolean} bubbles - Flag for allowing bubbling of the event.
 * @param {Boolean} cancelale - Flag for allowing cancelling of the event.
 */
export const simulateMouseEvent = (name, node = null) => {
  const event = new MouseEvent(name, {
    bubbles: true,
    relatedTarget: window,
  })

  return node ? node.dispatchEvent(event) : document.dispatchEvent(event)
}
