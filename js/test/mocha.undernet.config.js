import Undernet from "../src/undernet"
global.Undernet = Undernet

import { expect } from "chai"
global.expect = expect

/**
 * Create and fire a keyboard event.
 * @param {Number} keyCode - The key code to simulate.
 */
global.window.simulateKeyPress = keyCode => {
  const event = new KeyboardEvent("keydown", {
    which: keyCode,
  })

  document.dispatchEvent(event)
}
