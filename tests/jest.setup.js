import Enzyme, { shallow, render, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })

global.shallow = shallow
global.render = render
global.mount = mount

// Create a simple component instance with jest.mock()
// jest.mock("./path/to/Component", () => simpleMock("Component"))
global.simpleMock = mockName => {
  // eslint-disable-next-line
  return eval(`const ${mockName} = props => props.children || null; ${mockName}`)
}

/**
 * Create and fire a keyboard event.
 * @param {Number} which - The key code to simulate.
 * @param {Boolean} shiftKey - Whether shift key should be used.
 * @param {Element} node - The element to fire the event on.
 */
global.simulateKeyPress = (which, shiftKey = false, node = null) => {
  const event = new KeyboardEvent("keydown", {
    which,
    shiftKey,
    keyCode: which,
    bubbles: true,
  })

  return node ? node.dispatchEvent(event) : document.dispatchEvent(event)
}

/**
 * Create and fire a keyboard event.
 * @param {String} name - Event name.
 * @param {Object} node - The node to dispatch the event against.
 * @param {Boolean} bubbles - Flag for allowing bubbling of the event.
 * @param {Boolean} cancelale - Flag for allowing cancelling of the event.
 */
global.simulateMouseEvent = (name, node = null, bubbles = false, cancelable = false) => {
  const event = new MouseEvent(name, {
    bubbles: bubbles || true,
    cancelable: cancelable || true,
    relatedTarget: window,
  })

  return node ? node.dispatchEvent(event) : document.dispatchEvent(event)
}
