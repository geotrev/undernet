import Undernet from "../js/src/undernet"
global.Undernet = Undernet

import { expect } from "chai"
global.expect = expect

const { JSDOM } = require("jsdom")
const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>")
const { window } = dom
global.window = window
global.document = window.document

/**
 * Create and fire a keyboard event.
 * @param {Number} which - The key code to simulate.
 * @param {Boolean} shiftKey - Whether shift key should be used.
 * @param {Element} node - The element to fire the event on.
 */
global.window.simulateKeyPress = (which, shiftKey = false, node = null) => {
  const event = new KeyboardEvent("keydown", {
    which,
    shiftKey,
    keyCode: which,
    bubbles: true,
  })

  return node ? node.dispatchEvent(event) : document.dispatchEvent(event)
}
