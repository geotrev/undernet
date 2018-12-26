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
 * @param {Number} keyCode - The key code to simulate.
 */
global.window.simulateKeyPress = which => {
  const event = new KeyboardEvent("keydown", { which })
  document.dispatchEvent(event)
}
