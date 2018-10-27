"use strict"

import Utils from "../utils"

const keyCodes = {
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  SPACE: 32,
  ESCAPE: 27,
}

const selectors = {
  // unique
  DATA_DROPDOWN: "data-dropdown",
  // common
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  DATA_VISIBLE: "data-visible",
  // accessibility
  TABINDEX: "tabindex",
  ARIA_HASPOPUP: "aria-haspopup",
  ARIA_CONTROLS: "aria-controls",
  ARIA_LABELLEDBY: "aria-labelledby",
  ARIA_EXPANDED: "aria-expanded",
  ROLE: "role",
}

const events = {
  KEYDOWN: "keydown",
  CLICK: "click",
}

const messages = {
  MISSING_DROPDOWN: "You have a dropdown button missing its corresponding menu.",
}

// Attributes for button in JS:
// - [x] aria-haspopup="true"
// - [x] aria-expanded="false"
// - [x] aria-controls === ul id
//
// Attributes for ul in JS:
// - [x] aria-labelledby === button id
// - [x] list items have role="none"
// - [x] anchors inside li have role="menuitem"
//
// Opens with:
// - [ ] Down arrow, focus to first element
// - [ ] Up arrow, focus to last element
// - [ ] Space
// - [ ] Enter
//
// `tabindex` on menu items set to "0":
// - [x] When menu is open
//
// `tabindex` on menu items set to "-1":
// - [x] When menu is closed
//
// Close menu:
// - [x] Escape
// - [x] Menu link is clicked
// - [x] Dropdown button is clicked
//
// Trap focus:
// - [ ] Using up and down arrow keys
//
// Stop trapping focus and close menu:
// - [ ] Using tab on last item
// - [ ] Using shift+tab on first item
//
// Set focus to menu button
// - [x] When menu is closed

/**
 * Dropdown component class.
 * @module Dropdown
 * @requires Utils
 */
export default class Dropdown extends Utils {
  constructor() {
    super()
    //  dropdown event methods
    this._render = this._render.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._handleDropdownButtonOrBgClose = this._handleDropdownButtonOrBgClose.bind(this)

    // active dropdown
    this.activeDropdownButton = {}
    this.activeDropdownId = ""
    this.activeDropdownAttr = ""
    this.activeDropdownMenuId = ""
    this.activeDropdown = {}
    this.activeDropdownMenu = {}
    this.activeDropdownLinks = []

    // all dropdowns
    this.dropdowns = []
    this.dropdownButtons = []

    // attribute helpers
    this.dropdownAttr = `[${selectors.DATA_DROPDOWN}]`
    this.dropdownButtonAttr = `[${selectors.DATA_DROPDOWN}] > [${selectors.DATA_TARGET}]`
  }

  // public

  start() {
    this.dropdowns = this._getElements(this.dropdownAttr)
    this.dropdownButtons = this._getElements(this.dropdownButtonAttr)

    if (this.dropdowns.length) {
      this.dropdowns.forEach(dropdown => {
        this._setupDropdown(dropdown)
      })
    }

    this.dropdownButtons.forEach(button => {
      button.addEventListener(events.CLICK, this._render)
    })
  }

  stop() {
    this.dropdownButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this._render)
    })
  }

  // private

  _render(event) {
    event.preventDefault()

    // dropdown button / trigger
    this.activeDropdownButton = event.target
    this.activeDropdownId = this.activeDropdownButton.getAttribute(selectors.DATA_PARENT)

    if (!this.activeDropdownId || !document.getElementById(this.activeDropdownId)) {
      throw messages.MISSING_DROPDOWN
      return
    }

    this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true")

    // dropdown container
    this.activeDropdownAttr = `[${selectors.DATA_DROPDOWN}="${this.activeDropdownId}"]`
    this.activeDropdown = document.querySelector(this.activeDropdownAttr)

    // dropdown menu
    this.activeDropdownMenuId = this.activeDropdownButton.getAttribute(selectors.DATA_TARGET)
    this.activeDropdownMenu = document.getElementById(this.activeDropdownMenuId)

    this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true")
    this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "true")

    document.addEventListener(selectors.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(selectors.KEYDOWN, this._handleDropdownButtonOrBgClose)

    // make links focusable
    this.activeDropdownLinks = this._getElements(`${this.activeDropdownAttr} > ul > li > a`)
    this.activeDropdownLinks.forEach(link => {
      link.setAttribute(selectors.TABINDEX, "0")
      link.addEventListener(events.CLICK, this._handleClose)
    })
  }

  _handleEscapeKeyPress(event) {
    if (event.which === keyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  _handleDropdownButtonOrBgClose(event) {
    if (event.target !== this.activeDropdown || event.target === this.activeDropdownButton) {
      this._handleClose(event)
    }
  }

  _handleClose(event) {
    event.preventDefault()

    this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false")
    this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "false")

    this.activeDropdownLinks.forEach(link => {
      link.setAttribute(selectors.TABINDEX, "-1")
      link.removeEventListener(events.CLICK, this._handleClose)
    })

    document.removeEventListener(selectors.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(selectors.KEYDOWN, this._handleDropdownButtonOrBgClose)

    this._handleReturnFocus()
  }

  _handleReturnFocus() {
    this.activeModalButton.setAttribute(selectors.TAB_INDEX, "-1")
    this.activeModalButton.focus()
    this.activeModalButton.removeAttribute(selectors.TAB_INDEX)
  }

  _setupDropdown(dropdown) {
    const dropdownId = dropdown.getAttribute(selectors.DATA_DROPDOWN)
    const dropdownIdAttr = `[${selectors.DATA_DROPDOWN}="${dropdownId}"]`
    const dropdownMenu = document.querySelector(`${dropdownIdAttr} > ul`)
    const dropdownMenuId = dropdownMenu.id
    const dropdownMenuItems = this._getElements(`${dropdownIdAttr} > ul > li`)
    const dropdownMenuItemLinks = this._getElements(`${dropdownIdAttr} > ul > li > a`)
    const dropdownButton = document.querySelector(`${dropdownIdAttr} > ${selectors.DATA_TARGET}`)
    const dropdownButtonId = dropdownButton.id

    dropdownButton.setAttribute(selectors.ARIA_CONTROLS, dropdownMenuId)
    dropdownButton.setAttribute(selectors.ARIA_HASPOPUP, "true")
    dropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false")

    dropdownMenu.setAttribute(selectors.ARIA_LABELLEDBY, dropdownButtonId)

    dropdownMenuItems.forEach(item => {
      item.setAttribute(selectors.ROLE, "none")
    })

    dropdownMenuItemLinks.forEach(link => {
      link.setAttribute(selectors.ROLE, "menuitem")
      link.setAttribute(selectors.TABINDEX, "-1")
    })
  }
}
