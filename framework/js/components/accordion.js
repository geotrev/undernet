"use strict"

import Utils from "../utils"

const keyCodes = {}
const selectors = {}
const events = {}
const messages = {
  MISSING_ACCORDION_CONTENT: "You have an accordion button that is missing it's content block.",
  MISSING_ACCORDION_BUTTONS:
    "You have an accordion component with no [data-accordion-button] children.",
}

export default class Accordion extends Utils {
  constructor() {
    super()
  }

  start() {}
  stop() {}
}
